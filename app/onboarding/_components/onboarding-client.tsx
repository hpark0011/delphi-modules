"use client";
import React from "react";
import { useOnboardingNavigation } from "@/app/onboarding/_context/onboarding-navigation-context";
import { OnboardingPage1 } from "@/app/onboarding/_components/onboarding-pages/onboarding-page-1";
import { OnboardingPage2 } from "@/app/onboarding/_components/onboarding-pages/onboarding-page-2";
import { OnboardingPage3 } from "@/app/onboarding/_components/onboarding-pages/onboarding-page-3";

export default function OnboardingClient() {
  const { currentPage } = useOnboardingNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <OnboardingPage1 />;
      case 1:
        return <OnboardingPage2 />;
      case 2:
        return <OnboardingPage3 />;
      default:
        return <OnboardingPage1 />;
    }
  };

  return renderPage();
}
