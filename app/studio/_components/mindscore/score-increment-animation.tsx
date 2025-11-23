"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreIncrementAnimationProps {
  points: number;
  isVisible: boolean;
}

export function ScoreIncrementAnimation({
  points,
  isVisible,
}: ScoreIncrementAnimationProps) {
  const isNegative = points < 0;
  const displayValue = Math.abs(points);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: +20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className={cn(
            // "absolute left-1/2 -translate-x-1/2",
            "text-[14px] tracking-tighter font-medium",
            "whitespace-nowrap",
            "drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]",
            isNegative ? "text-[#e5484d]" : "text-white"
          )}
          style={{
            top: "calc(100% + 4px)",
          }}
        >
          {isNegative ? "-" : "+"}
          {displayValue}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
