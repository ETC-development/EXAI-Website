"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { cardHover } from "@/app/lib/animations";

interface MentorCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  linkedin?: string;
}

export function MentorCard({ name, role, company, image, linkedin }: MentorCardProps) {
  const hasImage = image.trim().length > 0;
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="relative group flex h-full"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#14b4ba]/0 to-[#079db5]/0 group-hover:from-[#14b4ba]/40 group-hover:to-[#079db5]/40 blur-lg transition-all duration-500 rounded-2xl opacity-0 group-hover:opacity-100" />
      
      {/* Card content */}
      <div className="relative flex w-full flex-col items-center text-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 group-hover:border-[#14b4ba]/50 rounded-xl p-6 transition-all duration-300 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14b4ba]/0 to-[#079db5]/0 group-hover:from-[#14b4ba]/5 group-hover:to-[#079db5]/5 transition-all duration-500" />
        
        {/* Image container with enhanced ring animation */}
        <motion.div 
          className="relative mb-4 h-24 w-24 shrink-0 rounded-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {/* Animated ring */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#14b4ba] to-[#079db5] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#14b4ba] to-[#079db5] rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-slate-800">
            {hasImage ? (
              <img src={image} alt={name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#14b4ba]/35 to-[#079db5]/30 text-xl font-black text-[#14b4ba]">
                {initials}
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Text content with improved hierarchy */}
        <div className="relative z-10">
          <h3 className="mb-1 min-h-[4.25rem] text-xl font-bold text-slate-100 flex items-center justify-center group-hover:text-white transition-colors">
            <span className="line-clamp-3">{name}</span>
          </h3>
          <p className="mb-1 min-h-[1.5rem] text-sm font-bold text-[#14b4ba] group-hover:text-[#14b4ba]/90">{role}</p>
          <p className="mb-4 min-h-[1.5rem] text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{company}</p>
        </div>
        
        {/* LinkedIn link with enhanced hover */}
        <div className="mt-auto min-h-[1.25rem] flex items-center relative z-10">
          {linkedin && (
            <motion.a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#14b4ba] transition-colors px-3 py-1.5 rounded-full hover:bg-[#14b4ba]/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="font-medium">LinkedIn</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}