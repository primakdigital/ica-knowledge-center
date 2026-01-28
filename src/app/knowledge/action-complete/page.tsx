"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * KF-ACT-01 - Action Confirmation (Wireframe)
 *
 * Loop closure screen after completing an action.
 * Shows confirmation and suggests next steps.
 */

type ActionType = "tool" | "save" | "share" | "download";

interface ActionConfig {
  title: string;
  message: string;
  icon: string;
  nextSteps: string[];
}

const actionConfigs: Record<ActionType, ActionConfig> = {
  tool: {
    title: "הכלי הושלם בהצלחה",
    message: "התוצאות נשמרו ומוכנות לצפייה או הורדה.",
    icon: "✓",
    nextSteps: [
      "הורדת דוח התוצאות כקובץ PDF",
      "שיתוף התוצאות עם עמית/ה",
      "שמירה לאוסף האישי",
      "חזרה לחיפוש תכנים נוספים",
    ],
  },
  save: {
    title: "נשמר לאוסף בהצלחה",
    message: "התוכן נוסף לאוסף האישי שלך וזמין לגישה מהירה.",
    icon: "★",
    nextSteps: [
      "צפייה באוסף האישי",
      "המשך עיון בתכנים קשורים",
      "חזרה לתוצאות החיפוש",
      "חזרה ללובי מטפל/ת",
    ],
  },
  share: {
    title: "התוכן שותף בהצלחה",
    message: "הקישור נשלח ליעד שבחרת.",
    icon: "↗",
    nextSteps: [
      "שיתוף תוכן נוסף",
      "המשך עיון בתכנים קשורים",
      "חזרה לתוצאות החיפוש",
      "חזרה ללובי מטפל/ת",
    ],
  },
  download: {
    title: "ההורדה הושלמה",
    message: "הקובץ הורד למכשיר שלך בהצלחה.",
    icon: "↓",
    nextSteps: [
      "הורדת תכנים נוספים",
      "שמירה לאוסף האישי",
      "חזרה לתוצאות החיפוש",
      "חזרה ללובי מטפל/ת",
    ],
  },
};

function ActionCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const actionType = (searchParams.get("type") as ActionType) || "tool";
  const itemTitle = searchParams.get("title") || "פריט";
  const returnUrl = searchParams.get("return") || "/therapist";

  const config = actionConfigs[actionType] || actionConfigs.tool;

  const handleNextStep = (step: string) => {
    // Route based on step content
    if (step.includes("לובי")) {
      router.push("/therapist");
    } else if (step.includes("חיפוש")) {
      router.push("/knowledge/search");
    } else if (step.includes("אוסף")) {
      // Would go to collection page when implemented
      router.push("/therapist");
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          WIREFRAME HEADER
          ============================================ */}
      <header className="border-b-2 border-gray-300 bg-gray-100 p-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="border-2 border-gray-400 px-4 py-2 font-mono text-sm hover:bg-gray-200"
          >
            [LOGO] ICA מרכז ידע
          </button>
          <nav className="flex gap-4 font-mono text-sm text-gray-600">
            <button
              onClick={() => router.push("/therapist")}
              className="hover:text-gray-900"
            >
              לובי מטפל/ת
            </button>
          </nav>
        </div>
      </header>

      {/* ============================================
          CONFIRMATION CONTENT
          ============================================ */}
      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center border-4 border-gray-600 bg-gray-100">
            <span className="font-mono text-5xl text-gray-700">{config.icon}</span>
          </div>

          {/* Success Title */}
          <h1 className="mb-4 font-mono text-3xl font-bold text-gray-900">
            {config.title}
          </h1>

          {/* Item Title */}
          <p className="mb-2 font-mono text-lg text-gray-700">
            &quot;{itemTitle}&quot;
          </p>

          {/* Success Message */}
          <p className="mb-12 font-mono text-base text-gray-600">
            {config.message}
          </p>

          {/* Next Steps */}
          <div className="mb-12 border-2 border-gray-400 bg-gray-50 p-6 text-start">
            <h2 className="mb-4 font-mono text-base font-bold text-gray-900">
              מה עכשיו?
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {config.nextSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => handleNextStep(step)}
                  className="flex items-center gap-3 border border-gray-300 bg-white p-4 text-start transition-colors hover:border-gray-500 hover:bg-gray-100"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-gray-400 font-mono text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-mono text-sm text-gray-700">{step}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => router.back()}
              className="w-full border-2 border-gray-600 bg-gray-800 px-8 py-3 font-mono text-sm font-bold text-white hover:bg-gray-700 sm:w-auto"
            >
              חזרה לתוצאות
            </button>
            <button
              onClick={() => router.push("/knowledge/search")}
              className="w-full border-2 border-gray-400 bg-white px-8 py-3 font-mono text-sm text-gray-700 hover:bg-gray-100 sm:w-auto"
            >
              המשך חיפוש
            </button>
            <button
              onClick={() => router.push("/therapist")}
              className="w-full border-2 border-gray-400 bg-white px-8 py-3 font-mono text-sm text-gray-700 hover:bg-gray-100 sm:w-auto"
            >
              חזרה ללובי
            </button>
          </div>
        </div>
      </main>

      {/* ============================================
          FEEDBACK SECTION
          ============================================ */}
      <section className="border-t-2 border-gray-300 bg-gray-50 py-8">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="mb-4 font-mono text-sm text-gray-600">
            האם המידע היה שימושי?
          </p>
          <div className="flex justify-center gap-4">
            <button className="border-2 border-gray-400 bg-white px-6 py-2 font-mono text-sm hover:bg-gray-100">
              👍 כן, תודה
            </button>
            <button className="border-2 border-gray-400 bg-white px-6 py-2 font-mono text-sm hover:bg-gray-100">
              👎 לא ממש
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          WIREFRAME FOOTER
          ============================================ */}
      <footer className="border-t-2 border-gray-300 bg-gray-100 p-6">
        <div className="mx-auto max-w-5xl text-center font-mono text-xs text-gray-500">
          [FOOTER] © ICA — המרכז הישראלי להתמכרויות | info@ica.org.il
        </div>
      </footer>
    </div>
  );
}

export default function ActionCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="font-mono text-gray-500">טוען...</div>
        </div>
      }
    >
      <ActionCompleteContent />
    </Suspense>
  );
}
