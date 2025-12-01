import React from "react";
import { ProfileBackgroundWrapper } from "./_components/profile-background-wrapper";
import ProfileView from "@/app/profile/_components/profile-view";

export default function ProfilePage() {
  return (
    <ProfileBackgroundWrapper>
      <ProfileView />
    </ProfileBackgroundWrapper>
  );
}
