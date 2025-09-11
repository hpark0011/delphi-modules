"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LanguageChart } from "@/components/analytics/charts/language-chart";

interface LanguagesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended language data
const languageStats = [
  { language: "English", percentage: 45, users: 4500 },
  { language: "Spanish", percentage: 18, users: 1800 },
  { language: "French", percentage: 12, users: 1200 },
  { language: "German", percentage: 8, users: 800 },
  { language: "Italian", percentage: 5, users: 500 },
  { language: "Portuguese", percentage: 4, users: 400 },
  { language: "Japanese", percentage: 3, users: 300 },
  { language: "Chinese", percentage: 2, users: 200 },
  { language: "Korean", percentage: 1.5, users: 150 },
  { language: "Arabic", percentage: 1, users: 100 },
  { language: "Russian", percentage: 0.5, users: 50 },
];

export function LanguagesDialog({
  open,
  onOpenChange,
}: LanguagesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Languages Distribution</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="h-[300px]">
            <LanguageChart />
          </div>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm font-medium text-[#63635E] px-4">
                <div>Language</div>
                <div className="text-right">Users</div>
                <div className="text-right">Percentage</div>
              </div>
              {languageStats.map((lang) => (
                <div
                  key={lang.language}
                  className="grid grid-cols-3 gap-2 text-sm px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="font-medium">{lang.language}</div>
                  <div className="text-right text-gray-600">
                    {lang.users.toLocaleString()}
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-gray-600">{lang.percentage}%</span>
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${lang.percentage * 2}%` }}
                        />
                      </div>
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