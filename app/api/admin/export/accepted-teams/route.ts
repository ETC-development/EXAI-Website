import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

function csvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsvRow(cells: (string | number | boolean | null | undefined)[]): string {
  return cells.map(csvCell).join(",");
}

type UserEmbed = { name?: string | null; email?: string | null; phone?: string | null };

/**
 * All members as "Name (email); Name2 (email2); …"
 */
function formatTeamMembers(
  rows: Array<{ role: string; users: UserEmbed | null }>,
): string {
  const parts: string[] = [];
  for (const row of rows) {
    const u = row.users;
    const name = (u?.name ?? "").trim() || "—";
    const email = (u?.email ?? "").trim() || "—";
    parts.push(`${name} (${email})`);
  }
  return parts.join("; ");
}

/**
 * GET — CSV of accepted teams: ids, scores, notes, full member list, leader contact.
 */
export async function GET(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const supabase = createSupabaseServerClient();

  const { data: teams, error: teamsError } = await supabase
    .from("teams")
    .select("id,name")
    .eq("status", "accepted")
    .order("name", { ascending: true });

  if (teamsError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const list = teams ?? [];
  const teamIds = list.map((t) => t.id);

  const scoreByTeam = new Map<string, { score: number; note: string | null }>();
  if (teamIds.length > 0) {
    const { data: scores } = await supabase.from("team_scores").select("team_id,score,note").in("team_id", teamIds);
    for (const s of scores ?? []) {
      scoreByTeam.set(s.team_id, { score: Number(s.score), note: s.note ?? null });
    }
  }

  const membersByTeam = new Map<string, Array<{ role: string; users: UserEmbed | null }>>();
  const leaderByTeam = new Map<string, { name: string; phone: string; email: string }>();

  if (teamIds.length > 0) {
    const { data: memberRows, error: memErr } = await supabase
      .from("team_members")
      .select("team_id,role,users(name,email,phone)")
      .in("team_id", teamIds);

    if (memErr) {
      return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
    }

    for (const row of memberRows ?? []) {
      const tid = row.team_id;
      if (!tid) continue;
      const u = row.users as UserEmbed | null;

      if (!membersByTeam.has(tid)) membersByTeam.set(tid, []);
      membersByTeam.get(tid)!.push({ role: row.role ?? "member", users: u });

      if (row.role === "leader" && u) {
        leaderByTeam.set(tid, {
          name: (u.name ?? "").trim(),
          email: (u.email ?? "").trim(),
          phone: (u.phone ?? "").trim(),
        });
      }
    }

    for (const [, members] of membersByTeam) {
      members.sort((a, b) => {
        if (a.role === "leader") return -1;
        if (b.role === "leader") return 1;
        return 0;
      });
    }
  }

  const header = toCsvRow([
    "team_id",
    "team_name",
    "final_score",
    "evaluation_note",
    "team_members",
    "leader_name",
    "leader_phone",
    "leader_email",
  ]);

  const lines = [header];
  for (const t of list) {
    const sc = scoreByTeam.get(t.id);
    const members = membersByTeam.get(t.id) ?? [];
    const teamMembersCol = formatTeamMembers(members);
    const leader = leaderByTeam.get(t.id);

    lines.push(
      toCsvRow([
        t.id,
        t.name,
        sc?.score ?? "",
        sc?.note ?? "",
        teamMembersCol,
        leader?.name ?? "",
        leader?.phone ?? "",
        leader?.email ?? "",
      ]),
    );
  }

  const body = "\uFEFF" + lines.join("\n");
  const date = new Date().toISOString().slice(0, 10);
  const filename = `exai-accepted-teams-${date}.csv`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
