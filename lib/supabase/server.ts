import { createClient } from "@supabase/supabase-js";
import { getEnv } from "@/lib/env";

function baseOptions() {
  return {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  };
}

/** Use ONLY for privileged operations that must bypass RLS. */
export function createSupabaseServiceRoleClient() {
  const env = getEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, baseOptions());
}

/** Use for public/user-facing APIs with RLS enforcement. */
export function createSupabasePublicServerClient() {
  const env = getEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, baseOptions());
}

// Backward-compatible alias; prefer explicit clients above.
export const createSupabaseServerClient = createSupabaseServiceRoleClient;
