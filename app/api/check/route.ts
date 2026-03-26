import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enforceRateLimit } from "@/lib/rate-limit";

const querySchema = z.object({
  email: z.string().email(),
});

export async function GET(request: Request) {
  const limited = await enforceRateLimit(request, "check");
  if (limited) return limited;

  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    email: url.searchParams.get("email"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const supabase = createSupabaseServerClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (userError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ exists: false, in_team: false }, { status: 200 });
  }

  const { data: membership, error: membershipError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (membershipError) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  return NextResponse.json(
    {
      exists: true,
      in_team: !!membership?.team_id,
      team_id: membership?.team_id ?? null,
    },
    { status: 200 },
  );
}

