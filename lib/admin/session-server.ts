import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { COOKIE_NAME, normalizeAdminUsername, parseAdminCookieToken } from "@/lib/admin/cookie-auth";
import { getAdminCookieSecret, type AdminRole } from "@/lib/admin/admin-config";

export type AdminDashboardSession = {
  username: string;
  role: AdminRole;
  adminUserId: string;
};

export async function getAdminDashboardSession(): Promise<AdminDashboardSession | null> {
  const secret = getAdminCookieSecret();
  if (!secret) return null;

  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  const payload = parseAdminCookieToken(raw, secret);
  if (!payload) return null;

  const username = normalizeAdminUsername(payload.username);
  const supabase = createSupabaseServerClient();
  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("id,role,better_auth_user_id")
    .eq("better_auth_user_id", username)
    .maybeSingle();

  if (error || !adminUser) return null;
  const dbRole = adminUser.role as AdminRole;
  if (dbRole !== payload.role) return null;

  return {
    username: adminUser.better_auth_user_id,
    role: dbRole,
    adminUserId: adminUser.id,
  };
}
