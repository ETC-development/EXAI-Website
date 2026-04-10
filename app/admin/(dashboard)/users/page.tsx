"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, UserCog, Mail, School, Calendar, Users as UsersIcon } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "Ahmed Mansouri",
    email: "ahmed.mansouri@ensia.dz",
    school: "ENSIA",
    year: "3rd Year",
    teamStatus: "in-team",
    teamName: "AI Wizards",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@esi.dz",
    school: "ESI",
    year: "4th Year",
    teamStatus: "in-team",
    teamName: "Neural Nexus",
  },
  {
    id: "3",
    name: "Karim Belkacem",
    email: "karim.belkacem@usthb.dz",
    school: "USTHB",
    year: "2nd Year",
    teamStatus: "solo",
    teamName: null,
  },
  {
    id: "4",
    name: "Yasmine Kadri",
    email: "yasmine.kadri@ensia.dz",
    school: "ENSIA",
    year: "2nd Year",
    teamStatus: "in-team",
    teamName: "AI Wizards",
  },
  {
    id: "5",
    name: "Mohamed Amine",
    email: "mohamed.amine@polytechnique.dz",
    school: "Polytechnique",
    year: "3rd Year",
    teamStatus: "unassigned",
    teamName: null,
  },
  {
    id: "6",
    name: "Amira Benali",
    email: "amira.benali@esi.dz",
    school: "ESI",
    year: "3rd Year",
    teamStatus: "in-team",
    teamName: "Data Dynamos",
  },
  {
    id: "7",
    name: "Rachid Messaoudi",
    email: "rachid.messaoudi@ensia.dz",
    school: "ENSIA",
    year: "4th Year",
    teamStatus: "solo",
    teamName: null,
  },
  {
    id: "8",
    name: "Leila Kaci",
    email: "leila.kaci@usthb.dz",
    school: "USTHB",
    year: "2nd Year",
    teamStatus: "unassigned",
    teamName: null,
  },
];

type FilterType = "all" | "in-team" | "solo" | "unassigned";

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.school.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || user.teamStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      "in-team": "bg-[#14b4ba]/20 text-[#14b4ba] border-[#14b4ba]/50",
      solo: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      unassigned: "bg-slate-500/20 text-slate-400 border-slate-500/50",
    };
    return styles[status as keyof typeof styles] || styles.unassigned;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      "in-team": "In Team",
      solo: "Solo",
      unassigned: "Unassigned",
    };
    return labels[status as keyof typeof labels] || "Unknown";
  };

  const stats = {
    total: mockUsers.length,
    inTeam: mockUsers.filter((u) => u.teamStatus === "in-team").length,
    solo: mockUsers.filter((u) => u.teamStatus === "solo").length,
    unassigned: mockUsers.filter((u) => u.teamStatus === "unassigned").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Participants Management</h1>
          <p className="text-slate-400">Manage all registered participants</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <UserCog className="w-5 h-5" />
          <span className="font-bold">{filteredUsers.length} participants</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">Total</p>
          <p className="text-3xl font-black text-slate-100">{stats.total}</p>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-[#14b4ba]/30 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">In Team</p>
          <p className="text-3xl font-black text-[#14b4ba]">{stats.inTeam}</p>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-yellow-500/30 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">Solo</p>
          <p className="text-3xl font-black text-yellow-400">{stats.solo}</p>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-600/30 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">Unassigned</p>
          <p className="text-3xl font-black text-slate-400">{stats.unassigned}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by name, email, or school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba]"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "in-team", "solo", "unassigned"] as FilterType[]).map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "outline"}
              className={
                filter === f
                  ? "bg-gradient-to-r from-[#14b4ba] to-[#079db5] text-white border-0"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }
            >
              {f === "all" ? "All" : f === "in-team" ? "In Team" : f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  School
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Year
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Team
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-100">{user.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <School className="w-4 h-4 text-slate-500" />
                      {user.school}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      {user.year}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                        user.teamStatus
                      )}`}
                    >
                      {getStatusLabel(user.teamStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.teamName ? (
                      <div className="flex items-center gap-2 text-[#14b4ba]">
                        <UsersIcon className="w-4 h-4" />
                        <span className="font-bold">{user.teamName}</span>
                      </div>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UserCog className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No participants found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
