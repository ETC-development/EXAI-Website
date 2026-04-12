"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/components/ui/utils";

export type AgendaDetailSection = {
  heading: string;
  paragraphs: string[];
  /** Optional line with an external link (e.g. Google Scholar) */
  scholarFooter?: {
    before: string;
    linkLabel: string;
    href: string;
  };
};

export type AgendaEventDetails = {
  sections: AgendaDetailSection[];
};

interface TimelineEventProps {
  time: string;
  title: string;
  description: string;
  isLast?: boolean;
  details?: AgendaEventDetails;
}

export function TimelineEvent({ time, title, description, isLast, details }: TimelineEventProps) {
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const panelId = `agenda-panel-${reactId.replace(/:/g, "")}`;

  const hasDetails = Boolean(details?.sections?.length);

  const inner = (
    <>
      <div className="mb-1 text-sm font-bold text-[#14b4ba]">{time}</div>
      <div className="mb-2 flex items-start justify-between gap-3">
        <h4 className="text-xl font-bold text-slate-100">{title}</h4>
        {hasDetails && (
          <ChevronDown
            className={cn(
              "mt-1 h-5 w-5 shrink-0 text-[#14b4ba] transition-transform duration-200",
              open && "rotate-180"
            )}
            aria-hidden
          />
        )}
      </div>
      <p className="text-slate-400">{description}</p>
      {hasDetails && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#14b4ba]/90">
          {open ? "Hide details" : "Click for more details"}
        </p>
      )}
    </>
  );

  return (
    <div className="relative flex gap-6 pb-8">
      <div className="flex flex-col items-center">
        <div className="z-10 h-4 w-4 rounded-full bg-[#14b4ba] shadow-[0_0_10px_rgba(20,180,186,0.6)]" />
        {!isLast && (
          <div className="mt-2 h-full w-0.5 bg-gradient-to-b from-[#14b4ba]/50 to-transparent" />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-4">
        {hasDetails ? (
          <button
            type="button"
            className="w-full rounded-lg border border-transparent text-left transition-colors hover:border-[#14b4ba]/25 hover:bg-slate-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14b4ba]/45"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            id={`${panelId}-trigger`}
          >
            {inner}
          </button>
        ) : (
          <div>{inner}</div>
        )}

        <AnimatePresence initial={false}>
          {hasDetails && open && details && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-trigger`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-6 border-t border-slate-700/80 pt-6">
                {details.sections.map((section) => (
                  <div key={section.heading}>
                    <h5 className="mb-3 text-lg font-bold text-[#14b4ba]">{section.heading}</h5>
                    <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                      {section.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}