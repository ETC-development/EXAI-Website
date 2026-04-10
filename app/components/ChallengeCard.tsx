import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ChallengeCardProps {
  title: string;
  icon: LucideIcon;
  gradient: string;
}

export function ChallengeCard({ title, icon: Icon, gradient }: ChallengeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" 
           style={{ background: gradient }}></div>
      <div className="relative bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700 group-hover:border-[#14b4ba] rounded-xl p-6 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br rounded-lg" style={{ background: gradient }}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg text-slate-100 font-bold">{title}</h3>
        </div>
      </div>
    </motion.div>
  );
}