"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ExaiFullLogo } from "@/app/components/ExaiLogo";

const yearToApi: Record<string, string> = {
  L1: "1",
  L2: "2",
  L3: "3",
  M1: "master",
  M2: "master",
};

export default function CreateTeam() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
    year: "",
    teamName: "",
  });
  const [teamCreated, setTeamCreated] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const schools = [
    "ENSIA",
    "ESI",
    "USTHB",
    "University of Algiers 1",
    "University of Constantine",
    "Other"
  ];

  const years = ["L1", "L2", "L3", "M1", "M2"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/create-team", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        school: formData.school,
        year_of_study: yearToApi[formData.year] ?? "3",
        github: "",
        linkedin: "",
        tshirt_size: "M",
        team_name: formData.teamName,
        motivation: "Motivated to solve real AI challenges.",
        experience: "Team has experience building projects.",
        additional_info: "",
      }),
    });
    const json = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) { setError(json?.error ?? "Failed to create team."); return; }
    const link = `${window.location.origin}/register/join-team/${json.invite_token}`;
    setInviteLink(link);
    setTeamCreated(true);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckStatus = () => {
    const inviteCode = inviteLink.split("/").pop();
    router.push(`/register/success?type=team-leader&inviteCode=${encodeURIComponent(inviteCode ?? "")}`);
  };

  if (teamCreated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-2xl w-full"
        >
          <div className="bg-slate-900/80 backdrop-blur-sm border border-teal-500/50 rounded-xl p-8 shadow-[0_0_40px_rgba(20,184,166,0.2)]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(20,184,166,0.5)]">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-100 mb-2">Team Created Successfully!</h2>
              <p className="text-slate-400">Your team &quot;{formData.teamName}&quot; is ready to go</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-black text-slate-100 mb-4">Team Dashboard</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Team Name:</span>
                  <span className="text-slate-100 font-bold">{formData.teamName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Members:</span>
                  <span className="text-teal-400 font-bold">1 / 5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Leader:</span>
                  <span className="text-slate-100">{formData.fullName}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-black text-teal-400 mb-2">Invite Team Members</h3>
              <p className="text-slate-400 text-sm mb-4">Share this link with your teammates (max 5 members)</p>
              <div className="flex gap-2">
                <Input 
                  value={inviteLink} 
                  readOnly 
                  className="bg-slate-800 border-slate-700 text-slate-100 font-mono text-sm"
                />
                <Button 
                  onClick={copyInviteLink}
                  className="bg-teal-500 hover:bg-teal-600 text-white shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleCheckStatus}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
              >
                Check My Status
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <ExaiFullLogo size="medium" />
          </Link>
          <h2 className="text-3xl font-black text-slate-100 mb-2">Create Your Team</h2>
          <p className="text-slate-400">Fill in your details to create a new team</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-200">Full Name *</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-teal-500"
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
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-teal-500"
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

          <div className="space-y-2">
            <Label htmlFor="teamName" className="text-slate-200">Team Name *</Label>
            <Input
              id="teamName"
              required
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-teal-500"
              placeholder="Choose a team name"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-6"
            >
              {loading ? "Creating..." : "Create Team"}
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
