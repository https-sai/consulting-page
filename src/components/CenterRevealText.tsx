// CenterRevealText.tsx — point ➜ thin line ➜ full
"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  delay?: number;
  ease?: string;
  lineThicknessPct?: number; // thickness of the "line" around center, in %
  pointToLineDuration?: number;
  widenLineDuration?: number;
  verticalFillDuration?: number;
  onComplete?: () => void;
};

export default function CenterRevealText({
  children,
  delay = 1,
  ease = "power1.out",
  lineThicknessPct = 1.0, // try 0.6–1.5 for thinner/thicker line

  widenLineDuration = 1.5, // small band -> full-width band
  verticalFillDuration = 1.5, // band -> full rect
  onComplete,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Prevent re-running animation if it's already been completed
    if (hasAnimatedRef.current) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    // We'll use a CSS variable for band thickness so polygon can use calc()
    el.style.setProperty("--b", `${lineThicknessPct}%`);

    if (prefersReduced) {
      gsap.set(el, {
        opacity: 1,
        clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      });
      hasAnimatedRef.current = true;
      onComplete?.();
      return;
    }

    // Start as a single point in the dead center
    gsap.set(el, {
      opacity: 0.001,
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    });

    const tl = gsap.timeline();

    // Make sure it’s visible first
    tl.to(el, { opacity: 1, duration: 0.12, ease: "power1.out", delay });

    // 2) Widen the band horizontally to full width (keep thin thickness)
    tl.to(el, {
      clipPath:
        "polygon(0% calc(50% - var(--b)), 100% calc(50% - var(--b)), 100% calc(50% + var(--b)), 0% calc(50% + var(--b)))",
      duration: widenLineDuration,
      ease,
    });

    // 3) Fill vertically (top to 0%, bottom to 100%)
    tl.to(el, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: verticalFillDuration,
      ease,
      onComplete: () => {
        hasAnimatedRef.current = true;
        onComplete?.();
      },
    });

    return () => {
      tl.kill(); // returns void
    };
  }, [
    delay,
    ease,
    lineThicknessPct,
    widenLineDuration,
    verticalFillDuration,
    onComplete,
  ]);

  return (
    <div
      ref={wrapRef}
      className="relative inline-block overflow-hidden will-change-[clip-path,opacity]"
      style={{ display: "inline-block" }} // ensures polygon clips only the text block
    >
      {children}
    </div>
  );
}
