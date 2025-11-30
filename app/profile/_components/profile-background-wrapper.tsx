"use client";

import { useEffect } from "react";

interface ProfileBackgroundWrapperProps {
  children: React.ReactNode;
}

/**
 * Client component that sets body/html background for iOS Safari compatibility.
 * This prevents white background from showing on overscroll/bounce.
 * Uses CSS class from theme.css for automatic light/dark mode support.
 */
export function ProfileBackgroundWrapper({
  children,
}: ProfileBackgroundWrapperProps) {
  useEffect(() => {
    // Add profile background class to html element
    // This applies var(--profile-bg) which automatically handles light/dark mode
    document.documentElement.classList.add("profile-page-bg");

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove("profile-page-bg");
    };
  }, []);

  return <>{children}</>;
}
