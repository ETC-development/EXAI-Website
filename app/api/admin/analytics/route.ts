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

  const { data: users } = await supabase.from("users").select("school,year_of_study");

  const schoolCount = new Map<string, number>();
  const yearCount = new Map<string, number>();
  for (const u of users ?? []) {
    schoolCount.set(u.school, (schoolCount.get(u.school) ?? 0) + 1);
    yearCount.set(u.year_of_study, (yearCount.get(u.year_of_study) ?? 0) + 1);
  }

  const { data: teamIds } = await supabase.from("teams").select("id");
  const ids = teamIds?.map((t) => t.id) ?? [];
  const memberCounts: number[] = [];
  if (ids.length) {
    const { data: members } = await supabase.from("team_members").select("team_id").in("team_id", ids);
    const byTeam = new Map<string, number>();
    for (const m of members ?? []) {
      byTeam.set(m.team_id, (byTeam.get(m.team_id) ?? 0) + 1);
    }
    for (const id of ids) {
      memberCounts.push(byTeam.get(id) ?? 0);
    }
  }

  let complete = 0;
  let partial = 0;
  let small = 0;
  for (const n of memberCounts) {
    if (n >= 5) complete++;
    else if (n >= 3) partial++;
    else small++;
  }

  return NextResponse.json(
    {
      school_distribution: [...schoolCount.entries()]
        .map(([school, count]) => ({ school, count }))
        .sort((a, b) => b.count - a.count),
      year_distribution: [...yearCount.entries()]
        .map(([year, count]) => ({ year, count }))
        .sort((a, b) => b.count - a.count),
      team_size_buckets: [
        { name: "Full (5)", value: complete, color: "#14b4ba" },
        { name: "Mid (3–4)", value: partial, color: "#079db5" },
        { name: "Small (1–2)", value: small, color: "#0f8f94" },
      ],
 avg_team_size:
        memberCounts.length > 0
          ? Math.round((memberCounts.reduce((a, b) => a + b, 0) / memberCounts.length) * 10) / 10
          : 0,
    },
    { status: 200 },
  );
}
