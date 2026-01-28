"use client";

import * as React from "react";

export type TabType = "all" | "links" | "videos";

interface Tab {
  id: TabType;
  label: string;
  icon: string;
  count?: number;
}

interface TabNavigationProps {
  onTabClick: (tab: TabType) => void;
  counts?: {
    all?: number;
    links?: number;
    videos?: number;
  };
  className?: string;
}

const TABS: Tab[] = [
  { id: "links", label: "קישורים", icon: "🔗" },
  { id: "videos", label: "סרטונים", icon: "🎬" },
];

export function TabNavigation({ onTabClick, counts, className = "" }: TabNavigationProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {TABS.map((tab) => {
        const count = counts?.[tab.id];

        return (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className="group flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-[20px] font-mono text-sm transition-all hover:bg-gray-200 hover:shadow-sm active:scale-95"
          >
            <span className="text-base">{tab.icon}</span>
            <span className="text-gray-700 font-medium">{tab.label}</span>
            {count !== undefined && count > 0 && (
              <span className="bg-gray-200 group-hover:bg-gray-300 text-gray-600 rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Compact version for header
export function TabNavigationCompact({ onTabClick, counts }: TabNavigationProps) {
  return (
    <div className="flex items-center gap-2">
      {TABS.map((tab) => {
        const count = counts?.[tab.id];

        return (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-gray-100 rounded-[16px] font-mono text-xs transition-all hover:bg-gray-200 active:scale-95"
          >
            <span className="text-sm">{tab.icon}</span>
            <span className="text-gray-700 font-medium">{tab.label}</span>
            {count !== undefined && count > 0 && (
              <span className="bg-gray-200 text-gray-600 rounded-full px-1.5 py-0.5 text-[10px] font-bold min-w-[16px] text-center">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TabNavigation;
