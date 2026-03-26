import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getClientKey(request: Request): string {
  const header =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "";

  // x-forwarded-for can contain a list: "client, proxy1, proxy2"
  const key = header.split(",")[0]?.trim();
  return key && key.length ? key : "unknown";
}

export async function enforceRateLimit(
  request: Request,
  routeKey: string,
  opts?: { maxRequests?: number; windowSeconds?: number },
): Promise<NextResponse | null> {
  const maxRequests = opts?.maxRequests ?? 30; // per window
  const windowSeconds = opts?.windowSeconds ?? 600; // 10 minutes

  const clientKey = getClientKey(request);
  const supabase = createSupabaseServerClient();

  try {
    const { data, error } = await supabase.rpc("consume_rate_limit", {
      p_client_key: clientKey,
      p_route_key: routeKey,
      p_max_requests: maxRequests,
      p_window_seconds: windowSeconds,
    });

    if (error || !data || data.length === 0) {
      return null;
    }

    const row = data[0] as { allowed: boolean; reset_at: string | Date | null };
    if (!row.allowed) {
      const resetAt =
        typeof row.reset_at === "string" ? new Date(row.reset_at) : row.reset_at;
      const retryAfterSeconds = resetAt ? Math.max(0, Math.ceil((resetAt.getTime() - Date.now()) / 1000)) : 60;

      return new NextResponse(
        JSON.stringify({ error: "RATE_LIMITED" }),
        {
          status: 429,
          headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined,
        },
      );
    }

    return null;
  } catch {
    return null;
  }
}

