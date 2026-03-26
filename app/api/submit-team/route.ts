import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const submitTeamSchema = z.object({
  team_id: z.string().uuid(),
  leader_email: z.string().email(),
  confirm: z.literal(true),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = submitTeamSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const input = parsed.data;

  const { data, error } = await supabase.rpc("submit_team_with_leader", {
    p_team_id: input.team_id,
    p_leader_email: input.leader_email,
    p_confirm: true,
  });

  if (error) {
    const msg = error.message || "";
    if (msg.includes("TEAM_ALREADY_SUBMITTED")) {
      return NextResponse.json({ error: "TEAM_ALREADY_SUBMITTED" }, { status: 409 });
    }
    if (
      msg.includes("NOT_TEAM_LEADER") ||
      msg.includes("TEAM_TOO_SMALL") ||
      msg.includes("ANSWERS_MISSING")
    ) {
      return NextResponse.json({ error: "SUBMISSION_NOT_ALLOWED" }, { status: 409 });
    }
    if (msg.includes("TEAM_NOT_FOUND")) {
      return NextResponse.json({ error: "TEAM_NOT_FOUND" }, { status: 404 });
    }
    if (msg.includes("CONFIRMATION_REQUIRED")) {
      return NextResponse.json({ error: "CONFIRMATION_REQUIRED" }, { status: 400 });
    }

    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const row = data?.[0];
  if (!row?.team_id) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  return NextResponse.json(
    { team_id: row.team_id, is_submitted: row.is_submitted },
    { status: 200 },
  );
}

