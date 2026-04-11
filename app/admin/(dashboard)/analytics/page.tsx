"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, TrendingUp } from "lucide-react";
import { formatYearOfStudy } from "@/lib/year-label";

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

const YEAR_COLORS = ["#14b4ba", "#079db5", "#0f8f94", "#14b4ba", "#079db5", "#0f8f94"];

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

  const decided = stats.accepted_teams + stats.rejected_teams;
  const acceptanceRate = decided > 0 ? Math.round((stats.accepted_teams / decided) * 100) : 0;

  const yearData = analytics.year_distribution.map((y, i) => ({
    year: formatYearOfStudy(y.year),
    count: y.count,
    color: YEAR_COLORS[i % YEAR_COLORS.length],
  }));

  const dailyFromSeries = stats.registration_series.map((r) => ({
    date: r.date.slice(5),
    registrations: r.participants,
  }));

  const pieData = analytics.team_size_buckets.filter((b) => b.value > 0);
  const schoolTop = [...analytics.school_distribution].slice(0, 12);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Analytics</h1>
        <p className="text-slate-400">Aggregates from Supabase</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#14b4ba]" />
            <TrendingUp className="w-5 h-5 text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm mb-1">Avg team size</p>
          <p className="text-4xl font-black text-slate-100">{analytics.avg_team_size}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <p className="text-slate-400 text-sm mb-1">Acceptance (of decided)</p>
          <p className="text-4xl font-black text-slate-100">{acceptanceRate}%</p>
          <p className="text-sm text-slate-500 mt-2">
            {stats.accepted_teams} accepted / {decided} decided
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <p className="text-slate-400 text-sm mb-1">Schools represented</p>
          <p className="text-4xl font-black text-slate-100">{analytics.school_distribution.length}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <h2 className="text-2xl font-black text-slate-100 mb-6">Team size</h2>
          {pieData.length === 0 ? (
            <p className="text-slate-500">No teams yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ""}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #14b4ba",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <h2 className="text-2xl font-black text-slate-100 mb-6">Participants by year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis dataKey="year" stroke="#94a3b8" style={{ fontSize: "12px" }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #14b4ba",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {yearData.map((entry, index) => (
                  <Cell key={`y-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-6">Registrations by school (users)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={schoolTop}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis dataKey="school" stroke="#94a3b8" style={{ fontSize: "11px" }} angle={-20} textAnchor="end" height={70} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #14b4ba",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" fill="#14b4ba" radius={[8, 8, 0, 0]} name="Users" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-6">Cumulative participants</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyFromSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #14b4ba",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="registrations" fill="#079db5" radius={[8, 8, 0, 0]} name="Participants (cumul.)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
