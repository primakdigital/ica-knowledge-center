"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { mockContentItem, getContentById } from "@/data/wireframe-mock";

/**
 * S3 - Content Item (ICA Spec v1.0)
 *
 * Article/PDF/Video content viewer.
 * RTL 2-panel layout: Right (content) | Left (evidence/references)
 */

// Mock evidence/references data
const MOCK_REFERENCES = [
  {
    id: "ref-1",
    number: 1,
    citation: "Miller, W. R., & Rollnick, S. (2013). Motivational interviewing: Helping people change.",
    type: "ספר",
  },
  {
    id: "ref-2",
    number: 2,
    citation: "SAMHSA (2020). Treatment Improvement Protocol (TIP) 35: Enhancing Motivation for Change.",
    type: "מדריך",
  },
  {
    id: "ref-3",
    number: 3,
    citation: "Prochaska, J. O., & DiClemente, C. C. (1983). Stages and processes of self-change.",
    type: "מאמר",
  },
];

const MOCK_KEY_TERMS = [
  { term: "תחלואה כפולה", definition: "מצב בו אדם סובל מהפרעה פסיכיאטרית והפרעת שימוש בחומרים במקביל" },
  { term: "ראיון מוטיבציוני", definition: "גישה טיפולית ממוקדת לקוח לחיזוק המוטיבציה לשינוי" },
  { term: "מזעור נזקים", definition: "אסטרטגיות להפחתת הנזקים הקשורים לשימוש בחומרים" },
];

export default function S3ContentItemWireframe() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Get content by ID (falls back to mock)
  const content = getContentById(id) || mockContentItem;

  // State for TOC active section
  const [activeSection, setActiveSection] = React.useState("summary");

  const handleRelatedContentClick = (relatedId: string) => {
    router.push(`/knowledge/content/${relatedId}`);
  };

  const handleRelatedToolClick = (toolId: string) => {
    router.push(`/knowledge/tool/${toolId}`);
  };

  const handleActionComplete = (action: string) => {
    router.push(`/knowledge/action-complete?type=${action}&title=${encodeURIComponent(content.title)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================================
          STICKY HEADER - ICA Spec v1.0
          ============================================ */}
      <header className="sticky top-0 z-50 border-b-2 border-gray-300 bg-white shadow-sm">
        {/* Top Bar - Logo & Breadcrumb */}
        <div className="border-b border-gray-200 bg-gray-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
            {/* Logo */}
            <button
              onClick={() => router.push("/")}
              className="border-2 border-gray-400 bg-white px-3 py-1 font-mono text-sm hover:bg-gray-50"
            >
              [LOGO] ICA
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-mono text-xs text-gray-500">
              <span className="hover:text-gray-700 cursor-pointer">ICA.org.il</span>
              <span>←</span>
              <span className="hover:text-gray-700 cursor-pointer">מרכז הידע</span>
              <span>←</span>
              <button
                onClick={() => router.push("/therapist")}
                className="hover:text-gray-700"
              >
                מטפל/ת
              </button>
              <span>←</span>
              <button
                onClick={() => router.back()}
                className="hover:text-gray-700"
              >
                תוצאות חיפוש
              </button>
              <span>←</span>
              <span className="text-gray-900 font-medium truncate max-w-[200px]">
                {content.title}
              </span>
            </nav>

            {/* Content Type Badge */}
            <div className="border-2 border-gray-500 bg-gray-200 px-3 py-1 font-mono text-xs font-bold">
              {content.type}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Title */}
            <h1 className="font-mono text-lg font-bold text-gray-900 truncate flex-1">
              {content.title}
            </h1>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleActionComplete("download")}
                className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm hover:bg-gray-100"
              >
                ↓ הורדה
              </button>
              <button
                onClick={() => handleActionComplete("share")}
                className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm hover:bg-gray-100"
              >
                ↗ שיתוף
              </button>
              <button
                onClick={() => handleActionComplete("save")}
                className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm hover:bg-gray-100"
              >
                ★ שמירה
              </button>
              <button
                onClick={() => router.back()}
                className="border-2 border-gray-600 bg-gray-100 px-4 py-2 font-mono text-sm font-bold hover:bg-gray-200"
              >
                ← חזרה
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================
          MAIN CONTENT - RTL 2-Panel Layout
          ============================================ */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ============================================
              RIGHT PANEL - Main Content (8 cols)
              ============================================ */}
          <article className="lg:col-span-8 space-y-6">
            {/* Content Header Card */}
            <section className="border-2 border-gray-400 bg-white">
              <div className="border-b-2 border-gray-300 bg-gray-100 px-6 py-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="border-2 border-gray-600 bg-gray-200 px-3 py-1 font-mono text-sm font-bold">
                    {content.type}
                  </span>
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-gray-400 bg-white px-2 py-0.5 font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="font-mono text-2xl font-bold text-gray-900 mb-2">
                  {content.title}
                </h1>
                {content.subtitle && (
                  <p className="font-mono text-base text-gray-600">
                    {content.subtitle}
                  </p>
                )}
              </div>

              {/* Meta Info */}
              <div className="px-6 py-3 flex flex-wrap gap-4 font-mono text-sm text-gray-500 border-b border-gray-200">
                {content.meta.readTime && (
                  <span className="flex items-center gap-1">
                    <span className="text-gray-400">⏱</span> {content.meta.readTime}
                  </span>
                )}
                {content.meta.author && (
                  <span className="flex items-center gap-1">
                    <span className="text-gray-400">✎</span> {content.meta.author}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <span className="text-gray-400">📅</span> {content.meta.date}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-gray-400">📚</span> {content.meta.source}
                </span>
                <span className="border border-gray-400 px-2 py-0.5 text-xs">
                  {content.meta.level}
                </span>
              </div>

              {/* Summary */}
              <div className="p-6">
                <h2 className="font-mono text-sm font-bold text-gray-700 mb-3">
                  תקציר
                </h2>
                <p className="font-mono text-base text-gray-700 leading-relaxed">
                  {content.summary}
                </p>
              </div>
            </section>

            {/* Main Content Body */}
            <section className="border-2 border-gray-400 bg-white p-6">
              <div className="space-y-6">
                {content.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-mono text-base text-gray-700 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Callout Box - "מה עושים עכשיו" */}
            {content.callout && (
              <section className="border-2 border-gray-600 bg-white">
                <div className="border-b-2 border-gray-500 bg-gray-800 px-6 py-3">
                  <h3 className="font-mono text-base font-bold text-white">
                    {content.callout.title}
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {content.callout.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-gray-600 bg-gray-100 font-mono text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="font-mono text-sm text-gray-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Clinical Note */}
            {content.clinicalNote && (
              <section className="border-2 border-gray-500 bg-gray-100">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="border-2 border-gray-600 bg-white px-3 py-1 font-mono text-xs font-bold shrink-0">
                      הערה קלינית
                    </span>
                    <p className="font-mono text-sm text-gray-700 italic leading-relaxed">
                      {content.clinicalNote}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Related Tools - Inline */}
            <section className="border-2 border-gray-400 bg-white">
              <div className="border-b-2 border-gray-300 bg-gray-100 px-6 py-3">
                <h3 className="font-mono text-base font-bold text-gray-900">
                  כלים קשורים
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {content.relatedTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleRelatedToolClick(tool.id)}
                      className="border-2 border-gray-300 bg-gray-50 p-4 text-start transition-all hover:border-gray-500 hover:bg-white"
                    >
                      <span className="mb-2 inline-block border-2 border-gray-500 bg-gray-200 px-2 py-0.5 font-mono text-xs font-bold">
                        כלי
                      </span>
                      <h4 className="font-mono text-sm font-bold text-gray-900 mb-1">
                        {tool.title}
                      </h4>
                      <span className="font-mono text-xs text-gray-600">
                        הפעלת כלי ←
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Feedback Section */}
            <section className="border-2 border-gray-400 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-gray-600">
                  האם התוכן היה שימושי?
                </span>
                <div className="flex gap-2">
                  <button className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm hover:bg-gray-100">
                    👍 כן
                  </button>
                  <button className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm hover:bg-gray-100">
                    👎 לא
                  </button>
                </div>
              </div>
            </section>
          </article>

          {/* ============================================
              LEFT PANEL - Evidence/References (4 cols)
              ============================================ */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents */}
            <section className="border-2 border-gray-400 bg-white">
              <div className="border-b-2 border-gray-300 bg-gray-100 px-4 py-3">
                <h3 className="font-mono text-sm font-bold text-gray-900">
                  תוכן עניינים
                </h3>
              </div>
              <div className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: "summary", label: "תקציר" },
                    { id: "content", label: "תוכן מלא" },
                    { id: "action", label: "מה עושים עכשיו" },
                    { id: "tools", label: "כלים קשורים" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-start px-3 py-2 font-mono text-sm transition-colors ${
                        activeSection === item.id
                          ? "border-s-4 border-gray-600 bg-gray-100 font-bold"
                          : "border-s-4 border-transparent hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </section>

            {/* References Panel */}
            <section className="border-2 border-gray-400 bg-white">
              <div className="border-b-2 border-gray-300 bg-gray-100 px-4 py-3">
                <h3 className="font-mono text-sm font-bold text-gray-900">
                  מקורות והפניות
                </h3>
                <p className="font-mono text-xs text-gray-500">
                  {MOCK_REFERENCES.length} מקורות
                </p>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-4">
                <div className="space-y-3">
                  {MOCK_REFERENCES.map((ref) => (
                    <div
                      key={ref.id}
                      className="border border-gray-300 p-3 hover:bg-gray-50"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-gray-500 bg-gray-100 font-mono text-xs font-bold">
                          {ref.number}
                        </span>
                        <span className="border border-gray-400 px-2 py-0.5 font-mono text-xs">
                          {ref.type}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-gray-600 leading-relaxed">
                        {ref.citation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Terms */}
            <section className="border-2 border-gray-400 bg-white">
              <div className="border-b-2 border-gray-300 bg-gray-100 px-4 py-3">
                <h3 className="font-mono text-sm font-bold text-gray-900">
                  מושגי מפתח
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {MOCK_KEY_TERMS.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                      <dt className="font-mono text-sm font-bold text-gray-900 mb-1">
                        {item.term}
                      </dt>
                      <dd className="font-mono text-xs text-gray-600">
                        {item.definition}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Related Content */}
            <section className="border-2 border-gray-400 bg-white">
              <div className="border-b-2 border-gray-300 bg-gray-100 px-4 py-3">
                <h3 className="font-mono text-sm font-bold text-gray-900">
                  תכנים קשורים
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {content.relatedContent.map((related) => (
                    <button
                      key={related.id}
                      onClick={() => handleRelatedContentClick(related.id)}
                      className="w-full border border-gray-300 p-3 text-start transition-colors hover:border-gray-500 hover:bg-gray-50"
                    >
                      <span className="mb-1 inline-block border border-gray-400 px-2 py-0.5 font-mono text-xs">
                        {related.type}
                      </span>
                      <h4 className="font-mono text-sm font-bold text-gray-900">
                        {related.title}
                      </h4>
                      <span className="font-mono text-xs text-gray-500">
                        פתיחה ←
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Back Navigation */}
            <div className="sticky bottom-4 space-y-2">
              <button
                onClick={() => router.back()}
                className="w-full border-2 border-gray-600 bg-gray-800 p-4 font-mono text-sm font-bold text-white hover:bg-gray-700"
              >
                ← חזרה לתוצאות החיפוש
              </button>
              <button
                onClick={() => router.push("/therapist")}
                className="w-full border-2 border-gray-400 bg-white p-3 font-mono text-sm text-gray-700 hover:bg-gray-100"
              >
                חזרה ללובי מטפל/ת
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="border-t-2 border-gray-300 bg-gray-100 p-6 mt-12">
        <div className="mx-auto max-w-7xl text-center font-mono text-xs text-gray-500">
          © ICA — המרכז הישראלי להתמכרויות | מרכז הידע והכלים
        </div>
      </footer>
    </div>
  );
}
