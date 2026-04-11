"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Eye, Users as UsersIcon, Filter } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type TeamRow = {
  id: string;
  name: string;
  status: string;
  is_submitted: boolean;
  leader_name: string | null;
  member_count: number;
  max_members: number;
  score: number | null;
};

type FilterType = "all" | "pending" | "submitted" | "accepted" | "rejected";

export default function Teams() {
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError("");
      const res = await fetch("/api/admin/teams?limit=200", { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (cancelled) return;
      if (!res.ok) {
        setLoadError(json?.error ?? "Failed to load teams");
        setTeams([]);
      } else {
        setTeams(json.teams ?? []);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTeams = teams.filter((team) => {
    const leader = team.leader_name ?? "";
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.toLowerCase().includes(searchQuery.toLowerCase());
    const submitted = team.is_submitted ? "submitted" : "pending";
    const matchesFilter =
      filter === "all" ||
      (filter === "submitted" && submitted === "submitted") ||
      (filter === "pending" && submitted === "pending") ||
      team.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      accepted: "bg-green-500/20 text-green-400 border-green-500/50",
      rejected: "bg-red-500/20 text-red-400 border-red-500/50",
      pending: "bg-slate-500/20 text-slate-400 border-slate-500/50",
    };
    return styles[status] ?? styles.pending;
  };

  const getSubmissionBadge = (isSubmitted: boolean) => {
    return isSubmitted
      ? "bg-[#14b4ba]/20 text-[#14b4ba] border-[#14b4ba]/50"
      : "bg-slate-600/20 text-slate-400 border-slate-600/50";
  };

  if (loading) {
    return (
      <div className="text-slate-400 font-bold py-20 text-center">Loading teams…</div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-300 font-bold">
        {loadError}
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
        <div className="flex flex-wrap gap-2">
          {(["all", "pending", "submitted", "accepted", "rejected"] as FilterType[]).map((f) => (
            <Button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              variant={filter === f ? "adminPrimary" : "adminMuted"}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

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
                  Review
                </th>
                <th className="text-left px-6 py-4 text-sm font-black text-[#14b4ba] uppercase tracking-wider">
                  Score
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
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-100">{team.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{team.leader_name ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold ${
                        team.member_count >= team.max_members ? "text-[#14b4ba]" : "text-slate-400"
                      }`}
                    >
                      {team.member_count}/{team.max_members}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getSubmissionBadge(team.is_submitted)}`}
                    >
                      {team.is_submitted ? "Submitted" : "Open"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(team.status)}`}
                    >
                      {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {team.score != null ? `${team.score}` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/teams/${team.id}`}>
                      <Button type="button" size="sm" variant="adminIcon" aria-label={`View ${team.name}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No teams found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
