import Image from "next/image";

/** Horizontal wordmark — `/public/logos/1-05.png` */
export const EXAI_LOGO_WORDMARK = "/logos/1-05.png";
/** Square mark — `/public/logos/1-06.png` */
export const EXAI_LOGO_MARK = "/logos/1-06.png";

const WORDMARK_W = 673;
const WORDMARK_H = 262;
const MARK_W = 625;
const MARK_H = 521;

type Size = "small" | "medium" | "large";

const fullLogoHeight: Record<Size, string> = {
  small: "h-8",
  medium: "h-11 md:h-12",
  large: "h-16 md:h-20",
};

/**
 * Brand mark only (square asset). Use in hero, favicon-style spots, collapsed nav.
 */
export function ExaiXLogo({
  className = "w-12 h-12",
  priority = false,
}: {
  className?: string;
  /** Set true above the fold (e.g. landing hero) for LCP. */
  priority?: boolean;
}) {
  return (
    <Image
      src={EXAI_LOGO_MARK}
      alt="EXAI"
      width={MARK_W}
      height={MARK_H}
      priority={priority}
      sizes="(max-width: 768px) 160px, 200px"
      className={`object-contain ${className}`}
    />
  );
}

/**
 * Full horizontal wordmark. Prefer this in navbar, footer, auth headers.
 */
export function ExaiFullLogo({
  size = "medium",
  className = "",
}: {
  size?: Size;
  className?: string;
}) {
  return (
    <Image
      src={EXAI_LOGO_WORDMARK}
      alt="EXAI"
      width={WORDMARK_W}
      height={WORDMARK_H}
      priority={size === "medium"}
      sizes="(max-width: 768px) 140px, 200px"
      className={`w-auto max-w-[min(100%,280px)] object-contain object-left ${fullLogoHeight[size]} ${className}`}
    />
  );
}

/** Plain “EXAI” text — use only when an image is not suitable; prefer {@link ExaiFullLogo}. */
export function ExaiTextLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`font-black tracking-tight ${className}`}>
      <span className="text-[#14b4ba]">EX</span>
      <span className="text-[#079db5]">AI</span>
    </div>
  );
}
