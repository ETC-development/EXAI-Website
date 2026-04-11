"use client";

import { motion } from "motion/react";
import { Users, UserCheck, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

type Stats = {
  total_teams: number;
  total_participants: number;
  submitted_teams: number;
  pending_teams: number;
  accepted_teams: number;
  rejected_teams: number;
  registration_series: { date: string; teams: number; participants: number }[];
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let c = false;
    (async () => {
      const res = await fetch("/api/admin/stats", { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (c) return;
      if (!res.ok) setError(json?.error ?? "Failed to load stats");
      else setStats(json);
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

  if (!stats) {
    return <div className="text-slate-400 font-bold py-20">Loading dashboard…</div>;
  }

  const openTeams = Math.max(0, stats.total_teams - stats.submitted_teams);
  const statCards = [
    {
      title: "Total Teams",
      value: String(stats.total_teams),
      icon: Users,
      gradient: "from-[#14b4ba] to-[#079db5]",
    },
    {
      title: "Participants",
      value: String(stats.total_participants),
      icon: UserCheck,
      gradient: "from-[#079db5] to-[#0f8f94]",
    },
    {
      title: "Submitted",
      value: String(stats.submitted_teams),
      icon: CheckCircle,
      gradient: "from-[#0f8f94] to-[#14b4ba]",
    },
    {
      title: "Open (not submitted)",
      value: String(openTeams),
      icon: Clock,
      gradient: "from-[#14b4ba] to-[#0f8f94]",
    },
  ];

  const chartData =
    stats.registration_series.length > 0
      ? stats.registration_series.map((r) => ({
          date: r.date.slice(5),
          teams: r.teams,
          participants: r.participants,
        }))
      : [{ date: "—", teams: 0, participants: 0 }];

  const filterOptions = [
    { value: "all", label: "All teams", count: stats.total_teams },
    { value: "pending", label: "Review pending", count: stats.pending_teams },
    { value: "submitted", label: "Submitted", count: stats.submitted_teams },
    { value: "accepted", label: "Accepted", count: stats.accepted_teams },
    { value: "rejected", label: "Rejected", count: stats.rejected_teams },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Live data from Supabase</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, #14b4ba 0%, #079db5 100%)` }}
              />
              <div className="relative bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 hover:border-[#14b4ba]/50 rounded-xl p-6 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-lg shadow-[0_0_20px_rgba(20,180,186,0.3)]`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-black text-slate-100">{stat.value}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-100 mb-1">Cumulative registrations</h2>
            <p className="text-slate-400 text-sm">Teams and participants over time</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#14b4ba]" />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #14b4ba",
                borderRadius: "8px",
                boxShadow: "0 0 20px rgba(20, 180, 186, 0.2)",
              }}
              labelStyle={{ color: "#14b4ba", fontWeight: "bold" }}
              itemStyle={{ color: "#cbd5e1" }}
            />
            <Line
              type="monotone"
              dataKey="teams"
              stroke="#14b4ba"
              strokeWidth={3}
              dot={{ fill: "#14b4ba", strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="participants"
              stroke="#079db5"
              strokeWidth={3}
              dot={{ fill: "#079db5", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#14b4ba] rounded-full" />
            <span className="text-sm text-slate-400">Teams</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#079db5] rounded-full" />
            <span className="text-sm text-slate-400">Participants</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-4">Team review snapshot</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {filterOptions.map((filter) => (
            <div
              key={filter.value}
              className="p-4 rounded-lg border-2 border-slate-700 bg-slate-800/50"
            >
              <div className="text-center">
                <p className="text-3xl font-black mb-1 text-[#14b4ba]">{filter.count}</p>
                <p className="text-sm text-slate-400">{filter.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
