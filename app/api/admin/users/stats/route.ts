import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

/** Aggregate participant counts (not paginated). */
export async function GET(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const supabase = createSupabaseServerClient();

  const { count: total, error: totalErr } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (totalErr) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const { data: memberRows, error: mErr } = await supabase.from("team_members").select("user_id");

  if (mErr) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const withTeam = new Set((memberRows ?? []).map((r) => r.user_id));
  const inTeam = withTeam.size;
  const totalUsers = total ?? 0;
  const unassigned = Math.max(0, totalUsers - inTeam);

  return NextResponse.json(
    {
      total: totalUsers,
      in_team: inTeam,
      unassigned,
    },
    { status: 200 },
  );
}
