"use client";

import * as React from "react";
import { CitationBadge } from "./CitationTooltip";

interface Source {
  id: string;
  title: string;
  snippet: string;
  type: string;
  publisher?: string;
  year?: string;
}

interface AIResponseProps {
  query: string;
  summary: string;
  keyPoints: string[];
  actionItems?: string[];
  sources: Source[];
  isStreaming?: boolean;
  onCopy?: () => void;
  onShare?: () => void;
  onSourceClick?: (sourceId: string) => void;
}

export function AIResponse({
  query,
  summary,
  keyPoints,
  actionItems,
  sources,
  isStreaming = false,
  onCopy,
  onShare,
  onSourceClick,
}: AIResponseProps) {
  const [copySuccess, setCopySuccess] = React.useState(false);

  const handleCopy = async () => {
    const text = `${summary}\n\nנקודות מפתח:\n${keyPoints.map(p => `• ${p}`).join('\n')}`;
    await navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
    onCopy?.();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `תשובה: ${query}`,
          text: summary,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    }
    onShare?.();
  };

  // Parse summary to add citation badges
  const renderSummaryWithCitations = (text: string) => {
    // Simple pattern: [1], [2], etc.
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const citationNum = parseInt(match[1], 10);
        const source = sources[citationNum - 1];
        return (
          <CitationBadge
            key={index}
            number={citationNum}
            onClick={() => source && onSourceClick?.(source.id)}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white"
      style={{
        background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) border-box',
        border: '2px solid transparent',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <span className="text-white text-sm">✨</span>
          </div>
          <div>
            <h2 className="font-mono text-base font-bold text-gray-900">
              תשובה מבוססת AI
            </h2>
            <p className="font-mono text-xs text-gray-500">
              מבוססת על {sources.length} מקורות ממאגר ICA
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 border border-gray-200 bg-white px-3 py-1.5 font-mono text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            {copySuccess ? '✓ הועתק!' : '📋 העתק'}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 border border-gray-200 bg-white px-3 py-1.5 font-mono text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            ↗ שתף
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Summary */}
        <div className={`font-mono text-base text-gray-700 leading-relaxed mb-6 ${isStreaming ? 'animate-pulse' : ''}`}>
          {renderSummaryWithCitations(summary)}
        </div>

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <div className="mb-6 border-r-4 border-purple-400 pr-4">
            <h3 className="mb-3 font-mono text-sm font-bold text-gray-800">
              נקודות מפתח
            </h3>
            <ul className="space-y-2">
              {keyPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 font-mono text-sm text-gray-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Items */}
        {actionItems && actionItems.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <h3 className="mb-3 font-mono text-sm font-bold text-gray-800">
              מה עושים עכשיו
            </h3>
            <ol className="space-y-2">
              {actionItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-800 font-mono text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="font-mono text-sm text-gray-600 pt-0.5">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Sources Preview */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="font-mono text-xs text-gray-500 shrink-0">מקורות:</span>
          {sources.slice(0, 5).map((source, index) => (
            <button
              key={source.id}
              onClick={() => onSourceClick?.(source.id)}
              className="flex items-center gap-1 shrink-0 border border-gray-200 bg-white px-2 py-1 rounded-md hover:border-gray-400 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-600 font-mono text-[9px] font-bold text-white">
                {index + 1}
              </span>
              <span className="font-mono text-xs text-gray-600 max-w-[120px] truncate">
                {source.title}
              </span>
            </button>
          ))}
          {sources.length > 5 && (
            <span className="font-mono text-xs text-gray-400">
              +{sources.length - 5} נוספים
            </span>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-gray-100 bg-amber-50/50 px-6 py-2">
        <p className="font-mono text-xs text-amber-700">
          ⚠️ המידע מקצועי ואינו תחליף לשיקול דעת קליני
        </p>
      </div>
    </div>
  );
}

export default AIResponse;
