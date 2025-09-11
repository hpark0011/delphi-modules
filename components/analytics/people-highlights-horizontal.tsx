"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

type Person = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  initials: string;
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
        {cards.slice(0, 5).map((card, i) => {
          return (
            <div
              key={card.id}
              className={`relative bg-card-secondary shadow-card-stacked rounded-[24px] p-4 flex flex-col items-center justify-between max-w-full w-full gap-2 mx-auto h-full 
              }`}
            >
              <Avatar className='h-10 w-10 rounded-full m-auto'>
                <AvatarImage src={card.avatar} />
                <AvatarFallback>{card.initials}</AvatarFallback>
              </Avatar>

              <div className='flex flex-col h-full mb-1'>
                <div className='text-center text-sm font-medium'>
                  {card.name}
                </div>
                <div className='text-center text-[13px] leading-[1.2] text-[#43250E]/50 dark:text-[#EBE9E7]/50 line-clamp-2'>
                  {card.title}
                </div>
              </div>

              <Button
                size='sm'
                className='rounded-full px-3 py-1 h-full leading-[1.2] m-auto flex justify-center items-center active:scale-95 text-[12px]'
              >
                Message
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
