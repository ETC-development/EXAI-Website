import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

const statusSchema = z.object({
  team_id: z.string().uuid(),
  status: z.enum(["pending", "accepted", "rejected"]),
});

export async function POST(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const payload = await request.json().catch(() => null);
  const parsed = statusSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { team_id, status } = parsed.data;

  const { data, error } = await supabase
    .from("teams")
    .update({ status })
    .eq("id", team_id)
    .select("id,status")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ team_id: data.id, status: data.status }, { status: 200 });
}

