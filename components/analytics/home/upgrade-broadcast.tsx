import { Button } from "@/components/ui/button";
import { PodcastIcon } from "lucide-react";
import { AnalyticsSectionWrapper } from "../dashboard-ui";
import { cn } from "@/lib/utils";

export function UpgradeBroadcast({
  setUpgradeClicked,
  variant = "small",
}: {
  setUpgradeClicked: (upgradeClicked: boolean) => void;
  variant?: "small" | "full";
}) {
  return (
    <AnalyticsSectionWrapper className='rounded-[20px]'>
      <div
        className={cn(
          "flex flex-col gap-4 relative w-full h-full rounded-[20px] p-3 py-3",
          variant === "full" && "justify-center items-center"
        )}
      >
        {variant === "full" && (
          <div className='font-medium text-[#8D8D86] dark:text-neutral-400 text-center'>
            Get more engagement with broadcast
          </div>
        )}
        {variant === "small" && (
          <p className='text-sm text-[#8D8D86] leading-[1.3] px-1'>
            Your engagement is dropping. Try out broadcast to boost your
            engagement.{" "}
            <span className='text-blue-400 hover:opacity-70 transition-opacity cursor-pointer'>
              Learn more
            </span>
          </p>
        )}
        <Button
          variant='primary'
          size='sm'
          className={cn("rounded-full", variant === "full" && "w-fit")}
          onClick={() => setUpgradeClicked(true)}
        >
          <div className='flex flex-row gap-1 items-center'>
            <PodcastIcon className='size-4' />
            Try Broadcast
          </div>
        </Button>
      </div>
    </AnalyticsSectionWrapper>
  );
}
