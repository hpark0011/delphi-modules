import type { NavSection } from "@/app/analytics/types";

// Centralized navigation configuration for the app sidebar.
// Extend or modify sections/items here to update the sidebar.
export const navigation: NavSection[] = [
  {
    title: "IDENTITY",
    items: [
      { title: "Profile", href: "/profile", icon: "profile" },
      { title: "Mind", href: "/mind", icon: "mind" },
      { title: "Voice", href: "/voice", icon: "voice" },
      { title: "Video", href: "/video", icon: "video" },
    ],
  },
  {
    title: "INTERACTIONS",
    items: [
      { title: "Audience", href: "/audience", icon: "audience" },
      { title: "Conversations", href: "/conversations", icon: "conversations" },
      { title: "Groups", href: "/groups", icon: "groups" },
    ],
  },
  {
    title: "ADVANCED",
    items: [
      { title: "Integrations", href: "/integrations", icon: "integrations" },
      { title: "Broadcasts", href: "/broadcasts", icon: "broadcasts" },
      { title: "Highlights", href: "/highlights", icon: "highlights" },
      { title: "Products", href: "/products", icon: "products" },
    ],
  },
];

export default navigation;
