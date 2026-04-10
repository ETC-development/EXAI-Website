/** PostgREST may return a single object or an array for RPC that returns TABLE. */
export function firstRpcRow<T extends Record<string, unknown>>(data: unknown): T | undefined {
  if (data == null) return undefined;
  if (Array.isArray(data)) return data[0] as T | undefined;
  if (typeof data === "object") return data as T;
  return undefined;
}
