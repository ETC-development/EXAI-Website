"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Award, CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Slider } from "@/app/components/ui/slider";

interface ScoreCategory {
  name: string;
  description: string;
  score: number;
  maxScore: number;
}

export default function EvaluationPage() {
  const params = useParams();
  const teamId = params.teamId as string;
  const router = useRouter();
  const teamName = "AI Wizards"; // Mock data

  const [categories, setCategories] = useState<ScoreCategory[]>([
    {
      name: "Team Composition & Skills",
      description: "Diversity of skills, team balance, and complementary expertise",
      score: 15,
      maxScore: 20,
    },
    {
      name: "Technical Experience",
      description: "AI/ML relevant experience, previous projects, and technical depth",
      score: 18,
      maxScore: 25,
    },
    {
      name: "Project/Implementation Ability",
      description: "Demonstrated ability to complete projects and implement solutions",
      score: 12,
      maxScore: 20,
    },
    {
      name: "Relevance to EXAI Challenges",
      description: "Interest and experience relevant to competition challenges",
      score: 16,
      maxScore: 20,
    },
    {
      name: "Motivation & Commitment",
      description: "Passion for AI, commitment to the event, and team dedication",
      score: 12,
      maxScore: 15,
    },
  ]);

  const totalScore = categories.reduce((sum, cat) => sum + cat.score, 0);
  const maxTotalScore = categories.reduce((sum, cat) => sum + cat.maxScore, 0);
  const percentage = Math.round((totalScore / maxTotalScore) * 100);

  const handleScoreChange = (index: number, value: number[]) => {
    const newCategories = [...categories];
    newCategories[index].score = value[0];
    setCategories(newCategories);
  };

  const handleSubmit = () => {
    console.log("Evaluation submitted:", { teamId, categories, totalScore });
    alert("Evaluation submitted successfully!");
    router.push("/admin/teams");
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-[#14b4ba]";
    if (percentage >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreLevel = (score: number, maxScore: number) => {
    const percent = (score / maxScore) * 100;
    if (percent >= 75) return { label: "High", color: "bg-green-500" };
    if (percent >= 40) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Low", color: "bg-red-500" };
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <Link 
          href={`/admin/teams/${teamId}`}
          className="inline-flex items-center gap-2 text-[#14b4ba] hover:text-[#0f8f94] mb-4 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Team Details
        </Link>
        <h1 className="text-4xl font-black text-[#14b4ba] mb-2">Evaluate Team: {teamName}</h1>
        <p className="text-slate-400">Score each category to evaluate the team's application</p>
      </div>

      {/* Score Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#14b4ba]/20 to-[#079db5]/20 border-2 border-[#14b4ba] rounded-xl p-8 text-center shadow-[0_0_30px_rgba(20,180,186,0.3)]"
      >
        <Award className="w-12 h-12 text-[#14b4ba] mx-auto mb-4" />
        <h2 className="text-lg font-bold text-slate-400 mb-2">Total Score</h2>
        <p className={`text-6xl font-black mb-2 ${getScoreColor(percentage)}`}>
          {totalScore}/{maxTotalScore}
        </p>
        <p className="text-2xl font-bold text-slate-300">{percentage}%</p>
      </motion.div>

      {/* Scoring Categories */}
      <div className="space-y-6">
        {categories.map((category, index) => {
          const level = getScoreLevel(category.score, category.maxScore);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/60 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-black text-slate-100 mb-2">{category.name}</h3>
                  <p className="text-sm text-slate-400">{category.description}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${level.color} text-white`}>
                    {level.label}
                  </span>
                  <span className="text-2xl font-black text-[#14b4ba] min-w-[80px] text-right">
                    {category.score}/{category.maxScore}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <Slider
                  value={[category.score]}
                  onValueChange={(value) => handleScoreChange(index, value)}
                  max={category.maxScore}
                  step={1}
                  className="w-full"
                />
                
                {/* Quick Selection Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleScoreChange(index, [Math.round(category.maxScore * 0.3)])}
                    className="border-red-600 text-red-500 hover:bg-red-600/10 flex-1"
                  >
                    Low (30%)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleScoreChange(index, [Math.round(category.maxScore * 0.6)])}
                    className="border-yellow-600 text-yellow-500 hover:bg-yellow-600/10 flex-1"
                  >
                    Medium (60%)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleScoreChange(index, [Math.round(category.maxScore * 0.9)])}
                    className="border-green-600 text-green-500 hover:bg-green-600/10 flex-1"
                  >
                    High (90%)
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex justify-between items-center pt-8 border-t border-slate-700"
      >
        <Link href={`/admin/teams/${teamId}`}>
          <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
            Cancel
          </Button>
        </Link>
        <Button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#14b4ba] to-[#079db5] hover:from-[#0f8f94] hover:to-[#14b4ba] text-white border-0 px-8"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Submit Evaluation
        </Button>
      </motion.div>
    </div>
  );
}
