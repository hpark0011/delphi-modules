"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";

interface AnimateNumberProps {
  value: number;
  className?: string;
  transition?: {
    type?: "spring" | "tween" | "inertia";
    stiffness?: number;
    damping?: number;
    duration?: number;
  };
}

export function AnimateNumber({
  value,
  className,
  transition = {
    type: "spring",
    stiffness: 300,
    damping: 25,
  },
}: AnimateNumberProps) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, transition);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  return <span className={className}>{display}</span>;
}
