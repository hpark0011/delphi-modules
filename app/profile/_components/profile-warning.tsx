"use client";

import { useIsClient, useSessionStorage } from "@uidotdev/usehooks";

import { Disclaimer } from "@delphi/views";

type WarningAcknowledgements = Record<string, string>;

interface ProfileWarningProps {
  customWarning?: string;
  slug: string;
}

function Content({ customWarning, slug }: ProfileWarningProps) {
  const [acknowledgements, setAcknowledgements] =
    useSessionStorage<WarningAcknowledgements>("warningAcknowledged", {});

  if (!customWarning || acknowledgements[slug] === customWarning) {
    return null;
  }

  return (
    <>
      <div className="fixed z-50 w-full">
        <Disclaimer
          customWarning={customWarning}
          onClick={() =>
            setAcknowledgements({ ...acknowledgements, [slug]: customWarning })
          }
        />
      </div>

      <div className="hidden h-9 w-full flex-none sm:block" />
    </>
  );
}

export function ProfileWarning({ customWarning, slug }: ProfileWarningProps) {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <Content customWarning={customWarning} slug={slug} />;
}
