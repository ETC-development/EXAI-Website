import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TimelineEvent } from "./TimelineEvent";
import { Button } from "./ui/button";

interface AgendaDay {
  day: number;
  date: string;
  events: Array<{
    time: string;
    title: string;
    description: string;
  }>;
}

const agendaDays: AgendaDay[] = [
  {
    day: 1,
    date: "May 15, 2026",
    events: [
      { time: "09:00 AM", title: "Registration & Welcome Coffee", description: "Check-in, badge collection, and networking" },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Welcome speech, introduction to challenges and rules" },
      { time: "10:30 AM", title: "Team Formation", description: "Final team assembly and workspace setup" },
      { time: "11:00 AM", title: "Hackathon Kickoff", description: "Teams start working on challenges" },
      { time: "01:00 PM", title: "Lunch & Networking", description: "Catered lunch and informal networking session" },
      { time: "03:00 PM", title: "Mentor Office Hours", description: "First mentor session - technical guidance" },
      { time: "06:00 PM", title: "Evening Break", description: "Dinner and relaxation time" },
      { time: "08:00 PM", title: "Workshop: Advanced ML Techniques", description: "Optional technical workshop by industry experts" },
    ],
  },
  {
    day: 2,
    date: "May 16, 2026",
    events: [
      { time: "09:00 AM", title: "Day 2 Kickoff", description: "Daily standup and progress updates" },
      { time: "10:00 AM", title: "Checkpoint #1", description: "Teams present 24-hour progress to mentors" },
      { time: "12:00 PM", title: "Lunch Break", description: "Catered lunch and team discussions" },
      { time: "02:00 PM", title: "Deep Work Session", description: "Focused development time" },
      { time: "04:00 PM", title: "Mentor Office Hours", description: "Second mentor session - problem solving" },
      { time: "06:00 PM", title: "Dinner & Entertainment", description: "Evening meal and team activities" },
      { time: "08:00 PM", title: "Lightning Talks", description: "Quick tech talks by sponsors and mentors" },
      { time: "10:00 PM", title: "Midnight Sprint Begins", description: "Final push - caffeinated coding session" },
    ],
  },
  {
    day: 3,
    date: "May 17, 2026",
    events: [
      { time: "08:00 AM", title: "Final Sprint", description: "Last hours of development and testing" },
      { time: "11:00 AM", title: "Submissions Deadline", description: "All projects must be submitted" },
      { time: "11:30 AM", title: "Judging Begins", description: "Expert panel reviews all submissions" },
      { time: "01:00 PM", title: "Lunch Break", description: "Final meal together" },
      { time: "02:00 PM", title: "Top 10 Presentations", description: "Finalist teams present to judges and audience" },
      { time: "04:30 PM", title: "Deliberation", description: "Judges finalize rankings" },
      { time: "05:00 PM", title: "Awards Ceremony", description: "Winner announcements and prize distribution" },
      { time: "06:00 PM", title: "Closing & Networking", description: "Final remarks and networking reception" },
    ],
  },
];

export function MultiDayAgenda() {
  const [currentDay, setCurrentDay] = useState(0);

  const nextDay = () => {
    if (currentDay < agendaDays.length - 1) {
      setCurrentDay(currentDay + 1);
    }
  };

  const prevDay = () => {
    if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Day Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={prevDay}
          disabled={currentDay === 0}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous Day
        </Button>

        <div className="flex gap-2">
          {agendaDays.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDay(index)}
              className={`w-12 h-12 rounded-full font-black transition-all duration-300 ${
                currentDay === index
                  ? "bg-gradient-to-r from-[#14b4ba] to-[#079db5] text-white shadow-lg shadow-[#14b4ba]/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <Button
          onClick={nextDay}
          disabled={currentDay === agendaDays.length - 1}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-30"
        >
          Next Day
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Day Header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h3 className="text-3xl font-black text-[#14b4ba] mb-2">
            Day {agendaDays[currentDay].day}
          </h3>
          <p className="text-slate-400">{agendaDays[currentDay].date}</p>
        </motion.div>
      </AnimatePresence>

      {/* Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-slate-900/60 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
        >
          {agendaDays[currentDay].events.map((event, index) => (
            <TimelineEvent
              key={index}
              {...event}
              isLast={index === agendaDays[currentDay].events.length - 1}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
