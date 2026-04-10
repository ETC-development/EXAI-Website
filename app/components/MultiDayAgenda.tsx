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
    date: "Thursday - Day 1",
    events: [
      { time: "16:00 - 16:30", title: "Check-in", description: "Participant arrival and check-in process." },
      { time: "16:30 - 17:00", title: "Opening ceremony", description: "Official opening and event briefing." },
      { time: "17:00 - 19:00", title: "Talk by Prof. Belhouari", description: "Main keynote session." },
      { time: "19:00 - 20:00", title: "Start working", description: "Teams begin implementation." },
      { time: "20:00 - 21:00", title: "Dinner service", description: "Dinner break for participants." },
      { time: "21:00 - 08:00", title: "Deep Work Session", description: "Overnight focused work block." },
      { time: "22:00 - 00:00", title: "Fun games (Optional)", description: "Optional social activities." },
      { time: "00:00 - 01:00", title: "Night pause", description: "Open lounge — light snacks and hot drinks." },
    ],
  },
  {
    day: 2,
    date: "Friday - Day 2",
    events: [
      { time: "08:00 - 09:00", title: "Breakfast Service", description: "Morning breakfast for participants." },
      { time: "09:30 - 12:00", title: "Work session", description: "Core development session." },
      { time: "12:30 - 13:30", title: "Friday Prayer Break", description: "Scheduled prayer break." },
      { time: "14:00 - 15:00", title: "Lunch Service", description: "Lunch for participants." },
      { time: "15:00 - 17:00", title: "AI workshops (Optional)", description: "Optional workshops for participants." },
      { time: "17:00 - 17:30", title: "Afternoon pause", description: "Step away, stretch, and reset before the evening block." },
      { time: "17:30 - 20:30", title: "Deep work", description: "Extended focused development session." },
      { time: "20:30 - 21:30", title: "Dinner Service", description: "Dinner for participants." },
      { time: "21:30 - 08:00", title: "Deep Work Session", description: "Overnight implementation window." },
      { time: "22:00 - 00:00", title: "Fun games (Optional)", description: "Optional social activities." },
      { time: "00:00 - 01:00", title: "Night pause", description: "Open lounge — light snacks and hot drinks." },
    ],
  },
  {
    day: 3,
    date: "Saturday - Day 3",
    events: [
      { time: "08:00 - 09:00", title: "Breakfast Service", description: "Final day breakfast service." },
      { time: "09:00 - 11:00", title: "Work", description: "Last implementation push." },
      { time: "12:00", title: "Final submission", description: "Project submission deadline." },
      { time: "12:00 - 13:30", title: "Lunch", description: "Lunch service for participants." },
      { time: "13:30 - 16:00", title: "Evaluation and fun games/relaxation", description: "Judging period with activities for participants." },
      { time: "16:00 - 17:00", title: "Pre-ceremony pause", description: "Short break before we gather for closing." },
      { time: "17:00 - 18:00", title: "Closing Ceremony", description: "Final announcements and event closing." },
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
          className="bg-[#14b4ba] border-[#14b4ba] text-white hover:bg-[#14b4ba]/10 hover:text-[#14b4ba] disabled:opacity-35 disabled:bg-slate-800 disabled:border-slate-700 disabled:text-slate-500"
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
          className="bg-[#079db5] border-[#079db5] text-white hover:bg-[#079db5]/10 hover:text-[#079db5] disabled:opacity-35 disabled:bg-slate-800 disabled:border-slate-700 disabled:text-slate-500"
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
