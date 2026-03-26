import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;
const teamsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export async function GET(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const url = new URL(request.url);
  const parsed = teamsQuerySchema.safeParse({
    limit: url.searchParams.get("limit"),
  });

  const limit = parsed.success ? parsed.data.limit : 50;

  // Keep list endpoint lightweight.
  const supabase = createSupabaseServerClient();

  const { data: teams, error: teamsError } = await supabase
    .from("teams")
    .select("id,name,status,is_submitted,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (teamsError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const teamIds = teams?.map((t) => t.id) ?? [];
  if (teamIds.length === 0) {
    return NextResponse.json({ teams: [] }, { status: 200 });
  }

  const { data: scores } = await supabase
    .from("team_scores")
    .select("team_id,score")
    .in("team_id", teamIds);

  const scoreByTeam = new Map<string, number>();
  for (const s of scores ?? []) scoreByTeam.set(s.team_id, Number(s.score));

  const { data: members } = await supabase
    .from("team_members")
    .select("team_id")
    .in("team_id", teamIds);

  const memberCountByTeam = new Map<string, number>();
  for (const m of members ?? []) {
    memberCountByTeam.set(m.team_id, (memberCountByTeam.get(m.team_id) ?? 0) + 1);
  }

  return NextResponse.json(
    {
      teams: (teams ?? []).map((t) => ({
        id: t.id,
        name: t.name,
        status: t.status,
        is_submitted: t.is_submitted,
        created_at: t.created_at,
        member_count: memberCountByTeam.get(t.id) ?? 0,
        score: scoreByTeam.get(t.id) ?? null,
      })),
    },
    { status: 200 },
  );
}

