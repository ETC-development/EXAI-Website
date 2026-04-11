import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

interface MentorCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  github?: string;
}

export function MentorCard({ name, role, company, image, github }: MentorCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 hover:border-[#14b4ba] hover:shadow-[0_10px_30px_rgba(20,180,186,0.18)] rounded-xl p-6 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-[#14b4ba]/30">
          <img src={image} alt={name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl text-slate-100 mb-1 font-bold">{name}</h3>
        <p className="text-sm text-[#14b4ba] mb-1 font-bold">{role}</p>
        <p className="text-sm text-slate-400 mb-3">{company}</p>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-[#14b4ba] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}