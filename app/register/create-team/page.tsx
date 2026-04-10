"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Copy, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ExaiFullLogo } from "@/app/components/ExaiLogo";

const yearToApi: Record<string, string> = {
  L1: "1",
  L2: "2",
  L3: "3",
  M1: "master",
  M2: "master",
};

const btnPrimary =
  "flex-1 bg-gradient-to-r from-[#14b4ba] to-[#079db5] hover:from-[#0f8f94] hover:to-[#14b4ba] text-white py-6 font-bold border-0 shadow-lg shadow-[#14b4ba]/25 hover:shadow-[#14b4ba]/45 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100";

const btnOutline =
  "w-full border-2 border-[#14b4ba] bg-transparent text-[#14b4ba] py-6 font-bold hover:bg-[#14b4ba] hover:text-white hover:shadow-lg hover:shadow-[#14b4ba]/25 hover:scale-[1.02] transition-all duration-300";

export default function CreateTeamPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    teamName: "",
    fullName: "",
    email: "",
    phone: "",
    school: "",
    year: "",
    tshirt: "",
    motivation: "",
    experience: "",
    github: "",
    linkedin: "",
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
    "Other",
  ];

  const years = ["L1", "L2", "L3", "M1", "M2"];
  const tshirtSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

  const goNext = () => {
    setError("");
    const name = formData.teamName.trim();
    if (name.length < 2) {
      setError("Please enter a team name (at least 2 characters).");
      return;
    }
    setStep(2);
  };

  const goBack = () => {
    setError("");
    setStep(1);
  };

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
        phone: formData.phone,
        github: formData.github.trim() || "",
        linkedin: formData.linkedin.trim() || "",
        tshirt_size: formData.tshirt,
        team_name: formData.teamName.trim(),
        motivation: formData.motivation,
        experience: formData.experience,
        additional_info: "",
      }),
    });
    const json = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(
        typeof json?.error === "string"
          ? json.error
          : "Failed to create team. Check all fields.",
      );
      return;
    }
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
    router.push(
      `/register/success?type=team-leader&inviteCode=${encodeURIComponent(inviteCode ?? "")}`,
    );
  };

  if (teamCreated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
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
              <p className="text-slate-400 text-sm mb-4">
                Share this unique link with your teammates (max 5 members total)
              </p>
              <div className="flex gap-2">
                <Input
                  value={inviteLink}
                  readOnly
                  className="bg-slate-800 border-slate-700 text-slate-100 font-mono text-sm"
                />
                <Button
                  type="button"
                  onClick={copyInviteLink}
                  className="bg-[#14b4ba] hover:bg-[#0f8f94] text-white shrink-0 shadow-md hover:scale-105 transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" onClick={handleCheckStatus} className={`flex-1 ${btnPrimary}`}>
                Check My Status
              </Button>
              <Link href="/" className="flex-1">
                <Button type="button" className={btnOutline}>
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
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
          <p className="text-slate-400">
            {step === 1
              ? "Step 1 of 2 — name your team"
              : "Step 2 of 2 — your details as team leader"}
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span
              className={`h-2 w-12 rounded-full ${step === 1 ? "bg-[#14b4ba]" : "bg-slate-700"}`}
            />
            <span
              className={`h-2 w-12 rounded-full ${step === 2 ? "bg-[#14b4ba]" : "bg-slate-700"}`}
            />
          </div>
        </div>

        {step === 1 ? (
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teamName" className="text-slate-200">
                Team Name *
              </Label>
              <Input
                id="teamName"
                required
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba]"
                placeholder="Choose a team name"
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <div className="flex gap-4 pt-2">
              <Button type="button" onClick={goNext} className={btnPrimary}>
                Next
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/register" className="flex-1">
                <Button type="button" className={btnOutline}>
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6"
          >
            <p className="text-sm text-slate-400 text-center border-b border-slate-700 pb-4">
              Team: <span className="text-[#14b4ba] font-bold">{formData.teamName}</span>
            </p>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-200">
                Full Name *
              </Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba]"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba]"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-200">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba]"
                  placeholder="+213 ..."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-200">School *</Label>
                <Select
                  required
                  value={formData.school}
                  onValueChange={(value) => setFormData({ ...formData, school: value })}
                >
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
                <Label className="text-slate-200">Year of Study *</Label>
                <Select
                  required
                  value={formData.year}
                  onValueChange={(value) => setFormData({ ...formData, year: value })}
                >
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
              <Label className="text-slate-200">T-shirt Size *</Label>
              <Select
                required
                value={formData.tshirt}
                onValueChange={(value) => setFormData({ ...formData, tshirt: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {tshirtSizes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation" className="text-slate-200">
                Motivation (team leader) *
              </Label>
              <Textarea
                id="motivation"
                required
                minLength={20}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba] min-h-[120px]"
                placeholder="Why is your team joining EXAI? (min. 20 characters)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-slate-200">
                Team experience & skills *
              </Label>
              <Textarea
                id="experience"
                required
                minLength={20}
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba] min-h-[120px]"
                placeholder="Briefly describe relevant experience (min. 20 characters)"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="github" className="text-slate-200">
                  GitHub (optional)
                </Label>
                <Input
                  id="github"
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba]"
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-slate-200">
                  LinkedIn (optional)
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-slate-100 focus:border-[#14b4ba]"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="button" onClick={goBack} className={`${btnOutline} sm:flex-1`}>
                <ChevronLeft className="mr-2 w-5 h-5" />
                Back
              </Button>
              <Button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? "Creating..." : "Create team & get invite link"}
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
