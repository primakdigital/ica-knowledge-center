/**
 * Wireframe Mock Data
 *
 * Real Hebrew content from ICA specs for functional wireframe testing.
 * Based on "תחלואה כפולה" (Dual Diagnosis) example from specifications.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface SearchSource {
  id: string;
  title: string;
  type: "מאמר" | "PDF" | "וידאו" | "כלי" | "הנחיה מקצועית";
  publisher: string;
  year?: string;
  snippet: string;
  url: string;
}

export interface SearchResult {
  id: string;
  type: "מאמר" | "PDF" | "וידאו" | "כלי";
  title: string;
  description: string;
  relevance: string;
  meta: {
    duration?: string;
    pages?: number;
    source: string;
    date?: string;
  };
}

export interface SearchResponse {
  query: string;
  synthesisTitle: string;
  synthesis: {
    summary: string;
    keyPoints: string[];
    actionItems: string[];
  };
  sourceCount: number;
  sources: SearchSource[];
  results: SearchResult[];
  followUpQuestions: string[];
}

export interface ContentItem {
  id: string;
  type: "מאמר" | "PDF" | "וידאו";
  title: string;
  subtitle?: string;
  tags: string[];
  meta: {
    readTime?: string;
    duration?: string;
    pages?: number;
    source: string;
    author?: string;
    date: string;
    level: "בסיסי" | "מתקדם";
  };
  summary: string;
  content: string[];
  callout?: {
    title: string;
    items: string[];
  };
  clinicalNote?: string;
  relatedContent: { id: string; title: string; type: string }[];
  relatedTools: { id: string; title: string }[];
}

export interface ToolItem {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  meta: {
    duration: string;
    outputType: string;
  };
  description: string;
  instructions: string[];
  questions: {
    id: string;
    text: string;
    type: "radio" | "checkbox" | "text" | "scale";
    options?: { value: string; label: string }[];
    scaleMin?: number;
    scaleMax?: number;
  }[];
  disclaimer: string;
  relatedContent: { id: string; title: string; type: string }[];
}

// =============================================================================
// MOCK DATA: SEARCH RESPONSE
// =============================================================================

export const mockSearchResponse: SearchResponse = {
  query: "תחלואה כפולה והאם זה מטופל במרכז",
  synthesisTitle: "סיכום מהיר",
  synthesis: {
    summary:
      "יש 42 פריטים בנושא תחלואה כפולה, כולל מדריך ייעוץ, פרוטוקול אבחון ו-3 הרצאות. הנושא מטופל במרפאות ICA בתל אביב וירושלים.",
    keyPoints: [
      "באתר המרכז הישראלי להתמכרויות יש חומרים ייעודיים על תחלואה כפולה [1], וגם עולה ממנו שהנושא נלקח בחשבון במסגרת ההערכה והטיפול [2].",
      "יש מדריך ייעוץ תחת מרכז המידע בנושא תחלואה כפולה, שמכיר את התופעה כמפגש בין הפרעות נפשיות והתמכרות לחומרים או התנהגויות [3].",
      "ומפרט את המורכבויות הטיפוליות במצבים אלו.",
      "במסמכי ההדרכה המקצועיים של המרכז מופיע פרק ייעוץ להתמודדות עם תחלואה כפולה כחלק מהמדריך לאבחון והערכה, כולל המלצות לפעולות על רקע קשיי קשב וריכוז, מחשבות [4].",
      "טורדניות ובעיות עוצמתיות.",
      "האם תחלואה כפולה מטופלת במרכז? כן, בדפי המרפאה לטיפול בהתמכרויות מצוין שהטיפול הרפואי כולל גם טיפול בהפרעות פסיכיאטריות נלוות לשימוש בחומרים והתנהגויות ממכרות [5].",
      "כלומר מתייחס במפורש לתחלואה כפולה כחלק מהתמונה הקלינית.",
      "בדפי ההכשרה והמסלולים הקליניים מודגש שההעמקה למטפלים בהתמכרויות כוללת בדיקה שיטתית של תחלואה פסיכיאטרית נלווית, מה שמשתמש כמענה טיפולי אינטגרטיבי למצבי [7].",
      "תחלואה כפולה במסגרת עבודת המרפאה והמרכז.",
    ],
    actionItems: [
      "לעיין במדריך הייעוץ לתחלואה כפולה",
      "לבדוק פרוטוקול האבחון וההערכה",
      "ליצור קשר עם מרפאת ICA לקביעת פגישה",
    ],
  },
  sourceCount: 10,
  sources: [
    {
      id: "src-1",
      title: "מודולת תחלואה כפולה - מרכז רפואי לבריאות הנפש השרון",
      type: "PDF",
      publisher: "ICA",
      year: "2024",
      snippet:
        "מפגש - 11.3.24: מתחילה לתחלואה כפולה- מרכז רפואי לבריאות הנפש לב השרון מסגרת טיפול. מפגש 12 - 25.3.24 סרטומי/קולקטיבית",
      url: "/knowledge/content/1",
    },
    {
      id: "src-2",
      title: "הנחיות התערבות קצרה ב-CBT בהימורים",
      type: "מאמר",
      publisher: "ICA",
      year: "2023",
      snippet:
        "פרוטוקול מובנה להתערבות קוגניטיבית-התנהגותית קצרה עבור אנשים המתמודדים עם התמכרות להימורים",
      url: "/knowledge/content/2",
    },
    {
      id: "src-3",
      title: "מדריך ייעוץ - הפרעת שימוש וטיפול",
      type: "PDF",
      publisher: "משרד הבריאות",
      year: "2022",
      snippet:
        "מדריך מקיף למטפלים בנושא הערכה, אבחון וטיפול בהפרעות שימוש בחומרים",
      url: "/knowledge/content/3",
    },
  ],
  results: [
    {
      id: "1",
      type: "מאמר",
      title: "עקרונות CBT בטיפול בהתמכרויות",
      description:
        "סקירה מקיפה של גישות קוגניטיביות-התנהגותיות בטיפול באנשים המתמודדים עם התמכרות",
      relevance: "מתאים לעבודה עם אדם המתמודד עם התמכרות",
      meta: {
        duration: "8 דקות קריאה",
        source: "ICA",
        date: "2024",
      },
    },
    {
      id: "2",
      type: "PDF",
      title: "פרוטוקול הערכה ראשונית - תחלואה כפולה",
      description:
        "מסמך מובנה להערכה ראשונית של מטופלים עם תחלואה כפולה, כולל שאלונים וכלי סקירה",
      relevance: "כולל כלים פרקטיים להערכה",
      meta: {
        pages: 24,
        source: "משרד הבריאות",
        date: "2023",
      },
    },
    {
      id: "3",
      type: "וידאו",
      title: "הדגמת ראיון מוטיבציוני - מקרה בוחן",
      description:
        "הדגמה מעשית של טכניקות ראיון מוטיבציוני עם אדם המתמודד עם הפרעת שימוש",
      relevance: "הדגמה מעשית לשיפור מיומנויות",
      meta: {
        duration: "18 דקות",
        source: "ICA",
        date: "2024",
      },
    },
    {
      id: "tool-1",
      type: "כלי",
      title: "שאלון AUDIT - הערכת שימוש באלכוהול",
      description:
        "כלי סקר מתוקף להערכת דפוסי שימוש באלכוהול ורמת הסיכון",
      relevance: "כלי הערכה מהיר ומתוקף",
      meta: {
        duration: "5 דקות",
        source: "WHO",
      },
    },
  ],
  followUpQuestions: [
    "רשימת המאמרים באתר על תחלואה כפולה",
    "האם יש מסגרות טיפוליות לתחלואה כפולה באתר",
    "קורסים והכשרות בנושא תחלואה כפולה ב ICA",
    "האם מרפאות המרכז מטפלות בתחלואה כפולה",
    "האם מוצעים טיפולים רפואיים להתמכרות עם הפרעות נפשיות באתר",
  ],
};

// =============================================================================
// MOCK DATA: CONTENT ITEM (Article)
// =============================================================================

export const mockContentItem: ContentItem = {
  id: "1",
  type: "מאמר",
  title: "עקרונות CBT בטיפול בהתמכרויות",
  subtitle: "גישות קוגניטיביות-התנהגותיות לעבודה עם אנשים המתמודדים עם התמכרות",
  tags: ["CBT", "התמכרויות", "טיפול", "הפרעת שימוש"],
  meta: {
    readTime: "8 דקות קריאה",
    source: "ICA - המרכז הישראלי להתמכרויות",
    author: "צוות מקצועי ICA",
    date: "ינואר 2024",
    level: "בסיסי",
  },
  summary:
    "מאמר זה סוקר את העקרונות המרכזיים של טיפול קוגניטיבי-התנהגותי (CBT) בהתמכרויות, כולל טכניקות מרכזיות, מודלים תיאורטיים והתאמות לאוכלוסיות שונות.",
  content: [
    "טיפול קוגניטיבי-התנהגותי (CBT) הוא אחת הגישות המבוססות-ראיות המרכזיות בטיפול בהפרעות שימוש בחומרים והתנהגויות ממכרות. הגישה מתמקדת בזיהוי ושינוי דפוסי חשיבה והתנהגות שמשמרים את ההתמכרות.",
    "העקרונות המרכזיים כוללים: זיהוי טריגרים ומצבי סיכון, פיתוח אסטרטגיות התמודדות, עבודה על מחשבות אוטומטיות הקשורות לשימוש, ובניית מיומנויות חיים.",
    "בעבודה עם אנשים המתמודדים עם התמכרות, חשוב לשלב את עקרונות ה-CBT עם גישה לא שיפוטית ומכבדת. הינזרות משימוש אינה תנאי מקדים לקבלת טיפול, וניתן לעבוד על הפחתת שימוש ומזעור נזקים במקביל.",
    "טכניקות מרכזיות בטיפול כוללות: ניתוח פונקציונלי של התנהגות השימוש, רה-סטרוקטורציה קוגניטיבית, אימון במיומנויות סירוב, ומניעת הישנות.",
    "המחקר מראה יעילות גבוהה של CBT בטיפול בהתמכרויות, במיוחד כאשר משולב עם התערבויות נוספות כמו ראיון מוטיבציוני וטיפול תרופתי במקרים המתאימים.",
  ],
  callout: {
    title: "מה עושים עכשיו",
    items: [
      "לזהות את הטריגרים העיקריים של המטופל/ת",
      "לבנות תוכנית התמודדות למצבי סיכון",
      "לתרגל טכניקות הרפיה וויסות רגשי",
    ],
  },
  clinicalNote:
    "הינזרות משימוש אינה תנאי מקדים לקבלת טיפול. ניתן לעבוד על הפחתת שימוש ומזעור נזקים.",
  relatedContent: [
    { id: "2", title: "פרוטוקול הערכה ראשונית", type: "PDF" },
    { id: "3", title: "הדגמת ראיון מוטיבציוני", type: "וידאו" },
    { id: "4", title: "מדריך מזעור נזקים", type: "מאמר" },
  ],
  relatedTools: [
    { id: "tool-1", title: "שאלון AUDIT" },
    { id: "tool-2", title: "מפת רשת תמיכה" },
  ],
};

// =============================================================================
// MOCK DATA: TOOL ITEM (Questionnaire)
// =============================================================================

export const mockToolItem: ToolItem = {
  id: "tool-1",
  title: "שאלון AUDIT",
  subtitle: "הערכת דפוסי שימוש באלכוהול",
  tags: ["אלכוהול", "הערכה", "סקר", "WHO"],
  meta: {
    duration: "3-5 דקות",
    outputType: "דוח מסכם + המלצות",
  },
  description:
    "שאלון AUDIT (Alcohol Use Disorders Identification Test) הוא כלי סקר מתוקף של ארגון הבריאות העולמי להערכת דפוסי שימוש באלכוהול ורמת הסיכון.",
  instructions: [
    "השאלון מכיל 10 שאלות על דפוסי שתייה",
    "יש לענות על כל השאלות בכנות",
    "התוצאה תסכם את רמת הסיכון ותציע המלצות",
  ],
  questions: [
    {
      id: "q1",
      text: "באיזו תדירות את/ה שותה משקה המכיל אלכוהול?",
      type: "radio",
      options: [
        { value: "0", label: "אף פעם" },
        { value: "1", label: "פעם בחודש או פחות" },
        { value: "2", label: "2-4 פעמים בחודש" },
        { value: "3", label: "2-3 פעמים בשבוע" },
        { value: "4", label: "4 פעמים או יותר בשבוע" },
      ],
    },
    {
      id: "q2",
      text: "כמה מנות אלכוהול את/ה שותה ביום טיפוסי כשאת/ה שותה?",
      type: "radio",
      options: [
        { value: "0", label: "1-2" },
        { value: "1", label: "3-4" },
        { value: "2", label: "5-6" },
        { value: "3", label: "7-9" },
        { value: "4", label: "10 או יותר" },
      ],
    },
    {
      id: "q3",
      text: "באיזו תדירות את/ה שותה 6 מנות או יותר באירוע אחד?",
      type: "radio",
      options: [
        { value: "0", label: "אף פעם" },
        { value: "1", label: "פחות מפעם בחודש" },
        { value: "2", label: "פעם בחודש" },
        { value: "3", label: "פעם בשבוע" },
        { value: "4", label: "כל יום או כמעט כל יום" },
      ],
    },
    {
      id: "q4",
      text: "בשנה האחרונה, כמה פעמים גילית שלא יכולת להפסיק לשתות ברגע שהתחלת?",
      type: "radio",
      options: [
        { value: "0", label: "אף פעם" },
        { value: "1", label: "פחות מפעם בחודש" },
        { value: "2", label: "פעם בחודש" },
        { value: "3", label: "פעם בשבוע" },
        { value: "4", label: "כל יום או כמעט כל יום" },
      ],
    },
    {
      id: "q5",
      text: "בשנה האחרונה, כמה פעמים לא הצלחת לעשות מה שציפו ממך בגלל שתייה?",
      type: "radio",
      options: [
        { value: "0", label: "אף פעם" },
        { value: "1", label: "פחות מפעם בחודש" },
        { value: "2", label: "פעם בחודש" },
        { value: "3", label: "פעם בשבוע" },
        { value: "4", label: "כל יום או כמעט כל יום" },
      ],
    },
  ],
  disclaimer:
    "כלי זה נועד לסיוע בקבלת החלטות מקצועית ואינו מחליף שיקול דעת קליני. במקרה של דחיפות או סיכון מיידי — יש לפעול לפי הנהלים והמסגרות הרלוונטיות.",
  relatedContent: [
    { id: "1", title: "עקרונות CBT בטיפול בהתמכרויות", type: "מאמר" },
    { id: "5", title: "מדריך התערבות קצרה לאלכוהול", type: "PDF" },
  ],
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getContentById(id: string): ContentItem | null {
  if (id === "1" || id === "2" || id === "3") {
    return mockContentItem;
  }
  return null;
}

export function getToolById(id: string): ToolItem | null {
  if (id === "tool-1" || id === "1") {
    return mockToolItem;
  }
  return null;
}
