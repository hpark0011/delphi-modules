import { MindStatusIcon } from "@/components/mind-status-notification";
import { Button } from "@/components/ui/button";
import { HomeIcon, PlusLargeIcon, PlusSmallIcon } from "@/delphi-ui/icons";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMindDialog } from "@/components/mind-dialog/mind-dialog";

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
  level: string;
}

export function ProfileMindWidget({
  mindScore,
  level,
}: ProfileMindWidgetProps) {
  const [widgetExpanded, setWidgetExpanded] = useState<boolean>(false);
  const handleExpandWidget = () => {
    setWidgetExpanded((prev) => !prev);
  };
  const { queueStatus } = useTrainingStatus();
  const { openWithTab } = useMindDialog();

  return (
    <motion.div
      className='flex items-center justify-center relative w-full '
      initial={false}
      transition={SPRING_CONFIG}
    >
      {/* Outer box */}
      <motion.div
        className='relative rounded-4xl flex flex-col items-center max-w-[400px] bg-sand-1/80 dark:bg-sand-4/90 backdrop-blur-lg'
        animate={{
          width: widgetExpanded ? "100%" : "fit-content",
          height: widgetExpanded ? "200px" : "fit-content",
          paddingTop: widgetExpanded ? "8px" : "0px",
          boxShadow: "var(--profile-shadow-container)",
        }}
        transition={SPRING_CONFIG}
      >
        {/* Inner widget: Widget that contains the label or score. */}
        <motion.div
          className='shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)] overflow-hidden bg-black/87 border-white/20 dark:border-white/3 dark:bg-black/60 z-10 flex flex-col items-center justify-center relative hover:scale-110 transition-all duration-100 ease-in cursor-pointer min-h-[40px]'
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

          {/* Mind Area Inner */}
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

        {widgetExpanded && (
          <>
            <div className='h-full py-2 pt-5 m-auto flex flex-col items-center justify-center'>
              <span className='text-text-tertiary text-xl'>{level}</span>
              {/* <div className='text-text-muted leading-[120%]'>
                Mind score left until next level
              </div> */}
            </div>
            <motion.div className='flex flex-row h-full p-4 gap-1 left-0 box-border w-full items-end'>
              <Button
                size='sm'
                className='h-10 text-[15px] relative gap-1.5 rounded-full cursor-pointer flex-1 shadow-none bg-sand-8/20 text-gray-500 hover:bg-sand-8/10 hover:shadow-none'
                variant='primary'
              >
                <HomeIcon className='size-5' />
                <span>Home</span>
              </Button>
              <Button
                size='sm'
                className='h-10 text-[15px] relative gap-1.5 rounded-full cursor-pointer flex-1 shadow-none bg-sand-8/20 text-gray-500 hover:bg-sand-8/10 hover:shadow-none'
                variant='primary'
                onClick={() => openWithTab("add-knowledge")}
              >
                <PlusLargeIcon className='text-gray-500 size-4.5' />
                <span>Add</span>
              </Button>
              {/* <Button
                size='sm'
                className='h-10 text-[15px] relative gap-1.5 has-[>svg]:pl-0.5 pl-2 rounded-full cursor-pointer flex-1'
                variant='glossy'
              >
                <MindStatusIcon
                  status={queueStatus}
                  className='size-5 text-white/50'
                />
                <span>Preview</span>
              </Button> */}
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
