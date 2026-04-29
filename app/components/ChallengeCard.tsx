"use client";

import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { cardHover, easings } from "@/app/lib/animations";

interface ChallengeCardProps {
  title: string;
  icon: LucideIcon;
  gradient: string;
}

export function ChallengeCard({ title, icon: Icon, gradient }: ChallengeCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-0.5 bg-gradient-to-br opacity-0 group-hover:opacity-60 blur-lg transition-all duration-500 rounded-2xl"
        style={{ background: gradient }}
      />
      
      {/* Card content */}
      <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 group-hover:border-[#14b4ba]/50 rounded-xl p-6 transition-all duration-300 overflow-hidden">
        {/* Inner gradient overlay on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ background: gradient }}
        />
        
        <div className="relative flex items-center gap-4">
          {/* Icon container with animation */}
          <motion.div 
            className="p-3 bg-gradient-to-br rounded-lg shadow-lg"
            style={{ background: gradient }}
            whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          
          <h3 className="text-lg text-slate-100 font-bold group-hover:text-white transition-colors">
            {title}
          </h3>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>
    </motion.div>
  );
}