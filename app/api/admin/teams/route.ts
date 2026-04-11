import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

const teamFilterSchema = z.enum(["all", "pending", "submitted", "accepted", "rejected"]);

const teamsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(25),
  page: z.coerce.number().int().min(1).default(1),
  filter: z.preprocess((v) => (v === "" || v == null ? "all" : v), teamFilterSchema).default("all"),
  q: z.string().max(200).optional(),
});

export async function GET(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const url = new URL(request.url);
  const parsed = teamsQuerySchema.safeParse({
    limit: url.searchParams.get("limit"),
    page: url.searchParams.get("page"),
    filter: url.searchParams.get("filter"),
    q: url.searchParams.get("q") ?? undefined,
  });

  const limit = parsed.success ? parsed.data.limit : 25;
  const page = parsed.success ? parsed.data.page : 1;
  const filter = parsed.success ? parsed.data.filter : "all";
  const q = parsed.success ? parsed.data.q : undefined;

  const supabase = createSupabaseServerClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let listQuery = supabase
    .from("teams")
    .select("id,name,status,is_submitted,created_at,max_members", { count: "exact" })
    .order("created_at", { ascending: false });

  const term = q?.trim();
  if (term) {
    listQuery = listQuery.ilike("name", `%${term}%`);
  }
  switch (filter) {
    case "pending":
      listQuery = listQuery.eq("is_submitted", false);
      break;
    case "submitted":
      listQuery = listQuery.eq("is_submitted", true);
      break;
    case "accepted":
      listQuery = listQuery.eq("status", "accepted");
      break;
    case "rejected":
      listQuery = listQuery.eq("status", "rejected");
      break;
    default:
      break;
  }

  const { data: teams, error: teamsError, count } = await listQuery.range(from, to);

  if (teamsError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const teamIds = teams?.map((t) => t.id) ?? [];
  if (teamIds.length === 0) {
    return NextResponse.json(
      {
        teams: [],
        total,
        page,
        limit,
        totalPages,
      },
      { status: 200 },
    );
  }

  const { data: leaderRows } = await supabase
    .from("team_members")
    .select("team_id, users(name)")
    .eq("role", "leader")
    .in("team_id", teamIds);

  const leaderNameByTeam = new Map<string, string>();
  for (const row of leaderRows ?? []) {
    const u = row.users as { name?: string } | null;
    if (row.team_id && u?.name) leaderNameByTeam.set(row.team_id, u.name);
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
        max_members: t.max_members,
        leader_name: leaderNameByTeam.get(t.id) ?? null,
        member_count: memberCountByTeam.get(t.id) ?? 0,
        score: scoreByTeam.get(t.id) ?? null,
      })),
      total,
      page,
      limit,
      totalPages,
    },
    { status: 200 },
  );
}
