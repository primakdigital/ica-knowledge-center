// Protocols_Index_v1 - Clinical protocols listing for therapists
// Route: /therapist/protocols

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// Protocol type definition
interface Protocol {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  substance?: string;
  population?: string;
  lastUpdated: string;
  version: string;
  status: "current" | "updated" | "new";
  sections: string[];
}

// Mock protocols data
const protocolsData: Protocol[] = [
  {
    id: "opioid-medication-treatment",
    title: "פרוטוקול טיפול תרופתי בתלות באופיואידים",
    description: "הנחיות קליניות מעודכנות לטיפול תרופתי בתלות באופיואידים, כולל מתדון, בופרנורפין ונלטרקסון. מכסה התוויות, מינונים, מעקב ותופעות לוואי.",
    category: "טיפול תרופתי",
    categoryColor: "bg-purple-100 text-purple-800",
    substance: "אופיואידים",
    population: "מבוגרים",
    lastUpdated: "דצמבר 2024",
    version: "3.2",
    status: "updated",
    sections: ["רקע והתוויות", "מתדון", "בופרנורפין", "נלטרקסון", "מעקב וניטור", "מצבים מיוחדים"]
  },
  {
    id: "alcohol-detox",
    title: "פרוטוקול גמילה מאלכוהול",
    description: "הנחיות לניהול גמילה בטוחה מאלכוהול, כולל הערכת סיכון, טיפול תרופתי בתסמונת גמילה, ומניעת סיבוכים.",
    category: "גמילה",
    categoryColor: "bg-red-100 text-red-800",
    substance: "אלכוהול",
    population: "מבוגרים",
    lastUpdated: "נובמבר 2024",
    version: "2.1",
    status: "current",
    sections: ["הערכה ראשונית", "סולם CIWA-Ar", "טיפול תרופתי", "סיבוכים", "מעבר לטיפול המשכי"]
  },
  {
    id: "adolescent-cannabis",
    title: "פרוטוקול התערבות בשימוש בקנאביס בקרב בני נוער",
    description: "מודל התערבות מובנה לעבודה עם בני נוער המשתמשים בקנאביס, משלב MI, CBT והתערבות משפחתית.",
    category: "התערבות פסיכולוגית",
    categoryColor: "bg-blue-100 text-blue-800",
    substance: "קנאביס",
    population: "נוער",
    lastUpdated: "ינואר 2025",
    version: "1.0",
    status: "new",
    sections: ["הערכה", "ראיון מוטיבציוני", "CBT", "עבודה משפחתית", "מניעת הישנות"]
  },
  {
    id: "gambling-intervention",
    title: "פרוטוקול התערבות בהימורים פתולוגיים",
    description: "הנחיות להתערבות טיפולית בהימורים, כולל CBT מותאם, ניהול כספים, והתערבויות משפחתיות.",
    category: "התערבות פסיכולוגית",
    categoryColor: "bg-blue-100 text-blue-800",
    population: "מבוגרים",
    lastUpdated: "נובמבר 2024",
    version: "1.2",
    status: "current",
    sections: ["אבחנה והערכה", "CBT להימורים", "ניהול כספי", "עבודה משפחתית", "קבוצות תמיכה"]
  },
  {
    id: "dual-diagnosis",
    title: "פרוטוקול טיפול באבחנה כפולה",
    description: "הנחיות לטיפול משולב בהתמכרות ובהפרעה נפשית נלווית. דגש על אינטגרציה בין גישות טיפוליות.",
    category: "טיפול משולב",
    categoryColor: "bg-green-100 text-green-800",
    population: "מבוגרים",
    lastUpdated: "אוקטובר 2024",
    version: "2.0",
    status: "current",
    sections: ["הערכה משולבת", "תכנון טיפול", "טיפול תרופתי", "התערבות פסיכולוגית", "שיקום"]
  },
  {
    id: "benzodiazepine-taper",
    title: "פרוטוקול גמילה מבנזודיאזפינים",
    description: "הנחיות להפחתה הדרגתית ובטוחה של בנזודיאזפינים, כולל לוחות זמנים, תחליפים וניהול תסמינים.",
    category: "גמילה",
    categoryColor: "bg-red-100 text-red-800",
    substance: "בנזודיאזפינים",
    population: "מבוגרים",
    lastUpdated: "ספטמבר 2024",
    version: "1.5",
    status: "current",
    sections: ["הערכה", "תוכנית הפחתה", "תרופות תומכות", "ניהול תסמינים", "מעקב ארוך טווח"]
  },
  {
    id: "stimulant-use",
    title: "פרוטוקול טיפול בשימוש בסטימולנטים",
    description: "הנחיות לטיפול בשימוש בקוקאין, אמפטמינים וסטימולנטים אחרים. דגש על התערבויות פסיכולוגיות.",
    category: "התערבות פסיכולוגית",
    categoryColor: "bg-blue-100 text-blue-800",
    substance: "סטימולנטים",
    population: "מבוגרים",
    lastUpdated: "אוגוסט 2024",
    version: "1.3",
    status: "current",
    sections: ["הערכה", "CM - ניהול מגירות", "CBT", "מניעת הישנות", "טיפול בסיבוכים"]
  },
  {
    id: "pregnancy-substance",
    title: "פרוטוקול טיפול בנשים בהריון עם שימוש בחומרים",
    description: "הנחיות מיוחדות לטיפול בנשים בהריון המשתמשות בחומרים, כולל שיקולים רפואיים, חברתיים ומשפטיים.",
    category: "אוכלוסיות מיוחדות",
    categoryColor: "bg-yellow-100 text-yellow-800",
    population: "נשים בהריון",
    lastUpdated: "יולי 2024",
    version: "2.2",
    status: "current",
    sections: ["הערכה", "טיפול תרופתי בהריון", "ליווי לידה", "תקופה שלאחר לידה", "היבטים משפטיים"]
  },
  {
    id: "crisis-intervention",
    title: "פרוטוקול התערבות במשבר",
    description: "הנחיות להתערבות במצבי משבר הקשורים לשימוש בחומרים, כולל סכנת אובדנות ומינון יתר.",
    category: "חירום",
    categoryColor: "bg-orange-100 text-orange-800",
    population: "כללי",
    lastUpdated: "דצמבר 2024",
    version: "3.0",
    status: "updated",
    sections: ["הערכת סיכון", "התערבות מיידית", "מינון יתר", "סיכון אובדני", "הפניה והמשכיות"]
  },
  {
    id: "family-intervention",
    title: "פרוטוקול התערבות משפחתית",
    description: "מודל עבודה עם משפחות של מתמודדים עם התמכרות, כולל CRAFT, טיפול משפחתי וקבוצות תמיכה להורים.",
    category: "עבודה משפחתית",
    categoryColor: "bg-teal-100 text-teal-800",
    population: "משפחות",
    lastUpdated: "אוקטובר 2024",
    version: "1.4",
    status: "current",
    sections: ["הערכה משפחתית", "CRAFT", "טיפול משפחתי", "קבוצות להורים", "ילדים במשפחה"]
  }
];

// Filter options
const categories = ["הכל", "טיפול תרופתי", "גמילה", "התערבות פסיכולוגית", "טיפול משולב", "אוכלוסיות מיוחדות", "חירום", "עבודה משפחתית"];
const populations = ["הכל", "מבוגרים", "נוער", "נשים בהריון", "משפחות", "כללי"];
const substances = ["הכל", "אופיואידים", "אלכוהול", "קנאביס", "בנזודיאזפינים", "סטימולנטים"];

// Status badge component
function StatusBadge({ status }: { status: Protocol["status"] }) {
  const styles = {
    current: "bg-gray-100 text-gray-600",
    updated: "bg-blue-100 text-blue-800",
    new: "bg-green-100 text-green-800"
  };
  const labels = {
    current: "עדכני",
    updated: "עודכן לאחרונה",
    new: "חדש"
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function ProtocolsIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("הכל");
  const [selectedPopulation, setSelectedPopulation] = useState("הכל");
  const [selectedSubstance, setSelectedSubstance] = useState("הכל");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter protocols
  const filteredProtocols = useMemo(() => {
    return protocolsData.filter(protocol => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          protocol.title.toLowerCase().includes(query) ||
          protocol.description.toLowerCase().includes(query) ||
          protocol.sections.some(s => s.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== "הכל" && protocol.category !== selectedCategory) {
        return false;
      }

      // Population filter
      if (selectedPopulation !== "הכל" && protocol.population !== selectedPopulation) {
        return false;
      }

      // Substance filter
      if (selectedSubstance !== "הכל" && protocol.substance !== selectedSubstance) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedPopulation, selectedSubstance]);

  // Count by category for quick filters
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "הכל": protocolsData.length };
    protocolsData.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

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
            <span className="text-gray-900">פרוטוקולים קליניים</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4">פרוטוקולים קליניים</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            הנחיות עבודה מבוססות-ראיות לטיפול בהתמכרויות. הפרוטוקולים מעודכנים על ידי צוות מומחים ומתאימים לסטנדרטים בינלאומיים.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="חיפוש פרוטוקולים..."
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 ${viewMode === "grid" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                ▦ רשת
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 ${viewMode === "list" ? "bg-green-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
              >
                ☰ רשימה
              </button>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-4 flex-wrap">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none min-w-[180px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat} {categoryCounts[cat] ? `(${categoryCounts[cat]})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Population Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">אוכלוסייה</label>
              <select
                value={selectedPopulation}
                onChange={e => setSelectedPopulation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none min-w-[150px]"
              >
                {populations.map(pop => (
                  <option key={pop} value={pop}>{pop}</option>
                ))}
              </select>
            </div>

            {/* Substance Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">חומר</label>
              <select
                value={selectedSubstance}
                onChange={e => setSelectedSubstance(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none min-w-[150px]"
              >
                {substances.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== "הכל" || selectedPopulation !== "הכל" || selectedSubstance !== "הכל" || searchQuery) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory("הכל");
                    setSelectedPopulation("הכל");
                    setSelectedSubstance("הכל");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 text-green-600 hover:text-green-800 font-medium"
                >
                  נקה סינון
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          מציג <strong className="text-gray-900">{filteredProtocols.length}</strong> פרוטוקולים
        </div>

        {/* Protocols Grid/List */}
        {filteredProtocols.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProtocols.map(protocol => (
                <Link
                  key={protocol.id}
                  href={`/therapist/protocols/${protocol.id}`}
                  className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-green-300 hover:shadow-lg transition-all flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${protocol.categoryColor}`}>
                      {protocol.category}
                    </span>
                    <StatusBadge status={protocol.status} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-green-600">
                    {protocol.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {protocol.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    {protocol.substance && (
                      <span className="flex items-center gap-1">
                        💊 {protocol.substance}
                      </span>
                    )}
                    {protocol.population && (
                      <span className="flex items-center gap-1">
                        👥 {protocol.population}
                      </span>
                    )}
                  </div>

                  {/* Sections Preview */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {protocol.sections.slice(0, 3).map((section, index) => (
                      <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {section}
                      </span>
                    ))}
                    {protocol.sections.length > 3 && (
                      <span className="px-2 py-0.5 text-gray-400 text-xs">
                        +{protocol.sections.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>עודכן: {protocol.lastUpdated}</span>
                    <span>גרסה {protocol.version}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProtocols.map(protocol => (
                <Link
                  key={protocol.id}
                  href={`/therapist/protocols/${protocol.id}`}
                  className="block bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      📋
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${protocol.categoryColor}`}>
                          {protocol.category}
                        </span>
                        <StatusBadge status={protocol.status} />
                        <span className="text-xs text-gray-400">גרסה {protocol.version}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {protocol.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3">
                        {protocol.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        {protocol.substance && (
                          <span>💊 {protocol.substance}</span>
                        )}
                        {protocol.population && (
                          <span>👥 {protocol.population}</span>
                        )}
                        <span>📅 עודכן: {protocol.lastUpdated}</span>
                        <span>📑 {protocol.sections.length} פרקים</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center text-gray-400">
                      ←
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg border-2 border-gray-200 p-12 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              לא נמצאו פרוטוקולים
            </h3>
            <p className="text-gray-500 mb-6">
              נסו לשנות את הסינון או לחפש מונח אחר.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("הכל");
                setSelectedPopulation("הכל");
                setSelectedSubstance("הכל");
                setSearchQuery("");
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              הצג את כל הפרוטוקולים
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-green-50 rounded-lg border-2 border-green-200 p-6">
          <div className="flex gap-4">
            <div className="text-3xl">ℹ️</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">על הפרוטוקולים</h3>
              <p className="text-gray-600 text-sm mb-4">
                הפרוטוקולים הקליניים פותחו על ידי צוות מומחים מהמכון הישראלי להתמכרויות, בשיתוף עם גורמים מקצועיים ממשרד הבריאות.
                הם מבוססים על הספרות המחקרית העדכנית ומותאמים לעבודה בישראל.
              </p>
              <div className="flex gap-4">
                <Link href="/therapist/articles" className="text-green-600 hover:text-green-800 text-sm font-medium">
                  מאמרים קשורים ←
                </Link>
                <Link href="/therapist/tools" className="text-green-600 hover:text-green-800 text-sm font-medium">
                  כלי הערכה ←
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Block */}
        <div className="mt-8 bg-white rounded-lg border-2 border-gray-200 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">רוצים להציע תיקון או עדכון?</h3>
          <p className="text-gray-600 mb-6">
            הפרוטוקולים מתעדכנים באופן שוטף. אנחנו מזמינים אתכם לשתף הערות, הצעות לשיפור או מקורות חדשים.
          </p>
          <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            שליחת משוב על פרוטוקול ←
          </button>
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
                <li><Link href="/therapist/articles" className="hover:text-white">מאמרים מקצועיים</Link></li>
                <li><Link href="/therapist/tools" className="hover:text-white">כלי הערכה</Link></li>
                <li><Link href="/therapist/protocols" className="hover:text-white">פרוטוקולים</Link></li>
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
