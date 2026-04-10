"use client";

import { motion } from "motion/react";
import { Users, UserCheck, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

// Mock data
const registrationData = [
  { date: "May 1", teams: 5, participants: 12 },
  { date: "May 2", teams: 12, participants: 28 },
  { date: "May 3", teams: 18, participants: 45 },
  { date: "May 4", teams: 25, participants: 62 },
  { date: "May 5", teams: 32, participants: 78 },
  { date: "May 6", teams: 38, participants: 95 },
  { date: "May 7", teams: 42, participants: 108 },
];

const stats = [
  { 
    title: "Total Teams", 
    value: "42", 
    change: "+12%", 
    icon: Users, 
    gradient: "from-[#14b4ba] to-[#079db5]" 
  },
  { 
    title: "Total Participants", 
    value: "108", 
    change: "+18%", 
    icon: UserCheck, 
    gradient: "from-[#079db5] to-[#0f8f94]" 
  },
  { 
    title: "Submitted Teams", 
    value: "35", 
    change: "+8%", 
    icon: CheckCircle, 
    gradient: "from-[#0f8f94] to-[#14b4ba]" 
  },
  { 
    title: "Pending Teams", 
    value: "7", 
    change: "-5%", 
    icon: Clock, 
    gradient: "from-[#14b4ba] to-[#0f8f94]" 
  },
];

type FilterType = "all" | "pending" | "submitted" | "accepted" | "rejected";

const filterOptions = [
  { value: "all", label: "All Teams", count: 42 },
  { value: "pending", label: "Pending", count: 7 },
  { value: "submitted", label: "Submitted", count: 35 },
  { value: "accepted", label: "Accepted", count: 28 },
  { value: "rejected", label: "Rejected", count: 2 },
];

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Real-time insights into EXAI Datathon registrations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                   style={{ background: `linear-gradient(135deg, #14b4ba 0%, #079db5 100%)` }}></div>
              <div className="relative bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 hover:border-[#14b4ba]/50 rounded-xl p-6 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-lg shadow-[0_0_20px_rgba(20,180,186,0.3)]`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
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

      {/* Registration Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-100 mb-1">Registration Progress</h2>
            <p className="text-slate-400 text-sm">Teams and participants over time</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#14b4ba]" />
            <span className="text-sm text-slate-400">Last 7 days</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={registrationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #14b4ba',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(20, 180, 186, 0.2)'
              }}
              labelStyle={{ color: '#14b4ba', fontWeight: 'bold' }}
              itemStyle={{ color: '#cbd5e1' }}
            />
            <Line 
              type="monotone" 
              dataKey="teams" 
              stroke="#14b4ba" 
              strokeWidth={3}
              dot={{ fill: '#14b4ba', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#14b4ba', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="participants" 
              stroke="#079db5" 
              strokeWidth={3}
              dot={{ fill: '#079db5', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#079db5', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#14b4ba] rounded-full"></div>
            <span className="text-sm text-slate-400">Teams</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#079db5] rounded-full"></div>
            <span className="text-sm text-slate-400">Participants</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-4">Quick Filters</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {filterOptions.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value as FilterType)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                activeFilter === filter.value
                  ? "bg-gradient-to-r from-[#14b4ba]/20 to-[#079db5]/20 border-[#14b4ba] shadow-[0_0_20px_rgba(20,180,186,0.3)]"
                  : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="text-center">
                <p className={`text-3xl font-black mb-1 ${
                  activeFilter === filter.value ? "text-[#14b4ba]" : "text-slate-300"
                }`}>
                  {filter.count}
                </p>
                <p className="text-sm text-slate-400">{filter.label}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
