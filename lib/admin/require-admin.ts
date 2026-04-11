import { createSupabaseServerClient } from "@/lib/supabase/server";
import { parseAdminCookie, normalizeAdminUsername, type AdminCookiePayload } from "@/lib/admin/cookie-auth";
import type { AdminRole } from "@/lib/admin/admin-config";

export type RequireAdminResult =
  | { ok: false; status: 401 | 403; reason: "UNAUTHORIZED" | "FORBIDDEN" }
  | { ok: true; adminUser: { id: string; role: AdminRole; username: string } };

function safeExtractUsername(payload: AdminCookiePayload): string {
  return normalizeAdminUsername(payload.username);
}

export async function requireAdmin(request: Request, allowedRoles: AdminRole[]) {
  const payload = parseAdminCookie(request);
  if (!payload) return { ok: false as const, status: 401, reason: "UNAUTHORIZED" as const };

  const supabase = createSupabaseServerClient();
  const username = safeExtractUsername(payload);

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("id,role,better_auth_user_id")
    .eq("better_auth_user_id", username)
    .maybeSingle();

  if (error || !adminUser) {
    return { ok: false as const, status: 403, reason: "FORBIDDEN" as const };
  }

  const role = adminUser.role as AdminRole;
  if (!allowedRoles.includes(role)) {
    return { ok: false as const, status: 403, reason: "FORBIDDEN" as const };
  }

  return {
    ok: true as const,
    adminUser: {
      id: adminUser.id,
      role,
      username: adminUser.better_auth_user_id,
    },
  };
}

