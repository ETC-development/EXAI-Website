import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

const scoreSchema = z.object({
  team_id: z.string().uuid(),
  score: z.number().min(0).max(100),
  note: z.string().max(5000).optional().nullable(),
});

export async function POST(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const payload = await request.json().catch(() => null);
  const parsed = scoreSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { team_id, score, note } = parsed.data;

  const { data, error } = await supabase
    .from("team_scores")
    .upsert(
      {
        team_id,
        staff_id: authz.adminUser.id,
        score,
        note: note ?? null,
      },
      { onConflict: "team_id" },
    )
    .select("team_id,staff_id,score,note")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "TEAM_NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json({ team_id: data.team_id, score: data.score, note: data.note ?? null }, { status: 200 });
}

