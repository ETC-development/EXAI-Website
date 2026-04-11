import crypto from "crypto";
import { getAdminCookieSecret, type AdminRole, getAdminCredentials } from "@/lib/admin/admin-config";

export type AdminCookiePayload = {
  username: string;
  role: AdminRole;
  exp: number; // unix ms
};

const COOKIE_NAME = "admin_auth";

function b64urlEncode(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return buf
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function b64urlDecode(input: string): string {
  const padded = input.padEnd(input.length + (4 - (input.length % 4)) % 4, "=");
  const b64 = padded.replaceAll("-", "+").replaceAll("_", "/");
  return Buffer.from(b64, "base64").toString("utf8");
}

function timingSafeEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function sign(payloadB64url: string, secret: string): string {
  return b64urlEncode(crypto.createHmac("sha256", secret).update(payloadB64url).digest());
}

export function normalizeAdminUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function buildAdminCookie(username: string, role: AdminRole) {
  const secret = getAdminCookieSecret();
  if (!secret) return null;

  const exp = Date.now() + 24 * 60 * 60 * 1000; // 24h
  const payload: AdminCookiePayload = { username: normalizeAdminUsername(username), role, exp };
  const payloadB64url = b64urlEncode(JSON.stringify(payload));
  const signature = sign(payloadB64url, secret);

  return `${payloadB64url}.${signature}`;
}

export function parseAdminCookie(request: Request): AdminCookiePayload | null {
  const secret = getAdminCookieSecret();
  if (!secret) return null;

  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((c) => c.trim()).filter(Boolean);
  const cookieMap = new Map<string, string>();
  for (const c of cookies) {
    const idx = c.indexOf("=");
    if (idx <= 0) continue;
    const key = c.slice(0, idx).trim();
    const value = c.slice(idx + 1).trim();
    cookieMap.set(key, value);
  }

  const raw = cookieMap.get(COOKIE_NAME);
  return parseAdminCookieToken(raw, secret);
}

/** Parse signed admin cookie value (used by server layouts and tests). */
export function parseAdminCookieToken(raw: string | null | undefined, secret: string): AdminCookiePayload | null {
  if (!raw) return null;

  const [payloadB64url, signature] = raw.split(".");
  if (!payloadB64url || !signature) return null;

  const expectedSig = sign(payloadB64url, secret);
  if (!timingSafeEqual(Buffer.from(expectedSig), Buffer.from(signature))) return null;

  let decoded: unknown;
  try {
    decoded = JSON.parse(b64urlDecode(payloadB64url));
  } catch {
    return null;
  }

  if (
    !decoded ||
    typeof decoded !== "object" ||
    !("username" in decoded) ||
    !("role" in decoded) ||
    !("exp" in decoded)
  ) {
    return null;
  }

  const payload = decoded as Partial<AdminCookiePayload>;
  if (typeof payload.username !== "string") return null;
  if (payload.role !== "staff" && payload.role !== "super_admin") return null;
  if (typeof payload.exp !== "number") return null;
  if (Date.now() > payload.exp) return null;

  return payload as AdminCookiePayload;
}

export function verifyAdminCredentials(username: string, password: string): AdminRole | null {
  const creds = getAdminCredentials();
  const u = normalizeAdminUsername(username);
  const match = creds.find((c) => normalizeAdminUsername(c.username) === u && c.password === password);
  return match?.role ?? null;
}

export { COOKIE_NAME };

