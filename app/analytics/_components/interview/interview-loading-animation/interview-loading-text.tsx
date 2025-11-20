"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOADING_TEXT = [
  "Gathering information...",
  "Setting up microphone...",
  "Preparing questions...",
  "Starting interview...",
];

export default function LoadingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % LOADING_TEXT.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p
      className="text-center font-medium"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
    >
      <motion.span
        className="!bg-clip-text bg-gradient-to-r from-transparent via-sand-9 to-transparent"
        style={{
          backgroundSize: "200% 100%",
          color: "transparent",
          WebkitBackgroundClip: "text",
          display: "inline-block",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {LOADING_TEXT[index]}
      </motion.span>
    </motion.p>
  );
}
