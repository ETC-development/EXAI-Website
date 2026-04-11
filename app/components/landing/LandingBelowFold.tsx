"use client";

import { motion } from "motion/react";
import { MentorCarousel } from "@/app/components/MentorCarousel";
import { SponsorCarousel } from "@/app/components/SponsorCarousel";
import { MultiDayAgenda } from "@/app/components/MultiDayAgenda";

type Mentor = {
  name: string;
  role: string;
  company: string;
  image: string;
  github?: string;
};

export function LandingBelowFold({ mentors }: { mentors: Mentor[] }) {
  return (
    <>
      <section id="mentors" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#14b4ba]">Expert Mentors</h2>
            <p className="text-xl text-slate-300">Learn from industry leaders and AI pioneers</p>
          </motion.div>

          <MentorCarousel mentors={mentors} />
        </div>
      </section>

      <section className="relative py-24 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#14b4ba]">Our Sponsors</h2>
            <p className="text-xl text-slate-300">Supported by leading tech companies</p>
          </motion.div>

          <SponsorCarousel />
        </div>
      </section>

      <section id="agenda" className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#14b4ba]">3-Day Event Agenda</h2>
            <p className="text-xl text-slate-300">Three days of intense innovation and collaboration</p>
          </motion.div>

          <MultiDayAgenda />
        </div>
      </section>
    </>
  );
}
