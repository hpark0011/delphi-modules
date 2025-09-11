import { Button } from "@/components/ui/button";
import React from "react";
import { PodcastIcon, Sailboat } from "lucide-react";
import { AnalyticsSectionWrapper } from "../dashboard-ui";

export function UpgradeBroadcast() {
  return (
    <AnalyticsSectionWrapper className='rounded-[20px]'>
      <div className='flex flex-col gap-4 relative w-full h-full rounded-[20px] p-3 py-3'>
        <p className='text-sm text-[#8D8D86] leading-[1.3] px-1'>
          Your engagement is dropping. Try out broadcast to boost your
          engagement.{" "}
          <span className='text-blue-400 hover:opacity-70 transition-opacity cursor-pointer'>
            Learn more
          </span>
        </p>
        <Button variant='primary' size='sm' className='rounded-full'>
          <div className='flex flex-row gap-1 items-center'>
            <PodcastIcon className='size-4' />
            Try Broadcast
          </div>
        </Button>
      </div>
    </AnalyticsSectionWrapper>
  );
}
