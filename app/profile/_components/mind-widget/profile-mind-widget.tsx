import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

function ScoreContent({
  mindScore,
  shouldRollIn,
}: {
  mindScore: number;
  shouldRollIn?: boolean;
}) {
  return (
    <motion.h1
      key='score'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%] dark:text-white'
      initial={
        shouldRollIn
          ? {
              y: 20,
              opacity: 0,
              filter: "blur(10px)",
              fontSize: "16px",
            }
          : { opacity: 0, fontSize: "16px" }
      }
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: "16px",
      }}
      exit={{ opacity: 0 }}
      transition={
        shouldRollIn ? { duration: 0.2, ease: "easeInOut" } : SPRING_CONFIG
      }
    >
      {mindScore}
    </motion.h1>
  );
}

interface ProfileMindWidgetProps {
  mindScore: number;
}

export function ProfileMindWidget({ mindScore }: ProfileMindWidgetProps) {
  const [widgetExpanded, setWidgetExpanded] = useState<boolean>(false);
  const handleExpandWidget = () => {
    setWidgetExpanded((prev) => !prev);
  };
  return (
    <motion.div
      className='flex items-center justify-center relative w-full '
      initial={false}
      transition={SPRING_CONFIG}
    >
      {/* Outer border */}
      <motion.div
        className='relative rounded-4xl flex flex-col items-center max-w-[400px] bg-sand-1/80 dark:bg-sand-4/90'
        animate={{
          width: widgetExpanded ? "100%" : "fit-content",
          height: widgetExpanded ? "240px" : "fit-content",
          paddingTop: widgetExpanded ? "4px" : "0px",
        }}
        transition={SPRING_CONFIG}
      >
        {/* Inner widget: Widget that contains the label or score. */}
        <motion.div
          className='shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)] overflow-hidden bg-black/87 border-white/20 dark:border-white/3 dark:bg-black/60 z-10 flex flex-col items-center justify-center relative hover:scale-110 transition-all duration-100 ease-in cursor-pointer'
          initial={{
            width: "fit-content",
            height: "40px",
            minWidth: "52px",
            borderWidth: 0,
            borderRadius: "999px",
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          animate={{
            width: "fit-content",
            height: "40px",
            minWidth: "52px",
            borderWidth: 0,
            borderRadius: "999px",
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          transition={{ duration: 0.2, ease: "easeIn" }}
          onClick={handleExpandWidget}
        >
          <ScoreContent mindScore={mindScore} shouldRollIn={true} />

          <motion.div
            className='rounded-full absolute'
            initial={{
              top: "",
              left: "",
              width: "0px",
              height: "0px",
              filter: "blur(0px)",
              boxShadow:
                "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
            }}
            animate={{
              top: "1px",
              left: "1px",
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              filter: "blur(3px)",
              boxShadow:
                "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
            }}
            transition={SPRING_CONFIG}
          />
        </motion.div>
        {/* Mind Area Inner */}
      </motion.div>
    </motion.div>
  );
}
