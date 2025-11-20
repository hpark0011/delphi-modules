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
            "text-white text-[13px] tracking-tighter font-medium",
            "whitespace-nowrap",
            "drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]"
          )}
          style={{
            top: "calc(100% + 4px)",
          }}
        >
          +{points}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
