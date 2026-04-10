"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Mail, School, Calendar, ExternalLink, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";

// Mock data
const mockTeamData = {
  id: "1",
  name: "AI Wizards",
  inviteCode: "EXAI-WIZ-2026",
  status: "under-review",
  locked: false,
  members: [
    {
      id: "1",
      name: "Ahmed Mansouri",
      email: "ahmed.mansouri@ensia.dz",
      school: "ENSIA",
      year: "3rd Year",
      role: "leader",
      github: "https://github.com/ahmansouri",
      linkedin: "https://linkedin.com/in/ahmansouri",
    },
    {
      id: "2",
      name: "Yasmine Kadri",
      email: "yasmine.kadri@ensia.dz",
      school: "ENSIA",
      year: "2nd Year",
      role: "member",
      github: "https://github.com/ykadri",
      linkedin: "",
    },
    {
      id: "3",
      name: "Karim Belkacem",
      email: "karim.belkacem@usthb.dz",
      school: "USTHB",
      year: "4th Year",
      role: "member",
      github: "",
      linkedin: "https://linkedin.com/in/kbelkacem",
    },
    {
      id: "4",
      name: "Amira Benali",
      email: "amira.benali@esi.dz",
      school: "ESI",
      year: "3rd Year",
      role: "member",
      github: "https://github.com/abenali",
      linkedin: "https://linkedin.com/in/abenali",
    },
    {
      id: "5",
      name: "Mohamed Amine Boudiaf",
      email: "mohamed.boudiaf@ensia.dz",
      school: "ENSIA",
      year: "2nd Year",
      role: "member",
      github: "",
      linkedin: "",
    },
  ],
  submission: {
    motivation: "Our team is passionate about pushing the boundaries of AI and machine learning. We've worked on multiple projects together including a computer vision system for agriculture and an NLP chatbot. We believe the EXAI Datathon presents the perfect opportunity to challenge ourselves with real-world AI problems and learn from industry experts.",
    experience: "Collectively, our team has 8+ years of experience in Python, TensorFlow, PyTorch, and scikit-learn. We've participated in 3 hackathons and won 2nd place at the National AI Challenge 2025. Our projects include image classification, sentiment analysis, and reinforcement learning for game AI.",
    additionalInfo: "We're particularly interested in the Computer Vision and NLP challenges. We have access to GPU resources through our university lab and are prepared to dedicate the full 3 days to the competition.",
  },
  submittedAt: "2026-05-08T14:30:00",
};

export default function TeamDetailsPage() {
  const params = useParams();
  const teamId = params.teamId as string;
  const [teamStatus, setTeamStatus] = useState(mockTeamData.status);

  const handleStatusChange = (newStatus: string) => {
    setTeamStatus(newStatus);
    console.log(`Team ${teamId} status changed to ${newStatus}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link 
            href="/admin/teams" 
            className="inline-flex items-center gap-2 text-[#14b4ba] hover:text-[#0f8f94] mb-4 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teams
          </Link>
          <h1 className="text-4xl font-black text-[#14b4ba] mb-2">{mockTeamData.name}</h1>
          <p className="text-slate-400">Invite Code: {mockTeamData.inviteCode}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => handleStatusChange("accepted")}
            className="bg-green-600 hover:bg-green-700 text-white border-0"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Accept
          </Button>
          <Button
            onClick={() => handleStatusChange("under-review")}
            variant="outline"
            className="border-yellow-600 text-yellow-500 hover:bg-yellow-600/10"
          >
            <Clock className="w-4 h-4 mr-2" />
            Pending
          </Button>
          <Button
            onClick={() => handleStatusChange("rejected")}
            variant="outline"
            className="border-red-600 text-red-500 hover:bg-red-600/10"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>
      </div>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-6">Team Members ({mockTeamData.members.length}/5)</h2>
        <div className="grid gap-4">
          {mockTeamData.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-slate-800/50 border rounded-lg p-4 ${
                member.role === 'leader' 
                  ? 'border-[#14b4ba]/50 shadow-[0_0_15px_rgba(20,180,186,0.2)]' 
                  : 'border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-100">{member.name}</h3>
                    {member.role === 'leader' && (
                      <span className="px-2 py-1 bg-[#14b4ba]/20 text-[#14b4ba] text-xs font-bold rounded-full border border-[#14b4ba]/50">
                        LEADER
                      </span>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4" />
                      <span>{member.school}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{member.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {member.github && (
                        <a 
                          href={member.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#14b4ba] hover:text-[#0f8f94] flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#14b4ba] hover:text-[#0f8f94] flex items-center gap-1 ml-3"
                        >
                          <ExternalLink className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Submission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
      >
        <h2 className="text-2xl font-black text-slate-100 mb-6">Team Submission</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#14b4ba] mb-3">Motivation</h3>
            <p className="text-slate-300 leading-relaxed bg-slate-800/50 rounded-lg p-4">
              {mockTeamData.submission.motivation}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#14b4ba] mb-3">Technical Experience</h3>
            <p className="text-slate-300 leading-relaxed bg-slate-800/50 rounded-lg p-4">
              {mockTeamData.submission.experience}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#14b4ba] mb-3">Additional Information</h3>
            <p className="text-slate-300 leading-relaxed bg-slate-800/50 rounded-lg p-4">
              {mockTeamData.submission.additionalInfo}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400 pt-4 border-t border-slate-700">
            <Calendar className="w-4 h-4" />
            <span>Submitted on {new Date(mockTeamData.submittedAt).toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Link href="/admin/teams">
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            Cancel
          </Button>
        </Link>
        <Link href={`/admin/evaluation/${teamId}`}>
          <Button className="bg-gradient-to-r from-[#14b4ba] to-[#079db5] hover:from-[#0f8f94] hover:to-[#14b4ba] text-white border-0">
            Evaluate Team
          </Button>
        </Link>
      </div>
    </div>
  );
}
