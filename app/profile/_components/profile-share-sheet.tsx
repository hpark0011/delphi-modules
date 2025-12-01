"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  CheckmarkIcon,
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  SlackIcon,
  SquareBehindSquareIcon,
  WhatsAppIcon,
  XIcon,
} from "@icons";
import { QRCode } from "@delphi/ui";

import { DetachedSheet } from "../ui/detached-sheet";

const ICON_SIZE = "size-6";
const BUTTON_BASE_CLASSES =
  "flex items-center justify-center rounded-full bg-sand-10/10 transition-colors hover:bg-sand-10/20 sm:h-[55px] h-[46px] sm:w-[55px] w-[46px]";

interface ProfileShareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  headline: string | null;
  slug: string;
}

export function ProfileShareSheet({
  open,
  onOpenChange,
  name,
  headline,
  slug,
}: ProfileShareSheetProps) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState("");
  const shareText = `Check out ${name} on Delphi: ${shareUrl}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleSlackShare = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(shareText);
      window.open("slack://open", "_blank");
      setTimeout(() => {
        window.open("https://slack.com/", "_blank");
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      window.open("https://slack.com/", "_blank");
    }
  };

  const shareLinks = {
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out ${name} on Delphi`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    instagram: "https://www.instagram.com/",
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    email: `mailto:?subject=${encodeURIComponent(`Check out ${name} on Delphi`)}&body=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <DetachedSheet.Stack.Root>
      <DetachedSheet.Root
        presented={open}
        onPresentedChange={handleOpenChange}
        forComponent='closest'
      >
        <DetachedSheet.Portal>
          <DetachedSheet.View>
            <DetachedSheet.Backdrop />
            <DetachedSheet.Content className='sm:!max-w-[480px] !max-w-full'>
              <div className='flex flex-col p-3 pb-0 pt-0'>
                <DetachedSheet.Handle className='mx-auto mt-4 mb-2' />
                <div className='flex flex-col gap-6 p-2 pb-5'>
                  {/* Header with Profile Info */}
                  <div className='flex items-center gap-4 ml-3 mb-1'>
                    <div className='flex-1 min-w-0 flex flex-row gap-3'>
                      <div className='flex flex-col min-w-0 flex-1'>
                        <h2 className='text-2xl font-semibold text-gray-900 truncate'>
                          {name}
                        </h2>
                        {headline && (
                          <p className='text-base text-gray-600 truncate'>
                            {headline}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='relative bg-white rounded-lg mr-2 -ml-px p-1'>
                      <QRCode
                        value={shareUrl}
                        size={64}
                        fgColor='#000000'
                        bgColor='#FFFFFF'
                        className='opacity-90'
                        margin={0}
                      />
                    </div>
                  </div>

                  <div className='flex items-center justify-between gap-3'>
                    <a
                      href={shareLinks.x}
                      target='_blank'
                      rel='noopener noreferrer'
                      data-cursor-scale
                      className={BUTTON_BASE_CLASSES}
                      aria-label='Share on X'
                    >
                      <XIcon className={`${ICON_SIZE} text-gray-700`} />
                    </a>
                    <a
                      href={shareLinks.facebook}
                      target='_blank'
                      rel='noopener noreferrer'
                      data-cursor-scale
                      className={BUTTON_BASE_CLASSES}
                      aria-label='Share on Facebook'
                    >
                      <FacebookIcon className={`${ICON_SIZE} text-gray-700`} />
                    </a>
                    <a
                      href={shareLinks.instagram}
                      target='_blank'
                      rel='noopener noreferrer'
                      data-cursor-scale
                      className={BUTTON_BASE_CLASSES}
                      aria-label='Share on Instagram'
                    >
                      <InstagramIcon className={`${ICON_SIZE} text-gray-700`} />
                    </a>
                    <a
                      href='#'
                      onClick={handleSlackShare}
                      data-cursor-scale
                      className={BUTTON_BASE_CLASSES}
                      aria-label='Share on Slack'
                    >
                      <SlackIcon className={`${ICON_SIZE} text-gray-700`} />
                    </a>
                    <a
                      href={shareLinks.whatsapp}
                      target='_blank'
                      rel='noopener noreferrer'
                      data-cursor-scale
                      className={BUTTON_BASE_CLASSES}
                      aria-label='Share on WhatsApp'
                    >
                      <WhatsAppIcon className={`${ICON_SIZE} text-gray-700`} />
                    </a>
                    <a
                      href={shareLinks.email}
                      data-cursor-scale
                      className={BUTTON_BASE_CLASSES}
                      aria-label='Share via Email'
                    >
                      <EmailIcon className={`${ICON_SIZE} text-gray-700`} />
                    </a>
                  </div>

                  {/* Copyable URL */}
                  <button
                    type='button'
                    onClick={handleCopyUrl}
                    data-cursor-scale
                    className='flex items-center gap-3 bg-sand-10/10 rounded-full p-2 pl-5 pr-3 w-full transition-all hover:bg-sand-10/15'
                    aria-label={copied ? "URL copied" : "Copy URL"}
                  >
                    <div className='flex-1 text-left min-w-0'>
                      <p className='text-base text-gray-700 truncate'>
                        {shareUrl.replace(/^https?:\/\//, "")}
                      </p>
                    </div>
                    <div className='relative size-10 rounded-xl flex items-center justify-center flex-shrink-0'>
                      <CheckmarkIcon
                        className={cn(
                          "absolute inset-0 m-auto size-5 text-sand-11 transition-all duration-300 ease-out",
                          copied
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-75"
                        )}
                      />
                      <SquareBehindSquareIcon
                        className={cn(
                          "absolute inset-0 m-auto size-5 text-gray-700 transition-all duration-300 ease-out",
                          copied
                            ? "opacity-0 scale-75"
                            : "opacity-100 scale-100"
                        )}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </DetachedSheet.Content>
          </DetachedSheet.View>
        </DetachedSheet.Portal>
      </DetachedSheet.Root>
    </DetachedSheet.Stack.Root>
  );
}
