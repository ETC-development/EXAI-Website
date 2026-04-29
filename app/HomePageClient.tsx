"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Brain,
  ArrowRight,
  Users,
  Trophy,
  Layers,
  LineChart,
  FlaskConical,
} from "lucide-react";
import { CountdownTimer } from "@/app/components/CountdownTimer";
import { ChallengeCard } from "@/app/components/ChallengeCard";
import { Navbar } from "@/app/components/Navbar";
import { ExaiXLogo } from "@/app/components/ExaiLogo";
import { Button } from "@/app/components/ui/button";
import mentorsData from "@/lib/mentors.json";

const LandingBelowFold = dynamic(
  () =>
    import("@/app/components/landing/LandingBelowFold").then((m) => ({
      default: m.LandingBelowFold,
    })),
  {
    loading: () => (
      <div className="px-4 py-24">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="mx-auto h-10 w-72 animate-pulse rounded-lg bg-slate-800/80" />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="h-64 animate-pulse rounded-xl bg-slate-900/80" />
            <div className="h-64 animate-pulse rounded-xl bg-slate-900/80" />
            <div className="h-64 animate-pulse rounded-xl bg-slate-900/80" />
          </div>
        </div>
      </div>
    ),
  },
);

const Footer = dynamic(() =>
  import("@/app/components/Footer").then((m) => ({ default: m.Footer })),
);

export default function HomePageClient() {
  const eventDate = new Date("2026-05-07T09:00:00");

  const challengePillars = [
    {
      title: "High-Level",
      icon: Layers,
      gradient: "linear-gradient(135deg, #14b4ba 0%, #0f8f94 100%)",
    },
    {
      title: "Kaggle-based",
      icon: LineChart,
      gradient: "linear-gradient(135deg, #079db5 0%, #14b4ba 100%)",
    },
    {
      title: "Research-oriented",
      icon: FlaskConical,
      gradient: "linear-gradient(135deg, #0f8f94 0%, #079db5 100%)",
    },
  ];

  const mentors = mentorsData.map((mentor) => ({
    name: mentor.name,
    role: mentor.role?.trim() || "Mentor",
    company: mentor.challenge?.trim() || "Challenge",
    image: mentor.picture?.trim() || "",
    linkedin: mentor.linkedin?.trim() || undefined,
  }));

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <svg className="absolute top-0 right-0 w-1/2 h-1/2" viewBox="0 0 400 400">
          <polygon points="200,0 300,100 200,200 100,100" fill="#14b4ba" />
          <polygon points="300,100 400,200 300,300 200,200" fill="#079db5" />
          <polygon points="100,100 200,200 100,300 0,200" fill="#0f8f94" />
          <polygon points="200,200 300,300 200,400 100,300" fill="#14b4ba" opacity="0.5" />
        </svg>
      </div>
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -top-20 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#14b4ba]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#079db5]/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#0f8f94]/10 blur-3xl" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <section id="home" className="relative flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14b4ba]/5 via-transparent to-[#079db5]/5"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <ExaiXLogo className="w-32 h-32 md:w-40 md:h-40" priority />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-5 text-7xl font-black leading-[0.9] tracking-tight md:text-9xl"
          >
            <span className="text-[#14b4ba]">EX</span>
            <span className="text-[#079db5]">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-3 text-2xl font-bold tracking-wide text-slate-300 md:text-3xl"
          >
            AI Datathon
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg"
          >
            Organized by ENSIA Tech Community
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-12"
          >
            <p className="text-sm text-[#14b4ba] mb-4 font-bold tracking-wider uppercase">Event Starts In</p>
            <CountdownTimer targetDate={eventDate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/register">
                <Button variant="gradient" size="xl">
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <a href="#challenges">
                <Button variant="gradientOutline" size="xl">
                  Challenge format
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="relative px-4 py-24 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#14b4ba]/40 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center md:mb-16"
          >
            <h2 className="mb-5 text-4xl font-black tracking-tight text-[#14b4ba] md:text-5xl">
              About EXAI
            </h2>
            <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-slate-300 md:text-lg">
              <p>
                EXAI is a high-level Artificial Intelligence datathon designed as a proving ground for emerging AI
                talent. The event brings together highly motivated participants to tackle rigorous, state-of-the-art
                challenges that closely mirror real-world industry problems.
              </p>
              <p className="text-[#14b4ba] font-bold">First ETC&apos;s Datathon</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-900/60 backdrop-blur-sm border-2 border-[#14b4ba]/20 hover:border-[#14b4ba] rounded-xl p-8 text-center transition-all duration-300"
            >
              <Trophy className="w-12 h-12 text-[#14b4ba] mx-auto mb-4" />
              <h3 className="text-2xl font-black text-slate-100 mb-2">Innovation</h3>
              <p className="text-slate-400">Cutting-edge AI challenges designed to push your limits</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-900/60 backdrop-blur-sm border-2 border-[#079db5]/20 hover:border-[#079db5] rounded-xl p-8 text-center transition-all duration-300"
            >
              <Users className="w-12 h-12 text-[#079db5] mx-auto mb-4" />
              <h3 className="text-2xl font-black text-slate-100 mb-2">Competition</h3>
              <p className="text-slate-400">Compete with talented teams from across the country</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-900/60 backdrop-blur-sm border-2 border-[#0f8f94]/20 hover:border-[#0f8f94] rounded-xl p-8 text-center transition-all duration-300"
            >
              <Brain className="w-12 h-12 text-[#0f8f94] mx-auto mb-4" />
              <h3 className="text-2xl font-black text-slate-100 mb-2">Industry Relevance</h3>
              <p className="text-slate-400">Real-world problems backed by industry experts</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="challenges" className="relative bg-slate-900/30 px-4 py-24 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#079db5]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,180,186,0.09),transparent_45%)]" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center md:mb-16"
          >
            <h2 className="mb-5 text-4xl font-black tracking-tight text-[#14b4ba] md:text-5xl">Challenges</h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              EXAI is not simply a competition. It is an immersive environment where participants demonstrate advanced
              technical ability, creativity, and problem-solving skills under realistic constraints.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {challengePillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ChallengeCard {...pillar} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LandingBelowFold mentors={mentors} />

      <section className="relative bg-slate-900/30 px-4 py-28 md:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#14b4ba]/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,180,186,0.12),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="mb-5 text-4xl font-black tracking-tight text-slate-100 md:text-5xl">Ready to Compete?</h2>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-300 md:mb-12 md:text-lg">
            Join ETC&apos;s most exciting AI Datathon. Limited spots available!
          </p>

          <Link href="/register">
            <Button variant="gradient" size="xl" className="px-12">
              Register Now
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
