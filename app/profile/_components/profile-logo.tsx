"use client";

import { Link } from "next-view-transitions";

import { cn } from "@/lib/utils";
import { LogoIcon } from "@/icons";

interface ProfileLogoProps {
  className?: string;
}

export function ProfileLogo({ className }: ProfileLogoProps) {
  return (
    <Link
      href='/explore'
      role='navigation'
      aria-label='Delphi'
      className={cn(
        "delphi-header-logo 🔒 w-fit focus-visible:outline-none",
        className
      )}
    >
      <LogoIcon className={cn("text-orange-9 h-4", className)} />
    </Link>
  );
}
