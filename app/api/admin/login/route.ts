import { NextResponse } from "next/server";
import { buildAdminCookie, verifyAdminCredentials, COOKIE_NAME } from "@/lib/admin/cookie-auth";

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

  const role = verifyAdminCredentials(parsed.username, parsed.password);
  if (!role) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const cookieValue = buildAdminCookie(parsed.username, role);
  if (!cookieValue) {
    return NextResponse.json(
      { error: "SERVER_MISCONFIGURED" },
      { status: 500 },
    );
  }

  const response = NextResponse.json({ ok: true, role }, { status: 200 });
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

