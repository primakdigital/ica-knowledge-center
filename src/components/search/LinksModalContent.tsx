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
}

interface LinksModalContentProps {
  results: LinkResult[];
  isLoading?: boolean;
  onResultClick: (id: string, type: string) => void;
  onClose: () => void;
}

export function LinksModalContent({ results, isLoading, onResultClick, onClose }: LinksModalContentProps) {
  // Group results by type
  const articleResults = results.filter(r => r.type === "מאמר");
  const pdfResults = results.filter(r => r.type === "PDF");
  const toolResults = results.filter(r => r.type === "כלי");

  const handleClick = (id: string, type: string) => {
    onResultClick(id, type);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4 animate-pulse">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🔗</span>
        </div>
        <h3 className="font-mono text-xl font-bold text-gray-900 mb-2">
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
      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="font-mono text-sm text-gray-600">
          נמצאו <span className="font-bold text-gray-900">{results.length}</span> קישורים:
          {articleResults.length > 0 && ` ${articleResults.length} מאמרים`}
          {pdfResults.length > 0 && `, ${pdfResults.length} מסמכי PDF`}
          {toolResults.length > 0 && `, ${toolResults.length} כלים`}
        </p>
      </div>

      {/* Articles Section */}
      {articleResults.length > 0 && (
        <section>
          <h3 className="font-mono text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">📄</span>
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
                onClick={() => handleClick(result.id, result.type)}
              />
            ))}
          </div>
        </section>
      )}

      {/* PDFs Section */}
      {pdfResults.length > 0 && (
        <section>
          <h3 className="font-mono text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">📑</span>
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
                onClick={() => handleClick(result.id, result.type)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Tools Section */}
      {toolResults.length > 0 && (
        <section>
          <h3 className="font-mono text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">🔧</span>
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
                onClick={() => handleClick(result.id, result.type)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default LinksModalContent;
