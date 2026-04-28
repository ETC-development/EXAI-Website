import { NextResponse } from "next/server";
import {
  buildAdminCookie,
  verifyAdminCredentials,
  COOKIE_NAME,
  normalizeAdminUsername,
} from "@/lib/admin/cookie-auth";
import { createSupabaseServiceRoleClient } from "@/lib/supabase/server";
import { enforceRateLimit, getClientKey } from "@/lib/rate-limit";
import { ADMIN_CSRF_COOKIE, generateCsrfToken } from "@/lib/security/csrf";

const loginSchema = {
  async parse(body: unknown): Promise<{ username: string; password: string } | null> {
    if (!body || typeof body !== "object") return null;
    const b = body as Record<string, unknown>;
    const username = typeof b.username === "string" ? b.username : null;
    const password = typeof b.password === "string" ? b.password : null;
    if (!username || !password) return null;
    return { username, password };
  },
};

const failState = new Map<string, { attempts: number; lockUntil: number }>();

function keyFor(request: Request, username: string) {
  return `${getClientKey(request)}:${normalizeAdminUsername(username)}`;
}

function getLockInfo(k: string) {
  const row = failState.get(k);
  if (!row) return { blocked: false, attempts: 0 };
  if (row.lockUntil > Date.now()) return { blocked: true, retryAfter: Math.ceil((row.lockUntil - Date.now()) / 1000), attempts: row.attempts };
  return { blocked: false, attempts: row.attempts };
}

function markFailed(k: string) {
  const prev = failState.get(k) ?? { attempts: 0, lockUntil: 0 };
  const attempts = prev.attempts + 1;
  // Short temporary lockout after repeated failures.
  const lockUntil = attempts >= 8 ? Date.now() + 15 * 60 * 1000 : 0;
  failState.set(k, { attempts, lockUntil });
  const delayMs = Math.min(4000, 200 * 2 ** Math.min(attempts, 6));
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function clearFailures(k: string) {
  failState.delete(k);
}

export async function POST(request: Request) {
  const ipLimit = await enforceRateLimit(request, "admin-login-ip", { maxRequests: 25, windowSeconds: 600 });
  if (ipLimit) return ipLimit;

  const payload = await request.json().catch(() => null);
  const parsed = await loginSchema.parse(payload);
  if (!parsed) {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  const normalized = normalizeAdminUsername(parsed.username);
  const userIpKey = keyFor(request, normalized);

  const userLimit = await enforceRateLimit(request, `admin-login-user:${normalized}`, {
    maxRequests: 8,
    windowSeconds: 600,
    clientKey: getClientKey(request),
  });
  if (userLimit) return userLimit;

  const lockInfo = getLockInfo(userIpKey);
  if (lockInfo.blocked) {
    return NextResponse.json({ error: "TOO_MANY_ATTEMPTS" }, {
      status: 429,
      headers: { "Retry-After": String(lockInfo.retryAfter ?? 60) },
    });
  }

  if (!verifyAdminCredentials(parsed.username, parsed.password)) {
    await markFailed(userIpKey);
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const supabase = createSupabaseServiceRoleClient();
  const { data: adminRow, error: adminErr } = await supabase
    .from("admin_users")
    .select("id,role")
    .eq("better_auth_user_id", normalized)
    .maybeSingle();

  if (adminErr || !adminRow) {
    return NextResponse.json(
      { error: "ADMIN_NOT_PROVISIONED", hint: "Add this user to public.admin_users (better_auth_user_id, role)." },
      { status: 403 },
    );
  }

  const dbRole = adminRow.role as "staff" | "super_admin";
  const cookieValue = buildAdminCookie(normalized, dbRole);
  if (!cookieValue) {
    return NextResponse.json(
      { error: "SERVER_MISCONFIGURED" },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ ok: true, role: dbRole }, { status: 200 });
  const isProd = process.env.NODE_ENV === "production";
  clearFailures(userIpKey);

  response.cookies.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    // Keep cookie lifetime in sync with token exp (buildAdminCookie uses 24h).
    maxAge: 60 * 60 * 24,
  });
  response.cookies.set(ADMIN_CSRF_COOKIE, generateCsrfToken(), {
    httpOnly: false,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}

