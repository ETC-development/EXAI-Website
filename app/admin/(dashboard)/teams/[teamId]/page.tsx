"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Mail,
  School,
  Calendar,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ScoringRubricDialog } from "@/app/admin/components/ScoringRubricDialog";
import { useCallback, useEffect, useState } from "react";
import { formatYearOfStudy } from "@/lib/year-label";

type Member = {
  user_id: string;
  role: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  school: string | null;
  year_of_study: string | null;
  github: string | null;
  linkedin: string | null;
  tshirt_size: string | null;
};

type TeamPayload = {
  team: {
    id: string;
    name: string;
    status: string;
    is_submitted: boolean;
    invite_token: string;
    max_members: number;
  };
  members: Member[];
  answers: {
    motivation: string;
    experience: string;
    additional_info: string | null;
  } | null;
};

export default function TeamDetailsPage() {
  const params = useParams();
  const teamId = params.teamId as string;
  const [data, setData] = useState<TeamPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusBusy, setStatusBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/admin/team/${teamId}`, { credentials: "include" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(json?.error ?? "Failed to load team");
      setData(null);
    } else {
      setData(json);
    }
    setLoading(false);
  }, [teamId]);

  useEffect(() => {
    void load();
  }, [load]);

  const setTeamStatus = async (status: "pending" | "accepted" | "rejected") => {
    setStatusBusy(true);
    const res = await fetch("/api/admin/set-status", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ team_id: teamId, status }),
    });
    setStatusBusy(false);
    if (res.ok) void load();
  };

  if (loading) {
    return <div className="text-slate-400 font-bold py-20">Loading team…</div>;
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-300">
        {error || "Team not found"}
        <div className="mt-4">
          <Link href="/admin/teams" className="text-[#14b4ba] font-bold">
            ← Back to teams
          </Link>
        </div>
      </div>
    );
  }

  const { team, members, answers } = data;
  const max = team.max_members ?? 5;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link
            href="/admin/teams"
            className="inline-flex items-center gap-2 text-[#14b4ba] hover:text-[#0f8f94] mb-4 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teams
          </Link>
          <h1 className="text-4xl font-black text-[#14b4ba] mb-2">{team.name}</h1>
          <p className="text-slate-400 font-mono text-sm">
            Invite token: <span className="text-teal-400">{team.invite_token}</span>
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Review status: <span className="text-slate-300">{team.status}</span> · Submission:{" "}
            {team.is_submitted ? "locked" : "open"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            disabled={statusBusy}
            onClick={() => void setTeamStatus("accepted")}
            variant="adminSuccess"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Accept
          </Button>
          <Button
            type="button"
            disabled={statusBusy}
            onClick={() => void setTeamStatus("pending")}
            variant="adminWarning"
          >
            <Clock className="w-4 h-4 mr-2" />
            Pending
          </Button>
          <Button
            type="button"
            disabled={statusBusy}
            onClick={() => void setTeamStatus("rejected")}
            variant="adminDanger"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-6">
          Team Members ({members.length}/{max})
        </h2>
        <div className="grid gap-4">
          {members.map((member, index) => (
            <motion.div
              key={member.user_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-slate-800/50 border rounded-lg p-4 ${
                member.role === "leader"
                  ? "border-[#14b4ba]/50 shadow-[0_0_15px_rgba(20,180,186,0.2)]"
                  : "border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-100">{member.name ?? "—"}</h3>
                    {member.role === "leader" && (
                      <span className="px-2 py-1 bg-[#14b4ba]/20 text-[#14b4ba] text-xs font-bold rounded-full border border-[#14b4ba]/50">
                        LEADER
                      </span>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>{member.email ?? "—"}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4 shrink-0" />
                      <span>{member.school ?? "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{formatYearOfStudy(member.year_of_study)}</span>
                      {member.tshirt_size && (
                        <span className="text-slate-500">· T-shirt {member.tshirt_size}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#14b4ba] hover:text-[#0f8f94] flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#14b4ba] hover:text-[#0f8f94] flex items-center gap-1 ml-3"
                        >
                          <ExternalLink className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {answers && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
        >
          <h2 className="text-2xl font-black text-slate-100 mb-6">Team application</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#14b4ba] mb-3">Motivation</h3>
              <p className="text-slate-300 leading-relaxed bg-slate-800/50 rounded-lg p-4">
                {answers.motivation}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#14b4ba] mb-3">Experience</h3>
              <p className="text-slate-300 leading-relaxed bg-slate-800/50 rounded-lg p-4">
                {answers.experience}
              </p>
            </div>
            {answers.additional_info && (
              <div>
                <h3 className="text-lg font-bold text-[#14b4ba] mb-3">Additional</h3>
                <p className="text-slate-300 leading-relaxed bg-slate-800/50 rounded-lg p-4">
                  {answers.additional_info}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/admin/teams">
          <Button type="button" variant="adminMuted">
            Back
          </Button>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ScoringRubricDialog />
          <Link href={`/admin/evaluation/${teamId}`}>
            <Button type="button" variant="adminPrimary">
              Score team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
