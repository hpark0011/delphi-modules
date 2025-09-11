import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function ModuleCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card'
      className={cn(
        "bg-card flex flex-col rounded-xl shadow-card-primary relative overflow-hidden w-full ",
        className
      )}
      {...props}
    />
  );
}

export function ModuleCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-row text-sm leading-[1] text-[#63635E] justify-between p-4 py-3.5 relative h-[46px]",
        className
      )}
      {...props}
    />
  );
}

export function ModuleCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col p-2", className)} {...props} />;
}

export function ModuleViewMoreButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <div className='flex justify-center absolute bottom-0 p-3 left-0 w-full bg-gradient-to-t from-card to-transparent'>
      <Button
        variant='outline'
        className={cn(
          "h-8 px-3.5 rounded-full border-[#E5E5E0] font-medium text-[#1C1C17] hover:bg-gray-50 bg-base",
          className
        )}
        {...props}
      />
    </div>
  );
}
