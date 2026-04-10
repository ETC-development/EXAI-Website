"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { 
  Brain, 
  Cpu, 
  Image, 
  TrendingUp, 
  Zap, 
  MessageSquare, 
  Database,
  ArrowRight,
  Users,
  Trophy,
  Calendar,
  Mail,
  MapPin,
} from "lucide-react";
import { CountdownTimer } from "@/app/components/CountdownTimer";
import { ChallengeCard } from "@/app/components/ChallengeCard";
import { MentorCarousel } from "@/app/components/MentorCarousel";
import { MultiDayAgenda } from "@/app/components/MultiDayAgenda";
import { SponsorCarousel } from "@/app/components/SponsorCarousel";
import { Navbar } from "@/app/components/Navbar";
import { ExaiFullLogo, ExaiXLogo } from "@/app/components/ExaiLogo";
import { Button } from "@/app/components/ui/button";

export default function LandingPage() {
  const eventDate = new Date("2026-05-07T09:00:00");

  const challenges = [
    { title: "Edge AI & Model Compression", icon: Cpu, gradient: "linear-gradient(135deg, #14b4ba 0%, #0f8f94 100%)" },
    { title: "AI-Generated Image Detection", icon: Image, gradient: "linear-gradient(135deg, #079db5 0%, #14b4ba 100%)" },
    { title: "Time Series Forecasting", icon: TrendingUp, gradient: "linear-gradient(135deg, #0f8f94 0%, #079db5 100%)" },
    { title: "Reinforcement Learning Optimization", icon: Zap, gradient: "linear-gradient(135deg, #14b4ba 0%, #079db5 100%)" },
    { title: "NLP & Language Understanding", icon: MessageSquare, gradient: "linear-gradient(135deg, #079db5 0%, #0f8f94 100%)" },
    { title: "Data Engineering Pipeline", icon: Database, gradient: "linear-gradient(135deg, #0f8f94 0%, #14b4ba 100%)" },
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
                Explore Challenges
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
            <p className="text-xl text-slate-300">Six exciting tracks to test your AI expertise</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ChallengeCard {...challenge} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section id="mentors" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#14b4ba]">
              Expert Mentors
            </h2>
            <p className="text-xl text-slate-300">Learn from industry leaders and AI pioneers</p>
          </motion.div>

          <MentorCarousel mentors={mentors} />
        </div>
      </section>

      {/* Sponsors */}
      <section className="relative py-24 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#14b4ba]">
              Our Sponsors
            </h2>
            <p className="text-xl text-slate-300">Supported by leading tech companies</p>
          </motion.div>

          <SponsorCarousel />
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#14b4ba]">
              3-Day Event Agenda
            </h2>
            <p className="text-xl text-slate-300">Three days of intense innovation and collaboration</p>
          </motion.div>

          <MultiDayAgenda />
        </div>
      </section>

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

      {/* Footer */}
      <footer className="relative border-t border-[#14b4ba]/20 py-12 px-4 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <ExaiFullLogo size="small" />
              </div>
              <p className="text-slate-400 mb-4">
                Premier AI Datathon, organized by ENSIA Tech Community (ETC). 
                Pushing the boundaries of artificial intelligence innovation.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-black text-[#14b4ba] mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  tech-community@ensia.edu.dz
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  ENSIA, Algiers
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-black text-[#14b4ba] mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-[#14b4ba] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-[#14b4ba] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-[#14b4ba] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
                </a>
              </div>
              <div className="mt-6">
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#14b4ba]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 ENSIA Tech Community. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm">
              Empowered by Innovation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
