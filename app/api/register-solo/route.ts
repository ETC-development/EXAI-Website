import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabasePublicServerClient } from "@/lib/supabase/server";
import { enforceRateLimit } from "@/lib/rate-limit";

const yearOfStudyEnum = z.enum(["1", "2", "3", "4", "5", "master", "phd", "other"]);
const tshirtSizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL"]);

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Phone number is too short")
  .max(32)
  .regex(/^[+0-9][0-9\s\-().]{6,31}$/, "Enter a valid phone number");

const soloSchema = z.object({
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
  const limited = await enforceRateLimit(request, "register-solo");
  if (limited) return limited;

  const payload = await request.json().catch(() => null);
  const parsed = soloSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const supabase = createSupabasePublicServerClient();

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", input.email)
    .maybeSingle();

  if (existingUser?.id) {
    const { data: existingMembership, error: membershipError } = await supabase
      .from("team_members")
      .select("team_id")
      .eq("user_id", existingUser.id)
      .limit(1);

    if (membershipError) {
      return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
    }
    if ((existingMembership?.length ?? 0) > 0) {
      return NextResponse.json({ error: "USER_ALREADY_IN_TEAM" }, { status: 409 });
    }
  }

  const { error } = await supabase.from("users").upsert(
    {
      name: input.name,
      email: input.email,
      school: input.school,
      year_of_study: input.year_of_study,
      phone: input.phone,
      github: input.github || null,
      linkedin: input.linkedin || null,
      tshirt_size: input.tshirt_size,
    },
    { onConflict: "email" },
  );

  if (error) {
    const msg = error.message || "";
    if (msg.includes("phone") && msg.includes("does not exist")) {
      return NextResponse.json(
        { error: "DATABASE_SCHEMA_OUT_OF_DATE", hint: "Apply Supabase migrations through 0006 (phone + RPC)." },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { error: "INTERNAL_ERROR", ...(process.env.NODE_ENV !== "production" ? { details: msg } : {}) },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

