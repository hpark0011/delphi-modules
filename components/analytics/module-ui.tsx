import * as React from "react";

import { cn } from "@/lib/utils";

export function ModuleCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card'
      className={cn(
        "bg-card flex flex-col rounded-xl shadow-card-primary relative overflow-hidden",
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
        "flex flex-row text-sm leading-[1] text-[#63635E] justify-between p-4 relative",
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
