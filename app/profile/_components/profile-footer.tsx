import Link from "next/link";

import { getFirstName } from "@/features/profile/lib/utils";

interface ProfileFooterProps {
  name: string;
}

export function ProfileFooter({ name }: ProfileFooterProps) {
  const firstName = getFirstName(name);

  return (
    <footer className="pt-[25px] w-fit pb-4 text-left text-xs text-sand-11/70">
      <p className="">
        © {new Date().getFullYear()} {firstName} & Delphi {" · "}{" "}
        <Link
          href="/terms-of-use"
          data-cursor-scale
          className="hover:text-sand-12 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </Link>
        {" · "}
        <Link
          href="/privacy-policy"
          data-cursor-scale
          className="hover:text-sand-12 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </Link>
      </p>
    </footer>
  );
}
