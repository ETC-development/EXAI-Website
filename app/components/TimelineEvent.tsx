interface TimelineEventProps {
  time: string;
  title: string;
  description: string;
  isLast?: boolean;
}

export function TimelineEvent({ time, title, description, isLast }: TimelineEventProps) {
  return (
    <div className="flex gap-6 pb-8 relative">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-[#14b4ba] shadow-[0_0_10px_rgba(20,180,186,0.6)] z-10"></div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-[#14b4ba]/50 to-transparent mt-2"></div>
        )}
      </div>
      <div className="flex-1 pb-4">
        <div className="text-sm text-[#14b4ba] mb-1 font-bold">{time}</div>
        <h4 className="text-xl text-slate-100 mb-2 font-bold">{title}</h4>
        <p className="text-slate-400">{description}</p>
      </div>
    </div>
  );
}