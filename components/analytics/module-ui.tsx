import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='card'
      className={cn(
        "bg-card flex flex-col rounded-xl shadow-card-primary",
        className
      )}
      {...props}
    />
  );
}
