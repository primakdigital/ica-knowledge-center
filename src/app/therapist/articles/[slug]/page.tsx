// Article_Page_v1 - Individual article view for therapists
// Route: /therapist/articles/[slug]

"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock article data
const articlesData: Record<string, {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  topics: string[];
  abstract: string;
  content: string[];
  references: string[];
  relatedArticles: { id: string; title: string; category: string }[];
}> = {
  "motivational-interviewing-adolescents": {
    id: "motivational-interviewing-adolescents",
    title: "ראיון מוטיבציוני עם מתבגרים: התאמות והמלצות",
    subtitle: "סקירה מעודכנת של הספרות על יישום MI עם אוכלוסיית בני נוער",
    category: "מחקר",
    categoryColor: "bg-blue-100 text-blue-800",
    author: "ד״ר מיכל כהן",
    authorRole: "פסיכולוגית קלינית, מומחית בהתמכרויות",
    date: "15 בינואר 2025",
    readTime: "12 דקות קריאה",
    topics: ["ראיון מוטיבציוני", "נוער", "טיפול פסיכולוגי", "התערבות מוקדמת"],
    abstract: "מאמר זה סוקר את הספרות העדכנית בנושא התאמת טכניקות ראיון מוטיבציוני (MI) לעבודה עם מתבגרים המתמודדים עם שימוש בחומרים. הסקירה מציגה את האתגרים הייחודיים בעבודה עם קבוצת גיל זו, ומציעה התאמות מבוססות-ראיות להגברת האפקטיביות של ההתערבות.",
    content: [
      "## רקע\n\nראיון מוטיבציוני (MI) הוא גישה טיפולית שפותחה במקור לטיפול בהתמכרויות אצל מבוגרים. הגישה מתמקדת בחקירת ופתרון אמביוולנטיות כלפי שינוי, תוך שמירה על עמדה לא-שיפוטית ואמפתית מצד המטפל.",
      "## אתגרים ייחודיים בעבודה עם מתבגרים\n\nמתבגרים מציגים מספר אתגרים ייחודיים:\n\n• **התפתחות קוגניטיבית** – יכולת מוגבלת לחשיבה מופשטת על עתיד רחוק\n• **אמביוולנטיות מורכבת** – לעיתים קרובות אינם רואים בשימוש בעיה\n• **לחץ חברתי** – השפעה משמעותית של קבוצת השווים\n• **יחסים עם סמכות** – התנגדות טבעית לדמויות סמכותיות",
      "## התאמות מומלצות\n\n### קיצור משך הפגישות\nמחקרים מראים שפגישות של 30-45 דקות יעילות יותר עם מתבגרים מאשר פגישות ארוכות יותר.\n\n### שימוש בשפה מותאמת\nהתאמת השפה לעולם של המתבגר, תוך הימנעות מז׳רגון מקצועי או שפה \"מבוגרת\" מדי.\n\n### דגש על אוטונומיה\nמתבגרים רגישים במיוחד לתחושת שליטה. חשוב להדגיש את הבחירה החופשית ולהימנע מהנחיות ישירות.",
      "## ממצאי מחקר\n\nמטא-אנליזה שנערכה ב-2023 מצאה:\n\n• ירידה של 23% בשימוש בחומרים בקרב מתבגרים שקיבלו MI\n• שיפור של 31% במוטיבציה לשינוי\n• שיעור נשירה נמוך ב-15% בהשוואה לטיפולים אחרים\n\nהממצאים מצביעים על כך ש-MI מותאם הוא התערבות יעילה עבור מתבגרים.",
      "## המלצות למטפלים\n\n1. **בנו ברית טיפולית** לפני התמקדות בשינוי\n2. **השתמשו בשאלות פתוחות** שמעודדות סיפור עצמי\n3. **הימנעו מעימות** גם כשיש סתירות ברורות\n4. **שלבו את המשפחה** כשזה אפשרי ומתאים\n5. **היו גמישים** בפורמט ובמבנה הפגישות",
      "## סיכום\n\nראיון מוטיבציוני יכול להיות כלי יעיל מאוד בעבודה עם מתבגרים, בתנאי שהוא מותאם לצרכים הייחודיים של אוכלוסייה זו. התאמות אלו כוללות קיצור פגישות, שימוש בשפה מותאמת, והדגשת אוטונומיה ובחירה."
    ],
    references: [
      "Miller, W. R., & Rollnick, S. (2013). Motivational interviewing: Helping people change (3rd ed.). Guilford Press.",
      "Jensen, C. D., et al. (2011). Effectiveness of motivational interviewing interventions for adolescent substance use behavior change. Journal of Consulting and Clinical Psychology, 79(4), 433-440.",
      "Barnett, E., et al. (2012). Motivational interviewing for adolescent substance use: A review of the literature. Addictive Behaviors, 37(12), 1325-1334."
    ],
    relatedArticles: [
      { id: "harm-reduction-clinical-practice", title: "הפחתת נזקים בפרקטיקה הקלינית", category: "מאמר עמדה" },
      { id: "family-therapy-adolescents", title: "טיפול משפחתי בהתמכרויות בגיל ההתבגרות", category: "מחקר" },
      { id: "screening-tools-comparison", title: "השוואת כלי סקרינינג לזיהוי שימוש בסיכון", category: "סקירת ספרות" }
    ]
  },
  "harm-reduction-clinical-practice": {
    id: "harm-reduction-clinical-practice",
    title: "הפחתת נזקים בפרקטיקה הקלינית: עקרונות ויישומים",
    subtitle: "מדריך למטפלים ליישום גישת הפחתת נזקים בעבודה היומיומית",
    category: "מאמר עמדה",
    categoryColor: "bg-green-100 text-green-800",
    author: "פרופ׳ יוסי לוי",
    authorRole: "עובד סוציאלי קליני, מנהל תוכנית התמכרויות",
    date: "3 בינואר 2025",
    readTime: "15 דקות קריאה",
    topics: ["הפחתת נזקים", "אתיקה", "טיפול", "מדיניות"],
    abstract: "מאמר עמדה זה מציג את עקרונות הליבה של גישת הפחתת הנזקים ומציע דרכים קונקרטיות ליישומה בעבודה הקלינית היומיומית עם מתמודדים עם התמכרויות.",
    content: [
      "## מבוא\n\nגישת הפחתת הנזקים מבוססת על ההכרה שלא כל אדם מוכן או מסוגל להפסיק לחלוטין את השימוש בחומרים. במקום להתנות טיפול בהפסקה מוחלטת, הגישה מתמקדת בהפחתת ההשלכות השליליות של השימוש.",
      "## עקרונות מנחים\n\n• **פרגמטיות** – קבלת המציאות כפי שהיא\n• **כבוד** – שמירה על כבוד האדם ללא קשר לבחירותיו\n• **הכלה** – מתן שירותים ללא תנאים מקדימים\n• **שותפות** – שיתוף המטופל בתהליך קבלת ההחלטות",
      "## יישום בפרקטיקה\n\n### שיחה על שימוש בטוח יותר\nמתן מידע על דרכים להפחית סיכונים: אי-שימוש לבד, בדיקת חומרים, הימנעות מערבוב.\n\n### הגדרת יעדים גמישים\nיעדים יכולים לכלול: הפחתת כמות, הפחתת תדירות, שימוש בסביבה בטוחה יותר.\n\n### חיבור לשירותים\nגם אם המטופל לא מעוניין בטיפול בהתמכרות, ניתן לחבר לשירותי בריאות, רווחה ותעסוקה."
    ],
    references: [
      "Marlatt, G. A. (1996). Harm reduction: Come as you are. Addictive Behaviors, 21(6), 779-788.",
      "Tatarsky, A. (2007). Harm reduction psychotherapy: A new treatment for drug and alcohol problems. Jason Aronson."
    ],
    relatedArticles: [
      { id: "motivational-interviewing-adolescents", title: "ראיון מוטיבציוני עם מתבגרים", category: "מחקר" },
      { id: "opioid-treatment-guidelines", title: "פרוטוקול טיפול באופיואידים", category: "מדריך קליני" }
    ]
  }
};

// Default article for unknown slugs
const defaultArticle = {
  id: "default",
  title: "מאמר לא נמצא",
  subtitle: "",
  category: "",
  categoryColor: "bg-gray-100 text-gray-800",
  author: "",
  authorRole: "",
  date: "",
  readTime: "",
  topics: [],
  abstract: "המאמר המבוקש לא נמצא במערכת.",
  content: [],
  references: [],
  relatedArticles: []
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug] || defaultArticle;

  const [showCitation, setShowCitation] = useState(false);

  // Generate citation text
  const citationText = `${article.author}. (${article.date}). ${article.title}. מרכז הידע של המרכז הישראלי להתמכרויות.`;

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
            <Link href="/therapist/articles" className="hover:text-blue-600">מאמרים מקצועיים</Link>
            <span>›</span>
            <span className="text-gray-900">{article.title.substring(0, 30)}...</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Article Content */}
          <article className="flex-1 max-w-4xl">
            {/* Back Button */}
            <Link
              href="/therapist/articles"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
              <span>→</span>
              חזרה לכל המאמרים
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              {article.category && (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${article.categoryColor}`}>
                  {article.category}
                </span>
              )}

              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="text-xl text-gray-600 mb-6">
                  {article.subtitle}
                </p>
              )}

              {/* Author & Meta */}
              {article.author && (
                <div className="flex items-center gap-6 py-4 border-y border-gray-200">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                    [תמונה]
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{article.author}</div>
                    <div className="text-sm text-gray-500">{article.authorRole}</div>
                  </div>
                  <div className="text-sm text-gray-500 text-left">
                    <div>{article.date}</div>
                    <div>{article.readTime}</div>
                  </div>
                </div>
              )}
            </header>

            {/* Topics Tags */}
            {article.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {/* Abstract */}
            {article.abstract && (
              <div className="bg-blue-50 border-r-4 border-blue-400 p-6 mb-8 rounded">
                <h2 className="font-bold text-gray-900 mb-2">תקציר</h2>
                <p className="text-gray-700 leading-relaxed">{article.abstract}</p>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {article.content.map((section, index) => (
                <div key={index} className="mb-8">
                  {section.split('\n').map((paragraph, pIndex) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={pIndex} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    } else if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={pIndex} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    } else if (paragraph.startsWith('• ')) {
                      return (
                        <p key={pIndex} className="text-gray-700 leading-relaxed mr-4 mb-2">
                          {paragraph}
                        </p>
                      );
                    } else if (paragraph.trim()) {
                      return (
                        <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>

            {/* References */}
            {article.references.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">מקורות</h2>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  {article.references.map((ref, index) => (
                    <li key={index} className="leading-relaxed">{ref}</li>
                  ))}
                </ol>
              </section>
            )}

            {/* Actions Bar */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                  <span>📥</span>
                  הורדה כ-PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                  <span>🖨️</span>
                  הדפסה
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                  <span>📤</span>
                  שיתוף
                </button>
                <button
                  onClick={() => setShowCitation(!showCitation)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                >
                  <span>📋</span>
                  ציטוט
                </button>
              </div>

              {showCitation && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-2">ציטוט מומלץ:</div>
                  <div className="text-sm text-gray-600 bg-white p-3 rounded border">
                    {citationText}
                  </div>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                    העתק לקליפבורד
                  </button>
                </div>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            {/* Related Articles */}
            {article.relatedArticles.length > 0 && (
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">מאמרים קשורים</h3>
                <div className="space-y-4">
                  {article.relatedArticles.map((related, index) => (
                    <Link
                      key={index}
                      href={`/therapist/articles/${related.id}`}
                      className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="text-xs text-gray-500">{related.category}</span>
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        {related.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">קישורים מהירים</h3>
              <div className="space-y-3">
                <Link href="/therapist/tools" className="block text-blue-600 hover:text-blue-800 text-sm">
                  → כלי הערכה ואבחון
                </Link>
                <Link href="/therapist/protocols" className="block text-blue-600 hover:text-blue-800 text-sm">
                  → פרוטוקולים קליניים
                </Link>
                <Link href="/therapist/search" className="block text-blue-600 hover:text-blue-800 text-sm">
                  → חיפוש במאגר הידע
                </Link>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
              <h3 className="font-bold text-gray-900 mb-2">עדכונים מקצועיים</h3>
              <p className="text-sm text-gray-600 mb-4">
                הירשמו לניוזלטר המקצועי וקבלו עדכונים על מאמרים וכלים חדשים
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium">
                להרשמה לעדכונים ←
              </button>
            </div>
          </aside>
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
