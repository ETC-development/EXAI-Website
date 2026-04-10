"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Eye, Lock, Unlock, Users as UsersIcon, Filter } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

// Mock data
const mockTeams = [
  {
    id: "1",
    name: "AI Wizards",
    leader: "Ahmed Mansouri",
    memberCount: 5,
    maxMembers: 5,
    status: "submitted",
    reviewStatus: "accepted",
    locked: false,
  },
  {
    id: "2",
    name: "Neural Nexus",
    leader: "Sarah Chen",
    memberCount: 4,
    maxMembers: 5,
    status: "submitted",
    reviewStatus: "under-review",
    locked: false,
  },
  {
    id: "3",
    name: "Data Dynamos",
    leader: "Karim Belkacem",
    memberCount: 3,
    maxMembers: 5,
    status: "pending",
    reviewStatus: "pending",
    locked: false,
  },
  {
    id: "4",
    name: "ML Masters",
    leader: "Yasmine Kadri",
    memberCount: 5,
    maxMembers: 5,
    status: "submitted",
    reviewStatus: "accepted",
    locked: true,
  },
  {
    id: "5",
    name: "Deep Learning Crew",
    leader: "Mohamed Amine",
    memberCount: 2,
    maxMembers: 5,
    status: "pending",
    reviewStatus: "pending",
    locked: false,
  },
  {
    id: "6",
    name: "Vision Quest",
    leader: "Amira Benali",
    memberCount: 5,
    maxMembers: 5,
    status: "submitted",
    reviewStatus: "rejected",
    locked: false,
  },
];

type FilterType = "all" | "pending" | "submitted" | "accepted" | "rejected";

export default function Teams() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTeams = mockTeams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.leader.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || team.reviewStatus === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      accepted: "bg-green-500/20 text-green-400 border-green-500/50",
      rejected: "bg-red-500/20 text-red-400 border-red-500/50",
      "under-review": "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      pending: "bg-slate-500/20 text-slate-400 border-slate-500/50",
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getSubmissionBadge = (status: string) => {
    return status === "submitted" 
      ? "bg-[#14b4ba]/20 text-[#14b4ba] border-[#14b4ba]/50" 
      : "bg-slate-600/20 text-slate-400 border-slate-600/50";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Teams Management</h1>
          <p className="text-slate-400">Manage and review all registered teams</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <UsersIcon className="w-5 h-5" />
          <span className="font-bold">{filteredTeams.length} teams</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Search teams or leaders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba]"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "submitted", "accepted", "rejected"] as FilterType[]).map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "outline"}
              className={filter === f 
                ? "bg-gradient-to-r from-[#14b4ba] to-[#079db5] text-white border-0" 
                : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Teams Table */}
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
                  Team Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Leader
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Members
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Submission
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, index) => (
                <motion.tr
                  key={team.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100">{team.name}</span>
                      {team.locked && <Lock className="w-4 h-4 text-yellow-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{team.leader}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${
                      team.memberCount === team.maxMembers ? 'text-[#14b4ba]' : 'text-slate-400'
                    }`}>
                      {team.memberCount}/{team.maxMembers}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSubmissionBadge(team.status)}`}>
                      {team.status === "submitted" ? "Submitted" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(team.reviewStatus)}`}>
                      {team.reviewStatus === "under-review" ? "Under Review" : team.reviewStatus.charAt(0).toUpperCase() + team.reviewStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/teams/${team.id}`}>
                        <Button 
                          size="sm" 
                          className="bg-[#14b4ba] hover:bg-[#0f8f94] text-white border-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        {team.locked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Empty State */}
      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No teams found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
