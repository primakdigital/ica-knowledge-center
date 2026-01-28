"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockSearchResponse } from "@/data/wireframe-mock";
import {
  TabNavigation,
  type TabType,
  TabModal,
  AIResponse,
  SearchResultCard,
  LinksModalContent,
  VideosModalContent,
} from "@/components/search";
import "@/components/search/rtl.css";

/**
 * S2 - Search Results (Perplexity-style)
 *
 * Layout:
 * 1. Tab Navigation at TOP (opens modals)
 * 2. AI Response below
 * 3. Results list
 * 4. Follow-up input
 */

// Queries that simulate "no results"
const NO_RESULTS_QUERIES = ["אין תוצאות", "xyz123", "no results", "test empty"];

// Mock video results
const MOCK_VIDEOS = [
  {
    id: "video-1",
    title: "מבוא לראיון מוטיבציוני - הרצאה מקיפה",
    description: "הרצאה מלאה על עקרונות הראיון המוטיבציוני וטכניקות יישום",
    duration: "45:20",
    source: "ICA Academy",
    instructor: "ד״ר מיכל כהן",
    date: "2024",
  },
  {
    id: "video-2",
    title: "CBT בטיפול בהתמכרויות - סדנה מעשית",
    description: "סדנה מעשית ליישום טכניקות CBT בעבודה עם מתמודדים",
    duration: "1:12:00",
    source: "ICA Academy",
    instructor: "פרופ׳ דוד לוי",
    date: "2024",
  },
  {
    id: "video-3",
    title: "מזעור נזקים - גישה פרקטית",
    description: "סקירת הגישה למזעור נזקים ויישומה בשטח",
    duration: "32:15",
    source: "ICA Webinar",
    instructor: "ד״ר רחל שמיר",
    date: "2023",
  },
  {
    id: "video-4",
    title: "עבודה עם משפחות של מתמודדים",
    description: "כלים ושיטות לעבודה עם בני משפחה",
    duration: "55:00",
    source: "ICA Academy",
    instructor: "ד״ר יעל ברק",
    date: "2024",
  },
];

// ============================================
// Main Search Content
// ============================================
function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [followUpInput, setFollowUpInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Modal state
  const [activeModal, setActiveModal] = React.useState<TabType | null>(null);

  // Check for no results
  const hasNoResults = NO_RESULTS_QUERIES.some((q) =>
    initialQuery.toLowerCase().includes(q.toLowerCase())
  );

  const data = hasNoResults ? null : mockSearchResponse;

  // Filter results by type for tabs
  const linkResults = data?.results.filter(r => r.type !== "וידאו") || [];
  const videoResults = MOCK_VIDEOS;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      router.push(`/knowledge/search?q=${encodeURIComponent(searchQuery)}`);
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleFollowUp = (question: string) => {
    setSearchQuery(question);
    router.push(`/knowledge/search?q=${encodeURIComponent(question)}`);
  };

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpInput.trim()) {
      handleFollowUp(followUpInput);
      setFollowUpInput("");
    }
  };

  const handleContentClick = (id: string) => {
    router.push(`/knowledge/content/${id}`);
  };

  const handleToolClick = (id: string) => {
    router.push(`/knowledge/tool/${id}`);
  };

  const handleVideoClick = (id: string) => {
    router.push(`/knowledge/content/${id}`);
  };

  const handleSourceClick = (sourceId: string) => {
    const cleanId = sourceId.replace("src-", "");
    router.push(`/knowledge/content/${cleanId}`);
  };

  const handleTabClick = (tab: TabType) => {
    if (tab !== "all") {
      setActiveModal(tab);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* ============================================
          STICKY HEADER
          ============================================ */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 font-mono text-sm text-gray-600 hover:text-gray-900"
            >
              <span className="text-lg">🏠</span>
              <span>ICA מרכז ידע</span>
            </button>

            <nav className="flex items-center gap-2 font-mono text-xs text-gray-500">
              <button
                onClick={() => router.push("/therapist")}
                className="hover:text-gray-700"
              >
                לובי מטפל/ת
              </button>
              <span>←</span>
              <span className="font-medium text-gray-900">חיפוש</span>
            </nav>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="pb-4">
            <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-xl px-4 py-2 focus-within:border-purple-400 focus-within:shadow-lg transition-all">
              <span className="text-gray-400">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חפש נושא, כלי, או שאלה..."
                className="flex-1 font-mono text-base outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-1.5 rounded-lg font-mono text-sm font-bold hover:bg-gray-700 transition-colors"
              >
                חפש
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* ============================================
          MAIN CONTENT - Single Column
          ============================================ */}
      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Query Display */}
        {initialQuery && (
          <div className="mb-4">
            <p className="font-mono text-sm text-gray-500">תוצאות עבור:</p>
            <h1 className="font-mono text-2xl font-bold text-gray-900">
              &quot;{initialQuery}&quot;
            </h1>
          </div>
        )}

        {isLoading ? (
          /* Loading State */
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-purple-500"></div>
              <p className="font-mono text-lg text-gray-500">מחפש במאגר הידע...</p>
            </div>
          </div>
        ) : !data ? (
          /* No Results State */
          <div className="py-12">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <span className="text-4xl">🔍</span>
              </div>
              <h2 className="mb-4 font-mono text-xl font-bold text-gray-900">
                לא נמצאו תוצאות
              </h2>
              <p className="mb-8 font-mono text-base text-gray-600">
                החיפוש &quot;{initialQuery}&quot; לא הניב תוצאות במאגר הידע.
              </p>

              <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6 text-start">
                <h3 className="mb-4 font-mono text-sm font-bold text-gray-900">
                  הצעות לשיפור החיפוש:
                </h3>
                <ul className="space-y-2">
                  {[
                    "נסה/י מילות מפתח כלליות יותר",
                    "בדוק/י את האיות",
                    "חפש/י לפי קטגוריה מהלובי",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-center gap-2 font-mono text-sm text-gray-600">
                      <span className="text-purple-500">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {["הפרעת שימוש בחומרים", "ראיון מוטיבציוני", "מזעור נזקים"].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleFollowUp(topic)}
                    className="border border-gray-200 bg-white px-3 py-2 rounded-lg font-mono text-sm hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <button
                onClick={() => router.push("/therapist")}
                className="bg-gray-800 text-white px-6 py-3 rounded-xl font-mono text-sm font-bold hover:bg-gray-700 transition-colors"
              >
                ← חזרה ללובי
              </button>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* Tab Navigation - AT TOP */}
            <TabNavigation
              onTabClick={handleTabClick}
              counts={{
                links: linkResults.length,
                videos: videoResults.length,
              }}
              className="justify-start mb-2"
            />

            {/* AI Response */}
            <AIResponse
              query={initialQuery}
              summary={data.synthesis.summary}
              keyPoints={data.synthesis.keyPoints}
              actionItems={data.synthesis.actionItems}
              sources={data.sources}
              onSourceClick={handleSourceClick}
            />

            {/* All Results */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="font-mono text-base font-bold text-gray-900">
                  כל התוצאות ({data.results.length})
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {data.results.map((result) => (
                  <SearchResultCard
                    key={result.id}
                    id={result.id}
                    type={result.type as "מאמר" | "PDF" | "וידאו" | "כלי" | "פודקאסט"}
                    title={result.title}
                    description={result.description}
                    source={result.meta.source}
                    duration={result.meta.duration}
                    pages={result.meta.pages}
                    onClick={() =>
                      result.type === "כלי"
                        ? handleToolClick(result.id)
                        : handleContentClick(result.id)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Follow-up Questions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="mb-4 font-mono text-base font-bold text-gray-900">
                שאלות להמשך חקירה
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {data.followUpQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleFollowUp(question)}
                    className="text-start border border-gray-200 bg-gray-50 p-3 rounded-lg font-mono text-sm text-gray-700 hover:border-purple-400 hover:bg-purple-50 transition-colors"
                  >
                    {question} →
                  </button>
                ))}
              </div>

              {/* Follow-up Input */}
              <form onSubmit={handleFollowUpSubmit}>
                <div className="follow-up-input flex items-center gap-3 bg-white">
                  <input
                    type="text"
                    value={followUpInput}
                    onChange={(e) => setFollowUpInput(e.target.value)}
                    placeholder="שאל שאלת המשך..."
                    className="flex-1 font-mono text-sm outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!followUpInput.trim()}
                    className="bg-gray-800 text-white px-4 py-1.5 rounded-lg font-mono text-sm font-bold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    שלח
                  </button>
                </div>
              </form>
            </div>

            {/* Back to Lobby */}
            <div className="text-center">
              <button
                onClick={() => router.push("/therapist")}
                className="font-mono text-sm text-gray-500 hover:text-gray-700"
              >
                ← חזרה ללובי מטפל/ת
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="border-t border-gray-200 bg-white py-6 mt-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-mono text-xs text-gray-500">
            © ICA — המרכז הישראלי להתמכרויות | מרכז הידע והכלים
          </p>
        </div>
      </footer>

      {/* ============================================
          TAB MODALS
          ============================================ */}
      {/* Links Modal */}
      <TabModal
        isOpen={activeModal === "links"}
        onClose={closeModal}
        title="קישורים"
        icon="🔗"
      >
        <LinksModalContent
          results={linkResults.map(r => ({
            id: r.id,
            type: r.type as "מאמר" | "PDF" | "כלי",
            title: r.title,
            description: r.description,
            source: r.meta.source,
            pages: r.meta.pages,
          }))}
          onResultClick={(id, type) =>
            type === "כלי" ? handleToolClick(id) : handleContentClick(id)
          }
          onClose={closeModal}
        />
      </TabModal>

      {/* Videos Modal */}
      <TabModal
        isOpen={activeModal === "videos"}
        onClose={closeModal}
        title="סרטונים"
        icon="🎬"
      >
        <VideosModalContent
          results={videoResults}
          onVideoClick={handleVideoClick}
          onClose={closeModal}
        />
      </TabModal>
    </div>
  );
}

export default function S2SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-purple-500"></div>
            <p className="font-mono text-gray-500">טוען תוצאות...</p>
          </div>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
