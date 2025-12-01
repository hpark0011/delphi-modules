"use client";

import { useTransitionRouter } from "next-view-transitions";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { CallIcon, ChatIcon as ChatAltIcon, ShieldCheckIcon } from "@icons";

import type { RouterOutputs } from "@/lib/trpc/server";
import { getFirstName } from "@/lib/utils";
import { CustomInput } from "./profile-custom-input";

type Question =
  RouterOutputs["profile"]["getProfileBySlug"]["questions"][number];

interface ProfileChatInputProps {
  slug: string;
  questions: Question[];
  name: string;
  canVoiceCall: boolean;
}

// Custom Hooks
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

function useScrollDirection(threshold = 5, resetThreshold = 50) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        if (
          Math.abs(scrollDelta) > threshold &&
          currentScrollY > resetThreshold
        ) {
          setIsScrollingDown(scrollDelta > 0);
        } else if (currentScrollY <= resetThreshold) {
          setIsScrollingDown(false);
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, resetThreshold]);

  return isScrollingDown;
}

function useKeyboardOffset() {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleViewportChange = () => {
      if (window.visualViewport) {
        const offset = window.innerHeight - window.visualViewport.height;
        setKeyboardOffset(offset > 100 ? offset : 0);
      }
    };

    window.visualViewport.addEventListener("resize", handleViewportChange);
    window.visualViewport.addEventListener("scroll", handleViewportChange);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportChange
        );
        window.visualViewport.removeEventListener(
          "scroll",
          handleViewportChange
        );
      }
    };
  }, []);

  return keyboardOffset;
}

function usePreventBackgroundScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.style.overflow = "hidden";
    root.style.touchAction = "none";

    return () => {
      root.style.overflow = "";
      root.style.touchAction = "";
    };
  }, [enabled]);
}

function useQuestionRotation(questions: Question[], interval = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % questions.length);
    }, interval);
    return () => clearInterval(timer);
  }, [questions.length, interval]);

  return currentIndex;
}

function useKeyboardShortcuts(
  inputValue: string,
  setInputValue: (value: string) => void,
  handleTalkClick: () => void,
  canVoiceCall: boolean
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && inputValue) {
        setInputValue("");
      }
      if (e.key === " " && !inputValue.trim() && canVoiceCall) {
        e.preventDefault();
        handleTalkClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputValue, setInputValue, handleTalkClick, canVoiceCall]);
}

// Shared Styles Component
function SharedStyles() {
  return (
    <style jsx global>{`
      @keyframes slide-in-from-bottom-mobile {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .animate-slide-in-from-bottom-mobile {
        animation: slide-in-from-bottom-mobile 0.6s
          cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
      }

      .btn-active {
        background: var(--profile-btn-active);
        box-shadow: var(--profile-shadow-button);
        transition: all var(--profile-transition-spring);
      }

      .btn-active:hover {
        filter: brightness(1.1);
      }

      .btn-active-accent {
        background: var(--profile-accent);
        box-shadow: var(--profile-shadow-button);
        transition: all var(--profile-transition-spring);
      }

      .btn-active-accent:hover {
        filter: brightness(1.1);
      }

      .btn-inactive {
        background: var(--profile-btn-inactive);
        box-shadow: none;
        transition: all var(--profile-transition-spring);
      }

      .btn-inactive:hover {
        background: var(--profile-btn-inactive-hover);
      }
    `}</style>
  );
}

// Mobile Version
function ProfileChatInputMobile({
  slug,
  questions,
  name,
  canVoiceCall,
}: ProfileChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const router = useTransitionRouter();
  const currentQuestionIndex = useQuestionRotation(questions);
  const isScrollingDown = useScrollDirection();
  const keyboardOffset = useKeyboardOffset();
  const firstName = useMemo(() => getFirstName(name), [name]);

  const isScrolled = useMemo(
    () => isScrollingDown && keyboardOffset === 0,
    [isScrollingDown, keyboardOffset]
  );

  usePreventBackgroundScroll(showInput && keyboardOffset > 0);

  const handleTalkClick = useCallback(() => {
    router.push(`/${slug}/call?dial=true`);
  }, [slug, router]);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      router.push(`/${slug}/talk?q=${encodeURIComponent(inputValue)}`);
    }
  }, [slug, inputValue, router]);

  useKeyboardShortcuts(
    inputValue,
    setInputValue,
    handleTalkClick,
    canVoiceCall
  );

  const handleAskClick = useCallback(() => {
    setShowInput(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (inputValue === "" && showInput) {
      setShowInput(false);
    }
  }, [inputValue, showInput]);

  return (
    <>
      <SharedStyles />
      <div
        className='fixed flex justify-center left-0 right-0 w-full transition-all duration-200 z-50'
        style={{
          bottom: keyboardOffset > 0 ? `${keyboardOffset + 16}px` : "20px",
        }}
      >
        <div
          className={cn(
            "relative z-10 overflow-hidden animate-slide-in-from-bottom-mobile opacity-0",
            showInput
              ? "w-[90%] max-w-3xl h-[58px] bg-sand-1/80 dark:bg-sand-4/90 backdrop-blur-sm"
              : isScrolled
                ? "w-[160px] h-[50px] bg-sand-1/50 dark:bg-sand-4/70 backdrop-blur-sm"
                : "w-[240px] h-[62px] bg-sand-1/80 dark:bg-sand-4/90 backdrop-blur-sm"
          )}
          style={{
            borderRadius: showInput ? "32px" : "60px",
            boxShadow: "var(--profile-shadow-container)",
            transition:
              "width var(--profile-transition-smooth), transform var(--profile-transition-smooth), border-radius var(--profile-transition-smooth), height var(--profile-transition-smooth)",
          }}
        >
          {!showInput ? (
            <div
              className={cn(
                "flex items-center gap-2 h-full transition-all duration-200",
                isScrolled ? "p-[6px]" : "p-[7px]"
              )}
            >
              {canVoiceCall && (
                <button
                  type='button'
                  onClick={handleTalkClick}
                  className='mobile-button flex-1 flex items-center justify-center h-full px-4 rounded-[9381875px] font-medium btn-active text-white overflow-hidden'
                >
                  <CallIcon className='size-5 flex-shrink-0' />
                  <span className='mobile-text text-base'>Talk</span>
                </button>
              )}
              <button
                type='button'
                onClick={handleAskClick}
                className={cn(
                  "mobile-button flex items-center justify-center h-full px-4 rounded-[9381875px] font-medium text-sand-12 overflow-hidden",
                  canVoiceCall
                    ? "flex-1 btn-inactive"
                    : "flex-1 btn-active-accent text-white"
                )}
              >
                <ChatAltIcon className='size-5 flex-shrink-0' />
                <span className='mobile-text text-base'>Ask</span>
              </button>
            </div>
          ) : (
            <CustomInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              onBlur={handleInputBlur}
              questions={questions.map((q) => q.question)}
              currentQuestionIndex={currentQuestionIndex}
              placeholder={`Ask ${firstName} a question`}
              autoFocus
              className='p-[7px]'
              compact
            />
          )}
        </div>
        <style jsx>{`
          .mobile-button {
            transition:
              transform var(--profile-transition-smooth),
              opacity var(--profile-transition-smooth);
          }

          .mobile-button :global(svg) {
            width: ${isScrolled ? "0px" : "20px"};
            transform: ${isScrolled ? "scale(0)" : "scale(1)"};
            opacity: ${isScrolled ? 0 : 1};
            transition:
              width var(--profile-transition-smooth),
              transform var(--profile-transition-smooth),
              opacity var(--profile-transition-smooth);
          }

          .mobile-text {
            margin-left: ${isScrolled ? "0px" : "8px"};
            transition: margin var(--profile-transition-smooth);
          }
        `}</style>
      </div>
    </>
  );
}

// Desktop Version
function ProfileChatInputDesktop({
  slug,
  questions,
  name,
  canVoiceCall,
}: ProfileChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isAtTop, setIsAtTop] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const router = useTransitionRouter();
  const currentQuestionIndex = useQuestionRotation(questions);
  const firstName = useMemo(() => getFirstName(name), [name]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(true);
      setIsAtTop(scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTalkClick = useCallback(() => {
    router.push(`/${slug}/call?dial=true`);
  }, [slug, router]);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      router.push(`/${slug}/talk?q=${encodeURIComponent(inputValue)}`);
    }
  }, [slug, inputValue, router]);

  useKeyboardShortcuts(
    inputValue,
    setInputValue,
    handleTalkClick,
    canVoiceCall
  );

  return (
    <>
      <SharedStyles />
      <div className='fixed bottom-0 left-1/2 -translate-x-1/2 w-[105%] sm:w-full sm:max-w-3xl px-8 z-50 pointer-events-none'>
        <div
          className={cn(
            "relative z-10 bg-sand-1/80 dark:bg-sand-4/90 backdrop-blur-sm overflow-hidden animate-slide-in-from-bottom-mobile opacity-0 h-[66px] flex items-center",
            inputValue ? "max-w-3xl" : "max-w-lg"
          )}
          style={{
            borderRadius: inputValue ? "32px" : "48px",
            boxShadow: "var(--profile-shadow-container)",
            transition:
              "max-width var(--profile-transition-spring), transform var(--profile-transition-smooth), border-radius var(--profile-transition-smooth)",
          }}
        >
          <div className='flex items-center gap-0 p-[7px] w-full pointer-events-auto'>
            {canVoiceCall && (
              <button
                type='button'
                onClick={handleTalkClick}
                className='flex text-lg items-center gap-1 py-3 rounded-[9381875px] font-medium btn-active whitespace-nowrap overflow-hidden transition-all'
                style={{
                  maxWidth: inputValue ? "0px" : "120px",
                  paddingLeft: inputValue ? "0px" : "12px",
                  paddingRight: inputValue ? "0px" : "16px",
                  opacity: inputValue ? 0 : 1,
                  transform: inputValue ? "scale(0)" : "scale(1)",
                  transition: `all cubic-bezier(0.16, 1, 0.3, 1) 0.4s`,
                }}
              >
                <CallIcon className='size-7 flex-shrink-0 text-white' />
                <span className='animate-text-collapse overflow-hidden text-white hidden sm:block'>
                  Talk
                </span>
              </button>
            )}
            <CustomInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              questions={questions.map((q) => q.question)}
              currentQuestionIndex={currentQuestionIndex}
              placeholder={`Ask ${firstName} a question`}
              autoFocus
            />
          </div>
        </div>
        <div
          className={cn(
            "hidden sm:flex w-full px-5f relative z-10 pl-5 justify-center sm:justify-start tracking-tight items-center gap-1 text-sand-11/70 text-[13px] pt-[16px] pb-[16px] pointer-events-none",
            !hasScrolled && "animate-fade-in-message opacity-0"
          )}
          style={
            hasScrolled
              ? {
                  opacity: isAtTop ? 1 : 0,
                  transform: isAtTop ? "translateY(0)" : "translateY(10px)",
                  transition:
                    "opacity 0.3s ease, transform 0.3s ease, padding-top 0.3s ease, padding-bottom 0.3s ease",
                  pointerEvents: isAtTop ? "auto" : "none",
                  paddingTop: isAtTop ? "16px" : "0px",
                  paddingBottom: isAtTop ? "16px" : "0px",
                }
              : undefined
          }
        >
          <ShieldCheckIcon className='size-4' />
          <span>{firstName}'s Delphi will answer your calls & messages</span>
        </div>
        <div
          className='absolute z-0 -ml-5 -mr-5 inset-0 -mt-10 -mb-10'
          style={{
            background:
              "linear-gradient(to top, var(--profile-bg) 50%, transparent 100%)",
          }}
        />
        <style jsx>{`
          @keyframes fade-in-message {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-message {
            animation: fade-in-message 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s
              forwards;
          }

          .animate-text-collapse {
            transition:
              max-width var(--profile-transition-spring),
              opacity var(--profile-transition-spring);
          }
        `}</style>
      </div>
    </>
  );
}

// Main Component
export function ProfileChatInput(props: ProfileChatInputProps) {
  // Use Tailwind's md breakpoint (768px)
  const isMobile = useMediaQuery("(max-width: 767px)");

  return isMobile ? (
    <ProfileChatInputMobile {...props} />
  ) : (
    <ProfileChatInputDesktop {...props} />
  );
}
