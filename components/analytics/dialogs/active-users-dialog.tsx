"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserListItem } from "@/components/analytics/user-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActiveUsersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended dummy data for the full list
const allActiveUsers = [
  {
    id: 1,
    name: "Nature Lover Brown",
    status: "Active Now",
    isActive: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    messageCount: 132,
  },
  {
    id: 2,
    name: "Tech Guru Smith",
    status: "2h ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    messageCount: 102,
  },
  {
    id: 3,
    name: "Jade Thompson",
    status: "1d ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    messageCount: 78,
  },
  {
    id: 4,
    name: "Emma Wilson",
    status: "3h ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    messageCount: 76,
  },
  {
    id: 5,
    name: "Artistic Soul Davis",
    status: "4h ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    messageCount: 56,
  },
  {
    id: 6,
    name: "Michael Chen",
    status: "Active Now",
    isActive: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    messageCount: 52,
  },
  {
    id: 7,
    name: "Sarah Johnson",
    status: "5h ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    messageCount: 48,
  },
  {
    id: 8,
    name: "David Martinez",
    status: "6h ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    messageCount: 45,
  },
  {
    id: 9,
    name: "Lisa Anderson",
    status: "Active Now",
    isActive: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
    messageCount: 42,
  },
  {
    id: 10,
    name: "Robert Taylor",
    status: "8h ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200",
    messageCount: 38,
  },
  {
    id: 11,
    name: "Jennifer White",
    status: "1d ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200",
    messageCount: 35,
  },
  {
    id: 12,
    name: "Christopher Lee",
    status: "1d ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200",
    messageCount: 32,
  },
  {
    id: 13,
    name: "Amanda Garcia",
    status: "2d ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200",
    messageCount: 28,
  },
  {
    id: 14,
    name: "Matthew Robinson",
    status: "2d ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200",
    messageCount: 25,
  },
  {
    id: 15,
    name: "Jessica Clark",
    status: "3d ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200",
    messageCount: 22,
  },
];

export function ActiveUsersDialog({
  open,
  onOpenChange,
}: ActiveUsersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle>Most Active Users</DialogTitle>
        </DialogHeader>
        <div className='px-2 pt-2'>
          <ScrollArea className='h-[500px] '>
            <div className='flex flex-col gap-1'>
              {allActiveUsers.map((user) => (
                <UserListItem
                  key={user.id}
                  name={user.name}
                  status={user.status}
                  isActive={user.isActive}
                  avatarUrl={user.avatarUrl}
                  messageCount={user.messageCount}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
