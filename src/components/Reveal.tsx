// app/components/Reveal.tsx
"use client";
import { motion, Variants } from "framer-motion";

type Dir = "up" | "down" | "left" | "right" | "none";

function getOffset(direction: Dir, distance = 24) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 24,
  once = true,
  amount = 0.25, // how much must be visible before animating
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Dir;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
}) {
  const from = getOffset(direction, distance);
  const variants: Variants = {
    hidden: { opacity: 0, ...from },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

// Bonus: Stagger children nicely
export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.25,
  className = "",
}: {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const item = (direction: Dir = "up", distance = 16, duration = 0.5) => ({
  hidden: { opacity: 0, ...getOffset(direction, distance) },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
});
