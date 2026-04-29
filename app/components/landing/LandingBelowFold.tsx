"use client";

import { motion } from "motion/react";
import { MentorCarousel } from "@/app/components/MentorCarousel";
// import { SponsorCarousel } from "@/app/components/SponsorCarousel";
import { MultiDayAgenda } from "@/app/components/MultiDayAgenda";

type Mentor = {
  name: string;
  role: string;
  company: string;
  image: string;
  linkedin?: string;
};

export function LandingBelowFold({ mentors }: { mentors: Mentor[] }) {
  return (
    <>
      <section id="mentors" className="relative px-4 py-24 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#14b4ba]/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(20,180,186,0.08),transparent_45%)]" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center md:mb-16"
          >
            <h2 className="mb-5 text-4xl font-black tracking-tight text-[#14b4ba] md:text-5xl">
              Expert Mentors
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Learn and succeed with experienced mentors by your side
            </p>
          </motion.div>

          <MentorCarousel mentors={mentors} />
        </div>
      </section>

      {/* <section className="relative py-24 px-4 bg-slate-900/30">
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
      </section> */}

      <section id="agenda" className="relative px-4 py-24 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#079db5]/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(7,157,181,0.08),transparent_45%)]" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center md:mb-16"
          >
            <h2 className="mb-5 text-4xl font-black tracking-tight text-[#14b4ba] md:text-5xl">
              3-Day Event Agenda
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Three days of intense innovation and collaboration
            </p>
          </motion.div>

          <MultiDayAgenda />
        </div>
      </section>
    </>
  );
}
