"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

// SVG from @delphi/ui MicrophoneOn icon converted to data URL
// Using white fill for the mask - the actual colors come from the dot backgrounds
const LOADING_IMG_URL = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none">
  <path d="M12.0014 2C9.23999 2 7.00141 4.23858 7.00141 7V11C7.00141 13.7614 9.23999 16 12.0014 16C14.7628 16 17.0014 13.7614 17.0014 11V7C17.0014 4.23858 14.7628 2 12.0014 2Z" fill="white"/>
  <path d="M5.85459 14.4556C5.55395 13.9924 4.93466 13.8605 4.47138 14.1612C4.00809 14.4618 3.87625 15.0811 4.1769 15.5444C5.30052 17.2758 7.44787 19.5784 11.0014 19.9488V21C11.0014 21.5523 11.4491 22 12.0014 22C12.5537 22 13.0014 21.5523 13.0014 21V19.9488C16.555 19.5784 18.7023 17.2758 19.8259 15.5444C20.1266 15.0811 19.9947 14.4618 19.5314 14.1612C19.0682 13.8605 18.4489 13.9924 18.1482 14.4556C17.1086 16.0576 15.2015 18 12.0014 18C8.80131 18 6.8942 16.0576 5.85459 14.4556Z" fill="white"/>
</svg>
`).replace(/#/g, "%23")}`;

// Grid configuration
const GRID_ROWS = 40;
const GRID_COLS = 40;
const DOT_SIZE = 6; // pixels - restored to size before grid refactor
const IMAGE_SIZE = 240; // Total size of the image

export function InterviewLoadingImg() {
  return (
    <motion.div
      className='relative z-10 grid gap-0.5 w-fit'
      style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
    >
      {Array.from({ length: GRID_ROWS * GRID_COLS }, (_, index) => {
        const row = Math.floor(index / GRID_COLS);
        const col = index % GRID_COLS;
        return (
          <Dot key={index} row={row} col={col} imageUrl={LOADING_IMG_URL} />
        );
      })}
    </motion.div>
  );
}

// Memoized dot component to prevent unnecessary re-renders
const Dot = ({
  row,
  col,
  imageUrl,
}: {
  row: number;
  col: number;
  imageUrl: string;
}) => {
  // Calculate a pseudo-random delay for each dot
  const seed = row * 137 + col * 149; // Prime numbers for better distribution
  const delay = (Math.sin(seed) * 0.5 + 0.5) * 2; // Random delay between 0-2 seconds

  return (
    <motion.div
      className='relative size-0.5'
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {/* Dot masked by image alpha channel */}
      <div
        className={cn(
          "size-full rounded-full overflow-hidden",
          getDotColor(row, col)
        )}
        style={{
          maskImage: `url(${imageUrl})`,
          maskSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
          maskPosition: `${-col * DOT_SIZE}px ${-row * DOT_SIZE}px`,
          maskRepeat: "no-repeat",
          WebkitMaskImage: `url(${imageUrl})`,
          WebkitMaskSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
          WebkitMaskPosition: `${-col * DOT_SIZE}px ${-row * DOT_SIZE}px`,
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        {/* Image overlay */}
        <div
          className='absolute inset-0 mix-blend-multiply'
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
            backgroundPosition: `${-col * DOT_SIZE}px ${-row * DOT_SIZE}px`,
          }}
        />
      </div>
    </motion.div>
  );
};

function getDotColor(row: number, col: number) {
  // Create 2D pseudo-random pattern for color variation
  const seed = row * 31 + col * 17 + row * col * 7;
  const pseudoRandom = Math.sin(seed) * 43758.5453;
  const normalized = (pseudoRandom - Math.floor(pseudoRandom)) * colors.length;
  return colors[Math.floor(normalized)];
}

const colors = [
  "bg-sand-3",
  "bg-sand-3",
  "bg-sand-4",
  "bg-sand-4",
  "bg-sand-5",
  "bg-sand-5",
  "bg-sand-6",
  "bg-sand-6",
  "bg-sand-7",
  "bg-sand-7",
  "bg-sand-9",
  "bg-orange-5",
  "bg-orange-7",
  "bg-orange-9",
];
