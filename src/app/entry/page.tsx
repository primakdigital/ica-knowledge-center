"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

/**
 * KF-ENT-01 - ICA Main Entry (Wireframe)
 *
 * External routing page - entry point from main ICA website.
 * Provides context and routes to knowledge center.
 */

export default function ICAMainEntryPage() {
  const router = useRouter();

  const handleEnterKnowledgeCenter = () => {
    router.push("/");
  };

  const handleDirectToTherapist = () => {
    router.push("/therapist");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          ICA MAIN HEADER (External Site Style)
          ============================================ */}
      <header className="border-b-2 border-gray-300 bg-gray-800 p-4 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border-2 border-gray-500 px-4 py-2 font-mono text-sm">
              [ICA LOGO] המרכז הישראלי להתמכרויות
            </div>
          </div>
          <nav className="flex gap-6 font-mono text-sm">
            <span className="cursor-pointer hover:text-gray-300">אודות</span>
            <span className="cursor-pointer hover:text-gray-300">שירותים</span>
            <span className="cursor-pointer hover:text-gray-300">הדרכות</span>
            <span className="border-b-2 border-white font-bold">מרכז ידע</span>
            <span className="cursor-pointer hover:text-gray-300">צור קשר</span>
          </nav>
        </div>
      </header>

      {/* ============================================
          BREADCRUMB
          ============================================ */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
        <div className="mx-auto max-w-6xl">
          <nav className="font-mono text-sm text-gray-500">
            <span className="hover:text-gray-700 cursor-pointer">ICA ראשי</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">מרכז הידע והכלים</span>
          </nav>
        </div>
      </div>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="border-b-2 border-gray-300 bg-gray-100 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          {/* Badge */}
          <div className="mb-6 inline-block border-2 border-gray-600 bg-white px-4 py-2 font-mono text-sm font-bold">
            שירות חדש
          </div>

          {/* Title */}
          <h1 className="mb-6 font-mono text-4xl font-bold text-gray-900">
            מרכז הידע והכלים של ICA
          </h1>

          {/* Subtitle */}
          <p className="mb-8 font-mono text-xl text-gray-600">
            מאגר מקצועי מקיף לאנשי טיפול ולמתמודדים עם התמכרויות
          </p>

          {/* Key Features */}
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {[
              "תשובות מקצועיות בזמן אמת",
              "כלי הערכה ואבחון",
              "פרוטוקולים ומדריכים",
              "תכנים מבוססי מחקר",
            ].map((feature) => (
              <span
                key={feature}
                className="border border-gray-400 bg-white px-4 py-2 font-mono text-sm"
              >
                ✓ {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={handleEnterKnowledgeCenter}
              className="w-full border-2 border-gray-800 bg-gray-800 px-10 py-4 font-mono text-base font-bold text-white hover:bg-gray-700 sm:w-auto"
            >
              כניסה למרכז הידע ←
            </button>
            <button
              onClick={handleDirectToTherapist}
              className="w-full border-2 border-gray-600 bg-white px-10 py-4 font-mono text-base text-gray-700 hover:bg-gray-100 sm:w-auto"
            >
              כניסה ישירה למטפלים
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          AUDIENCE SECTION
          ============================================ */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center font-mono text-2xl font-bold text-gray-900">
            למי מיועד מרכז הידע?
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Therapists */}
            <div className="border-2 border-gray-400 bg-white p-8">
              <div className="mb-4 inline-block border-2 border-gray-300 p-3 font-mono text-xs">
                [ICON]
              </div>
              <h3 className="mb-3 font-mono text-xl font-bold text-gray-900">
                אנשי מקצוע ומטפלים
              </h3>
              <p className="mb-6 font-mono text-sm text-gray-600 leading-relaxed">
                עובדים סוציאליים, פסיכולוגים, יועצים, רופאים ואנשי צוות רב-מקצועי
                העובדים עם אנשים המתמודדים עם התמכרויות.
              </p>
              <ul className="mb-6 space-y-2">
                {[
                  "פרוטוקולים והנחיות עבודה",
                  "כלי הערכה ושאלונים",
                  "מאמרים ומחקרים",
                  "הדרכות ווידאו",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-gray-400">•</span>
                    <span className="font-mono text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleDirectToTherapist}
                className="w-full border-2 border-gray-600 bg-gray-100 py-3 font-mono text-sm font-bold hover:bg-gray-200"
              >
                כניסה ללובי מטפל/ת ←
              </button>
            </div>

            {/* Users/Patients */}
            <div className="border-2 border-gray-400 bg-white p-8">
              <div className="mb-4 inline-block border-2 border-gray-300 p-3 font-mono text-xs">
                [ICON]
              </div>
              <h3 className="mb-3 font-mono text-xl font-bold text-gray-900">
                מתמודדים ובני משפחה
              </h3>
              <p className="mb-6 font-mono text-sm text-gray-600 leading-relaxed">
                אנשים המתמודדים עם התמכרות, בני משפחה, ומי שמחפש מידע אמין
                על התמכרויות ודרכי התמודדות.
              </p>
              <ul className="mb-6 space-y-2">
                {[
                  "מידע מהימן ונגיש",
                  "כלי עזר עצמי",
                  "מדריכים להתמודדות",
                  "קישור למשאבים",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-gray-400">•</span>
                    <span className="font-mono text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleEnterKnowledgeCenter}
                className="w-full border-2 border-gray-400 bg-white py-3 font-mono text-sm hover:bg-gray-100"
              >
                כניסה למרכז הידע ←
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION
          ============================================ */}
      <section className="border-y-2 border-gray-300 bg-gray-50 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "500+", label: "מאמרים ומדריכים" },
              { number: "50+", label: "כלי הערכה" },
              { number: "100+", label: "סרטוני הדרכה" },
              { number: "24/7", label: "זמינות" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="mb-2 font-mono text-4xl font-bold text-gray-900">
                  {stat.number}
                </p>
                <p className="font-mono text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ABOUT SECTION
          ============================================ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 font-mono text-2xl font-bold text-gray-900">
            אודות המרכז הישראלי להתמכרויות
          </h2>
          <p className="mb-8 font-mono text-base text-gray-600 leading-relaxed">
            ICA הוא ארגון מוביל בתחום ההתמכרויות בישראל, המספק הדרכה, ייעוץ
            ושירותי תמיכה לאנשי מקצוע ולמתמודדים. מרכז הידע הוא חלק מהמחויבות
            שלנו להנגשת מידע מקצועי ואיכותי לכל מי שזקוק לו.
          </p>
          <button
            onClick={handleEnterKnowledgeCenter}
            className="border-2 border-gray-600 bg-gray-800 px-10 py-4 font-mono text-base font-bold text-white hover:bg-gray-700"
          >
            התחל/י לחפש במרכז הידע ←
          </button>
        </div>
      </section>

      {/* ============================================
          ICA MAIN FOOTER
          ============================================ */}
      <footer className="border-t-2 border-gray-300 bg-gray-800 py-12 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Logo & Contact */}
            <div>
              <div className="mb-4 border-2 border-gray-600 px-4 py-2 font-mono text-sm inline-block">
                [ICA LOGO]
              </div>
              <p className="font-mono text-sm text-gray-400">
                המרכז הישראלי להתמכרויות
              </p>
              <p className="mt-2 font-mono text-xs text-gray-500">
                info@ica.org.il
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-mono text-sm font-bold">קישורים מהירים</h4>
              <ul className="space-y-2 font-mono text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">אודות ICA</li>
                <li className="hover:text-white cursor-pointer">שירותים</li>
                <li className="hover:text-white cursor-pointer">הדרכות</li>
                <li className="hover:text-white cursor-pointer">צור קשר</li>
              </ul>
            </div>

            {/* Knowledge Center */}
            <div>
              <h4 className="mb-4 font-mono text-sm font-bold">מרכז הידע</h4>
              <ul className="space-y-2 font-mono text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">לובי מטפל/ת</li>
                <li className="hover:text-white cursor-pointer">כלים</li>
                <li className="hover:text-white cursor-pointer">מאמרים</li>
                <li className="hover:text-white cursor-pointer">חיפוש</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 font-mono text-sm font-bold">משפטי</h4>
              <ul className="space-y-2 font-mono text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">תנאי שימוש</li>
                <li className="hover:text-white cursor-pointer">פרטיות</li>
                <li className="hover:text-white cursor-pointer">נגישות</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-8 text-center font-mono text-xs text-gray-500">
            © 2026 ICA — המרכז הישראלי להתמכרויות. כל הזכויות שמורות.
          </div>
        </div>
      </footer>
    </div>
  );
}
