"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";

type Person = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  initials: string;
  reason: string;
};

export function PeopleHighlightsHorizontal() {
  const people: Person[] = useMemo(
    () => [
      {
        id: "paul",
        name: "Paul Faivret",
        title: "Founder of Product Hunt. Investor at Weekend Fund.",
        avatar: "https://i.pravatar.cc/140?img=15",
        initials: "PF",
        reason:
          "Huge engagement with your messages, especially your daily update. Might be interested in the AI-powered daily update feature. Huge engagement with your messages, especially your daily update. Might be interested in the AI-powered daily update feature.",
      },
      {
        id: "sarah",
        name: "Sarah Chen",
        title: "Design lead at Northwind. Ex-IDEO.",
        avatar: "https://i.pravatar.cc/140?img=47",
        initials: "SC",
        reason:
          "Huge engagement with your messages, especially your daily update. Might be interested in the AI-powered daily update feature.",
      },
      {
        id: "kai",
        name: "Kai Nakamura",
        title: "Product at Hoshi Labs. Community builder.",
        avatar: "https://i.pravatar.cc/140?img=56",
        initials: "KN",
        reason:
          "Huge engagement with your messages, especially your daily update. Might be interested in the AI-powered daily update feature.",
      },
      {
        id: "luna",
        name: "Luna Martinez",
        title: "Engineer @ Stardust. Open-source maintainer.",
        avatar: "https://i.pravatar.cc/140?img=38",
        initials: "LM",
        reason:
          "Huge engagement with your messages, especially your daily update. Might be interested in the AI-powered daily update feature.",
      },
      {
        id: "alex",
        name: "Alex Thompson",
        title: "Co-founder of DevTools Inc. Angel investor.",
        avatar: "https://i.pravatar.cc/140?img=68",
        initials: "AT",
        reason:
          "Huge engagement with your messages, especially your daily update. Might be interested in the AI-powered daily update feature.",
      },
    ],
    []
  );

  const [cards, setCards] = useState<Person[]>(people);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleNext = () => {};

  const handlePrevious = () => {};

  return (
    <div className='relative'>
      {/* <button
        onClick={handlePrevious}
        className='absolute top-1/2 left-[-16px] -translate-y-1/2 rounded-full bg-light p-1 z-50 hover:bg-light/80 transition-colors cursor-pointer active:scale-95'
      >
        <ArrowLeft className='size-4.5 text-neutral-500' />
      </button>
      <button
        onClick={handleNext}
        className='absolute top-1/2 right-[-16px] -translate-y-1/2 rounded-full bg-light p-1 z-50 hover:bg-light/80 transition-colors cursor-pointer active:scale-95'
      >
        <ArrowRight className='size-4.5 text-neutral-500' />
      </button> */}

      <div className='flex flex-row relative cursor-default transform-none gap-2 justify-center items-center w-full px-0 py-0'>
        {cards.slice(0, 5).map((card) => {
          return (
            <div
              key={card.id}
              className='relative bg-card-secondary shadow-xl rounded-[24px] p-0 flex flex-col items-center justify-between max-w-full w-full mx-auto h-[162px] overflow-hidden'
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className='relative h-full w-full overflow-hidden p-4'>
                <div className='flex flex-col items-center justify-between h-[96px]'>
                  <Avatar className='h-10 w-10 rounded-full m-auto'>
                    <AvatarImage src={card.avatar} />
                    <AvatarFallback>{card.initials}</AvatarFallback>
                  </Avatar>

                  <div className='flex flex-col h-full mb-1'>
                    <div className='text-center text-sm font-medium'>
                      {card.name}
                    </div>
                    <div className='text-center text-[13px] leading-[1.2] text-[#43250E]/50 dark:text-[#EBE9E7]/50 line-clamp-2 h-[32px]'>
                      {card.title}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {hoveredId === card.id && (
                    <motion.div
                      initial={{ y: "-100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className='absolute inset-0 z-10 w-full bg-card-secondary flex items-center justify-center px-4 h-full'
                    >
                      <div className='text-[13px] leading-[1.2] text-[#43250E]/50 dark:text-[#EBE9E7]/50 line-clamp-5 m-auto px-1 relative'>
                        <span className='font-medium inline-flex items-center mr-1  relative top-1 bg-[#43250E]/10 rounded-full'>
                          <Icon name='SparkleIcon' className='w-4 h-4' />
                        </span>
                        {card.reason}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className='pt-0 px-4 pb-4 '>
                <Button
                  size='sm'
                  className='rounded-full px-3 py-1 h-fit leading-[1.2] m-auto flex justify-center items-center active:scale-95 text-[12px]'
                >
                  Message
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
