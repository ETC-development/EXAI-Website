"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AdminAnalyticsCharts = dynamic(
  () =>
    import("@/app/admin/(dashboard)/AdminAnalyticsCharts").then((m) => ({
      default: m.AdminAnalyticsCharts,
    })),
  {
    loading: () => (
      <div className="space-y-6">
        <div className="h-40 rounded-xl border border-slate-700 bg-slate-900/40 animate-pulse" />
        <div className="h-[320px] rounded-xl border border-slate-700 bg-slate-900/40 animate-pulse" />
      </div>
    ),
    ssr: false,
  },
);

type AnalyticsPayload = {
  school_distribution: { school: string; count: number }[];
  year_distribution: { year: string; count: number }[];
  team_size_buckets: { name: string; value: number; color: string }[];
  avg_team_size: number;
};

type StatsPayload = {
  total_teams: number;
  accepted_teams: number;
  rejected_teams: number;
  registration_series: { date: string; teams: number; participants: number }[];
};

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsPayload | null>(null);
  const [stats, setStats] = useState<StatsPayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let c = false;
    (async () => {
      const [aRes, sRes] = await Promise.all([
        fetch("/api/admin/analytics", { credentials: "include" }),
        fetch("/api/admin/stats", { credentials: "include" }),
      ]);
      const aJson = await aRes.json().catch(() => ({}));
      const sJson = await sRes.json().catch(() => ({}));
      if (c) return;
      if (!aRes.ok || !sRes.ok) {
        setError(aJson?.error ?? sJson?.error ?? "Failed to load analytics");
        return;
      }
      setAnalytics(aJson);
      setStats(sJson);
    })();
    return () => {
      c = true;
    };
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-300 font-bold">
        {error}
      </div>
    );
  }

  if (!analytics || !stats) {
    return <div className="text-slate-400 font-bold py-20">Loading analytics…</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Analytics</h1>
        <p className="text-slate-400">Aggregates from Supabase</p>
      </div>

      <AdminAnalyticsCharts analytics={analytics} stats={stats} />
    </div>
  );
}
