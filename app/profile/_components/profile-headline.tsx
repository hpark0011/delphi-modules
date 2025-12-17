import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleCheckIcon as VerifiedIcon } from "@icons";

import type { Organization } from "@/app/profile/_lib/types";

interface ProfileHeadlineProps {
  headline: string | null;
  organizations: Organization[];
}

export function ProfileHeadline({
  headline,
  organizations,
}: ProfileHeadlineProps) {
  if (!headline) return null;

  const primaryOrganization = organizations[0];

  return (
    <div
      className='text-md flex gap-2 text-text-secondary pb-5'
      style={{ marginLeft: "-1px" }}
    >
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            {primaryOrganization?.iconUrl ? (
              <div className='relative -mt-0.5 mr-1'>
                <Image
                  src={primaryOrganization?.iconUrl}
                  alt={primaryOrganization?.name}
                  width={22}
                  height={22}
                  className='inline-block size-[22px] rounded-[6px] p-1'
                  style={{
                    boxShadow: "var(--profile-shadow-org-icon)",
                  }}
                />
                <div className='absolute right-[-3px] bottom-[-2px] bg-white h-[10px] w-[10px] rounded-full z-10' />
                <div className='absolute right-[-6px] bottom-[-4px] rounded-[20px] z-20'>
                  <VerifiedIcon
                    className={`size-[16px] text-blue-500 rounded-full`}
                  />
                </div>
              </div>
            ) : (
              <div className='relative -mt-0.5 flex items-center justify-center'>
                <div className='absolute right-[6px] bottom-[8px] bg-white h-[10px] w-[10px] rounded-full z-0' />
                <VerifiedIcon className='size-[22px] text-blue-10 rounded-full relative z-10' />
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent side='bottom' className='text-sm'>
            Profile Verified with ID
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div>{headline}</div>
    </div>
  );
}
