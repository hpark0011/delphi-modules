"use client";

import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { motion } from "framer-motion";

export function OnboardingMindWidgetHelloLabel() {
  return (
    <motion.div
      key='label'
      className='flex items-center gap-1'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.h1 className='text-text-primary-inverse dark:text-white tracking-tighter font-medium flex items-center justify-center h-fit leading-[100%]'>
        Hey 👋
      </motion.h1>
    </motion.div>
  );
}
