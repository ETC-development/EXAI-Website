import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).default(200),
});

export async function GET(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const url = new URL(request.url);
  const parsed = querySchema.safeParse({ limit: url.searchParams.get("limit") });
  const limit = parsed.success ? parsed.data.limit : 200;

  const supabase = createSupabaseServerClient();

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id,name,email,school,year_of_study,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (usersError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const userIds = users?.map((u) => u.id) ?? [];
  if (userIds.length === 0) {
    return NextResponse.json({ users: [] }, { status: 200 });
  }

  const { data: memberships } = await supabase
    .from("team_members")
    .select("user_id, role, teams(name)")
    .in("user_id", userIds);

  const teamByUser = new Map<string, { name: string; role: string }>();
  for (const m of memberships ?? []) {
    const t = m.teams as { name?: string } | null;
    if (m.user_id && t?.name) {
      teamByUser.set(m.user_id, { name: t.name, role: m.role });
    }
  }

  return NextResponse.json(
    {
      users: (users ?? []).map((u) => {
        const tm = teamByUser.get(u.id);
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          school: u.school,
          year_of_study: u.year_of_study,
          created_at: u.created_at,
          team_name: tm?.name ?? null,
          team_role: tm?.role ?? null,
          team_status: tm ? "in-team" : "unassigned",
        };
      }),
    },
    { status: 200 },
  );
}
