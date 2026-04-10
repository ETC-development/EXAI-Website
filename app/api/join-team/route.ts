import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { firstRpcRow } from "@/lib/supabase/rpc-result";
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
    const code = (error as { code?: string }).code;

    if (msg.includes("USER_ALREADY_IN_TEAM")) {
      return NextResponse.json({ error: "USER_ALREADY_IN_TEAM" }, { status: 409 });
    }
    if (msg.includes("TEAM_FULL") || msg.includes("TEAM_NOT_JOINABLE")) {
      return NextResponse.json({ error: "TEAM_NOT_JOINABLE" }, { status: 409 });
    }
    if (code === "23505" || msg.includes("duplicate key") || msg.includes("unique constraint")) {
      return NextResponse.json({ error: "USER_ALREADY_IN_TEAM" }, { status: 409 });
    }
    if (msg.includes("USER_UPSERT_FAILED")) {
      return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
    }
    if (msg.includes("phone") && msg.includes("does not exist")) {
      console.error("[join-team] DB schema missing users.phone — apply migration 0006_users_phone.sql");
      return NextResponse.json(
        { error: "DATABASE_SCHEMA_OUT_OF_DATE", hint: "Apply Supabase migrations through 0006 (phone + RPC)." },
        { status: 503 },
      );
    }
    if (msg.includes("function public.join_team_with_member") || msg.includes("join_team_with_member")) {
      console.error("[join-team] RPC signature mismatch — apply migrations through 0007:", msg);
      return NextResponse.json(
        { error: "DATABASE_SCHEMA_OUT_OF_DATE", hint: "Apply Supabase migrations (join_team_with_member + phone)." },
        { status: 503 },
      );
    }

    console.error("[join-team] RPC error:", code, msg);
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        ...(process.env.NODE_ENV !== "production" ? { details: msg } : {}),
      },
      { status: 500 },
    );
  }

  const row = firstRpcRow<{ team_id?: string }>(data);
  if (!row?.team_id) {
    console.error("[join-team] Unexpected RPC payload:", data);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ team_id: row.team_id }, { status: 200 });
}

