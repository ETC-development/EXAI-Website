// EXAI X Logo Component based on brand guidelines
export function ExaiXLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Multi-layered X design */}
      <path
        d="M30 20 L50 50 L30 80 L20 80 L40 50 L20 20 Z"
        fill="#14b4ba"
      />
      <path
        d="M70 20 L50 50 L70 80 L80 80 L60 50 L80 20 Z"
        fill="#079db5"
      />
      <path
        d="M45 35 L50 50 L45 65 L55 65 L50 50 L55 35 Z"
        fill="#0f8f94"
        opacity="0.8"
      />
    </svg>
  );
}

// EXAI Text Logo Component
export function ExaiTextLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`font-black tracking-tight ${className}`}>
      <span className="text-[#14b4ba]">EX</span>
      <span className="text-[#079db5]">AI</span>
    </div>
  );
}

// Combined Logo (X + Text)
export function ExaiFullLogo({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizes = {
    small: { logo: "w-8 h-8", text: "text-2xl" },
    medium: { logo: "w-12 h-12", text: "text-4xl" },
    large: { logo: "w-16 h-16", text: "text-5xl" }
  };

  return (
    <div className="flex items-center gap-3">
      <ExaiXLogo className={sizes[size].logo} />
      <ExaiTextLogo className={sizes[size].text} />
    </div>
  );
}
