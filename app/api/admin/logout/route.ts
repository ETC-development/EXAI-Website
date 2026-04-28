import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/admin/cookie-auth";
import { ADMIN_CSRF_COOKIE, enforceAdminCsrf } from "@/lib/security/csrf";

export async function POST(request: Request) {
  const csrf = enforceAdminCsrf(request);
  if (csrf) return csrf;

  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  res.cookies.set(ADMIN_CSRF_COOKIE, "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}
