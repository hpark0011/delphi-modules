"use client";

import { Link } from "next-view-transitions";
import { useState } from "react";

import { Button, DelphiCurrentIcon } from "@delphi/ui";
import { AuthMenu, isFeedbackHidden } from "@delphi/views";

import { VerticalDivider } from "@/features/profile/ui/vertical-divider";
import { sendFeedback } from "@/lib/api/analytics/feedback";
import { sendEmailOtpCode, verifyEmailOtpCode } from "@/lib/api/auth/email";
import { getOrCreateUser } from "@/lib/api/auth/flow";
import { useUser } from "@/lib/utils/useUser";
import { ProfileHistory } from "./profile-history";
import { ProfileShareSheet } from "./profile-share-sheet";
import { ProfileWarning } from "./profile-warning";

interface ProfileHeaderProps {
  slug: string;
  customWarning?: string | null;
  name: string;
  headline: string | null;
}

export function ProfileHeader({
  slug,
  customWarning,
  name,
  headline,
}: ProfileHeaderProps) {
  const [shareSheetOpen, setShareSheetOpen] = useState(false);

  function handleShare() {
    setShareSheetOpen(true);
  }

  return (
    <>
      <ProfileWarning slug={slug} customWarning={customWarning?.trim()} />

      <header className="pointer-events-none relative z-10 w-full select-none pb-10">
        <nav className=" pointer-events-none flex items-center justify-between px-6 py-6 [&>*]:pointer-events-auto">
          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="flex items-center gap-3 group pr-2 pl-2 transition-colors  transform text-sand-12/50 hover:text-sand-12"
            >
              <DelphiCurrentIcon className="h-3.5" />
            </Link>
            <VerticalDivider className="mr-2" />
            <ProfileHistory slug={slug} className="flex items-center gap-4" />
          </div>
          <div className="flex items-center gap-5">
            <Button
              variant="subtle"
              size="small"
              className="transition-colors font-normal text-base backdrop-blur-sm bg-sand-10/10 text-sand-11 hover:text-sand-12 hover:bg-sand-10/15"
              onClick={handleShare}
            >
              Share
            </Button>

            <AuthMenu
              useUser={useUser}
              api={{
                verifyEmailOtpCode,
                sendEmailOtpCode,
                getOrCreateUser,
                sendFeedback,
              }}
              hideFeedback={isFeedbackHidden(slug)}
              triggerClassName="flex items-center justify-center size-[38px] bg-sand-10/10 rounded-full [&_span]:!bg-transparent"
            />
          </div>
        </nav>
      </header>

      <ProfileShareSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        name={name}
        headline={headline}
        slug={slug}
      />
    </>
  );
}
