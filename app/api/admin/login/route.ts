import { NextResponse } from "next/server";
import {
  buildAdminCookie,
  verifyAdminCredentials,
  COOKIE_NAME,
  normalizeAdminUsername,
} from "@/lib/admin/cookie-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = await loginSchema.parse(payload);
  if (!parsed) {
    return NextResponse.json({ error: "INVALID_PAYLOAD" }, { status: 400 });
  }

  if (!verifyAdminCredentials(parsed.username, parsed.password)) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const normalized = normalizeAdminUsername(parsed.username);
  const supabase = createSupabaseServerClient();
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

  response.cookies.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    // Keep cookie lifetime in sync with token exp (buildAdminCookie uses 24h).
    maxAge: 60 * 60 * 24,
  });

  return response;
}

