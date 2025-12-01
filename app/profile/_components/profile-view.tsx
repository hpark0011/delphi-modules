import { ProfileBio } from "./profile-bio";
import { ProfileChatInput } from "./profile-chat-input";
import { ProfileFooter } from "./profile-footer";
import { ProfileHeader } from "./profile-header";
import { ProfileHeadline } from "./profile-headline";
import { ProfileImage } from "./profile-image";
import { ProfileName } from "./profile-name";
import { ProfileQuestions } from "./profile-questions";
import { ProfileSocials } from "./profile-socials";

import type {
  Profile,
  Organization,
  CloneOptions,
} from "@/app/profile/_lib/types";

interface ProfileViewProps {
  profile: Profile;
  organizations: Organization[];
  cloneOptions: CloneOptions;
  slug: string;
  canVoiceCall: boolean;
}

export default function ProfileView({
  profile,
  organizations,
  cloneOptions,
  slug,
  canVoiceCall,
}: ProfileViewProps) {
  return (
    <>
      <div className='min-h-screen flex flex-col bg-[var(--profile-bg)]'>
        <ProfileHeader
          slug={slug}
          customWarning={cloneOptions.customWarning}
          name={profile.name}
          headline={profile.headline}
        />
        <div className='tracking-[-0.015em] p-6 pt-0 pb-32 flex-1'>
          <div className='mx-auto max-w-2xl'>
            <ProfileImage imageUrl={profile.imageUrl} alt={`${slug} profile`} />
            <ProfileName name={profile.name} />
            <ProfileHeadline
              headline={profile.headline}
              organizations={organizations}
            />
            <ProfileBio bio={profile.bio} />
            <ProfileQuestions questions={profile.questions} slug={slug} />
            <ProfileSocials socials={profile.socials} name={profile.name} />
            <ProfileFooter name={profile.name} />
          </div>
          <ProfileChatInput
            slug={slug}
            questions={profile.questions}
            name={profile.name}
            canVoiceCall={canVoiceCall}
          />
        </div>
      </div>
    </>
  );
}
