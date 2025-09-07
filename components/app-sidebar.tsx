"use client";

import type { NavSection, SidebarUser } from "@/app/analytics/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Bell,
  CreditCard,
  Home,
  Video,
  Brain,
  MessageSquare,
  Mic,
  Package,
  RadioTower,
  ShoppingBag,
  User,
  Users,
  Users2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { HeaderLogo } from "./header/header-ui";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  profile: User,
  mind: Brain,
  voice: Mic,
  video: Video,
  people: Users,
  conversations: MessageSquare,
  groups: Users2,
  integrations: Package,
  broadcasts: RadioTower,
  actions: Zap,
  products: ShoppingBag,
  memberships: CreditCard,
  notifications: Bell,
};

const navigation: NavSection[] = [
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
      { title: "People", href: "/people", icon: "people" },
      { title: "Conversations", href: "/conversations", icon: "conversations" },
      { title: "Groups", href: "/groups", icon: "groups" },
    ],
  },
  {
    title: "ADVANCED",
    items: [
      { title: "Integrations", href: "/integrations", icon: "integrations" },
      { title: "Broadcasts", href: "/broadcasts", icon: "broadcasts" },
      { title: "Actions", href: "/actions", icon: "actions" },
      { title: "Products", href: "/products", icon: "products" },
      { title: "Memberships", href: "/memberships", icon: "memberships" },
    ],
  },
];

const user: SidebarUser = {
  name: "User",
  avatar: "",
  credits: 100,
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant='inset' className='border-r-0'>
      <SidebarHeader>
        <div className='flex items-center gap-3 px-3 py-4'>
          <div className='flex items-center gap-2'>
            <HeaderLogo />
          </div>
          <Avatar className='h-8 w-8 ml-auto'>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className='bg-gray-700 text-white text-xs'>
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/'>
                  <Home className='h-4 w-4' />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/notifications'>
                  <Bell className='h-4 w-4' />
                  <span>Notifications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className='text-gray-500 text-xs font-medium px-3'>
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon ? iconMap[item.icon] : null;
                  const isActive = pathname === item.href;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild disabled={item.disabled}>
                        <Link href={item.href}>
                          {Icon && <Icon className='h-4 w-4' />}
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className='ml-auto text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded'>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className='flex items-center justify-between px-3 py-3'>
          <div className='flex items-center gap-2'>
            <span className='text-gray-400 text-sm'>{user.credits}</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
