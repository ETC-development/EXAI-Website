"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

export default function SoloRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
    year: "",
  });

  const schools = [
    "ENSIA",
    "ESI",
    "USTHB",
    "University of Algiers 1",
    "University of Constantine",
    "Other"
  ];

  const years = ["L1", "L2", "L3", "M1", "M2"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const soloCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    const registrationData = {
      ...formData,
      type: "solo",
      registrationCode: soloCode,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(`solo_${soloCode}`, JSON.stringify(registrationData));
    
    router.push(`/register/success?soloCode=${encodeURIComponent(soloCode)}&type=solo`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-4xl font-black bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              EXAI
            </h1>
          </Link>
          <h2 className="text-3xl font-black text-slate-100 mb-2">Solo Registration</h2>
          <p className="text-slate-400">Register individually and get matched with a team</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-6 mb-6"
        >
          <p className="text-orange-300 text-center">
            <strong>Note:</strong> You will be assigned to a team manually if needed. We&apos;ll help you find the perfect teammates!
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-200">Full Name *</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-orange-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-800 border-slate-700 text-slate-100 focus:border-orange-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="school" className="text-slate-200">School *</Label>
              <Select required value={formData.school} onValueChange={(value) => setFormData({ ...formData, school: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Select school" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-slate-200">Year of Study *</Label>
              <Select required value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6"
            >
              Register
            </Button>
            <Link href="/register" className="flex-1">
              <Button type="button" variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 py-6">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
