"use client";

import * as React from "react";

const languageData = [
  { country: "US", flag: "🇺🇸", percentage: 44 },
  { country: "Brazil", flag: "🇧🇷", percentage: 23 },
  { country: "Vietnam", flag: "🇻🇳", percentage: 16 },
  { country: "France", flag: "🇫🇷", percentage: 16 },
  { country: "Canada", flag: "🇨🇦", percentage: 9 },
  { country: "Korea", flag: "🇰🇷", percentage: 8 },
];

export function LanguageChart() {
  return (
    <div className="flex flex-col space-y-3 w-full">
      {languageData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2 min-w-[120px]">
              <span className="text-lg">{item.flag}</span>
              <span className="text-sm font-medium text-[#1C1C17]">{item.country}</span>
            </div>
            <div className="flex-1 max-w-[200px]">
              <div className="w-full bg-[#F5F5F0] rounded-full h-6">
                <div
                  className="bg-[#F5F5F0] h-6 rounded-full relative"
                  style={{ width: `${item.percentage}%` }}
                >
                  <div className="absolute inset-0 bg-[#E5E5E0] rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <span className="text-sm text-[#8D8D86] ml-3 min-w-[40px] text-right">
            {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}