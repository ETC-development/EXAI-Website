import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

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
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex h-full bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 hover:border-[#14b4ba] hover:shadow-[0_10px_30px_rgba(20,180,186,0.18)] rounded-xl p-6 transition-all duration-300"
    >
      <div className="flex w-full flex-col items-center text-center">
        <div className="mb-4 h-24 w-24 shrink-0 rounded-full overflow-hidden ring-2 ring-[#14b4ba]/30">
          {hasImage ? (
            <img src={image} alt={name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#14b4ba]/35 to-[#079db5]/30 text-xl font-black text-[#14b4ba]">
              {initials}
            </div>
          )}
        </div>
        <h3 className="mb-1 min-h-[4.25rem] text-xl font-bold text-slate-100 flex items-center justify-center">
          <span className="line-clamp-3">{name}</span>
        </h3>
        <p className="mb-1 min-h-[1.5rem] text-sm font-bold text-[#14b4ba]">{role}</p>
        <p className="mb-4 min-h-[1.5rem] text-sm text-slate-400">{company}</p>
        <div className="mt-auto min-h-[1.25rem] flex items-center">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-[#14b4ba] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}