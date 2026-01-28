"use client";

import * as React from "react";
import { SearchResultCard } from "./SearchResultCard";

interface LinkResult {
  id: string;
  type: "מאמר" | "PDF" | "כלי";
  title: string;
  description: string;
  source: string;
  date?: string;
  pages?: number;
  tags?: string[];
  url?: string;
}

interface LinksTabViewProps {
  results: LinkResult[];
  isLoading?: boolean;
  onResultClick: (id: string, type: string) => void;
}

export function LinksTabView({ results, isLoading, onResultClick }: LinksTabViewProps) {
  // Group results by type
  const articleResults = results.filter(r => r.type === "מאמר");
  const pdfResults = results.filter(r => r.type === "PDF");
  const toolResults = results.filter(r => r.type === "כלי");

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-3 w-1/3 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🔗</span>
        </div>
        <h3 className="font-mono text-lg font-bold text-gray-900 mb-2">
          לא נמצאו קישורים
        </h3>
        <p className="font-mono text-sm text-gray-500">
          נסה לחפש במילות מפתח אחרות
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Articles Section */}
      {articleResults.length > 0 && (
        <section>
          <h3 className="font-mono text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>📄</span>
            מאמרים ({articleResults.length})
          </h3>
          <div className="space-y-3">
            {articleResults.map((result) => (
              <SearchResultCard
                key={result.id}
                id={result.id}
                type={result.type}
                title={result.title}
                description={result.description}
                source={result.source}
                date={result.date}
                pages={result.pages}
                tags={result.tags}
                onClick={() => onResultClick(result.id, result.type)}
              />
            ))}
          </div>
        </section>
      )}

      {/* PDFs Section */}
      {pdfResults.length > 0 && (
        <section>
          <h3 className="font-mono text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>📑</span>
            מסמכי PDF ({pdfResults.length})
          </h3>
          <div className="space-y-3">
            {pdfResults.map((result) => (
              <SearchResultCard
                key={result.id}
                id={result.id}
                type={result.type}
                title={result.title}
                description={result.description}
                source={result.source}
                date={result.date}
                pages={result.pages}
                tags={result.tags}
                onClick={() => onResultClick(result.id, result.type)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Tools Section */}
      {toolResults.length > 0 && (
        <section>
          <h3 className="font-mono text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>🔧</span>
            כלים ({toolResults.length})
          </h3>
          <div className="space-y-3">
            {toolResults.map((result) => (
              <SearchResultCard
                key={result.id}
                id={result.id}
                type={result.type}
                title={result.title}
                description={result.description}
                source={result.source}
                date={result.date}
                tags={result.tags}
                onClick={() => onResultClick(result.id, result.type)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default LinksTabView;
