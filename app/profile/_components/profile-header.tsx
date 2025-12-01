"use client";

import { Link } from "next-view-transitions";

// import { Button, DelphiCurrentIcon } from "@delphi/ui";
import { Button } from "@/components/ui/button";

import { VerticalDivider } from "./vertical-divider";
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
  return (
    <>
      <ProfileWarning slug={slug} customWarning={customWarning?.trim()} />

      <header className='pointer-events-none relative z-10 w-full select-none pb-10'>
        <nav className=' pointer-events-none flex items-center justify-between px-6 py-6 [&>*]:pointer-events-auto'>
          <div className='flex items-center gap-3'>
            <Link
              href='/explore'
              className='flex items-center gap-3 group pr-2 pl-2 transition-colors  transform text-sand-12/50 hover:text-sand-12'
            >
              Delphi
              {/* <DelphiCurrentIcon className='h-3.5' /> */}
            </Link>
            <VerticalDivider className='mr-2' />
          </div>
          <div className='flex items-center gap-5'>
            <Button
              variant='ghost'
              size='sm'
              className='transition-colors font-normal text-base backdrop-blur-sm bg-sand-10/10 text-sand-11 hover:text-sand-12 hover:bg-sand-10/15'
            >
              Share
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
