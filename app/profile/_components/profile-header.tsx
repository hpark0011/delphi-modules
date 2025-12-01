"use client";

import { Link } from "next-view-transitions";

// import { Button, DelphiCurrentIcon } from "@delphi/ui";
import { Button } from "@/components/ui/button";

import { VerticalDivider } from "./vertical-divider";
import { DelphiCurrentIcon } from "@/delphi-ui/icons/DelphiCurrent";

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
      <header className='pointer-events-none relative z-10 w-full select-none pb-10'>
        <nav className=' pointer-events-none flex items-center justify-between px-6 py-6 [&>*]:pointer-events-auto'>
          <div className='flex items-center gap-3'>
            <Link
              href='/explore'
              className='flex items-center gap-3 group pr-2 pl-2 transition-colors  transform text-sand-12/50 hover:text-sand-12'
            >
              <DelphiCurrentIcon className='h-3.5 text-icon-dark' />
            </Link>
            <VerticalDivider className='mr-2' />
          </div>
          <div className='flex items-center gap-5'>
            <Button
              variant='secondary'
              size='sm'
              className='transition-colors font-normal bg-[#ECE6E3] rounded-full text-text-muted shadow-none h-12 text-[16px]'
            >
              <span className='text-[16px]'>Share</span>
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
