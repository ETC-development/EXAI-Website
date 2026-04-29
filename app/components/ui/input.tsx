import * as React from "react";
import { cn } from "./utils";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "file:text-foreground placeholder:text-muted-foreground selection:bg-[#14b4ba]/30 selection:text-white",
        "flex h-10 w-full min-w-0 rounded-lg border px-4 py-2 text-base",
        "bg-slate-800/50 border-slate-700/50 text-slate-100",
        "transition-all duration-300 ease-out",
        "outline-none",
        
        // Focus states with teal glow
        "focus:border-[#14b4ba]/50 focus:ring-2 focus:ring-[#14b4ba]/20 focus:bg-slate-800",
        "focus:shadow-[0_0_20px_rgba(20,180,186,0.15)]",
        
        // Hover state
        "hover:border-slate-600 hover:bg-slate-800/70",
        
        // Error state
        error && "border-red-500/50 ring-2 ring-red-500/20 focus:border-red-500/50 focus:ring-red-500/20",
        
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-900",
        
        // File input styles
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        
        className,
      )}
      {...props}
    />
  );
}

export { Input };
