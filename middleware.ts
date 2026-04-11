import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "admin_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE)?.value;
  const hasToken = Boolean(token?.includes("."));

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (!hasToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
