"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TopicsChart } from "@/components/analytics/charts/topics-chart";

interface TopicsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended topics data
const topicsData = [
  { topic: "User Interface", conversations: 1250, growth: 12.5 },
  { topic: "User Experience", conversations: 1180, growth: 8.3 },
  { topic: "Accessibility", conversations: 980, growth: 15.2 },
  { topic: "Design Systems", conversations: 850, growth: 22.1 },
  { topic: "Responsive Design", conversations: 720, growth: 5.6 },
  { topic: "Typography", conversations: 680, growth: 3.2 },
  { topic: "Color Theory", conversations: 620, growth: 7.8 },
  { topic: "Prototyping", conversations: 580, growth: 18.4 },
  { topic: "Animation", conversations: 520, growth: 10.1 },
  { topic: "Microinteractions", conversations: 480, growth: 25.3 },
  { topic: "Information Architecture", conversations: 420, growth: 4.5 },
  { topic: "Visual Hierarchy", conversations: 380, growth: 9.7 },
  { topic: "Grid Systems", conversations: 340, growth: 2.8 },
  { topic: "Mobile Design", conversations: 300, growth: 14.6 },
  { topic: "Design Thinking", conversations: 280, growth: 6.3 },
  { topic: "Wireframing", conversations: 260, growth: 11.2 },
  { topic: "User Research", conversations: 240, growth: 19.8 },
  { topic: "A/B Testing", conversations: 220, growth: 8.9 },
  { topic: "Design Trends", conversations: 200, growth: 13.4 },
  { topic: "Brand Identity", conversations: 180, growth: 3.7 },
];

export function TopicsDialog({
  open,
  onOpenChange,
}: TopicsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Popular Topics</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="h-[300px]">
            <TopicsChart />
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm font-medium text-[#63635E] px-4">
                <div>Topic</div>
                <div className="text-right">Conversations</div>
                <div className="text-right">Growth</div>
              </div>
              {topicsData.map((topic, index) => (
                <div
                  key={topic.topic}
                  className="grid grid-cols-3 gap-2 text-sm px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="font-medium">{topic.topic}</span>
                  </div>
                  <div className="text-right text-gray-600">
                    {topic.conversations.toLocaleString()}
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 ${
                      topic.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {topic.growth > 0 ? '↑' : '↓'}
                      {Math.abs(topic.growth)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}