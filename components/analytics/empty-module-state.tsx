"use client";
import { motion } from "framer-motion";
import { Icon, IconName } from "@/components/ui/icon";
import Link from "next/link";

interface EmptyModuleStateProps {
  icon: IconName;
  title: string;
  description: string;
  learnMoreLink?: string;
  buttonText?: string;
  onButtonClick: () => void;
  error?: boolean;
}

export function EmptyModuleState({
  icon,
  title,
  description,
  learnMoreLink,
  buttonText,
  onButtonClick,
  error = false,
}: EmptyModuleStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`flex flex-col items-center justify-center py-8 px-4 h-full ${error ? "translate-y-[-8px]" : ""}`}
    >
      <div className='flex items-center justify-center mb-2'>
        <Icon
          name={icon}
          className={`w-8 h-8 ${error ? "text-[#E5484D]" : "text-neutral-300"}`}
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-1 px-4'>
        <p
          className={` font-medium text-sm text-center ${error ? "text-[#8D8D86]" : "text-text-primary"}`}
        >
          {title}
        </p>
        <p className={`text-[#8D8D86] text-sm mb-6 text-center`}>
          {description}
          {learnMoreLink && (
            <>
              {" "}
              <Link
                href={learnMoreLink}
                target='_blank'
                className='text-blue-500 hover:opacity-70'
              >
                Learn More
              </Link>
            </>
          )}
        </p>
      </div>
      {buttonText && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onButtonClick}
          className={
            error
              ? "px-3 h-7 border border-border-light text-text-primary rounded-full text-[13px] font-medium hover:bg-[#F5F5F5] dark:hover:bg-[#2C2C28] transition-colors"
              : "px-3 h-7 bg-primary text-primary-foreground rounded-full text-[13px] font-medium hover:bg-[#3C3C38] transition-colors shadow-xl"
          }
        >
          {buttonText}
        </motion.button>
      )}
    </motion.div>
  );
}
