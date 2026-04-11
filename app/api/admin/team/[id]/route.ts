import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const teamId = (await params).id;
  const supabase = createSupabaseServerClient();

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id,name,status,is_submitted,created_at,invite_token,max_members")
    .eq("id", teamId)
    .maybeSingle();

  if (teamError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
  if (!team) {
    return NextResponse.json({ error: "TEAM_NOT_FOUND" }, { status: 404 });
  }

  const { data: memberRows, error: membersError } = await supabase
    .from("team_members")
    .select("user_id,role,created_at")
    .eq("team_id", teamId);

  if (membersError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const userIds = (memberRows ?? []).map((m) => m.user_id);
  const { data: users } = userIds.length
    ? await supabase
        .from("users")
        .select("id,name,email,phone,github,linkedin,tshirt_size,school,year_of_study")
        .in("id", userIds)
    : { data: [] };

  const userById = new Map<string, any>();
  for (const u of users ?? []) userById.set(u.id, u);

  const members =
    memberRows?.map((m) => {
      const u = userById.get(m.user_id);
      return {
        user_id: m.user_id,
        role: m.role,
        joined_at: (m as { created_at?: string }).created_at ?? null,
        name: u?.name ?? null,
        email: u?.email ?? null,
        phone: u?.phone ?? null,
        school: u?.school ?? null,
        year_of_study: u?.year_of_study ?? null,
        github: u?.github ?? null,
        linkedin: u?.linkedin ?? null,
        tshirt_size: u?.tshirt_size ?? null,
      };
    }) ?? [];

  const { data: answers } = await supabase
    .from("team_answers")
    .select("motivation,experience,additional_info")
    .eq("team_id", teamId)
    .maybeSingle();

  const { data: score } = await supabase
    .from("team_scores")
    .select("score,note,staff_id")
    .eq("team_id", teamId)
    .maybeSingle();

  return NextResponse.json(
    {
      team,
      members,
      answers: answers ?? null,
      score: score ?? null,
    },
    { status: 200 },
  );
}

