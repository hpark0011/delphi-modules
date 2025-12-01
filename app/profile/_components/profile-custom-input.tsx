"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { ArrowUpIcon } from "@icons";
import { AnimatedText, KeyboardKey } from "@delphi/ui";

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  questions: string[];
  currentQuestionIndex: number;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  compact?: boolean;
  hideSubmitButton?: boolean;
}

export interface CustomInputHandle {
  focus: () => void;
  moveCursorToEnd: () => void;
}

export const CustomInput = forwardRef<CustomInputHandle, CustomInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      onFocus,
      onBlur,
      onKeyDown,
      questions,
      currentQuestionIndex,
      placeholder,
      autoFocus = false,
      className = "",
      compact = false,
      hideSubmitButton = false,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(autoFocus);
    const [caretPosition, setCaretPosition] = useState(0);
    const [cursorIndex, setCursorIndex] = useState(0);
    const [caretVisible, setCaretVisible] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      moveCursorToEnd: () => {
        if (inputRef.current) {
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
          updateCursorPosition();
        }
      },
    }));

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      setIsFocused(true);
      updateCursorPosition();
      onFocus?.();

      setTimeout(() => {
        window.scrollTo(scrollX, scrollY);
      }, 0);
    };

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, [autoFocus]);

    useEffect(() => {
      if (inputRef.current && document.activeElement === inputRef.current) {
        const newLength = value.length;
        requestAnimationFrame(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(newLength, newLength);
            updateCursorPosition();
          }
        });
      }
    }, [value]);

    useEffect(() => {
      if (measureRef.current && inputRef.current) {
        const measuredWidth = measureRef.current.offsetWidth;
        const inputWidth = inputRef.current.offsetWidth;
        const scrollLeft = inputRef.current.scrollLeft;

        const visiblePosition = measuredWidth - scrollLeft;

        const leftBound = -5;
        const rightBound = inputWidth - 20;

        if (visiblePosition < leftBound || visiblePosition > rightBound) {
          setCaretVisible(false);
        } else {
          setCaretVisible(true);
          setCaretPosition(visiblePosition);
        }
      }
    }, [value, cursorIndex]);

    useEffect(() => {
      const input = inputRef.current;
      if (!input) return;

      const handleScroll = () => {
        updateCursorPosition();
      };

      input.addEventListener("scroll", handleScroll);
      return () => input.removeEventListener("scroll", handleScroll);
    }, []);

    const updateCursorPosition = () => {
      if (inputRef.current) {
        const newIndex = inputRef.current.selectionStart || 0;
        setCursorIndex(newIndex);

        if (newIndex === value.length && value.length > 0) {
          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.scrollLeft = inputRef.current.scrollWidth;
            }
          });
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab" && value === "") {
        e.preventDefault();
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion) {
          onChange(currentQuestion);
        }
        return;
      }

      if (onKeyDown) {
        onKeyDown(e);
        if (e.defaultPrevented) {
          return;
        }
      }

      if (e.key === "Enter") {
        e.preventDefault();
        onSubmit();
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit();
    };

    const textSize = compact ? "text-base" : "text-lg";
    const caretHeight = compact ? "h-5" : "h-6";

    return (
      <form
        onSubmit={handleSubmit}
        className={`flex flex-1 items-center gap-0 ${className}`}
      >
        <div className='flex-1 relative flex items-center gap-1 justify-center min-w-0'>
          <span
            ref={measureRef}
            className={`absolute invisible ${textSize} whitespace-pre`}
            style={{ left: "12px" }}
          >
            {value.substring(0, cursorIndex)}
          </span>
          <input
            ref={inputRef}
            type='text'
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              updateCursorPosition();
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={updateCursorPosition}
            onClick={updateCursorPosition}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onScroll={updateCursorPosition}
            className={`w-full ${textSize} bg-transparent text-sand-12 border-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 relative z-10 caret-transparent ${compact ? "px-3" : ""}`}
            style={{ transform: "translateZ(0)" }}
          />
          {isFocused && caretVisible && (
            <div
              className='absolute pointer-events-none flex items-center transition-all duration-75'
              style={{
                left: `${caretPosition + 12}px`,
              }}
            >
              <div
                className={`w-[2.5px] ${caretHeight} rounded-full animate-blink`}
                style={{ backgroundColor: "var(--profile-accent)" }}
              />
            </div>
          )}
          {!value && (
            <div className='ml-3 absolute inset-0 pointer-events-none flex items-center pr-1'>
              {questions.length > 0 ? (
                <AnimatedText
                  animationKey={currentQuestionIndex}
                  className={`${compact ? "text-[15px]" : "text-[16px]"} text-sand-11/50 flex items-center gap-1 min-w-0`}
                >
                  <span className='leading-[1.3] flex-1 overflow-hidden text-ellipsis truncate'>
                    {questions[currentQuestionIndex]}
                  </span>
                  <KeyboardKey className='flex-shrink-0 ml-2 bg-transparent border-b-1 text-sand-11/80 hidden sm:block'>
                    <span className='text-sand-11/50'>TAB</span>
                  </KeyboardKey>
                </AnimatedText>
              ) : (
                <span
                  className={`${compact ? "text-[15px]" : "text-[16px]"} text-sand-11/50 leading-[1.3]`}
                >
                  {placeholder}
                </span>
              )}
            </div>
          )}
        </div>

        {!hideSubmitButton && (
          <>
            <div className='whitespace-nowrap pr-3'></div>
            <button
              type='submit'
              className={`flex items-center justify-center ${compact ? "size-11" : "size-12"} rounded-full transition-colors ${
                value
                  ? "btn-active-accent text-white"
                  : "btn-inactive text-sand-11"
              }`}
            >
              <ArrowUpIcon className='size-5' />
            </button>
          </>
        )}
        <style jsx>{`
          @keyframes blink {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }

          .animate-blink {
            animation: blink 1s ease-in-out infinite;
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
      </form>
    );
  }
);

CustomInput.displayName = "CustomInput";
