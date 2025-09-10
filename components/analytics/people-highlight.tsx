"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

type Person = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  initials: string;
};

export function PeopleHighlight() {
  const people: Person[] = useMemo(
    () => [
      {
        id: "paul",
        name: "Paul Faivret",
        title: "Founder of Product Hunt. Investor at Weekend Fund.",
        avatar: "https://i.pravatar.cc/140?img=15",
        initials: "PF",
      },
      {
        id: "sarah",
        name: "Sarah Chen",
        title: "Design lead at Northwind. Ex-IDEO.",
        avatar: "https://i.pravatar.cc/140?img=47",
        initials: "SC",
      },
      {
        id: "kai",
        name: "Kai Nakamura",
        title: "Product at Hoshi Labs. Community builder.",
        avatar: "https://i.pravatar.cc/140?img=56",
        initials: "KN",
      },
      {
        id: "luna",
        name: "Luna Martinez",
        title: "Engineer @ Stardust. Open-source maintainer.",
        avatar: "https://i.pravatar.cc/140?img=38",
        initials: "LM",
      },
      {
        id: "alex",
        name: "Alex Thompson",
        title: "Co-founder of DevTools Inc. Angel investor.",
        avatar: "https://i.pravatar.cc/140?img=68",
        initials: "AT",
      },
    ],
    []
  );

  const [cards, setCards] = useState<Person[]>(people);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleNext = () => {
    if (isSwiping) return;
    setSwipeDirection("right");
    setIsSwiping(true);
  };

  const handlePrevious = () => {
    if (isSwiping) return;
    setSwipeDirection("left");
    setIsSwiping(true);
  };

  const baseSpring = { type: "spring", stiffness: 380, damping: 32 } as const;

  return (
    <div className='relative'>
      <button
        onClick={handlePrevious}
        className='absolute top-1/2 left-[8px] -translate-y-1/2 rounded-full bg-light p-1 z-50 hover:bg-light/80 transition-colors cursor-pointer active:scale-95'
      >
        <Icon name='ArrowBackwardIcon' className='size-5 text-neutral-500' />
      </button>
      <button
        onClick={handleNext}
        className='absolute top-1/2 right-[8px] -translate-y-1/2 rounded-full bg-light p-1 z-50 hover:bg-light/80 transition-colors cursor-pointer active:scale-95'
      >
        <Icon name='ArrowForwardIcon' className='size-5 text-neutral-500' />
      </button>

      <div className='flex flex-col relative cursor-default transform-none gap-2 justify-center items-center w-full h-[232px] mt-0.5'>
        {cards.slice(0, 4).map((card, i) => {
          const depth = i;
          const scale = 1 - depth * 0.05;
          const translateY = depth * 2;
          const opacity = 1;

          return (
            <motion.div
              key={card.id}
              className={`absolute bg-[#E7E4E1] rounded-[24px] p-6 pt-5 shadow-card-stacked flex flex-col items-center justify-between max-w-[320px] w-full gap-2 backdrop-blur-lg inset-0 mx-auto mt-2.5 h-[200px] ${
                depth > 0 ? "pointer-events-none" : ""
              }`}
              style={{ zIndex: 10 - depth }}
              initial={{
                y: translateY,
                scale,
                opacity,
              }}
              animate={{
                y: translateY,
                scale,
                opacity,
                x:
                  depth === 0 && isSwiping && swipeDirection === "right"
                    ? 520
                    : depth === 0 && isSwiping && swipeDirection === "left"
                      ? -520
                      : 0,
                rotate:
                  depth === 0 && isSwiping && swipeDirection === "right"
                    ? 60
                    : depth === 0 && isSwiping && swipeDirection === "left"
                      ? -60
                      : 0,
              }}
              transition={baseSpring}
              onAnimationComplete={() => {
                if (depth === 0 && isSwiping) {
                  if (swipeDirection === "right") {
                    setCards((prev) => [...prev.slice(1), prev[0]]);
                  } else if (swipeDirection === "left") {
                    setCards((prev) => [
                      prev[prev.length - 1],
                      ...prev.slice(0, -1),
                    ]);
                  }
                  setIsSwiping(false);
                  setSwipeDirection(null);
                }
              }}
            >
              <div className='absolute inset-0 -z-10 rounded-[24px]' />

              <Avatar className='h-14 w-14 rounded-full m-auto overflow-hidden'>
                <AvatarImage src={card.avatar} />
                <AvatarFallback>{card.initials}</AvatarFallback>
              </Avatar>

              <div className='flex flex-col mb-1 h-full'>
                <div className='text-center text-[16px] font-medium'>
                  {card.name}
                </div>
                <div className='text-center text-sm leading-[1.2] text-[#43250E]/50'>
                  {card.title}
                </div>
              </div>
              <div>
                <Button size='sm' className='rounded-full px-3 h-8'>
                  Message
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
