import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        /** Dark admin UI: primary CTA (teal gradient) */
        adminPrimary:
          "border-0 bg-gradient-to-r from-[#14b4ba] to-[#079db5] text-white shadow-md shadow-[#14b4ba]/20 hover:from-[#0f8f94] hover:to-[#14b4ba] hover:shadow-lg hover:shadow-[#14b4ba]/30 active:brightness-95 focus-visible:ring-[#14b4ba]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        /** Inactive filters / secondary actions on slate-950 */
        adminMuted:
          "border border-slate-600/90 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-500 hover:text-white active:brightness-95 focus-visible:ring-slate-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        adminSuccess:
          "border-0 bg-emerald-600 text-white hover:bg-emerald-500 hover:shadow-md hover:shadow-emerald-900/20 active:brightness-95 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        adminWarning:
          "border border-amber-500/55 bg-transparent text-amber-400 hover:bg-amber-500/12 hover:border-amber-400 hover:text-amber-300 active:brightness-95 focus-visible:ring-amber-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        adminDanger:
          "border border-red-500/55 bg-transparent text-red-400 hover:bg-red-500/12 hover:border-red-400 hover:text-red-300 active:brightness-95 focus-visible:ring-red-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        /** Compact table actions */
        adminIcon:
          "border-0 bg-[#14b4ba] text-white hover:bg-[#0f8f94] hover:shadow-md hover:shadow-[#14b4ba]/25 active:brightness-95 focus-visible:ring-[#14b4ba]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
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
