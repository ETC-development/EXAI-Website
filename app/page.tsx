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

const LandingBelowFold = dynamic(
  () =>
    import("@/app/components/landing/LandingBelowFold").then((m) => ({
      default: m.LandingBelowFold,
    })),
  {
    loading: () => (
      <div className="py-24 px-4 text-center text-slate-500 text-sm font-bold">Loading…</div>
    ),
  },
);

const Footer = dynamic(() =>
  import("@/app/components/Footer").then((m) => ({ default: m.Footer })),
);

export default function LandingPage() {
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

  const mentors = [
    { name: "Yassir", role: "AI Research Lead", company: "DeepMind", image: "", github: "https://github.com/yassircherdouh" },
    { name: "Yassir", role: "ML Engineer", company: "Google", image: "", github: "https://github.com/" },
    { name: "Yassir", role: "Data Scientist", company: "Meta", image: "", github: "https://github.com/" },
    { name: "Yassir", role: "NLP Specialist", company: "OpenAI", image: "", github: "https://github.com/" },
    { name: "Yassir", role: "Computer Vision Expert", company: "Tesla", image: "", github: "https://github.com/" },
    { name: "Yassir", role: "Deep Learning Researcher", company: "Microsoft", image: "", github: "https://github.com/" },
    { name: "Yassir", role: "MLOps Engineer", company: "Amazon", image: "", github: "https://github.com/" },
    { name: "Yassir", role: "Data Engineer", company: "Netflix", image: "", github: "https://github.com/" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Geometric Pattern Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="absolute top-0 right-0 w-1/2 h-1/2" viewBox="0 0 400 400">
          <polygon points="200,0 300,100 200,200 100,100" fill="#14b4ba" />
          <polygon points="300,100 400,200 300,300 200,200" fill="#079db5" />
          <polygon points="100,100 200,200 100,300 0,200" fill="#0f8f94" />
          <polygon points="200,200 300,300 200,400 100,300" fill="#14b4ba" opacity="0.5" />
        </svg>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14b4ba]/5 via-transparent to-[#079db5]/5"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <ExaiXLogo className="w-32 h-32 md:w-40 md:h-40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-7xl md:text-9xl font-black mb-6"
          >
            <span className="text-[#14b4ba]">EX</span>
            <span className="text-[#079db5]">AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-3xl text-slate-300 mb-4 font-bold"
          >
            AI Datathon
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto"
          >
            Organized by ENSIA Tech Community
          </motion.p>

          {/* Countdown Timer in Hero */}
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
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#14b4ba] to-[#079db5] hover:from-[#0f8f94] hover:to-[#14b4ba] text-white px-8 py-6 text-lg font-bold border-0 shadow-lg shadow-[#14b4ba]/30 hover:shadow-[#14b4ba]/50 hover:scale-[1.02] transition-all duration-300"
              >
                Register Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#challenges">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#14b4ba] bg-transparent text-[#14b4ba] px-8 py-6 text-lg font-bold hover:bg-[#14b4ba] hover:text-white hover:shadow-lg hover:shadow-[#14b4ba]/30 hover:scale-[1.02] transition-all duration-300"
              >
                Challenge format
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#14b4ba]">
              About EXAI
            </h2>
            <div className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>
                EXAI is a high-level Artificial Intelligence datathon designed as a proving ground
                for emerging AI talent. The event brings together highly motivated participants to
                tackle rigorous, state-of-the-art challenges that closely mirror real-world industry problems.
              </p>
              <p className="text-[#14b4ba] font-bold">
                First ETC&apos;s Datathon
              </p>
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

      {/* Challenges Preview */}
      <section id="challenges" className="relative py-24 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#14b4ba]">
              Challenges
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            EXAI is not simply a competition. It is an immersive environment where participants demonstrate advanced technical ability, creativity, and problem-
solving skills under realistic constraints.
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

      {/* Final CTA */}
      <section className="relative py-32 px-4 bg-slate-900/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-100">
            Ready to Compete?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join ETC's most exciting AI Datathon. Limited spots available!
          </p>
          
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-[#14b4ba] to-[#079db5] hover:from-[#0f8f94] hover:to-[#14b4ba] text-white px-12 py-8 text-xl font-bold shadow-lg shadow-[#14b4ba]/30 border-0">
              Register Now
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
