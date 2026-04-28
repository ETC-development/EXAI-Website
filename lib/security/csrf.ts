import { randomBytes, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const ADMIN_CSRF_COOKIE = "admin_csrf";
export const ADMIN_CSRF_HEADER = "x-csrf-token";

export function generateCsrfToken() {
  return randomBytes(32).toString("hex");
}

function sameHost(urlLike: string | null, host: string): boolean {
  if (!urlLike) return false;
  try {
    const url = new URL(urlLike);
    return url.host === host;
  } catch {
    return false;
  }
}

function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("cookie");
  if (!raw) return null;
  for (const pair of raw.split(";")) {
    const [k, ...rest] = pair.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return null;
}

export function enforceAdminCsrf(request: Request): NextResponse | null {
  const host = request.headers.get("host") ?? "";
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Defense-in-depth for same-site cookies on unsafe methods.
  if (origin && !sameHost(origin, host)) {
    return NextResponse.json({ error: "CSRF_ORIGIN_MISMATCH" }, { status: 403 });
  }
  if (!origin && referer && !sameHost(referer, host)) {
    return NextResponse.json({ error: "CSRF_ORIGIN_MISMATCH" }, { status: 403 });
  }

  const cookieToken = readCookie(request, ADMIN_CSRF_COOKIE);
  const headerToken = request.headers.get(ADMIN_CSRF_HEADER);
  if (!cookieToken || !headerToken) {
    return NextResponse.json({ error: "CSRF_TOKEN_MISSING" }, { status: 403 });
  }

  const a = Buffer.from(cookieToken);
  const b = Buffer.from(headerToken);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "CSRF_TOKEN_INVALID" }, { status: 403 });
  }

  return null;
}

