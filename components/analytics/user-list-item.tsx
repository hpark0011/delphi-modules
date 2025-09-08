import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserListItemProps {
  name: string;
  status: string;
  avatarUrl?: string;
  messageCount: number;
  isActive?: boolean;
}

export function UserListItem({
  name,
  status,
  avatarUrl,
  messageCount,
  isActive = false,
}: UserListItemProps) {
  return (
    <div className='flex items-center justify-between p-2 rounded-lg'>
      <div className='flex items-center gap-2'>
        <Avatar className='h-9 w-9 m-auto'>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='font-medium text-text-primary text-sm'>{name}</span>
          <div className='flex items-center gap-1'>
            {isActive && <span className='h-2 w-2 rounded-full bg-[#09CE6B]' />}
            <span className={cn("text-[13px] leading-[1.2] text-[#8D8D86]")}>
              {status}
            </span>
          </div>
        </div>
      </div>
      <span className='text-sm font-normal text-[#8D8D86]'>{messageCount}</span>
    </div>
  );
}
