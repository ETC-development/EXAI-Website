"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle, Users, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";

type Props = {
  type: string | null;
  inviteCode: string | null;
};

export default function RegistrationSuccessClient({ type, inviteCode }: Props) {
  const [registrationData, setRegistrationData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!inviteCode) return;
      const res = await fetch(`/api/team-by-token?token=${encodeURIComponent(inviteCode)}`);
      if (!res.ok) return;
      const data = await res.json();
      setRegistrationData({
        type: "team",
        teamName: data.team_name,
        members: Array.from({ length: data.member_count }).map((_, i) => ({
          fullName: i === 0 ? "Team Leader" : `Member ${i + 1}`,
          role: i === 0 ? "leader" : "member",
        })),
      });
    }
    void load();
  }, [inviteCode]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-slate-900/80 backdrop-blur-sm border border-teal-500/50 rounded-xl p-12 shadow-[0_0_60px_rgba(20,184,166,0.3)]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(20,184,166,0.6)]">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-100 mb-3">Registration Successful!</h1>
            <p className="text-xl text-slate-300">Welcome to EXAI Datathon 2026</p>
          </motion.div>

          {registrationData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8"
            >
              <h3 className="text-xl font-black text-teal-400 mb-4 flex items-center gap-2">
                {registrationData.type === "solo" ? (
                  <><User className="w-5 h-5" /> Your Registration Details</>
                ) : (
                  <><Users className="w-5 h-5" /> Team Details</>
                )}
              </h3>
              
              {registrationData.type === "solo" ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Name:</span>
                    <span className="text-slate-100 font-bold">{registrationData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-slate-100">{registrationData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">School:</span>
                    <span className="text-slate-100">{registrationData.school}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Year:</span>
                    <span className="text-slate-100">{registrationData.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Registration Code:</span>
                    <span className="text-teal-400 font-mono">{registrationData.registrationCode}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Team Name:</span>
                    <span className="text-slate-100 font-bold">{registrationData.teamName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Team Members:</span>
                    <span className="text-teal-400 font-bold">{registrationData.members?.length || 0} / 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Your Role:</span>
                    <span className="text-slate-100 capitalize">{type === "team-leader" ? "Team Leader" : "Team Member"}</span>
                  </div>
                  {registrationData.members && registrationData.members.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-slate-400 mb-2">Team Members:</p>
                      <ul className="space-y-2">
                        {registrationData.members.map((member: any, index: number) => (
                          <li key={index} className="text-slate-100 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${member.role === 'leader' ? 'bg-teal-500' : 'bg-slate-500'}`}></span>
                            {member.fullName} {member.role === 'leader' && <span className="text-xs text-teal-400">(Leader)</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-lg p-6 mb-8"
          >
            <h4 className="text-lg font-black text-teal-400 mb-2">What&apos;s Next?</h4>
            <ul className="text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>Check your email for confirmation and event details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>Join our Discord community to connect with other participants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 mt-1">•</span>
                <span>Review the challenge descriptions and prepare your toolkit</span>
              </li>
              {registrationData?.type !== "solo" && type === "team-leader" && (
                <li className="flex items-start gap-2">
                  <span className="text-teal-400 mt-1">•</span>
                  <span>Share your team invite link with teammates (max 5 members)</span>
                </li>
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-4"
          >
            <Link href="/" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-6">
                Back to Home
              </Button>
            </Link>
            {type === "team-leader" && (
              <Link href={`/register/join-team/${inviteCode}`} className="flex-1">
                <Button variant="outline" className="w-full border-teal-500/50 text-teal-400 hover:bg-teal-500/10 py-6">
                  View Invite Link
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
