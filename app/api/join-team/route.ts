import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enforceRateLimit } from "@/lib/rate-limit";

const yearOfStudyEnum = z.enum(["1", "2", "3", "4", "5", "master", "phd", "other"]);
const tshirtSizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL"]);

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Phone number is too short")
  .max(32)
  .regex(/^[+0-9][0-9\s\-().]{6,31}$/, "Enter a valid phone number");

const joinTeamSchema = z.object({
  invite_token: z.string().trim().min(1),
  name: z.string().trim().min(2).max(120),
  email: z.string().email().transform((v) => v.toLowerCase()),
  school: z.string().trim().min(2).max(200),
  year_of_study: yearOfStudyEnum,
  phone: phoneSchema,
  github: z.string().trim().url().optional().or(z.literal("")),
  linkedin: z.string().trim().url().optional().or(z.literal("")),
  tshirt_size: tshirtSizeEnum,
});

export async function POST(request: Request) {
  const limited = await enforceRateLimit(request, "join-team");
  if (limited) return limited;

  const payload = await request.json().catch(() => null);
  const parsed = joinTeamSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const input = parsed.data;

  const { data, error } = await supabase.rpc("join_team_with_member", {
    p_invite_token: input.invite_token,
    p_name: input.name,
    p_email: input.email,
    p_school: input.school,
    p_year_of_study: input.year_of_study,
    p_phone: input.phone,
    p_github: input.github || null,
    p_linkedin: input.linkedin || null,
    p_tshirt_size: input.tshirt_size,
  });

  if (error) {
    const msg = error.message || "";
    if (msg.includes("USER_ALREADY_IN_TEAM")) {
      return NextResponse.json({ error: "USER_ALREADY_IN_TEAM" }, { status: 409 });
    }
    if (msg.includes("TEAM_FULL") || msg.includes("TEAM_NOT_JOINABLE")) {
      return NextResponse.json({ error: "TEAM_NOT_JOINABLE" }, { status: 409 });
    }

    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  const row = data?.[0];
  if (!row?.team_id) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ team_id: row.team_id }, { status: 200 });
}

