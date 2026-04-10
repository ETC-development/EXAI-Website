"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Users, UserPlus, User, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ExaiFullLogo } from "@/app/components/ExaiLogo";

export default function RegistrationStart() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#14b4ba]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#079db5]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl w-full"
      >
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <ExaiFullLogo size="medium" />
          </Link>
          <h2 className="text-3xl font-black text-slate-100 mb-2">Choose Your Registration Path</h2>
          <p className="text-slate-400">Select how you&apos;d like to participate in the datathon</p>
        </div>

        {/* Registration Process Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-slate-900/80 backdrop-blur-sm border-2 border-[#14b4ba]/30 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-[#14b4ba] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-black text-[#14b4ba] mb-2">How Registration Works</h3>
              <div className="text-sm text-slate-300 space-y-2">
                <p>
                  <span className="font-bold text-[#14b4ba]">Team Leaders:</span> Create a team to receive a unique Team ID. Share this ID with your team members so they can join.
                </p>
                <p>
                  <span className="font-bold text-[#079db5]">Team Members:</span> Use the &quot;Join Team&quot; option and enter the Team ID provided by your leader.
                </p>
                <p>
                  <span className="font-bold text-[#0f8f94]">Solo Participants:</span> Register individually if you don&apos;t have a full team yet. We&apos;ll help you connect with others.
                </p>
                <p className="text-xs text-slate-400 pt-2 border-t border-slate-700 mt-3">
                  ⭐ <span className="font-bold">Priority is given to complete teams</span> (5 members). Solo registrations will be manually assigned by admins.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Create Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/register/create-team" className="block">
              <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700 hover:border-[#14b4ba] rounded-xl p-8 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[#14b4ba] to-[#079db5] rounded-lg flex items-center justify-center mb-6 mx-auto shadow-[0_0_20px_rgba(20,180,186,0.4)]">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-100 mb-3 text-center">Create Team</h3>
                <p className="text-slate-400 text-center mb-6">
                  Start your own team and invite others to join you
                </p>
                <Button className="w-full bg-gradient-to-r from-[#14b4ba] to-[#079db5] hover:from-[#0f8f94] hover:to-[#14b4ba] text-white font-bold">
                  Create Team
                </Button>
              </div>
            </Link>
          </motion.div>

          {/* Join Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/register/join-team" className="block">
              <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700 hover:border-[#079db5] rounded-xl p-8 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[#079db5] to-[#0f8f94] rounded-lg flex items-center justify-center mb-6 mx-auto shadow-[0_0_20px_rgba(7,157,181,0.4)]">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-100 mb-3 text-center">Join Team</h3>
                <p className="text-slate-400 text-center mb-6">
                  Have an invite link? Join an existing team
                </p>
                <Button className="w-full bg-gradient-to-r from-[#079db5] to-[#0f8f94] hover:from-[#14b4ba] hover:to-[#079db5] text-white font-bold">
                  Join Team
                </Button>
              </div>
            </Link>
          </motion.div>

          {/* Solo Registration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/register/solo" className="block">
              <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700 hover:border-[#0f8f94] rounded-xl p-8 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0f8f94] to-[#14b4ba] rounded-lg flex items-center justify-center mb-6 mx-auto shadow-[0_0_20px_rgba(15,143,148,0.4)]">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-100 mb-3 text-center">Solo Registration</h3>
                <p className="text-slate-400 text-center mb-6">
                  Register individually and we&apos;ll help you find a team
                </p>
                <Button className="w-full bg-gradient-to-r from-[#0f8f94] to-[#14b4ba] hover:from-[#079db5] hover:to-[#0f8f94] text-white font-bold">
                  Register Solo
                </Button>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-[#14b4ba] hover:text-[#079db5] transition-colors inline-flex items-center gap-2 font-bold">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
