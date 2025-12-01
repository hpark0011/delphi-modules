"use client";

import type { ComponentType } from "react";

import {
  FacebookIcon,
  GlobusIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YoutubeIcon,
} from "@icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { getFirstName } from "@/lib/utils";
import type { Socials } from "@/app/profile/_lib/types";

interface ProfileSocialsProps {
  socials: Socials;
  name: string;
}

interface SocialConfig {
  icon: ComponentType<{ className?: string }>;
  label: string;
}

type SocialPlatform = Exclude<keyof NonNullable<Socials>, "extras">;

const SOCIAL_CONFIG: Record<SocialPlatform, SocialConfig> = {
  x: { icon: XIcon, label: "X" },
  instagram: { icon: InstagramIcon, label: "Instagram" },
  linkedin: { icon: LinkedInIcon, label: "LinkedIn" },
  website: { icon: GlobusIcon, label: "Website" },
  facebook: { icon: FacebookIcon, label: "Facebook" },
  youtube: { icon: YoutubeIcon, label: "YouTube" },
  tiktok: { icon: TikTokIcon, label: "TikTok" },
  github: { icon: GlobusIcon, label: "GitHub" },
  medium: { icon: GlobusIcon, label: "Medium" },
  substack: { icon: GlobusIcon, label: "Substack" },
};

export function ProfileSocials({ socials, name }: ProfileSocialsProps) {
  if (!socials) return null;

  const socialEntries = (
    Object.entries(socials).filter(([key]) => key !== "extras") as Array<
      [SocialPlatform, string]
    >
  ).filter(([, url]) => url && url.trim() !== "");

  const extras = socials.extras ?? [];

  if (socialEntries.length === 0 && extras.length === 0) return null;

  const firstName = getFirstName(name);

  return (
    <div>
      <h2 id='socials-section' className='pb-4 text-md text-sand-12/60'>
        Follow {firstName} for more...
      </h2>
      <TooltipProvider delayDuration={200}>
        <div className='flex flex-wrap gap-2 -ml-1'>
          {socialEntries.map(([platform, url]) => {
            const { icon: Icon, label } = SOCIAL_CONFIG[platform];
            const tooltipContent = getSocialTooltipContent(url, platform);

            return (
              <Tooltip key={platform}>
                <TooltipTrigger asChild>
                  <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    data-cursor-scale
                    className='rounded-2xl bg-sand-10/5 p-1.5 text-sand-12/70 transition-colors hover:bg-sand-10/10 hover:text-sand-12'
                    aria-label={label}
                  >
                    <Icon className='size-5' />
                  </a>
                </TooltipTrigger>
                <TooltipContent side='bottom' className='text-sm'>
                  {tooltipContent}
                </TooltipContent>
              </Tooltip>
            );
          })}
          {extras.map((extraUrl, index) => {
            const tooltipContent = getExtraTooltipContent(extraUrl);
            return (
              <Tooltip key={`extra-${index}`}>
                <TooltipTrigger asChild>
                  <a
                    href={extraUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    data-cursor-scale
                    className='rounded-2xl bg-sand-10/5 p-1.5 text-sand-12/70 transition-colors hover:bg-sand-10/10 hover:text-sand-12'
                    aria-label={tooltipContent}
                  >
                    <GlobusIcon className='size-5' />
                  </a>
                </TooltipTrigger>
                <TooltipContent side='bottom' className='text-sm'>
                  {tooltipContent}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}

function extractLinkedInHandle(pathname: string): string {
  // Extract the handle after /in/ and make it lowercase
  const handle = pathname
    .replace(/^\/in\//, "")
    .replace(/\/+$/, "")
    .split("/")[0]
    .toLowerCase();
  return handle;
}

function extractUsernameFromPath(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, "").split("/")[0];
}

function removeWwwPrefix(hostname: string): string {
  return hostname.replace(/^www\./, "");
}

function formatUsernameWithAtSymbol(username: string): string {
  // If username already starts with @, don't add another one
  return username.startsWith("@") ? username : `@${username}`;
}

function getCleanDomain(hostname: string): string {
  return removeWwwPrefix(hostname);
}

function getSocialTooltipContent(
  url: string,
  platform: keyof NonNullable<Socials>
): React.ReactNode {
  try {
    const urlObj = new URL(url);

    if (platform === "website") {
      return getCleanDomain(urlObj.hostname);
    }

    if (platform === "linkedin") {
      const handle = extractLinkedInHandle(urlObj.pathname);
      return (
        <>
          <span className='opacity-50'>/in/</span>
          {handle}
        </>
      );
    }

    const username = extractUsernameFromPath(urlObj.pathname);
    return username
      ? formatUsernameWithAtSymbol(username)
      : getCleanDomain(urlObj.hostname);
  } catch {
    return url;
  }
}

function getExtraTooltipContent(url: string): string {
  try {
    const urlObj = new URL(url);
    return getCleanDomain(urlObj.hostname);
  } catch {
    return url;
  }
}
