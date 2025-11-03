"use client";
import { motion } from "framer-motion";

export function HoverPopText({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <span className="inline-block">
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ y: -2, scale: 1.2 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}
