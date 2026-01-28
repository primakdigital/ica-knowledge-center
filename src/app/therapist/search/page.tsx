// Search_Results_v1 - Search results page for therapists
// Route: /therapist/search

"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Content type definitions
type ContentType = "article" | "tool" | "protocol" | "video" | "guide";

interface SearchResult {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  topics: string[];
  date: string;
  readTime?: string;
  author?: string;
  category?: string;
  url: string;
}

// Mock search results data
const allResults: SearchResult[] = [
  {
    id: "1",
    type: "article",
    title: "ראיון מוטיבציוני עם מתבגרים: התאמות והמלצות",
    description: "סקירה מעודכנת של הספרות על יישום MI עם אוכלוסיית בני נוער המתמודדים עם שימוש בחומרים.",
    topics: ["ראיון מוטיבציוני", "נוער", "טיפול פסיכולוגי"],
    date: "15 בינואר 2025",
    readTime: "12 דקות",
    author: "ד״ר מיכל כהן",
    category: "מחקר",
    url: "/therapist/articles/motivational-interviewing-adolescents"
  },
  {
    id: "2",
    type: "tool",
    title: "AUDIT - מבחן לזיהוי הפרעות שימוש באלכוהול",
    description: "שאלון בן 10 שאלות לזיהוי שימוש בעייתי באלכוהול. מתאים לסקרינינג ראשוני במסגרות בריאות.",
    topics: ["אלכוהול", "סקרינינג", "הערכה"],
    date: "",
    category: "כלי סקרינינג",
    url: "/therapist/tools/audit"
  },
  {
    id: "3",
    type: "protocol",
    title: "פרוטוקול טיפול תרופתי בתלות באופיואידים",
    description: "הנחיות קליניות מעודכנות לטיפול תרופתי בתלות באופיואידים, כולל מתדון ובופרנורפין.",
    topics: ["אופיואידים", "טיפול תרופתי", "פרוטוקול"],
    date: "דצמבר 2024",
    category: "פרוטוקול קליני",
    url: "/therapist/protocols/opioid-medication-treatment"
  },
  {
    id: "4",
    type: "article",
    title: "הפחתת נזקים בפרקטיקה הקלינית: עקרונות ויישומים",
    description: "מדריך למטפלים ליישום גישת הפחתת נזקים בעבודה היומיומית עם מתמודדים עם התמכרויות.",
    topics: ["הפחתת נזקים", "אתיקה", "טיפול"],
    date: "3 בינואר 2025",
    readTime: "15 דקות",
    author: "פרופ׳ יוסי לוי",
    category: "מאמר עמדה",
    url: "/therapist/articles/harm-reduction-clinical-practice"
  },
  {
    id: "5",
    type: "video",
    title: "הדרכה: שימוש בכלי ASSIST בפרקטיקה",
    description: "סרטון הדרכה מפורט על ביצוע סקרינינג באמצעות כלי ASSIST, כולל דוגמאות מעשיות.",
    topics: ["ASSIST", "סקרינינג", "הדרכה"],
    date: "נובמבר 2024",
    readTime: "18 דקות",
    category: "סרטון הדרכה",
    url: "/therapist/videos/assist-training"
  },
  {
    id: "6",
    type: "tool",
    title: "DAST-10 - מבחן סקרינינג לשימוש בסמים",
    description: "שאלון קצר לזיהוי שימוש בעייתי בסמים (לא כולל אלכוהול). מתאים למבוגרים ובני נוער.",
    topics: ["סמים", "סקרינינג", "הערכה"],
    date: "",
    category: "כלי סקרינינג",
    url: "/therapist/tools/dast-10"
  },
  {
    id: "7",
    type: "guide",
    title: "מדריך לשיחה עם הורים על שימוש בחומרים של ילדיהם",
    description: "כלים ושפה לניהול שיחה רגישה עם הורים כשמתגלה שימוש בחומרים אצל ילדם.",
    topics: ["הורים", "משפחה", "תקשורת"],
    date: "אוקטובר 2024",
    readTime: "8 דקות",
    category: "מדריך קליני",
    url: "/therapist/guides/talking-to-parents"
  },
  {
    id: "8",
    type: "article",
    title: "טראומה והתמכרות: הקשר הדו-כיווני",
    description: "סקירת הספרות על הקשר בין חוויות טראומטיות לפיתוח התמכרויות, והשלכות על הטיפול.",
    topics: ["טראומה", "מחקר", "טיפול משולב"],
    date: "20 בדצמבר 2024",
    readTime: "18 דקות",
    author: "ד״ר רונית שמעוני",
    category: "מחקר",
    url: "/therapist/articles/trauma-addiction-connection"
  },
  {
    id: "9",
    type: "protocol",
    title: "פרוטוקול התערבות בהתמכרות להימורים",
    description: "הנחיות להתערבות טיפולית בהימורים פתולוגיים, כולל CBT והתערבויות משפחתיות.",
    topics: ["הימורים", "CBT", "פרוטוקול"],
    date: "נובמבר 2024",
    category: "פרוטוקול קליני",
    url: "/therapist/protocols/gambling-intervention"
  },
  {
    id: "10",
    type: "tool",
    title: "CRAFFT - סקרינינג לשימוש בחומרים בקרב בני נוער",
    description: "כלי סקרינינג קצר המיועד במיוחד לאוכלוסיית בני הנוער. 6 שאלות פשוטות.",
    topics: ["נוער", "סקרינינג", "אלכוהול", "סמים"],
    date: "",
    category: "כלי סקרינינג",
    url: "/therapist/tools/crafft"
  },
  {
    id: "11",
    type: "video",
    title: "הרצאה: גישת הפחתת נזקים – מתיאוריה לפרקטיקה",
    description: "הרצאה מוקלטת מכנס ICA השנתי על יישום גישת הפחתת נזקים בשטח.",
    topics: ["הפחתת נזקים", "הרצאה", "כנס"],
    date: "ספטמבר 2024",
    readTime: "45 דקות",
    category: "הרצאה",
    url: "/therapist/videos/harm-reduction-lecture"
  },
  {
    id: "12",
    type: "article",
    title: "שימוש בקנאביס רפואי: מה המטפל צריך לדעת",
    description: "סקירה על קנאביס רפואי, התוויות, סיכונים והשלכות על הטיפול בהתמכרויות.",
    topics: ["קנאביס", "קנאביס רפואי", "מידע"],
    date: "5 בינואר 2025",
    readTime: "10 דקות",
    author: "ד״ר אבי גולן",
    category: "סקירת ספרות",
    url: "/therapist/articles/medical-cannabis-guide"
  }
];

// Type icon mapping
const typeIcons: Record<ContentType, string> = {
  article: "📄",
  tool: "🔧",
  protocol: "📋",
  video: "🎬",
  guide: "📖"
};

// Type label mapping
const typeLabels: Record<ContentType, string> = {
  article: "מאמר",
  tool: "כלי",
  protocol: "פרוטוקול",
  video: "סרטון",
  guide: "מדריך"
};

// Type color mapping
const typeColors: Record<ContentType, string> = {
  article: "bg-blue-100 text-blue-800",
  tool: "bg-purple-100 text-purple-800",
  protocol: "bg-green-100 text-green-800",
  video: "bg-red-100 text-red-800",
  guide: "bg-yellow-100 text-yellow-800"
};

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">טוען...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<ContentType[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"relevance" | "date">("relevance");

  // Extract all unique topics from results
  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    allResults.forEach(result => {
      result.topics.forEach(topic => topics.add(topic));
    });
    return Array.from(topics).sort();
  }, []);

  // Filter results based on search and filters
  const filteredResults = useMemo(() => {
    let results = allResults;

    // Filter by search query
    if (activeQuery) {
      const lowerQuery = activeQuery.toLowerCase();
      results = results.filter(
        result =>
          result.title.toLowerCase().includes(lowerQuery) ||
          result.description.toLowerCase().includes(lowerQuery) ||
          result.topics.some(topic => topic.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by content type
    if (selectedTypes.length > 0) {
      results = results.filter(result => selectedTypes.includes(result.type));
    }

    // Filter by topics
    if (selectedTopics.length > 0) {
      results = results.filter(result =>
        result.topics.some(topic => selectedTopics.includes(topic))
      );
    }

    // Sort results
    if (sortBy === "date") {
      results = [...results].sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return 0; // In real app, would parse and compare dates
      });
    }

    return results;
  }, [activeQuery, selectedTypes, selectedTopics, sortBy]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query);
  };

  // Toggle content type filter
  const toggleType = (type: ContentType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Toggle topic filter
  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedTopics([]);
    setQuery("");
    setActiveQuery("");
  };

  const hasActiveFilters = selectedTypes.length > 0 || selectedTopics.length > 0 || activeQuery;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-300 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">[לוגו ICA]</div>
          <nav className="flex gap-6 text-sm">
            <span>אודות</span>
            <span>מרכז מידע</span>
            <span>בתקשורת</span>
            <span>קמפוס הכשרות</span>
            <span>אפשרויות טיפול</span>
            <span className="font-bold">צור קשר</span>
          </nav>
        </div>
      </header>

      {/* Audience Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            <Link
              href="/therapist"
              className="px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600"
            >
              אנשי מקצוע
            </Link>
            <span className="px-4 py-3 text-sm text-gray-500">מתמודד/ת</span>
            <span className="px-4 py-3 text-sm text-gray-500">הורים ובני משפחה</span>
            <span className="px-4 py-3 text-sm text-gray-500">אנשי חינוך</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-100 border-b border-gray-200 px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">ראשי</Link>
            <span>›</span>
            <Link href="/therapist" className="hover:text-blue-600">אנשי מקצוע</Link>
            <span>›</span>
            <span className="text-gray-900">חיפוש</span>
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">חיפוש במאגר הידע</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="חיפוש מאמרים, כלים, פרוטוקולים, סרטונים..."
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </span>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              חיפוש
            </button>
          </form>

          {/* Quick Search Suggestions */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-500">חיפושים נפוצים:</span>
            <button
              onClick={() => { setQuery("ראיון מוטיבציוני"); setActiveQuery("ראיון מוטיבציוני"); }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
            >
              ראיון מוטיבציוני
            </button>
            <button
              onClick={() => { setQuery("סקרינינג"); setActiveQuery("סקרינינג"); }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
            >
              סקרינינג
            </button>
            <button
              onClick={() => { setQuery("נוער"); setActiveQuery("נוער"); }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
            >
              נוער
            </button>
            <button
              onClick={() => { setQuery("הפחתת נזקים"); setActiveQuery("הפחתת נזקים"); }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
            >
              הפחתת נזקים
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">סינון תוצאות</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    נקה הכל
                  </button>
                )}
              </div>

              {/* Content Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">סוג תוכן</h3>
                <div className="space-y-2">
                  {(Object.keys(typeLabels) as ContentType[]).map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">
                        {typeIcons[type]} {typeLabels[type]}
                      </span>
                      <span className="text-xs text-gray-400 mr-auto">
                        ({allResults.filter(r => r.type === type).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topics Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">נושאים</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allTopics.slice(0, 15).map(topic => (
                    <label key={topic} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">{topic}</span>
                    </label>
                  ))}
                </div>
                {allTopics.length > 15 && (
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                    הצג עוד נושאים ({allTopics.length - 15})
                  </button>
                )}
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">סינון פעיל</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeQuery && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        &quot;{activeQuery}&quot;
                        <button onClick={() => { setQuery(""); setActiveQuery(""); }} className="hover:text-blue-900">×</button>
                      </span>
                    )}
                    {selectedTypes.map(type => (
                      <span key={type} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                        {typeLabels[type]}
                        <button onClick={() => toggleType(type)} className="hover:text-purple-900">×</button>
                      </span>
                    ))}
                    {selectedTopics.map(topic => (
                      <span key={topic} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {topic}
                        <button onClick={() => toggleTopic(topic)} className="hover:text-green-900">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                {activeQuery ? (
                  <span>
                    נמצאו <strong className="text-gray-900">{filteredResults.length}</strong> תוצאות
                    עבור &quot;<strong className="text-gray-900">{activeQuery}</strong>&quot;
                  </span>
                ) : (
                  <span>
                    מציג <strong className="text-gray-900">{filteredResults.length}</strong> פריטים
                  </span>
                )}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">מיון:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as "relevance" | "date")}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="relevance">רלוונטיות</option>
                  <option value="date">תאריך (חדש לישן)</option>
                </select>
              </div>
            </div>

            {/* Results List */}
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map(result => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="block bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Type Icon */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {typeIcons[result.type]}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[result.type]}`}>
                            {typeLabels[result.type]}
                          </span>
                          {result.category && (
                            <span className="text-xs text-gray-500">{result.category}</span>
                          )}
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600">
                          {result.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {result.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {result.author && (
                            <span>{result.author}</span>
                          )}
                          {result.date && (
                            <span>{result.date}</span>
                          )}
                          {result.readTime && (
                            <span>{result.readTime}</span>
                          )}
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {result.topics.slice(0, 3).map((topic, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {topic}
                            </span>
                          ))}
                          {result.topics.length > 3 && (
                            <span className="px-2 py-1 text-gray-400 text-xs">
                              +{result.topics.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-lg border-2 border-gray-200 p-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  לא נמצאו תוצאות
                </h3>
                <p className="text-gray-500 mb-6">
                  {activeQuery
                    ? `לא נמצאו תוצאות עבור "${activeQuery}". נסו לשנות את מילות החיפוש או להסיר חלק מהסינונים.`
                    : "נסו לחפש מונח או לבחור קטגוריה מהרשימה."}
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  נקה סינון והתחל מחדש
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredResults.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed">
                  ← הקודם
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <span className="px-2 text-gray-400">...</span>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">10</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  הבא →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="text-white font-bold mb-4">[לוגו ICA]</div>
              <p className="text-sm">המכון הישראלי להתמכרויות – ידע, טיפול ומדיניות להפחתת נזקי התמכרות בישראל.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">מרכז הידע</h4>
              <ul className="space-y-2 text-sm">
                <li>מאמרים מקצועיים</li>
                <li>כלי הערכה</li>
                <li>פרוטוקולים</li>
                <li>הרצאות וסרטונים</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">קישורים</h4>
              <ul className="space-y-2 text-sm">
                <li>אודות</li>
                <li>צור קשר</li>
                <li>קמפוס הכשרות</li>
                <li>אפשרויות טיפול</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">מדיניות</h4>
              <ul className="space-y-2 text-sm">
                <li>מדיניות פרטיות</li>
                <li>תנאי שימוש</li>
                <li>נגישות</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
