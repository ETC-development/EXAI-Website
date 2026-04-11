"use client";

import { BookOpen } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

function RubricTable({
  rows,
}: {
  rows: { pts: string; label: string; criteria: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700 text-sm min-w-0">
      <div className="grid min-w-[520px] grid-cols-[4.5rem_1fr_1.2fr] gap-2 bg-slate-800/80 px-3 py-2 text-xs font-bold uppercase tracking-wide text-[#14b4ba] border-b border-slate-700">
        <span>Score</span>
        <span>Level</span>
        <span>Criteria</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.pts + r.label}
          className="grid min-w-[520px] grid-cols-[4.5rem_1fr_1.2fr] gap-2 px-3 py-2 border-b border-slate-800 last:border-0 text-slate-300"
        >
          <span className="font-mono text-[#14b4ba] font-bold">{r.pts}</span>
          <span className="text-slate-200">{r.label}</span>
          <span className="text-slate-400 text-xs leading-relaxed">{r.criteria}</span>
        </div>
      ))}
    </div>
  );
}

export function ScoringRubricDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="adminMuted" size="sm" className="gap-2 shrink-0">
          <BookOpen className="size-4" />
          Scoring rubric
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[min(90vh,720px)] flex flex-col gap-0 overflow-hidden border-slate-700 bg-slate-900 p-0 text-slate-100 shadow-xl shadow-black/40 [&>button]:text-slate-400 [&>button]:hover:text-slate-100">
        <DialogHeader className="shrink-0 border-b border-slate-800 px-6 py-4 text-left">
          <DialogTitle className="text-xl font-black text-[#14b4ba]">
            EXAI team selection — evaluation criteria
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm leading-relaxed">
            Reference for evaluators. Maximum 100 points; teams below 50 should typically be rejected.
            Only the single total score (0–100) is stored; use notes for your own breakdown if needed.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 space-y-8 text-sm">
          <section className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Overview</h3>
            <p className="text-slate-300 leading-relaxed">
              This scorecard evaluates teams on their ability to tackle advanced AI challenges (ML, CV, RL,
              NLP, time series, data engineering). Total = sum of the five criteria below (max 100).
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-100">
              A. Team composition &amp; role coverage — <span className="text-[#14b4ba]">20 pts</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Roles: ML/DL · data processing / engineering · programming (Python, frameworks) · applied domain
              (CV / NLP / RL / time series).
            </p>
            <RubricTable
              rows={[
                {
                  pts: "20",
                  label: "Complete",
                  criteria:
                    "All four roles covered with distinct profiles or well-justified overlap.",
                },
                {
                  pts: "10",
                  label: "Partial",
                  criteria: "Missing 1–2 roles or heavy overlap (e.g. similar profiles).",
                },
                {
                  pts: "0",
                  label: "Poor",
                  criteria: "More than two roles missing or highly redundant team.",
                },
              ]}
            />
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-100">
              B. Technical experience (AI &amp; data) — <span className="text-[#14b4ba]">25 pts</span>
            </h3>
            <RubricTable
              rows={[
                {
                  pts: "25",
                  label: "Advanced",
                  criteria:
                    "Hands-on with ML/DL frameworks (PyTorch, TensorFlow), real projects in CV/NLP/RL/TS, pipelines, research or Kaggle.",
                },
                {
                  pts: "15",
                  label: "Intermediate",
                  criteria: "Basic ML (e.g. sklearn, pandas), small projects, limited advanced topics.",
                },
                {
                  pts: "5",
                  label: "Basic",
                  criteria: "Mostly academic, minimal practical implementation.",
                },
              ]}
            />
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-100">
              C. Project &amp; implementation ability — <span className="text-[#14b4ba]">20 pts</span>
            </h3>
            <RubricTable
              rows={[
                {
                  pts: "20",
                  label: "Strong",
                  criteria:
                    "Multiple real projects, solid GitHub, end-to-end builds (data → model → evaluation).",
                },
                {
                  pts: "10",
                  label: "Medium",
                  criteria: "Some projects but incomplete or limited complexity.",
                },
                {
                  pts: "0",
                  label: "Weak",
                  criteria: "No meaningful projects or only theory.",
                },
              ]}
            />
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-100">
              D. Relevance to EXAI challenges — <span className="text-[#14b4ba]">20 pts</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Areas: transformers / optimization, CV, time series, RL, NLP/LLMs, data engineering.
            </p>
            <RubricTable
              rows={[
                {
                  pts: "20",
                  label: "Highly relevant",
                  criteria: "Strong experience in 2–3 relevant areas aligned with EXAI tracks.",
                },
                {
                  pts: "10",
                  label: "Partial",
                  criteria: "One relevant area or weak exposure across several.",
                },
                {
                  pts: "0",
                  label: "Not relevant",
                  criteria: "No clear link to EXAI domains.",
                },
              ]}
            />
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-100">
              E. Motivation &amp; commitment — <span className="text-[#14b4ba]">15 pts</span>
            </h3>
            <RubricTable
              rows={[
                {
                  pts: "15",
                  label: "Strong",
                  criteria: "Clear, specific motivation; understands challenges and goals.",
                },
                {
                  pts: "8",
                  label: "Average",
                  criteria: "Generic motivation, little depth.",
                },
                {
                  pts: "0",
                  label: "Weak",
                  criteria: "Vague, copy-paste, or no real justification.",
                },
              ]}
            />
          </section>

          <section className="rounded-lg border border-slate-700 bg-slate-800/40 p-4 space-y-2">
            <h3 className="font-bold text-slate-100">Decision bands (total 0–100)</h3>
            <ul className="text-slate-300 text-xs space-y-1 list-disc list-inside">
              <li>
                <span className="text-emerald-400 font-bold">80–100</span> — Strong accept
              </li>
              <li>
                <span className="text-[#14b4ba] font-bold">65–79</span> — Accept
              </li>
              <li>
                <span className="text-amber-400 font-bold">50–64</span> — Borderline (manual review)
              </li>
              <li>
                <span className="text-red-400 font-bold">&lt;50</span> — Reject
              </li>
            </ul>
            <p className="text-slate-500 text-xs pt-1">
              Latest save replaces the previous team score (upsert). Optional evaluator notes are not stored as
              structured A–E fields.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
