import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const yearOfStudyEnum = z.enum(["1", "2", "3", "4", "5", "master", "phd", "other"]);
const tshirtSizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL"]);

const createTeamSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().transform((value) => value.toLowerCase()),
  school: z.string().trim().min(2).max(200),
  year_of_study: yearOfStudyEnum,
  github: z.string().trim().url().optional().or(z.literal("")),
  linkedin: z.string().trim().url().optional().or(z.literal("")),
  tshirt_size: tshirtSizeEnum,
  team_name: z.string().trim().min(2).max(120),
  motivation: z.string().trim().min(20).max(5000),
  experience: z.string().trim().min(20).max(5000),
  additional_info: z.string().trim().max(5000).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = createTeamSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const input = parsed.data;

  const { data, error } = await supabase.rpc("create_team_with_leader", {
    p_name: input.name,
    p_email: input.email,
    p_school: input.school,
    p_year_of_study: input.year_of_study,
    p_github: input.github || null,
    p_linkedin: input.linkedin || null,
    p_tshirt_size: input.tshirt_size,
    p_team_name: input.team_name,
    p_motivation: input.motivation,
    p_experience: input.experience,
    p_additional_info: input.additional_info || null,
  });

  if (error) {
    if (error.message.includes("USER_ALREADY_IN_TEAM")) {
      return NextResponse.json({ error: "USER_ALREADY_IN_TEAM" }, { status: 409 });
    }

    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const row = data?.[0];
  if (!row?.team_id || !row?.invite_token) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  return NextResponse.json(
    {
      team_id: row.team_id,
      invite_token: row.invite_token,
    },
    { status: 201 },
  );
}
