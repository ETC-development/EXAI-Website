import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const adminRoles = ["staff", "super_admin"] as const;

const userFilterSchema = z.enum(["all", "in-team", "unassigned"]);

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(25),
  page: z.coerce.number().int().min(1).default(1),
  filter: z.preprocess((v) => (v === "" || v == null ? "all" : v), userFilterSchema).default("all"),
  q: z.string().max(200).optional(),
});

type TeamMemberRow = {
  user_id?: string;
  role?: string;
  teams?: { name?: string } | null;
};

export async function GET(request: Request) {
  const authz = await requireAdmin(request, [...adminRoles]);
  if (!authz.ok) {
    return NextResponse.json({ error: authz.reason }, { status: authz.status });
  }

  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
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

  const baseFields = "id,name,email,school,year_of_study,created_at";

  let selectRel = `${baseFields}, team_members ( user_id, role, teams (name) )`;
  if (filter === "in-team") {
    selectRel = `${baseFields}, team_members!inner ( user_id, role, teams (name) )`;
  }

  let listQuery = supabase.from("users").select(selectRel, { count: "exact" }).order("created_at", { ascending: false });

  if (filter === "unassigned") {
    listQuery = listQuery.is("team_members", null);
  }

  const term = q?.trim();
  if (term) {
    const safe = term.replace(/%/g, "").replace(/_/g, "").replace(/,/g, "");
    if (safe.length > 0) {
      const pattern = `%${safe}%`;
      listQuery = listQuery.or(`name.ilike.${pattern},email.ilike.${pattern},school.ilike.${pattern}`);
    }
  }

  const { data: users, error: usersError, count } = await listQuery.range(from, to);

  if (usersError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const rows = (users ?? []) as unknown as Array<{
    id: string;
    name: string;
    email: string;
    school: string;
    year_of_study: string;
    created_at: string;
    team_members: TeamMemberRow[] | TeamMemberRow | null;
  }>;

  const mapped = rows.map((u) => {
    const raw = u.team_members;
    const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const first = arr[0];
    const teamName = first?.teams?.name ?? null;
    const teamRole = first?.role ?? null;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      school: u.school,
      year_of_study: u.year_of_study,
      created_at: u.created_at,
      team_name: teamName,
      team_role: teamRole,
      team_status: teamName ? "in-team" : "unassigned",
    };
  });

  return NextResponse.json(
    {
      users: mapped,
      total,
      page,
      limit,
      totalPages,
    },
    { status: 200 },
  );
}
