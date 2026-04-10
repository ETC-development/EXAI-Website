import { useEffect, useMemo, useState } from "react";
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
  const [slots, setSlots] = useState(visibleCount);

  useEffect(() => {
    const updateSlots = () => {
      if (window.innerWidth < 640) {
        setSlots(1);
      } else if (window.innerWidth < 1024) {
        setSlots(2);
      } else if (window.innerWidth < 1280) {
        setSlots(3);
      } else {
        setSlots(visibleCount);
      }
    };

    updateSlots();
    window.addEventListener("resize", updateSlots);
    return () => window.removeEventListener("resize", updateSlots);
  }, [visibleCount]);

  const maxStart = Math.max(0, mentors.length - slots);

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxStart ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev <= 0 ? maxStart : prev - 1));
  };

  const shiftX = useMemo(
    // Step width = (container + gap) / slots, so gap contribution is 24 / slots.
    () => `calc(-${startIndex * (100 / slots)}% - ${startIndex * (24 / slots)}px)`,
    [slots, startIndex],
  );

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
          animate={{ x: shiftX }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="flex gap-6"
        >
          {mentors.map((mentor, index) => (
            <motion.div
              key={`${mentor.name}-${index}`}
              style={{
                flex: `0 0 calc(${100 / slots}% - ${(24 * (slots - 1)) / slots}px)`,
              }}
              animate={{
                scale:
                  index >= startIndex && index < startIndex + slots ? 1 : 0.94,
                opacity:
                  index >= startIndex && index < startIndex + slots ? 1 : 0.55,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="origin-center"
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