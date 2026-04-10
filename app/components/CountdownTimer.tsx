"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(targetDate: Date): { left: TimeLeft; ended: boolean } {
  const difference = +targetDate - +new Date();
  if (difference <= 0) {
    return {
      ended: true,
      left: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    };
  }
  return {
    ended: false,
    left: {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    },
  };
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const tick = () => {
      const { left, ended: isEnded } = computeTimeLeft(targetDate);
      setTimeLeft(left);
      setEnded(isEnded);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [mounted, targetDate]);

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  if (!mounted) {
    return (
      <div
        className="mx-auto max-w-xl rounded-2xl border border-[#14b4ba]/20 bg-slate-900/50 px-4 py-6 backdrop-blur-sm sm:px-8"
        aria-hidden
      >
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-12 w-full animate-pulse rounded-lg bg-slate-800/80 sm:h-14" />
              <div className="h-3 w-10 animate-pulse rounded bg-slate-800/60" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (ended) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900/60 px-6 py-8 text-center backdrop-blur-sm">
        <p className="text-lg font-bold text-emerald-300 sm:text-xl">The event is underway</p>
        <p className="mt-1 text-sm text-slate-400">See you at EXAI — check the agenda for what&apos;s next.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div
        className="rounded-2xl border border-[#14b4ba]/25 bg-slate-900/70 px-3 py-5 shadow-[0_0_40px_-12px_rgba(20,180,186,0.35)] backdrop-blur-md sm:px-6 sm:py-6"
        role="timer"
        aria-label="Time remaining until the event starts"
      >
        <div className="grid grid-cols-4 gap-0 sm:gap-2">
          {units.map((u, i) => (
            <div
              key={u.label}
              className={`flex min-w-0 flex-col items-center px-0.5 py-1 sm:px-2 ${
                i < 3 ? "border-r border-[#14b4ba]/20" : ""
              }`}
            >
              <span className="w-full text-center text-2xl font-black tabular-nums tracking-tight text-white sm:text-4xl md:text-5xl">
                {u.value.toString().padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#14b4ba]/90 sm:text-xs">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
