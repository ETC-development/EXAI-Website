"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +targetDate - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#14b4ba] to-[#079db5] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-[#14b4ba]/30 rounded-2xl p-6 min-w-[120px] shadow-2xl">
        {/* Accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-[#14b4ba] to-transparent rounded-full"></div>
        
        {/* Number with flip animation */}
        <motion.div
          key={value}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-6xl font-black bg-gradient-to-b from-[#14b4ba] to-[#079db5] bg-clip-text text-transparent mb-2"
          style={{ 
            textShadow: "0 0 30px rgba(20, 180, 186, 0.3)",
            fontVariantNumeric: "tabular-nums"
          }}
        >
          {value.toString().padStart(2, "0")}
        </motion.div>
        
        {/* Label */}
        <div className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
          {label}
        </div>
        
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#079db5]/20 to-transparent"></div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-6 justify-center flex-wrap items-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-4xl font-black text-[#14b4ba]/30">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-4xl font-black text-[#14b4ba]/30">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className="text-4xl font-black text-[#14b4ba]/30">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}