"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

/**
 * S0 - Hybrid Entry (Wireframe)
 *
 * Main landing page with enhanced persona cards.
 * Includes search, persona selection, and popular topics.
 */

// Persona definitions with details
const PERSONAS = [
  {
    id: "user",
    title: "מתמודד/ת",
    subtitle: "מידע וכלים להחלמה ומזעור נזקים",
    description:
      "מידע אמין, כלי עזר עצמי, ומשאבים לתמיכה בתהליך ההחלמה וההתמודדות היומיומית.",
    features: [
      "מידע מהימן ונגיש",
      "הערכה עצמית",
      "כלי עזר להתמודדות",
      "קישור למשאבים",
    ],
    cta: "כניסה לאזור אישי",
    route: "/user",
    icon: "💙",
    highlight: false,
  },
  {
    id: "family",
    title: "הורים ובני משפחה",
    subtitle: "תמיכה והכוונה למשפחות",
    description:
      "מידע והדרכה לבני משפחה של אנשים המתמודדים עם התמכרות. הבנה, תמיכה וכלים להתמודדות.",
    features: [
      "זיהוי סימני אזהרה",
      "גבולות ותקשורת",
      "טיפול עצמי למשפחה",
      "מדריכים להורים",
    ],
    cta: "כניסה לאזור משפחות",
    route: "/family",
    icon: "🧡",
    highlight: false,
  },
  {
    id: "education",
    title: "אנשי חינוך",
    subtitle: "זיהוי מוקדם ומניעה בבית הספר",
    description:
      "כלים, פרוטוקולים ומדריכים לאנשי חינוך — לזיהוי מוקדם של תלמידים בסיכון ולפעילויות מניעה.",
    features: [
      "זיהוי סימנים מוקדמים",
      "פרוטוקולי התערבות",
      "תוכניות מניעה",
      "הדרכות צוות",
    ],
    cta: "כניסה לאזור חינוך",
    route: "/education",
    icon: "💚",
    highlight: false,
  },
  {
    id: "therapist",
    title: "אנשי מקצוע",
    subtitle: "כלים ותכנים לעבודה קלינית",
    description:
      "גישה מהירה לפרוטוקולים, מדריכים, כלי הערכה ומשאבים מקצועיים לעבודה עם אנשים המתמודדים עם התמכרות.",
    features: [
      "כלי אבחון וסקרינינג",
      "פרוטוקולים והנחיות",
      "מאמרים ומחקרים",
      "הדרכות מקצועיות",
    ],
    cta: "כניסה ללובי מטפל/ת",
    route: "/therapist",
    icon: "💜",
    highlight: true,
  },
];

export default function S0HybridEntry() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/knowledge/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handlePersonaClick = (route: string) => {
    router.push(route);
  };

  const handleTopicClick = (topic: string) => {
    router.push(`/knowledge/search?q=${encodeURIComponent(topic)}`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* ============================================
          WIREFRAME HEADER
          ============================================ */}
      <header className="border-b-2 border-gray-300 bg-gray-100 p-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="border-2 border-gray-400 px-4 py-2 font-mono text-sm">
            [LOGO] ICA מרכז ידע
          </div>
          <nav className="flex gap-4 font-mono text-sm text-gray-600">
            <span>ICA.org.il</span>
            <span>›</span>
            <span className="font-bold">מרכז הידע</span>
          </nav>
        </div>
      </header>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="border-b-2 border-gray-300 bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          {/* Title - Exact microcopy from spec */}
          <h1 className="mb-4 font-mono text-3xl font-bold text-gray-900">
            מרכז הידע והכלים
          </h1>

          {/* Subtitle - Exact microcopy from spec */}
          <p className="mb-8 font-mono text-lg text-gray-600">
            תשובות, תכנים וכלים מקצועיים — במעבר מהיר מצורך לפעולה.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
            <div className="flex border-2 border-gray-400 bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="לחפש נושא מקצועי, כלי, שיטה או שאלה…"
                className="flex-1 p-4 font-mono text-base outline-none"
              />
              <button
                type="submit"
                className="border-s-2 border-gray-400 bg-gray-200 px-8 font-mono font-bold hover:bg-gray-300"
              >
                חיפוש
              </button>
            </div>
          </form>

          {/* Help Link */}
          <p className="mt-4 font-mono text-sm text-gray-500">
            <button className="underline hover:text-gray-700">
              איך החיפוש עובד?
            </button>
          </p>
        </div>
      </section>

      {/* ============================================
          PERSONA SELECTION - Enhanced Cards
          ============================================ */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          {/* Section Title */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-mono text-xl font-bold text-gray-900">
              כניסה לפי פרסונה
            </h2>
            <p className="font-mono text-sm text-gray-500">
              בחרו את הקטגוריה המתאימה לכם לקבלת תוכן מותאם
            </p>
          </div>

          {/* Persona Grid - 4 columns on desktop, 2 on tablet */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handlePersonaClick(persona.route)}
                className={`border-2 bg-white p-6 text-start transition-all hover:shadow-lg ${
                  persona.highlight
                    ? "border-gray-600 border-t-4 hover:border-gray-800"
                    : "border-gray-400 hover:border-gray-600"
                }`}
              >
                {/* Icon */}
                <div className="mb-3 text-3xl">
                  {persona.icon}
                </div>

                {/* Title */}
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">
                  {persona.title}
                </h3>

                {/* Subtitle */}
                <p className="mb-3 font-mono text-sm text-gray-600">
                  {persona.subtitle}
                </p>

                {/* Description */}
                <p className="mb-4 font-mono text-xs text-gray-500 leading-relaxed">
                  {persona.description}
                </p>

                {/* Features List */}
                <ul className="mb-4 space-y-1">
                  {persona.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 font-mono text-xs text-gray-600"
                    >
                      <span className="text-gray-400">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <span
                  className={`inline-block font-mono text-sm font-bold ${
                    persona.highlight ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {persona.cta} ←
                </span>

                {/* Highlight Badge */}
                {persona.highlight && (
                  <div className="mt-3 inline-block border border-gray-400 bg-gray-100 px-2 py-1 font-mono text-xs">
                    מומלץ לאנשי מקצוע
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Direct Search Prompt */}
          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-gray-500">
              או{" "}
              <button
                onClick={() =>
                  document.querySelector("input")?.focus()
                }
                className="underline hover:text-gray-700"
              >
                התחילו בחיפוש חופשי
              </button>{" "}
              ללא בחירת פרסונה
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          QUICK STATS
          ============================================ */}
      <section className="border-y-2 border-gray-300 bg-gray-100 py-8">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { number: "500+", label: "מאמרים ומדריכים" },
              { number: "50+", label: "כלי הערכה" },
              { number: "100+", label: "סרטוני הדרכה" },
              { number: "24/7", label: "זמינות המערכת" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono text-2xl font-bold text-gray-900">
                  {stat.number}
                </p>
                <p className="font-mono text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          POPULAR TOPICS
          ============================================ */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-6">
          <h3 className="mb-6 text-center font-mono text-base font-bold text-gray-900">
            נושאים פופולריים
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "הפרעת שימוש בחומרים",
              "CBT להתמכרויות",
              "מזעור נזקים",
              "הערכה ואבחון",
              "עבודה עם משפחות",
              "התמכרות להימורים",
              "ראיון מוטיבציוני",
              "תחלואה כפולה",
              "בני נוער",
              "טיפול קבוצתי",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className="border-2 border-gray-300 bg-white px-4 py-2 font-mono text-sm hover:border-gray-500 hover:bg-gray-50"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ABOUT SECTION
          ============================================ */}
      <section className="border-t-2 border-gray-300 bg-gray-50 py-10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h3 className="mb-4 font-mono text-lg font-bold text-gray-900">
            אודות מרכז הידע
          </h3>
          <p className="mb-6 font-mono text-sm text-gray-600 leading-relaxed">
            מרכז הידע של ICA מרכז מידע מקצועי ואיכותי בתחום ההתמכרויות.
            המערכת מספקת גישה מהירה לתכנים מבוססי מחקר, כלי עבודה קליניים,
            ומשאבים להתמודדות — לאנשי מקצוע, למתמודדים ולבני משפחה.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/entry")}
              className="border-2 border-gray-400 bg-white px-6 py-2 font-mono text-sm hover:bg-gray-100"
            >
              עוד על ICA
            </button>
            <button
              onClick={() => router.push("/therapist")}
              className="border-2 border-gray-600 bg-gray-800 px-6 py-2 font-mono text-sm font-bold text-white hover:bg-gray-700"
            >
              התחל/י לחפש ←
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
