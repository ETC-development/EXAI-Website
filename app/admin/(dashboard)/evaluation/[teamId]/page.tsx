"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Award } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ScoringRubricDialog } from "@/app/admin/components/ScoringRubricDialog";
import { Slider } from "@/app/components/ui/slider";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";

export default function EvaluationPage() {
  const params = useParams();
  const teamId = params.teamId as string;
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [score, setScore] = useState(70);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/admin/team/${teamId}`, { credentials: "include" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(json?.error ?? "Failed to load team");
    } else {
      setTeamName(json.team?.name ?? "");
      if (json.score?.score != null) setScore(Number(json.score.score));
      if (typeof json.score?.note === "string") setNote(json.score.note);
    }
    setLoading(false);
  }, [teamId]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/score-team", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        team_id: teamId,
        score,
        note: note.trim() || null,
      }),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(json?.error ?? "Save failed");
      return;
    }
    router.push("/admin/teams");
    router.refresh();
  };

  if (loading) {
    return <div className="text-slate-400 font-bold py-20">Loading…</div>;
  }

  if (error && !teamName) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-300">{error}</div>
        <Link href="/admin/teams" className="text-[#14b4ba] font-bold">
          ← Teams
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href={`/admin/teams/${teamId}`}
            className="inline-flex items-center gap-2 text-[#14b4ba] hover:text-[#0f8f94] mb-4 font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to team
          </Link>
          <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Score: {teamName}</h1>
          <p className="text-slate-400 max-w-xl">
            Enter one overall score (0–100) aligned with the EXAI rubric. It is saved to{" "}
            <span className="font-mono text-slate-300">team_scores</span> (latest save wins).
          </p>
        </div>
        <ScoringRubricDialog />
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-red-300 text-sm font-bold">
          {error}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/60 border-2 border-slate-700 rounded-xl p-8 space-y-8"
      >
        <div className="flex items-center gap-3">
          <Award className="w-10 h-10 text-[#14b4ba]" />
          <div>
            <p className="text-sm text-slate-400">Overall score</p>
            <p className="text-4xl font-black text-slate-100">{score}</p>
          </div>
        </div>
        <div className="space-y-4">
          <Slider
            value={[score]}
            onValueChange={(v) => setScore(v[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">
            Note (optional) — free text; rubric criteria A–E are not stored as separate fields
          </Label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="bg-slate-800 border-slate-700 text-slate-100 min-h-[120px]"
            placeholder="Evaluation notes…"
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            disabled={saving}
            onClick={() => void handleSubmit()}
            variant="adminPrimary"
          >
            {saving ? "Saving…" : "Save score"}
          </Button>
          <Link href="/admin/teams">
            <Button type="button" variant="adminMuted">
              Cancel
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
