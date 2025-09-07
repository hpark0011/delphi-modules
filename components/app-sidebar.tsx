"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  MessageSquare,
  Users2,
  User,
  Mic,
  Video,
  Play,
  Package,
  RadioTower,
  Zap,
  ShoppingBag,
  CreditCard,
  Bell,
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { NavSection, SidebarUser } from "@/app/analytics/types";
import Image from "next/image";
import delphiLogo from "@/public/delphi.svg";
import { HeaderLogo } from "./header/header-ui";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  profile: User,
  mind: Mic,
  voice: Mic,
  video: Video,
  playground: Play,
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
      { title: "Playground", href: "/playground", icon: "playground" },
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
    <Sidebar className='border-r-0 bg-background'>
      <SidebarHeader className='bg-background border-b border-gray-800'>
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
      <SidebarContent className='bg-black'>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={cn(
                  "text-gray-400 hover:text-white hover:bg-gray-900",
                  pathname === "/" && "bg-gray-900 text-white"
                )}
              >
                <Link href='/'>
                  <Home className='h-4 w-4' />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={cn(
                  "text-gray-400 hover:text-white hover:bg-gray-900",
                  pathname === "/notifications" && "bg-gray-900 text-white"
                )}
              >
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
                      <SidebarMenuButton
                        asChild
                        disabled={item.disabled}
                        className={cn(
                          "text-gray-400 hover:text-white hover:bg-gray-900 relative",
                          isActive &&
                            "bg-gray-900 text-white before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-white"
                        )}
                      >
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
      <SidebarFooter className='bg-black border-t border-gray-800'>
        <div className='flex items-center justify-between px-3 py-3'>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 bg-green-500 rounded-full'></div>
            <span className='text-gray-400 text-sm'>{user.credits}</span>
          </div>
          <button className='text-gray-400 hover:text-white'>
            <Play className='h-4 w-4' />
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
