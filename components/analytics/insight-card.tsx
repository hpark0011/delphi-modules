"use client";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Lightbulb, Sparkles } from "lucide-react";

interface InsightCardProps {
  insight: string;
  action: string;
  icon?: "lightbulb" | "sparkles";
}

export function InsightCard({ insight, action, icon = "lightbulb" }: InsightCardProps) {
  const handleAddToTodo = () => {
    toast.success(`Added to todo list: ${action}`);
  };

  const IconComponent = icon === "sparkles" ? Sparkles : Lightbulb;

  return (
    <div className="flex flex-col gap-6 p-4 pb-6">
      <div className="flex gap-3">
        <div className="mt-1 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#EF5F28]/10 flex items-center justify-center">
            <IconComponent className="w-4 h-4 text-[#EF5F28]" />
          </div>
        </div>
        <p className="text-[15px] leading-[1.5] text-text-primary font-medium">
          {insight}
        </p>
      </div>
      
      <div className="flex gap-3 ml-11">
        <div className="flex-1 bg-[#F6F6F5] rounded-xl p-3 flex items-center justify-between">
          <p className="text-[14px] text-[#63635E] leading-[1.4]">
            {action}
          </p>
          <button
            onClick={handleAddToTodo}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 rounded-lg transition-colors ml-3 flex-shrink-0"
          >
            <Plus className="w-4 h-4 text-[#63635E]" />
            <span className="text-[13px] font-medium text-[#63635E]">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}