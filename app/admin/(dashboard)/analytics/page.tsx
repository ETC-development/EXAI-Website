"use client";

import { motion } from "motion/react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Users, Calendar } from "lucide-react";

// Mock data
const teamDistributionData = [
  { name: "Complete (5/5)", value: 28, color: "#14b4ba" },
  { name: "Incomplete (3-4)", value: 10, color: "#079db5" },
  { name: "Starting (1-2)", value: 4, color: "#0f8f94" },
];

const schoolDistributionData = [
  { school: "ENSIA", teams: 15, participants: 38 },
  { school: "ESI", teams: 12, participants: 30 },
  { school: "USTHB", teams: 8, participants: 20 },
  { school: "Polytechnique", teams: 4, participants: 12 },
  { school: "Others", teams: 3, participants: 8 },
];

const registrationTrendData = [
  { date: "Apr 28", registrations: 3 },
  { date: "Apr 29", registrations: 5 },
  { date: "Apr 30", registrations: 8 },
  { date: "May 1", registrations: 12 },
  { date: "May 2", registrations: 16 },
  { date: "May 3", registrations: 18 },
  { date: "May 4", registrations: 20 },
  { date: "May 5", registrations: 15 },
  { date: "May 6", registrations: 11 },
];

const yearDistributionData = [
  { year: "1st Year", count: 8, color: "#14b4ba" },
  { year: "2nd Year", count: 25, color: "#079db5" },
  { year: "3rd Year", count: 42, color: "#0f8f94" },
  { year: "4th Year", count: 28, color: "#14b4ba" },
  { year: "5th Year", count: 5, color: "#079db5" },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Analytics Dashboard</h1>
        <p className="text-slate-400">Comprehensive insights into registration data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#14b4ba]" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-slate-400 text-sm mb-1">Average Team Size</p>
          <p className="text-4xl font-black text-slate-100">4.2</p>
          <p className="text-sm text-green-400 mt-2">+8% from last year</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-[#079db5]" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-slate-400 text-sm mb-1">Days Until Event</p>
          <p className="text-4xl font-black text-slate-100">8</p>
          <p className="text-sm text-slate-400 mt-2">May 15, 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#0f8f94]" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-slate-400 text-sm mb-1">Acceptance Rate</p>
          <p className="text-4xl font-black text-slate-100">67%</p>
          <p className="text-sm text-green-400 mt-2">28 of 42 teams</p>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <h2 className="text-2xl font-black text-slate-100 mb-6">Team Completion Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={teamDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ""}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {teamDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #14b4ba',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Year Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <h2 className="text-2xl font-black text-slate-100 mb-6">Participants by Year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis dataKey="year" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #14b4ba',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#14b4ba', fontWeight: 'bold' }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {yearDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* School Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-6">Participation by School</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={schoolDistributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis dataKey="school" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #14b4ba',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#14b4ba', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="teams" fill="#14b4ba" radius={[8, 8, 0, 0]} name="Teams" />
            <Bar dataKey="participants" fill="#079db5" radius={[8, 8, 0, 0]} name="Participants" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Registration Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-6">Daily Registration Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={registrationTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #14b4ba',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#14b4ba', fontWeight: 'bold' }}
            />
            <Bar dataKey="registrations" fill="#14b4ba" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#14b4ba]/20 to-[#079db5]/20 border-2 border-[#14b4ba]/50 rounded-xl p-6 text-center">
          <p className="text-[#14b4ba] text-sm font-bold mb-2">COMPLETE TEAMS</p>
          <p className="text-4xl font-black text-slate-100">28</p>
        </div>
        <div className="bg-gradient-to-br from-[#079db5]/20 to-[#0f8f94]/20 border-2 border-[#079db5]/50 rounded-xl p-6 text-center">
          <p className="text-[#079db5] text-sm font-bold mb-2">INCOMPLETE TEAMS</p>
          <p className="text-4xl font-black text-slate-100">14</p>
        </div>
        <div className="bg-gradient-to-br from-[#0f8f94]/20 to-[#14b4ba]/20 border-2 border-[#0f8f94]/50 rounded-xl p-6 text-center">
          <p className="text-[#0f8f94] text-sm font-bold mb-2">SOLO PARTICIPANTS</p>
          <p className="text-4xl font-black text-slate-100">12</p>
        </div>
        <div className="bg-gradient-to-br from-[#14b4ba]/20 to-[#0f8f94]/20 border-2 border-[#14b4ba]/50 rounded-xl p-6 text-center">
          <p className="text-[#14b4ba] text-sm font-bold mb-2">TOTAL SCHOOLS</p>
          <p className="text-4xl font-black text-slate-100">8</p>
        </div>
      </div>
    </div>
  );
}
