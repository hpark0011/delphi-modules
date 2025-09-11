"use client";
import { motion } from "framer-motion";
import { Icon, IconName } from "@/components/ui/icon";
import Link from "next/link";

interface EmptyModuleStateProps {
  icon: IconName;
  title: string;
  description: string;
  learnMoreLink?: string;
  buttonText: string;
  onButtonClick: () => void;
}

export function EmptyModuleState({
  icon,
  title,
  description,
  learnMoreLink,
  buttonText,
  onButtonClick,
}: EmptyModuleStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className='flex flex-col items-center justify-center py-8 px-4 translate-y-[-16px]'
    >
      <div className='flex items-center justify-center mb-2'>
        <Icon name={icon} className='w-8 h-8 text-neutral-300' />
      </div>
      <div className='flex flex-col items-center justify-center gap-1 px-4'>
        <p className='text-text-primary font-medium text-sm text-center'>
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
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onButtonClick}
        className='px-3 h-7 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-[#3C3C38] transition-colors shadow-xl'
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}
