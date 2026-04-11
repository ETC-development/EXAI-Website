"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search, UserCog, Mail, School, Calendar, Users as UsersIcon } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { formatYearOfStudy } from "@/lib/year-label";

type UserRow = {
  id: string;
  name: string;
  email: string;
  school: string;
  year_of_study: string;
  team_name: string | null;
  team_status: string;
};

type FilterType = "all" | "in-team" | "unassigned";

export default function Users() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    let c = false;
    (async () => {
      setLoading(true);
      const res = await fetch("/api/admin/users?limit=500", { credentials: "include" });
      const json = await res.json().catch(() => ({}));
      if (c) return;
      if (!res.ok) setLoadError(json?.error ?? "Failed to load");
      else setUsers(json.users ?? []);
      setLoading(false);
    })();
    return () => {
      c = true;
    };
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.school.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || user.team_status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: users.length,
    inTeam: users.filter((u) => u.team_status === "in-team").length,
    unassigned: users.filter((u) => u.team_status === "unassigned").length,
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "in-team": "bg-[#14b4ba]/20 text-[#14b4ba] border-[#14b4ba]/50",
      unassigned: "bg-slate-500/20 text-slate-400 border-slate-500/50",
    };
    return styles[status] ?? styles.unassigned;
  };

  if (loading) {
    return <div className="text-slate-400 font-bold py-20">Loading participants…</div>;
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
          <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Participants</h1>
          <p className="text-slate-400">Registered users (from Supabase)</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <UserCog className="w-5 h-5" />
          <span className="font-bold">{filteredUsers.length} shown</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">Total</p>
          <p className="text-3xl font-black text-slate-100">{stats.total}</p>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-[#14b4ba]/30 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">In team</p>
          <p className="text-3xl font-black text-[#14b4ba]">{stats.inTeam}</p>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-600/30 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">No team</p>
          <p className="text-3xl font-black text-slate-400">{stats.unassigned}</p>
        </div>
      </div>

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
          {(["all", "in-team", "unassigned"] as FilterType[]).map((f) => (
            <Button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "outline"}
              className={
                filter === f
                  ? "bg-gradient-to-r from-[#14b4ba] to-[#079db5] text-white border-0"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }
            >
              {f === "all" ? "All" : f === "in-team" ? "In team" : "No team"}
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
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-100">{user.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <School className="w-4 h-4 text-slate-500 shrink-0" />
                      {user.school}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                      {formatYearOfStudy(user.year_of_study)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                        user.team_status,
                      )}`}
                    >
                      {user.team_status === "in-team" ? "In team" : "No team"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.team_name ? (
                      <div className="flex items-center gap-2 text-[#14b4ba]">
                        <UsersIcon className="w-4 h-4 shrink-0" />
                        <span className="font-bold">{user.team_name}</span>
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

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UserCog className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No participants match</p>
        </div>
      )}
    </div>
  );
}
