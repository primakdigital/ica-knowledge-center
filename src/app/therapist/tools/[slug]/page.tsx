"use client";

/**
 * Tool Detail - Using Master_Content
 * Route: /therapist/tools/[slug]
 * עמוד כלי בודד - Assessment Tool Detail
 */

import * as React from "react";
import { useParams } from "next/navigation";
import MasterContent, {
  type ContentSection,
  type ContentBadge,
  type MetaInfo,
  type TabConfig,
  type InteractiveConfig,
  type Question,
  type ScoringRange,
  type DownloadItem,
  type SidebarBlock,
  type BreadcrumbItem,
  type AudienceTab,
} from "@/components/masters/Master_Content_v1.0";

// =============================================================================
// TOOL DATABASE
// =============================================================================

interface ToolData {
  slug: string;
  name: string;
  nameEn: string;
  fullName: string;
  description: string;
  longDescription: string;
  category: string;
  targetSubstance: string;
  targetPopulation: string;
  duration: string;
  format: "אונליין" | "להורדה" | "שניהם";
  questions: Question[];
  scoring: ScoringRange[];
  source: string;
  references: string[];
  relatedTools: { slug: string; name: string }[];
}

const TOOLS_DATABASE: Record<string, ToolData> = {
  audit: {
    slug: "audit",
    name: "AUDIT",
    nameEn: "Alcohol Use Disorders Identification Test",
    fullName: "מבחן לזיהוי הפרעות שימוש באלכוהול",
    description: "שאלון לזיהוי שימוש בעייתי באלכוהול",
    longDescription: "שאלון AUDIT פותח על ידי ארגון הבריאות העולמי (WHO) ככלי סקרינינג לזיהוי מוקדם של שימוש בעייתי באלכוהול. השאלון מכיל 10 שאלות המתייחסות לכמות ותדירות השתייה, תסמיני תלות, ובעיות הקשורות לאלכוהול.",
    category: "סקרינינג",
    targetSubstance: "אלכוהול",
    targetPopulation: "מבוגרים (18+)",
    duration: "3-5 דקות",
    format: "שניהם",
    questions: [
      {
        id: "q1",
        text: "באיזו תדירות את/ה שותה משקה המכיל אלכוהול?",
        options: [
          { value: 0, label: "אף פעם" },
          { value: 1, label: "פעם בחודש או פחות" },
          { value: 2, label: "2-4 פעמים בחודש" },
          { value: 3, label: "2-3 פעמים בשבוע" },
          { value: 4, label: "4 פעמים או יותר בשבוע" },
        ],
      },
      {
        id: "q2",
        text: "כמה מנות אלכוהול את/ה שותה ביום טיפוסי כשאת/ה שותה?",
        options: [
          { value: 0, label: "1-2" },
          { value: 1, label: "3-4" },
          { value: 2, label: "5-6" },
          { value: 3, label: "7-9" },
          { value: 4, label: "10 או יותר" },
        ],
      },
      {
        id: "q3",
        text: "באיזו תדירות את/ה שותה 6 מנות או יותר באירוע אחד?",
        options: [
          { value: 0, label: "אף פעם" },
          { value: 1, label: "פחות מפעם בחודש" },
          { value: 2, label: "פעם בחודש" },
          { value: 3, label: "פעם בשבוע" },
          { value: 4, label: "כל יום או כמעט כל יום" },
        ],
      },
      {
        id: "q4",
        text: "בשנה האחרונה, כמה פעמים גילית שלא יכולת להפסיק לשתות ברגע שהתחלת?",
        options: [
          { value: 0, label: "אף פעם" },
          { value: 1, label: "פחות מפעם בחודש" },
          { value: 2, label: "פעם בחודש" },
          { value: 3, label: "פעם בשבוע" },
          { value: 4, label: "כל יום או כמעט כל יום" },
        ],
      },
      {
        id: "q5",
        text: "בשנה האחרונה, כמה פעמים לא הצלחת לעשות מה שציפו ממך בגלל שתייה?",
        options: [
          { value: 0, label: "אף פעם" },
          { value: 1, label: "פחות מפעם בחודש" },
          { value: 2, label: "פעם בחודש" },
          { value: 3, label: "פעם בשבוע" },
          { value: 4, label: "כל יום או כמעט כל יום" },
        ],
      },
    ],
    scoring: [
      { min: 0, max: 7, level: "סיכון נמוך", recommendation: "חינוך והעלאת מודעות" },
      { min: 8, max: 15, level: "סיכון בינוני", recommendation: "ייעוץ קצר והתערבות מינימלית" },
      { min: 16, max: 19, level: "סיכון גבוה", recommendation: "ייעוץ קצר + ליווי מתמשך" },
      { min: 20, max: 40, level: "סיכון גבוה מאוד", recommendation: "הפניה להערכה מעמיקה וטיפול" },
    ],
    source: "World Health Organization (WHO)",
    references: [
      "Babor, T.F., et al. (2001). AUDIT: The Alcohol Use Disorders Identification Test. WHO.",
      "Saunders, J.B., et al. (1993). Development of the AUDIT. Addiction, 88(6), 791-804.",
    ],
    relatedTools: [
      { slug: "cage", name: "CAGE" },
      { slug: "mast", name: "MAST" },
      { slug: "assist", name: "ASSIST" },
    ],
  },
  assist: {
    slug: "assist",
    name: "ASSIST",
    nameEn: "Alcohol, Smoking and Substance Involvement Screening Test",
    fullName: "מבחן סקרינינג למעורבות בחומרים",
    description: "שאלון סקרינינג לזיהוי שימוש בעייתי בחומרים פסיכואקטיביים",
    longDescription: "שאלון ASSIST פותח על ידי ארגון הבריאות העולמי לסקירת שימוש במגוון חומרים פסיכואקטיביים. הכלי מאפשר זיהוי רמת הסיכון עבור כל חומר בנפרד ומספק המלצות להתערבות מותאמת.",
    category: "סקרינינג",
    targetSubstance: "חומרים מרובים",
    targetPopulation: "מבוגרים (18+)",
    duration: "5-10 דקות",
    format: "שניהם",
    questions: [
      {
        id: "q1",
        text: "במהלך חייך, באילו מהחומרים הבאים השתמשת אי פעם?",
        options: [
          { value: 0, label: "אף פעם" },
          { value: 1, label: "טבק" },
          { value: 2, label: "אלכוהול" },
          { value: 3, label: "קנאביס" },
          { value: 4, label: "אחר" },
        ],
      },
      {
        id: "q2",
        text: "בשלושת החודשים האחרונים, באיזו תדירות השתמשת בחומרים שציינת?",
        options: [
          { value: 0, label: "אף פעם" },
          { value: 2, label: "פעם או פעמיים" },
          { value: 3, label: "מדי חודש" },
          { value: 4, label: "מדי שבוע" },
          { value: 6, label: "כל יום או כמעט כל יום" },
        ],
      },
      {
        id: "q3",
        text: "בשלושת החודשים האחרונים, באיזו תדירות הייתה לך תשוקה או דחף חזק להשתמש?",
        options: [
          { value: 0, label: "אף פעם" },
          { value: 3, label: "פעם או פעמיים" },
          { value: 4, label: "מדי חודש" },
          { value: 5, label: "מדי שבוע" },
          { value: 6, label: "כל יום או כמעט כל יום" },
        ],
      },
    ],
    scoring: [
      { min: 0, max: 3, level: "סיכון נמוך", recommendation: "מתן מידע" },
      { min: 4, max: 26, level: "סיכון בינוני", recommendation: "התערבות קצרה" },
      { min: 27, max: 100, level: "סיכון גבוה", recommendation: "הפניה לטיפול אינטנסיבי" },
    ],
    source: "World Health Organization (WHO)",
    references: [
      "WHO ASSIST Working Group (2002). The ASSIST project. Drug and Alcohol Dependence, 68(2), 131-160.",
    ],
    relatedTools: [
      { slug: "audit", name: "AUDIT" },
      { slug: "dast-10", name: "DAST-10" },
      { slug: "dudit", name: "DUDIT" },
    ],
  },
};

// Default fallback tool
const DEFAULT_TOOL: ToolData = {
  slug: "default",
  name: "כלי",
  nameEn: "Tool",
  fullName: "כלי הערכה",
  description: "תיאור הכלי",
  longDescription: "תיאור מפורט של הכלי יופיע כאן.",
  category: "סקרינינג",
  targetSubstance: "כללי",
  targetPopulation: "מבוגרים",
  duration: "5 דקות",
  format: "שניהם",
  questions: [],
  scoring: [],
  source: "ICA",
  references: [],
  relatedTools: [],
};

// =============================================================================
// SHARED CONFIGS
// =============================================================================

const AUDIENCE_TABS: AudienceTab[] = [
  { id: "user", label: "מתמודד/ת", route: "/user" },
  { id: "family", label: "הורים ובני משפחה", route: "/family" },
  { id: "education", label: "אנשי חינוך", route: "/education" },
  { id: "therapist", label: "אנשי מקצוע", route: "/therapist" },
];

const TABS: TabConfig[] = [
  { id: "info", label: "מידע על הכלי" },
  { id: "tool", label: "הפעלת הכלי" },
  { id: "resources", label: "משאבים נוספים" },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Get tool data
  const tool = TOOLS_DATABASE[slug] || { ...DEFAULT_TOOL, name: slug.toUpperCase() };

  // Build breadcrumb
  const breadcrumb: BreadcrumbItem[] = [
    { label: "מרכז הידע", href: "/" },
    { label: "אנשי מקצוע", href: "/therapist" },
    { label: "כלי אבחון", href: "/therapist/tools" },
    { label: tool.name },
  ];

  // Build badges
  const badges: ContentBadge[] = [
    { label: `כלי ${tool.category}`, color: "border-gray-600 bg-gray-200" },
    { label: tool.targetSubstance, color: "border-gray-400 bg-white" },
    {
      label: tool.format,
      color:
        tool.format === "אונליין"
          ? "border-green-400 bg-green-50 text-green-700"
          : tool.format === "להורדה"
          ? "border-blue-400 bg-blue-50 text-blue-700"
          : "border-purple-400 bg-purple-50 text-purple-700",
    },
  ];

  // Build meta
  const meta: MetaInfo[] = [
    { icon: "⏱", label: `זמן מילוי: ${tool.duration}` },
    { icon: "👥", label: `קהל יעד: ${tool.targetPopulation}` },
    { icon: "📋", label: `${tool.questions.length} שאלות` },
    { icon: "📚", label: `מקור: ${tool.source}` },
  ];

  // Build content sections
  const sections: ContentSection[] = [
    {
      id: "about",
      title: "אודות הכלי",
      content: tool.longDescription,
      type: "prose",
    },
    {
      id: "scoring",
      title: "מדריך ניקוד",
      content: tool.scoring
        .map((range) => `${range.min}-${range.max}: ${range.level} - ${range.recommendation}`)
        .join("\n"),
      type: "list",
    },
  ];

  // Build interactive config
  const interactive: InteractiveConfig = {
    questions: tool.questions,
    scoring: tool.scoring,
    disclaimer:
      "כלי זה נועד לסיוע בקבלת החלטות מקצועית ואינו מחליף שיקול דעת קליני. במקרה של דחיפות או סיכון מיידי — יש לפעול לפי הנהלים והמסגרות הרלוונטיות.",
  };

  // Build downloads
  const downloads: DownloadItem[] = [
    { id: "pdf", title: `שאלון ${tool.name} (PDF)`, subtitle: "גרסה להדפסה", href: "#" },
    { id: "guide", title: "מדריך הפעלה", subtitle: "הנחיות לשימוש בכלי", href: "#" },
    { id: "scoring", title: "טבלת ניקוד", subtitle: "מפתח חישוב וניקוד", href: "#" },
  ];

  // Build sidebar
  const sidebar: SidebarBlock[] = [
    {
      id: "related",
      title: "כלים קשורים",
      type: "related",
      items: tool.relatedTools.map((rt) => ({
        id: rt.slug,
        title: rt.name,
        href: `/therapist/tools/${rt.slug}`,
      })),
    },
    {
      id: "navigation",
      title: "ניווט מהיר",
      type: "links",
      links: [
        { label: "כל כלי האבחון", href: "/therapist/tools" },
        { label: "לובי אנשי מקצוע", href: "/therapist" },
      ],
    },
  ];

  // Action buttons
  const actions = [
    { icon: "↓", label: "הורדת הכלי (PDF)", onClick: () => {} },
    { icon: "↗", label: "שיתוף", onClick: () => {} },
  ];

  return (
    <MasterContent
      variant="tool"
      theme="therapist"
      breadcrumb={breadcrumb}
      badges={badges}
      title={tool.name}
      subtitle={tool.nameEn}
      fullTitle={tool.fullName}
      meta={meta}
      sections={sections}
      references={tool.references}
      tabs={TABS}
      activeTab="info"
      interactive={interactive}
      downloads={downloads}
      sidebar={sidebar}
      actions={actions}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="therapist"
    />
  );
}
