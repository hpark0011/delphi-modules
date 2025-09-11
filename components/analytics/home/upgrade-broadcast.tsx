import { Button } from "@/components/ui/button";
import React from "react";
import { PodcastIcon } from "lucide-react";

export function UpgradeBroadcast() {
  return (
    <div className='flex flex-col gap-2 relative w-full h-full'>
      <p className='text-sm text-[#8D8D86]'>
        Your engagement is dropping. Try out broadcast to boost your engagement.
      </p>
      <Button variant='primary' size='sm'>
        <div className='flex flex-row gap-1 items-center'>
          <PodcastIcon className='size-4' />
          Try Broadcast
        </div>
      </Button>
    </div>
  );
}
