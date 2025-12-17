import React from "react";
import { ProfileBackgroundWrapper } from "./_components/profile-background-wrapper";
import ProfileView from "@/app/profile/_components/profile-view";
import {
  mockProfile,
  mockOrganizations,
  mockCloneOptions,
} from "./_lib/mock-profile-data";

export default function ProfilePage() {
  return (
    <ProfileBackgroundWrapper>
      <ProfileView
        profile={mockProfile}
        organizations={mockOrganizations}
        cloneOptions={mockCloneOptions}
        slug='hyunsol'
        canVoiceCall={true}
      />
    </ProfileBackgroundWrapper>
  );
}
