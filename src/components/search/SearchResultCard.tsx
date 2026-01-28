"use client";

import * as React from "react";

interface SearchResultCardProps {
  id: string;
  type: "מאמר" | "PDF" | "וידאו" | "כלי" | "פודקאסט";
  title: string;
  description: string;
  source: string;
  date?: string;
  duration?: string;
  pages?: number;
  thumbnail?: string;
  tags?: string[];
  relevanceScore?: number;
  onClick?: () => void;
}

const TYPE_ICONS: Record<string, string> = {
  "מאמר": "📄",
  "PDF": "📑",
  "וידאו": "🎬",
  "כלי": "🔧",
  "פודקאסט": "🎙️",
};

const TYPE_COLORS: Record<string, string> = {
  "מאמר": "bg-blue-100 text-blue-700 border-blue-200",
  "PDF": "bg-red-100 text-red-700 border-red-200",
  "וידאו": "bg-purple-100 text-purple-700 border-purple-200",
  "כלי": "bg-green-100 text-green-700 border-green-200",
  "פודקאסט": "bg-orange-100 text-orange-700 border-orange-200",
};

export function SearchResultCard({
  type,
  title,
  description,
  source,
  date,
  duration,
  pages,
  thumbnail,
  tags,
  relevanceScore,
  onClick,
}: SearchResultCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-start bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-gray-400 hover:shadow-md"
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        {thumbnail ? (
          <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="shrink-0 w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-3xl opacity-50">{TYPE_ICONS[type] || "📄"}</span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-mono text-xs font-medium ${TYPE_COLORS[type] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
              <span>{TYPE_ICONS[type] || "📄"}</span>
              {type}
            </span>

            {duration && (
              <span className="font-mono text-xs text-gray-500">
                ⏱️ {duration}
              </span>
            )}

            {pages && (
              <span className="font-mono text-xs text-gray-500">
                📄 {pages} עמודים
              </span>
            )}

            {relevanceScore && relevanceScore > 90 && (
              <span className="font-mono text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                התאמה גבוהה
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-mono text-base font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-700 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="font-mono text-sm text-gray-600 line-clamp-2 mb-2">
            {description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
              <span>{source}</span>
              {date && (
                <>
                  <span>•</span>
                  <span>{date}</span>
                </>
              )}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex items-center gap-1">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="font-mono text-xs text-gray-400">
                    +{tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="shrink-0 flex items-center">
          <span className="text-gray-300 group-hover:text-gray-500 transition-colors text-lg">
            ←
          </span>
        </div>
      </div>
    </button>
  );
}

// Compact variant for sidebar
export function SearchResultCardCompact({
  type,
  title,
  source,
  onClick,
}: Pick<SearchResultCardProps, "type" | "title" | "source" | "onClick">) {
  return (
    <button
      onClick={onClick}
      className="w-full text-start p-3 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border font-mono text-[10px] font-medium ${TYPE_COLORS[type] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
          {TYPE_ICONS[type] || "📄"}
        </span>
        <span className="font-mono text-xs text-gray-400">{source}</span>
      </div>
      <h4 className="font-mono text-sm font-bold text-gray-900 line-clamp-2">
        {title}
      </h4>
    </button>
  );
}

export default SearchResultCard;
