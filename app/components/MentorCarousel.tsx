import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MentorCard } from "./MentorCard";

interface Mentor {
  name: string;
  role: string;
  company: string;
  image: string;
  github?: string;
}

interface MentorCarouselProps {
  mentors: Mentor[];
  visibleCount?: number;
}

export function MentorCarousel({ mentors, visibleCount = 4 }: MentorCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % mentors.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  // Get visible mentors with circular logic
  const getVisibleMentors = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % mentors.length;
      visible.push({ ...mentors[index], uniqueKey: `${startIndex}-${i}` });
    }
    return visible;
  };

  const visibleMentors = getVisibleMentors();

  return (
    <div className="relative flex items-center gap-8">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="flex-shrink-0 w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-sm border-2 border-[#14b4ba] text-[#14b4ba] hover:bg-[#14b4ba] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg shadow-[#14b4ba]/20 hover:shadow-[#14b4ba]/40 hover:scale-110 z-10"
        aria-label="Previous mentor"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Mentors Container */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          key={startIndex}
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {visibleMentors.map((mentor, index) => (
            <motion.div
              key={mentor.uniqueKey}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut"
              }}
            >
              <MentorCard
                name={mentor.name}
                role={mentor.role}
                company={mentor.company}
                image={mentor.image}
                github={mentor.github}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="flex-shrink-0 w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-sm border-2 border-[#14b4ba] text-[#14b4ba] hover:bg-[#14b4ba] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg shadow-[#14b4ba]/20 hover:shadow-[#14b4ba]/40 hover:scale-110 z-10"
        aria-label="Next mentor"
      >
        <ChevronRight className="w-7 h-7" />
      </button>
    </div>
  );
}