import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/50 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 focus-visible:ring-accent/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary/50",
        ghost:
          "hover:bg-accent/80 hover:text-accent-foreground dark:hover:bg-accent/50 focus-visible:ring-accent/50",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary/50",

        // Brand gradient variants (EXAI teal theme)
        gradient:
          "border-0 bg-gradient-to-r from-[#14b4ba] to-[#079db5] text-white shadow-lg shadow-[#14b4ba]/25 hover:shadow-xl hover:shadow-[#14b4ba]/40 hover:from-[#0f8f94] hover:to-[#14b4ba] focus-visible:ring-[#14b4ba]/50 focus-visible:ring-offset-background",
        gradientOutline:
          "border-2 border-[#14b4ba] bg-transparent text-[#14b4ba] hover:bg-[#14b4ba] hover:text-white hover:shadow-lg hover:shadow-[#14b4ba]/25 focus-visible:ring-[#14b4ba]/50 focus-visible:ring-offset-background",
        glow:
          "border-0 bg-gradient-to-r from-[#14b4ba] to-[#079db5] text-white shadow-[0_0_20px_rgba(20,180,186,0.4)] hover:shadow-[0_0_30px_rgba(20,180,186,0.6)] hover:from-[#0f8f94] hover:to-[#14b4ba] focus-visible:ring-[#14b4ba]/50 focus-visible:ring-offset-background",

        // Dark admin UI variants (slate-950 theme)
        adminPrimary:
          "border-0 bg-gradient-to-r from-[#14b4ba] to-[#079db5] text-white shadow-md shadow-[#14b4ba]/20 hover:shadow-lg hover:shadow-[#14b4ba]/35 hover:from-[#0f8f94] hover:to-[#14b4ba] focus-visible:ring-[#14b4ba]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        adminMuted:
          "border border-slate-600/90 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-500 hover:text-white focus-visible:ring-slate-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        adminSuccess:
          "border-0 bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-900/20 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        adminWarning:
          "border border-amber-500/55 bg-transparent text-amber-400 hover:bg-amber-500/12 hover:border-amber-400 hover:text-amber-300 focus-visible:ring-amber-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        adminDanger:
          "border border-red-500/55 bg-transparent text-red-400 hover:bg-red-500/12 hover:border-red-400 hover:text-red-300 focus-visible:ring-red-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        adminIcon:
          "border-0 bg-[#14b4ba] text-white hover:bg-[#0f8f94] hover:shadow-md hover:shadow-[#14b4ba]/25 focus-visible:ring-[#14b4ba]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4 text-sm",
        sm: "h-8 rounded-md gap-1.5 px-3.5 has-[>svg]:px-2.5 text-xs",
        lg: "h-11 rounded-lg gap-2.5 px-6 has-[>svg]:px-5 text-base",
        xl: "h-14 rounded-xl gap-3 px-8 has-[>svg]:px-6 text-lg",
        icon: "size-10 rounded-lg",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
