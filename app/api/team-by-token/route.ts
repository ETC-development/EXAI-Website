import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enforceRateLimit } from "@/lib/rate-limit";

const querySchema = z.object({
  token: z.string().trim().min(1),
});

export async function GET(request: Request) {
  const limited = await enforceRateLimit(request, "team-by-token");
  if (limited) return limited;

  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    token: url.searchParams.get("token"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const token = parsed.data.token;
  const supabase = createSupabaseServerClient();

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("id,name,max_members,is_submitted,status,created_at")
    .eq("invite_token", token)
    .maybeSingle();

  if (teamError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  if (!team) {
    return NextResponse.json({ error: "TEAM_NOT_FOUND" }, { status: 404 });
  }

  const { data: memberRows, error: membersError } = await supabase
    .from("team_members")
    .select("user_id")
    .eq("team_id", team.id);

  if (membersError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  return NextResponse.json(
    {
      team_id: team.id,
      team_name: team.name,
      member_count: (memberRows ?? []).length,
      max_members: team.max_members,
      is_submitted: team.is_submitted,
      status: team.status,
      created_at: team.created_at,
    },
    { status: 200 },
  );
}

