"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useRef, useEffect } from "react";
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

type PeopleHighlightsHorizontalProps = {
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
};

export function PeopleHighlightsHorizontal({
  currentIndex = 0,
  onIndexChange,
}: PeopleHighlightsHorizontalProps) {
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
      {
        id: "maya",
        name: "Maya Patel",
        title: "Growth lead at TechCo. Marketing strategist.",
        avatar: "https://i.pravatar.cc/140?img=26",
        initials: "MP",
        reason:
          "Consistently shares your content and participates in discussions. Strong advocate for your community-first approach.",
      },
      {
        id: "jordan",
        name: "Jordan Williams",
        title: "CEO at StartupXYZ. Serial entrepreneur.",
        avatar: "https://i.pravatar.cc/140?img=33",
        initials: "JW",
        reason:
          "Frequently mentions your product in industry talks. Looking for collaboration opportunities in the enterprise space.",
      },
      {
        id: "emma",
        name: "Emma Rodriguez",
        title: "VP Engineering at CloudBase. Tech influencer.",
        avatar: "https://i.pravatar.cc/140?img=45",
        initials: "ER",
        reason:
          "Active contributor to your open-source projects. Has expressed interest in becoming a technical advisor.",
      },
      {
        id: "ryan",
        name: "Ryan Chang",
        title: "Product Designer at Figma. UX specialist.",
        avatar: "https://i.pravatar.cc/140?img=52",
        initials: "RC",
        reason:
          "Loves your design philosophy and frequently references your work. Potential design partnership opportunity.",
      },
      {
        id: "olivia",
        name: "Olivia Bennett",
        title: "Data Scientist at ML Corp. AI researcher.",
        avatar: "https://i.pravatar.cc/140?img=21",
        initials: "OB",
        reason:
          "Interested in your AI features and data processing capabilities. Has reached out about research collaboration.",
      },
      {
        id: "daniel",
        name: "Daniel Kim",
        title: "CTO at FinTech Solutions. Blockchain expert.",
        avatar: "https://i.pravatar.cc/140?img=60",
        initials: "DK",
        reason:
          "Exploring integration possibilities with your platform. Strong technical background and industry connections.",
      },
      {
        id: "sophia",
        name: "Sophia Taylor",
        title: "Head of Partnerships at BigTech. Strategic advisor.",
        avatar: "https://i.pravatar.cc/140?img=35",
        initials: "ST",
        reason:
          "Has mentioned your product in several partnership discussions. Could open doors to enterprise clients.",
      },
      {
        id: "marcus",
        name: "Marcus Johnson",
        title: "Venture Partner at Innovation Fund. Early-stage investor.",
        avatar: "https://i.pravatar.cc/140?img=14",
        initials: "MJ",
        reason:
          "Tracking your growth metrics closely. Has expressed interest in your next funding round.",
      },
      {
        id: "isabella",
        name: "Isabella Moore",
        title: "Content Creator. 500K+ followers.",
        avatar: "https://i.pravatar.cc/140?img=29",
        initials: "IM",
        reason:
          "Creates content about your product regularly. Massive reach in your target demographic.",
      },
      {
        id: "nathan",
        name: "Nathan Davis",
        title: "Engineering Manager at DevOps Co. Cloud architect.",
        avatar: "https://i.pravatar.cc/140?img=57",
        initials: "ND",
        reason:
          "Advocates for your developer tools internally. Potential for team-wide adoption.",
      },
      {
        id: "ava",
        name: "Ava Wilson",
        title: "UX Researcher at Design Studio. User advocate.",
        avatar: "https://i.pravatar.cc/140?img=44",
        initials: "AW",
        reason:
          "Frequently cites your user research in presentations. Interested in case study collaboration.",
      },
      {
        id: "ethan",
        name: "Ethan Brown",
        title: "Sales Director at Enterprise Corp. B2B specialist.",
        avatar: "https://i.pravatar.cc/140?img=11",
        initials: "EB",
        reason:
          "Has recommended your solution to multiple enterprise clients. Strong network in Fortune 500.",
      },
      {
        id: "zoe",
        name: "Zoe Anderson",
        title: "Community Manager at Tech Hub. Event organizer.",
        avatar: "https://i.pravatar.cc/140?img=40",
        initials: "ZA",
        reason:
          "Invites you to speak at major tech events. Great for brand visibility and networking.",
      },
      {
        id: "liam",
        name: "Liam Garcia",
        title: "DevRel at API Platform. Developer advocate.",
        avatar: "https://i.pravatar.cc/140?img=53",
        initials: "LG",
        reason:
          "Writes tutorials featuring your product. Helps developers discover and adopt your tools.",
      },
      {
        id: "chloe",
        name: "Chloe Martinez",
        title: "Product Marketing at SaaS Co. GTM expert.",
        avatar: "https://i.pravatar.cc/140?img=31",
        initials: "CM",
        reason:
          "Studies your go-to-market strategy. Has valuable insights on market positioning.",
      },
    ],
    []
  );

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Determine items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 5;
    if (window.innerWidth < 640) return 2; // mobile
    if (window.innerWidth < 1024) return 3; // tablet
    return 5; // desktop
  };

  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate visible cards based on current index
  const visibleCards = useMemo(() => {
    const start = currentIndex;
    const end = Math.min(start + itemsPerPage, people.length);
    return people.slice(start, end);
  }, [currentIndex, itemsPerPage, people]);

  return (
    <div className='relative'>
      <motion.div
        className='flex flex-row relative cursor-default transform-none gap-2 justify-center items-center w-full px-0 py-0'
        initial={false}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {visibleCards.map((card, index) => {
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
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
                    <div className='text-center text-[13px] leading-[1.2] text-[#43250E]/70 dark:text-[#EBE9E7]/50 line-clamp-2 h-[32px]'>
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
                      <div className='text-[13px] leading-[1.2] text-[#43250E]/70 dark:text-[#EBE9E7]/50 line-clamp-5 m-auto px-1 relative'>
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
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
