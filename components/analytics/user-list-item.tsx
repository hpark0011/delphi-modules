import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserListItemProps {
  name: string;
  status: string;
  statusColor?: string;
  avatarUrl?: string;
  messageCount: number;
  isActive?: boolean;
}

export function UserListItem({
  name,
  status,
  statusColor = "text-[#A3A39C]",
  avatarUrl,
  messageCount,
  isActive = false,
}: UserListItemProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
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
          <div className='flex items-center gap-1.5'>
            {isActive && <span className='h-2 w-2 rounded-full bg-[#34C759]' />}
            <span
              className={cn(
                "text-sm",
                isActive ? "text-[#34C759]" : statusColor
              )}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
      <span className='text-sm font-normal text-[#1C1C17]'>{messageCount}</span>
    </div>
  );
}
