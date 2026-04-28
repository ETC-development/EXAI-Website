"use client";

import { ADMIN_CSRF_COOKIE, ADMIN_CSRF_HEADER } from "@/lib/security/csrf";

export function getAdminCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [k, ...rest] = cookie.split("=");
    if (k === ADMIN_CSRF_COOKIE) return rest.join("=") || null;
  }
  return null;
}

export function withAdminCsrf(headers?: HeadersInit): HeadersInit {
  const token = getAdminCsrfToken();
  const next = new Headers(headers ?? {});
  if (token) next.set(ADMIN_CSRF_HEADER, token);
  return next;
}

