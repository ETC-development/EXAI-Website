"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Users, AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

const yearToApi: Record<string, string> = {
  L1: "1",
  L2: "2",
  L3: "3",
  M1: "master",
  M2: "master",
};

type Props = { initialInviteCode?: string };

export default function JoinTeamClient({ initialInviteCode = "" }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    invite_token: initialInviteCode,
    fullName: "",
    email: "",
    school: "",
    year: "",
  });
  const [teamData, setTeamData] = useState<{ teamName: string; members: { length: number } } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const schools = [
    "ENSIA",
    "ESI",
    "USTHB",
    "University of Algiers 1",
    "University of Constantine",
    "Other"
  ];

  const years = ["L1", "L2", "L3", "M1", "M2"];

  useEffect(() => {
    async function loadTeam() {
      if (!formData.invite_token) return;
      const res = await fetch(`/api/team-by-token?token=${encodeURIComponent(formData.invite_token)}`);
      if (!res.ok) { setError("Invalid invite link."); setTeamData(null); return; }
      const json = await res.json();
      setTeamData({ teamName: json.team_name, members: { length: json.member_count } });
      setError("");
    }
    void loadTeam();
  }, [formData.invite_token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/join-team", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        invite_token: formData.invite_token,
        name: formData.fullName,
        email: formData.email,
        school: formData.school,
        year_of_study: yearToApi[formData.year] ?? "3",
        github: "",
        linkedin: "",
        tshirt_size: "M",
      }),
    });
    const json = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(json?.error ?? "Failed to join team"); return; }
    router.push(`/register/success?type=team-member&inviteCode=${encodeURIComponent(formData.invite_token)}`);
  };

  if (error && !teamData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md w-full"
        >
          <div className="bg-slate-900/80 backdrop-blur-sm border border-red-500/50 rounded-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-100 mb-2">Invalid Invite Link</h2>
            <p className="text-slate-400 mb-6">{error}</p>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                Back to Registration
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-4xl font-black bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              EXAI
            </h1>
          </Link>
          <h2 className="text-3xl font-black text-slate-100 mb-2">Join Team</h2>
          <p className="text-slate-400">Complete your registration to join the team</p>
        </div>

        {teamData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 mb-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-100">{teamData.teamName}</h3>
                <p className="text-purple-400">
                  {teamData.members.length} / 5 members
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inviteCode" className="text-slate-200">Invite Code *</Label>
            <Input
              id="inviteCode"
              required
              value={formData.invite_token}
              onChange={(e) => setFormData({ ...formData, invite_token: e.target.value })}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-purple-500"
              placeholder="Enter invite code"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-200">Full Name *</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-purple-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-purple-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="school" className="text-slate-200">School *</Label>
              <Select required value={formData.school} onValueChange={(value) => setFormData({ ...formData, school: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Select school" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-slate-200">Year of Study *</Label>
              <Select required value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && teamData && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
              disabled={loading || (teamData !== null && teamData.members.length >= 5)}
            >
              {loading ? "Joining..." : "Join Team"}
            </Button>
            <Link href="/register" className="flex-1">
              <Button type="button" variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 py-6">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
