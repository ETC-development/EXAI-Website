import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

export async function GET(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const supabase = createSupabaseServerClient();

  const { count: teamCount, error: teamErr } = await supabase
    .from("teams")
    .select("*", { count: "exact", head: true });

  const { count: participantCount, error: partErr } = await supabase
    .from("team_members")
    .select("*", { count: "exact", head: true });

  const { count: submittedCount } = await supabase
    .from("teams")
    .select("*", { count: "exact", head: true })
    .eq("is_submitted", true);

  const { count: pendingStatus } = await supabase
    .from("teams")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: acceptedStatus } = await supabase
    .from("teams")
    .select("*", { count: "exact", head: true })
    .eq("status", "accepted");

  const { count: rejectedStatus } = await supabase
    .from("teams")
    .select("*", { count: "exact", head: true })
    .eq("status", "rejected");

  if (teamErr || partErr) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const { data: teamsForSeries } = await supabase
    .from("teams")
    .select("id,created_at")
    .order("created_at", { ascending: true })
    .limit(2000);

  const { data: membersForSeries } = await supabase
    .from("team_members")
    .select("created_at")
    .order("created_at", { ascending: true })
    .limit(5000);

  const dayKey = (iso: string) => iso.slice(0, 10);
  const teamsByDay = new Map<string, number>();
  for (const t of teamsForSeries ?? []) {
    const k = dayKey(t.created_at);
    teamsByDay.set(k, (teamsByDay.get(k) ?? 0) + 1);
  }
  const membersByDay = new Map<string, number>();
  for (const m of membersForSeries ?? []) {
    const k = dayKey(m.created_at);
    membersByDay.set(k, (membersByDay.get(k) ?? 0) + 1);
  }

  const allDays = new Set([...teamsByDay.keys(), ...membersByDay.keys()]);
  const sortedDays = [...allDays].sort();
  let cumTeams = 0;
  let cumMembers = 0;
  const registration_series = sortedDays.map((date) => {
    cumTeams += teamsByDay.get(date) ?? 0;
    cumMembers += membersByDay.get(date) ?? 0;
    return { date, teams: cumTeams, participants: cumMembers };
  });

  return NextResponse.json(
    {
      total_teams: teamCount ?? 0,
      total_participants: participantCount ?? 0,
      submitted_teams: submittedCount ?? 0,
      pending_teams: pendingStatus ?? 0,
      accepted_teams: acceptedStatus ?? 0,
      rejected_teams: rejectedStatus ?? 0,
      registration_series,
    },
    { status: 200 },
  );
}
