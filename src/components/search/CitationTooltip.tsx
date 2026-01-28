"use client";

import * as React from "react";

interface Source {
  id: string;
  title: string;
  snippet: string;
  type: string;
  publisher?: string;
  year?: string;
  url?: string;
}

interface CitationTooltipProps {
  citationNumber: number;
  source: Source;
  children: React.ReactNode;
}

export function CitationTooltip({ citationNumber, source, children }: CitationTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer"
      >
        {children}
        <sup className="inline-flex items-center justify-center mx-0.5 w-4 h-4 text-[10px] font-bold text-white bg-gray-600 rounded-full hover:bg-gray-800 transition-colors">
          {citationNumber}
        </sup>
      </span>

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-80 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <div className="bg-white border-2 border-gray-300 rounded-lg shadow-xl p-4 mb-2">
            {/* Source Type Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="border border-gray-400 bg-gray-100 px-2 py-0.5 font-mono text-xs">
                {source.type}
              </span>
              {source.year && (
                <span className="font-mono text-xs text-gray-500">
                  {source.year}
                </span>
              )}
            </div>

            {/* Title */}
            <h4 className="font-mono text-sm font-bold text-gray-900 mb-2 line-clamp-2">
              {source.title}
            </h4>

            {/* Snippet */}
            <p className="font-mono text-xs text-gray-600 leading-relaxed line-clamp-3 mb-2">
              {source.snippet}
            </p>

            {/* Publisher */}
            {source.publisher && (
              <p className="font-mono text-xs text-gray-400">
                {source.publisher}
              </p>
            )}

            {/* Arrow */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="border-8 border-transparent border-t-gray-300" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-px border-8 border-transparent border-t-white" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Inline citation badge component
export function CitationBadge({
  number,
  onClick
}: {
  number: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center mx-0.5 w-5 h-5 text-[10px] font-bold text-white bg-gradient-to-br from-gray-600 to-gray-800 rounded-full hover:from-gray-700 hover:to-gray-900 transition-all shadow-sm"
    >
      {number}
    </button>
  );
}

export default CitationTooltip;
