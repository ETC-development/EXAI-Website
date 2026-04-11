"use client";

import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function AdminRegistrationChart({
  chartData,
}: {
  chartData: { date: string; teams: number; participants: number }[];
}) {
  return (
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
  );
}
