"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { mockToolItem, getToolById } from "@/data/wireframe-mock";

/**
 * S4 - Tool Item (Wireframe)
 *
 * Interactive tool/questionnaire interface with 2-panel RTL layout.
 * Right panel: Tool content and form
 * Left panel: Guidance, progress, and related tools
 */

// Mock related tools
const MOCK_RELATED_TOOLS = [
  { id: "tool-2", title: "שאלון DAST-10", type: "כלי", duration: "5 דקות" },
  { id: "tool-3", title: "מדד מוכנות לשינוי", type: "כלי", duration: "3 דקות" },
];

// Mock tips for guidance panel
const MOCK_TIPS = [
  "ענה/י על כל השאלות בכנות - אין תשובות נכונות או לא נכונות",
  "הכלי מתייחס לשנה האחרונה אלא אם צוין אחרת",
  "ניתן לחזור ולשנות תשובות לפני השליחה",
  "התוצאות הן לשימוש מקצועי בלבד",
];

export default function S4ToolItemWireframe() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Get tool by ID (falls back to mock)
  const tool = getToolById(id) || mockToolItem;

  // Form state
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [showResults, setShowResults] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<"intro" | "form" | "results">("intro");

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (activeSection === "intro") {
      setActiveSection("form");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    setActiveSection("results");
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setActiveSection("intro");
  };

  const handleActionComplete = (action: string) => {
    router.push(
      `/knowledge/action-complete?type=${action}&title=${encodeURIComponent(tool.title)}&return=${encodeURIComponent(`/knowledge/tool/${id}`)}`
    );
  };

  // Calculate score for display
  const totalScore = Object.values(answers).reduce(
    (sum, val) => sum + parseInt(val || "0", 10),
    0
  );

  const progressPercent = Math.round(
    (Object.keys(answers).length / tool.questions.length) * 100
  );

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* ============================================
          STICKY HEADER WITH BREADCRUMB
          ============================================ */}
      <header className="sticky top-0 z-50 border-b-2 border-gray-300 bg-white">
        {/* Main Header Row */}
        <div className="border-b border-gray-200 px-6 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="border-2 border-gray-400 px-4 py-2 font-mono text-sm hover:bg-gray-200"
            >
              [LOGO] ICA מרכז ידע
            </button>
            <nav className="flex items-center gap-4 font-mono text-sm text-gray-600">
              <button
                onClick={() => router.push("/therapist")}
                className="hover:text-gray-900"
              >
                לובי מטפל/ת
              </button>
              <span>|</span>
              <button
                onClick={() => router.push("/knowledge/search")}
                className="hover:text-gray-900"
              >
                חיפוש
              </button>
            </nav>
          </div>
        </div>

        {/* Breadcrumb Row */}
        <div className="bg-gray-50 px-6 py-2">
          <div className="mx-auto max-w-7xl">
            <nav className="flex items-center gap-2 font-mono text-sm text-gray-500">
              <button
                onClick={() => router.push("/therapist")}
                className="hover:text-gray-900"
              >
                לובי מטפל/ת
              </button>
              <span>›</span>
              <button
                onClick={() => router.push("/knowledge/search")}
                className="hover:text-gray-900"
              >
                חיפוש
              </button>
              <span>›</span>
              <span className="font-medium text-gray-900">כלי: {tool.title}</span>
            </nav>
          </div>
        </div>
      </header>

      {/* ============================================
          MAIN 2-PANEL LAYOUT (RTL: 8-col right, 4-col left)
          ============================================ */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* ============================================
              RIGHT PANEL - Tool Content (8 columns)
              ============================================ */}
          <div className="col-span-8 space-y-6">
            {/* Tool Header Card */}
            <div className="border-2 border-gray-400 bg-white p-6">
              {/* Badge & Tags */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="border-2 border-gray-600 bg-gray-200 px-3 py-1 font-mono text-sm font-bold">
                  כלי
                </span>
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-gray-300 px-2 py-0.5 font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mb-2 font-mono text-2xl font-bold text-gray-900">
                {tool.title}
              </h1>

              {/* Subtitle */}
              <p className="mb-4 font-mono text-lg text-gray-600">{tool.subtitle}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 font-mono text-sm text-gray-500">
                <span>⏱ זמן מילוי: {tool.meta.duration}</span>
                <span>|</span>
                <span>📄 פלט: {tool.meta.outputType}</span>
                <span>|</span>
                <span>📊 {tool.questions.length} שאלות</span>
              </div>
            </div>

            {!showResults ? (
              <>
                {/* Description Card */}
                <div className="border-2 border-gray-400 bg-gray-50 p-6">
                  <h2 className="mb-3 font-mono text-base font-bold text-gray-900">
                    תיאור הכלי
                  </h2>
                  <p className="font-mono text-base text-gray-700 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Instructions Card */}
                <div className="border-2 border-gray-400 bg-white p-6">
                  <h2 className="mb-4 font-mono text-base font-bold text-gray-900">
                    הנחיות למילוי
                  </h2>
                  <ol className="space-y-3">
                    {tool.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-gray-400 bg-gray-100 font-mono text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-mono text-sm text-gray-700">
                          {instruction}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Questions Form */}
                <form onSubmit={handleSubmit}>
                  <div className="border-2 border-gray-600 bg-white p-6">
                    <h2 className="mb-6 border-b-2 border-gray-300 pb-3 font-mono text-lg font-bold text-gray-900">
                      שאלון
                    </h2>

                    <div className="space-y-8">
                      {tool.questions.map((question, qIndex) => (
                        <div
                          key={question.id}
                          id={`question-${qIndex + 1}`}
                          className="border-b border-gray-200 pb-6 last:border-0"
                        >
                          <p className="mb-4 font-mono text-base font-bold text-gray-900">
                            {qIndex + 1}. {question.text}
                          </p>

                          {question.type === "radio" && question.options && (
                            <div className="space-y-2">
                              {question.options.map((option) => (
                                <label
                                  key={option.value}
                                  className={`flex cursor-pointer items-center gap-3 border-2 p-3 transition-colors ${
                                    answers[question.id] === option.value
                                      ? "border-gray-600 bg-gray-100"
                                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={question.id}
                                    value={option.value}
                                    checked={answers[question.id] === option.value}
                                    onChange={(e) =>
                                      handleAnswerChange(question.id, e.target.value)
                                    }
                                    className="h-4 w-4 border-2 border-gray-400"
                                  />
                                  <span className="font-mono text-sm text-gray-700">
                                    {option.label}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}

                          {question.type === "scale" && (
                            <div className="flex flex-wrap gap-2">
                              {Array.from(
                                {
                                  length:
                                    (question.scaleMax || 10) -
                                    (question.scaleMin || 0) +
                                    1,
                                },
                                (_, i) => (question.scaleMin || 0) + i
                              ).map((num) => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() =>
                                    handleAnswerChange(question.id, String(num))
                                  }
                                  className={`flex h-10 w-10 items-center justify-center border-2 font-mono text-sm transition-colors ${
                                    answers[question.id] === String(num)
                                      ? "border-gray-600 bg-gray-200 font-bold"
                                      : "border-gray-300 hover:border-gray-500"
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          )}

                          {question.type === "text" && (
                            <textarea
                              value={answers[question.id] || ""}
                              onChange={(e) =>
                                handleAnswerChange(question.id, e.target.value)
                              }
                              className="w-full border-2 border-gray-400 p-3 font-mono text-sm outline-none focus:border-gray-600"
                              rows={3}
                              placeholder="הקלד/י את תשובתך כאן..."
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex gap-4">
                      <button
                        type="submit"
                        disabled={Object.keys(answers).length < tool.questions.length}
                        className="border-2 border-gray-600 bg-gray-800 px-8 py-3 font-mono text-sm font-bold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        סיום וחישוב תוצאה ←
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="border-2 border-gray-400 bg-white px-6 py-3 font-mono text-sm text-gray-600 hover:bg-gray-100"
                      >
                        איפוס
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              /* ============================================
                 RESULTS VIEW
                 ============================================ */
              <div className="space-y-6">
                {/* Results Card */}
                <div className="border-2 border-gray-600 bg-white p-6">
                  <h2 className="mb-6 border-b-2 border-gray-300 pb-3 font-mono text-xl font-bold text-gray-900">
                    תוצאות הכלי
                  </h2>

                  {/* Score Display */}
                  <div className="mb-6 border-2 border-gray-400 bg-gray-50 p-8 text-center">
                    <p className="font-mono text-sm text-gray-600">ציון כולל</p>
                    <p className="font-mono text-6xl font-bold text-gray-900">
                      {totalScore}
                    </p>
                    <p className="mt-2 font-mono text-sm text-gray-500">
                      מתוך {tool.questions.length * 4} נקודות
                    </p>
                  </div>

                  {/* Interpretation */}
                  <div className="mb-6 border-2 border-gray-400 bg-white p-4">
                    <h3 className="mb-3 font-mono text-base font-bold text-gray-900">
                      פרשנות התוצאות
                    </h3>
                    <div className="border-r-4 border-gray-600 pr-4">
                      <p className="font-mono text-base text-gray-700">
                        {totalScore <= 7 && "רמת סיכון נמוכה - ייעוץ בסיסי מומלץ"}
                        {totalScore > 7 &&
                          totalScore <= 15 &&
                          "רמת סיכון בינונית - התערבות קצרה מומלצת"}
                        {totalScore > 15 &&
                          totalScore <= 19 &&
                          "רמת סיכון גבוהה - הערכה מעמיקה והפניה לטיפול"}
                        {totalScore > 19 && "רמת סיכון גבוהה מאוד - הפניה מיידית לטיפול"}
                      </p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="border-2 border-gray-400 bg-white p-4">
                    <h3 className="mb-3 font-mono text-base font-bold text-gray-900">
                      המלצות לפעולה
                    </h3>
                    <ol className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-gray-400 font-mono text-xs font-bold">
                          1
                        </span>
                        <span className="font-mono text-sm text-gray-700">
                          לשוחח עם המטופל/ת על תוצאות ההערכה
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-gray-400 font-mono text-xs font-bold">
                          2
                        </span>
                        <span className="font-mono text-sm text-gray-700">
                          לבחון אפשרויות התערבות מותאמות
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-gray-400 font-mono text-xs font-bold">
                          3
                        </span>
                        <span className="font-mono text-sm text-gray-700">
                          לתעד את הממצאים בתיק המטופל/ת
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleActionComplete("download")}
                    className="border-2 border-gray-600 bg-gray-800 px-6 py-3 font-mono text-sm font-bold text-white hover:bg-gray-700"
                  >
                    ↓ הורדת דוח PDF
                  </button>
                  <button
                    onClick={() => handleActionComplete("share")}
                    className="border-2 border-gray-400 bg-white px-6 py-3 font-mono text-sm hover:bg-gray-100"
                  >
                    ↗ שיתוף תוצאות
                  </button>
                  <button
                    onClick={() => handleActionComplete("save")}
                    className="border-2 border-gray-400 bg-white px-6 py-3 font-mono text-sm hover:bg-gray-100"
                  >
                    ★ שמירה לאוסף
                  </button>
                  <button
                    onClick={handleReset}
                    className="border-2 border-gray-400 bg-white px-6 py-3 font-mono text-sm hover:bg-gray-100"
                  >
                    ↻ מילוי מחדש
                  </button>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="border-2 border-gray-400 bg-gray-100 p-4">
              <p className="font-mono text-xs text-gray-600 leading-relaxed">
                <span className="font-bold">הערה חשובה:</span> {tool.disclaimer}
              </p>
            </div>
          </div>

          {/* ============================================
              LEFT PANEL - Guidance Panel (4 columns)
              ============================================ */}
          <aside className="col-span-4 space-y-6">
            {/* Progress Card */}
            <div className="sticky top-32 space-y-6">
              <div className="border-2 border-gray-400 bg-white p-4">
                <h3 className="mb-4 border-b-2 border-gray-300 pb-2 font-mono text-base font-bold text-gray-900">
                  התקדמות
                </h3>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-xs text-gray-600">
                      {Object.keys(answers).length} מתוך {tool.questions.length}
                    </span>
                    <span className="font-mono text-xs font-bold text-gray-900">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="h-3 w-full border-2 border-gray-400 bg-white">
                    <div
                      className="h-full bg-gray-600 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Section Navigation */}
                <div className="space-y-2 mt-4">
                  <button
                    onClick={() => document.getElementById("question-1")?.scrollIntoView({ behavior: "smooth" })}
                    className={`w-full text-start px-3 py-2 font-mono text-sm border-r-4 transition-colors ${
                      activeSection === "intro"
                        ? "border-gray-600 bg-gray-100 font-bold"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    תיאור והנחיות
                  </button>
                  {tool.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => document.getElementById(`question-${index + 1}`)?.scrollIntoView({ behavior: "smooth" })}
                      className={`w-full text-start px-3 py-2 font-mono text-xs transition-colors ${
                        answers[tool.questions[index].id]
                          ? "text-gray-900"
                          : "text-gray-400"
                      } hover:bg-gray-50`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${answers[tool.questions[index].id] ? "bg-gray-600" : "bg-gray-300"}`} />
                        שאלה {index + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips Card */}
              <div className="border-2 border-gray-400 bg-gray-50 p-4">
                <h3 className="mb-4 border-b-2 border-gray-300 pb-2 font-mono text-base font-bold text-gray-900">
                  טיפים למילוי
                </h3>
                <ul className="space-y-3">
                  {MOCK_TIPS.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="font-mono text-gray-400 text-sm">💡</span>
                      <span className="font-mono text-xs text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Tools */}
              <div className="border-2 border-gray-400 bg-white p-4">
                <h3 className="mb-4 border-b-2 border-gray-300 pb-2 font-mono text-base font-bold text-gray-900">
                  כלים קשורים
                </h3>
                <div className="space-y-3">
                  {MOCK_RELATED_TOOLS.map((relatedTool) => (
                    <button
                      key={relatedTool.id}
                      onClick={() => router.push(`/knowledge/tool/${relatedTool.id}`)}
                      className="w-full border border-gray-300 p-3 text-start transition-colors hover:border-gray-500 hover:bg-gray-50"
                    >
                      <span className="mb-1 inline-block border border-gray-400 px-2 py-0.5 font-mono text-xs">
                        {relatedTool.type}
                      </span>
                      <h4 className="font-mono text-sm font-bold text-gray-900">
                        {relatedTool.title}
                      </h4>
                      <span className="font-mono text-xs text-gray-500">
                        ⏱ {relatedTool.duration}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Related Content from Tool */}
              {tool.relatedContent.length > 0 && (
                <div className="border-2 border-gray-400 bg-white p-4">
                  <h3 className="mb-4 border-b-2 border-gray-300 pb-2 font-mono text-base font-bold text-gray-900">
                    תכנים קשורים
                  </h3>
                  <div className="space-y-3">
                    {tool.relatedContent.map((related) => (
                      <button
                        key={related.id}
                        onClick={() => router.push(`/knowledge/content/${related.id}`)}
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
              )}

              {/* Back Navigation */}
              <div className="space-y-2">
                <button
                  onClick={() => router.back()}
                  className="w-full border-2 border-gray-400 bg-gray-100 p-3 font-mono text-sm font-bold text-gray-700 hover:bg-gray-200"
                >
                  ← חזרה לתוצאות
                </button>
                <button
                  onClick={() => router.push("/therapist")}
                  className="w-full border-2 border-gray-400 bg-white p-3 font-mono text-sm text-gray-700 hover:bg-gray-100"
                >
                  חזרה ללובי מטפל/ת
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ============================================
          WIREFRAME FOOTER
          ============================================ */}
      <footer className="border-t-2 border-gray-300 bg-gray-100 p-6 mt-12">
        <div className="mx-auto max-w-7xl text-center font-mono text-xs text-gray-500">
          [FOOTER] © ICA — המרכז הישראלי להתמכרויות | info@ica.org.il
        </div>
      </footer>
    </div>
  );
}
