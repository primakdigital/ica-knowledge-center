"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

/**
 * Articles_Index_v1 - Therapist Articles Index
 * Route: /therapist/articles/
 * מאמרים ומחקרים - Articles & Research
 * Version: 1.0
 */

// =============================================================================
// DATA
// =============================================================================

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "מחקר" | "מאמר עמדה" | "סקירת ספרות" | "מדריך קליני";
  topics: string[];
  author: string;
  date: string;
  readTime: string;
  source: string;
  featured: boolean;
}

const ARTICLES_DATA: Article[] = [
  {
    id: "art-1",
    slug: "cbt-addiction-evidence",
    title: "גישות מבוססות ראיות לטיפול בהתמכרות לקנאביס",
    excerpt: "סקירה מקיפה של הגישות הטיפוליות המבוססות ראיות לטיפול בהפרעת שימוש בקנאביס, כולל CBT, ראיון מוטיבציוני, וטיפול משולב.",
    category: "סקירת ספרות",
    topics: ["קנאביס", "CBT", "טיפול מבוסס ראיות"],
    author: "ד״ר מיכל כהן",
    date: "ינואר 2026",
    readTime: "12 דקות קריאה",
    source: "ICA",
    featured: true,
  },
  {
    id: "art-2",
    slug: "harm-reduction-clinical",
    title: "Harm Reduction – עקרונות יישומיים לקליניקה",
    excerpt: "מדריך פרקטי ליישום עקרונות מזעור נזקים בסביבה הקלינית, כולל דוגמאות מקרה והמלצות לעבודה עם מטופלים.",
    category: "מדריך קליני",
    topics: ["מזעור נזקים", "התערבות", "עבודה קלינית"],
    author: "צוות מקצועי ICA",
    date: "דצמבר 2025",
    readTime: "8 דקות קריאה",
    source: "ICA",
    featured: true,
  },
  {
    id: "art-3",
    slug: "behavioral-addictions-research",
    title: "התמכרויות התנהגותיות – מה חדש במחקר?",
    excerpt: "סקירת המחקרים העדכניים בתחום ההתמכרויות ההתנהגותיות: גיימינג, הימורים, רשתות חברתיות ופורנוגרפיה.",
    category: "מחקר",
    topics: ["התמכרויות התנהגותיות", "גיימינג", "הימורים", "מחקר"],
    author: "פרופ׳ דוד לוי",
    date: "נובמבר 2025",
    readTime: "15 דקות קריאה",
    source: "אוניברסיטת תל אביב",
    featured: false,
  },
  {
    id: "art-4",
    slug: "dual-diagnosis-treatment",
    title: "תחלואה כפולה: אתגרים והזדמנויות בטיפול משולב",
    excerpt: "ניתוח הגישות הטיפוליות למטופלים עם הפרעה פסיכיאטרית והפרעת שימוש בחומרים במקביל.",
    category: "מאמר עמדה",
    topics: ["תחלואה כפולה", "טיפול משולב", "פסיכיאטריה"],
    author: "ד״ר רחל שמיר",
    date: "אוקטובר 2025",
    readTime: "10 דקות קריאה",
    source: "ICA",
    featured: true,
  },
  {
    id: "art-5",
    slug: "motivational-interviewing-guide",
    title: "ראיון מוטיבציוני: מדריך מעשי למטפל",
    excerpt: "מדריך שלב-אחר-שלב ליישום טכניקות ראיון מוטיבציוני בעבודה עם מתמודדים עם התמכרות.",
    category: "מדריך קליני",
    topics: ["ראיון מוטיבציוני", "MI", "טכניקות טיפול"],
    author: "ד״ר יעל ברק",
    date: "ספטמבר 2025",
    readTime: "14 דקות קריאה",
    source: "ICA",
    featured: false,
  },
  {
    id: "art-6",
    slug: "alcohol-adolescents-israel",
    title: "שימוש באלכוהול בקרב בני נוער בישראל – נתונים ומגמות",
    excerpt: "סקירת הנתונים העדכניים על שימוש באלכוהול בקרב בני נוער בישראל והשוואה למגמות בעולם.",
    category: "מחקר",
    topics: ["אלכוהול", "בני נוער", "אפידמיולוגיה", "ישראל"],
    author: "משרד הבריאות",
    date: "אוגוסט 2025",
    readTime: "11 דקות קריאה",
    source: "משרד הבריאות",
    featured: false,
  },
  {
    id: "art-7",
    slug: "family-therapy-addiction",
    title: "טיפול משפחתי בהתמכרויות: גישות ומודלים",
    excerpt: "סקירה של המודלים המרכזיים לטיפול משפחתי בהתמכרויות, כולל CRAFT, טיפול משפחתי רב-דורי, וגישות אינטגרטיביות.",
    category: "סקירת ספרות",
    topics: ["טיפול משפחתי", "CRAFT", "משפחות"],
    author: "ד״ר נועה פרידמן",
    date: "יולי 2025",
    readTime: "13 דקות קריאה",
    source: "ICA",
    featured: false,
  },
  {
    id: "art-8",
    slug: "opioid-crisis-treatment",
    title: "משבר האופיואידים: פרוטוקולים לטיפול והתערבות",
    excerpt: "מדריך קליני לטיפול בהפרעת שימוש באופיואידים, כולל טיפול תרופתי, ניהול גמילה, ומניעת הישנות.",
    category: "מדריך קליני",
    topics: ["אופיואידים", "טיפול תרופתי", "גמילה"],
    author: "צוות מקצועי ICA",
    date: "יוני 2025",
    readTime: "16 דקות קריאה",
    source: "ICA",
    featured: false,
  },
  {
    id: "art-9",
    slug: "relapse-prevention-strategies",
    title: "מניעת הישנות: אסטרטגיות מבוססות ראיות",
    excerpt: "סקירה של האסטרטגיות היעילות ביותר למניעת הישנות, כולל זיהוי טריגרים, בניית כישורי התמודדות, ותמיכה ארוכת טווח.",
    category: "סקירת ספרות",
    topics: ["מניעת הישנות", "טריגרים", "התמודדות"],
    author: "ד״ר תמר גולן",
    date: "מאי 2025",
    readTime: "9 דקות קריאה",
    source: "ICA",
    featured: false,
  },
];

const FILTER_CATEGORIES = ["הכל", "מחקר", "מאמר עמדה", "סקירת ספרות", "מדריך קליני"];
const FILTER_TOPICS = ["הכל", "קנאביס", "אלכוהול", "אופיואידים", "התמכרויות התנהגותיות", "טיפול משפחתי", "CBT", "מזעור נזקים"];

// =============================================================================
// COMPONENT
// =============================================================================

export default function TherapistArticlesIndex() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("הכל");
  const [topicFilter, setTopicFilter] = React.useState("הכל");
  const [sortBy, setSortBy] = React.useState<"date" | "readTime">("date");

  // Filter and sort articles
  const filteredArticles = ARTICLES_DATA
    .filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.includes(searchQuery) ||
        article.excerpt.includes(searchQuery) ||
        article.author.includes(searchQuery);
      const matchesCategory =
        categoryFilter === "הכל" || article.category === categoryFilter;
      const matchesTopic =
        topicFilter === "הכל" || article.topics.includes(topicFilter);
      return matchesSearch && matchesCategory && matchesTopic;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return 0; // Keep original order (already sorted by date)
      }
      // Sort by read time (extract number)
      const aTime = parseInt(a.readTime);
      const bTime = parseInt(b.readTime);
      return aTime - bTime;
    });

  const featuredArticles = ARTICLES_DATA.filter((a) => a.featured);

  const handleArticleClick = (slug: string) => {
    router.push(`/therapist/articles/${slug}`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b-2 border-gray-300 bg-gray-100 p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="border-2 border-gray-400 px-4 py-2 font-mono text-sm hover:bg-gray-200"
          >
            [LOGO] ICA מרכז ידע
          </button>
          <nav className="flex gap-6 font-mono text-sm text-gray-600">
            <span className="cursor-pointer hover:text-gray-900">אודות</span>
            <span className="cursor-pointer hover:text-gray-900">מרכז מידע</span>
            <span className="cursor-pointer hover:text-gray-900">קמפוס הכשרות</span>
            <span className="cursor-pointer hover:text-gray-900">אפשרויות טיפול</span>
            <span className="cursor-pointer hover:text-gray-900">צור קשר</span>
          </nav>
        </div>
      </header>

      {/* AUDIENCE TABS */}
      <div className="border-b-2 border-gray-300 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex gap-0">
            {[
              { id: "user", label: "מתמודד/ת", route: "/user" },
              { id: "family", label: "הורים ובני משפחה", route: "/family" },
              { id: "education", label: "אנשי חינוך", route: "/education" },
              { id: "therapist", label: "אנשי מקצוע", route: "/therapist" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => router.push(tab.route)}
                className={`border-b-4 px-6 py-3 font-mono text-sm transition-colors ${
                  tab.id === "therapist"
                    ? "border-gray-800 bg-gray-100 font-bold text-gray-900"
                    : "border-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center gap-2 font-mono text-sm text-gray-500">
            <button onClick={() => router.push("/")} className="hover:text-gray-900">
              מרכז הידע
            </button>
            <span>›</span>
            <button onClick={() => router.push("/therapist")} className="hover:text-gray-900">
              אנשי מקצוע
            </button>
            <span>›</span>
            <span className="font-medium text-gray-900">מאמרים ומחקרים</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="border-b-2 border-gray-300 bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <div className="mb-4 inline-block border-2 border-gray-600 bg-white px-3 py-1 font-mono text-xs font-bold">
              ספריית מאמרים
            </div>
            <h1 className="mb-4 font-mono text-4xl font-bold text-gray-900">
              מאמרים ומחקרים
            </h1>
            <p className="mb-6 font-mono text-lg text-gray-600 leading-relaxed">
              מחקרים עדכניים, סקירות ספרות, ומאמרי עמדה בתחום ההתמכרויות בישראל ובעולם.
              תוכן מקצועי מבוסס ראיות לעבודה קלינית.
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="font-mono text-2xl font-bold text-gray-900">{ARTICLES_DATA.length}</p>
                <p className="font-mono text-xs text-gray-600">מאמרים</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-2xl font-bold text-gray-900">
                  {ARTICLES_DATA.filter((a) => a.category === "מחקר").length}
                </p>
                <p className="font-mono text-xs text-gray-600">מחקרים</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-2xl font-bold text-gray-900">
                  {ARTICLES_DATA.filter((a) => a.category === "מדריך קליני").length}
                </p>
                <p className="font-mono text-xs text-gray-600">מדריכים קליניים</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section className="border-b-2 border-gray-300 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 font-mono text-xl font-bold text-gray-900">מאמרים נבחרים</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredArticles.slice(0, 3).map((article) => (
              <button
                key={article.id}
                onClick={() => handleArticleClick(article.slug)}
                className="border-2 border-gray-400 bg-gray-50 p-6 text-start transition-all hover:border-gray-600 hover:shadow-lg"
              >
                <span className={`mb-3 inline-block border px-2 py-1 font-mono text-xs ${
                  article.category === "מחקר" ? "border-blue-400 bg-blue-50 text-blue-700"
                  : article.category === "מדריך קליני" ? "border-green-400 bg-green-50 text-green-700"
                  : article.category === "סקירת ספרות" ? "border-purple-400 bg-purple-50 text-purple-700"
                  : "border-orange-400 bg-orange-50 text-orange-700"
                }`}>
                  {article.category}
                </span>
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900 leading-tight">
                  {article.title}
                </h3>
                <p className="mb-4 font-mono text-sm text-gray-600 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 font-mono text-xs text-gray-500">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="border-b-2 border-gray-300 bg-gray-50 py-6">
        <div className="mx-auto max-w-6xl px-6">
          {/* Search Bar */}
          <div className="mb-6 flex border-2 border-gray-400 bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש לפי כותרת, מחבר או מילות מפתח..."
              className="flex-1 p-4 font-mono text-base outline-none"
            />
            <button className="border-s-2 border-gray-400 bg-gray-100 px-8 font-mono font-bold hover:bg-gray-200">
              🔍 חיפוש
            </button>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-gray-600">סוג:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm outline-none"
              >
                {FILTER_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Topic Filter */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-gray-600">נושא:</span>
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm outline-none"
              >
                {FILTER_TOPICS.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-gray-600">מיון:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "readTime")}
                className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm outline-none"
              >
                <option value="date">תאריך פרסום</option>
                <option value="readTime">זמן קריאה</option>
              </select>
            </div>

            {/* Results Count */}
            <p className="mr-auto font-mono text-sm text-gray-500">
              {filteredArticles.length} מאמרים
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLES LIST */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-6">
          {filteredArticles.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border-2 border-gray-300 bg-gray-100">
                <span className="text-4xl">📚</span>
              </div>
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">לא נמצאו מאמרים</h3>
              <p className="mb-6 font-mono text-sm text-gray-600">
                נסו לשנות את הפילטרים או מילות החיפוש
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("הכל");
                  setTopicFilter("הכל");
                }}
                className="border-2 border-gray-400 bg-white px-6 py-2 font-mono text-sm hover:bg-gray-100"
              >
                איפוס חיפוש
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <button
                  key={article.id}
                  onClick={() => handleArticleClick(article.slug)}
                  className="flex w-full gap-6 border-2 border-gray-400 bg-white p-6 text-start transition-all hover:border-gray-600 hover:shadow-md"
                >
                  {/* Thumbnail Placeholder */}
                  <div className="hidden shrink-0 md:flex h-32 w-32 items-center justify-center border-2 border-gray-300 bg-gray-100">
                    <span className="text-4xl">📄</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Category & Topics */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className={`border px-2 py-0.5 font-mono text-xs ${
                        article.category === "מחקר" ? "border-blue-400 bg-blue-50 text-blue-700"
                        : article.category === "מדריך קליני" ? "border-green-400 bg-green-50 text-green-700"
                        : article.category === "סקירת ספרות" ? "border-purple-400 bg-purple-50 text-purple-700"
                        : "border-orange-400 bg-orange-50 text-orange-700"
                      }`}>
                        {article.category}
                      </span>
                      {article.topics.slice(0, 2).map((topic) => (
                        <span key={topic} className="border border-gray-300 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-600">
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 font-mono text-sm text-gray-600 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-gray-500">
                      <span>✎ {article.author}</span>
                      <span>📅 {article.date}</span>
                      <span>⏱ {article.readTime}</span>
                      <span>📚 {article.source}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden items-center md:flex">
                    <span className="font-mono text-2xl text-gray-400">←</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="border-t-2 border-gray-300 bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">מחפשים כלים קליניים?</h3>
              <p className="font-mono text-sm text-gray-600">
                לספריית כלי האבחון והסקרינינג
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/therapist")}
                className="border-2 border-gray-400 bg-white px-6 py-3 font-mono text-sm hover:bg-gray-100"
              >
                ← חזרה ללובי
              </button>
              <button
                onClick={() => router.push("/therapist/tools")}
                className="border-2 border-gray-600 bg-gray-800 px-6 py-3 font-mono text-sm font-bold text-white hover:bg-gray-700"
              >
                לכלי האבחון ←
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-gray-300 bg-gray-100 py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-6 font-mono text-sm text-gray-600">
              <button className="hover:text-gray-900">מרכז הידע</button>
              <button className="hover:text-gray-900">אפשרויות טיפול</button>
              <button className="hover:text-gray-900">אודות</button>
              <button className="hover:text-gray-900">צור קשר</button>
            </div>
            <p className="font-mono text-xs text-gray-500">
              © ICA — המרכז הישראלי להתמכרויות | info@ica.org.il
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
