"use client";

/**
 * Education Protocols - Using Master_Listing
 * Route: /education/protocols
 * פרוטוקולים ומדריכים - Protocols and Guides for Educators
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import MasterListing, {
  type ListingCard,
  type ListingHeroConfig,
  type ListingSearchConfig,
  type FilterGroup,
  type ListingCTAConfig,
  type BreadcrumbItem,
  type AudienceTab,
} from "@/components/masters/Master_Listing_v1.0";

// =============================================================================
// PROTOCOLS DATA
// =============================================================================

interface Protocol {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "זיהוי" | "התערבות" | "מניעה" | "תקשורת" | "דיווח";
  type: "protocol" | "guide" | "worksheet" | "video" | "presentation";
  audience: "מורים" | "יועצים" | "הנהלה" | "כולם";
  duration?: string;
  downloadable: boolean;
  tags: string[];
}

const PROTOCOLS_DATA: Protocol[] = [
  {
    id: "proto-1",
    slug: "first-conversation",
    title: "פרוטוקול שיחה ראשונית עם תלמיד/ה",
    description: "מדריך מפורט לניהול שיחה ראשונית כשחושדים בשימוש — מה לעשות ומה להימנע.",
    category: "תקשורת",
    type: "protocol",
    audience: "כולם",
    duration: "15 דקות קריאה",
    downloadable: true,
    tags: ["שיחה", "תקשורת", "ראשוני"],
  },
  {
    id: "proto-2",
    slug: "reporting-process",
    title: "תהליך דיווח והפניה",
    description: "פרוטוקול מובנה לדיווח, תיעוד והפניה — שלב אחר שלב.",
    category: "דיווח",
    type: "protocol",
    audience: "כולם",
    duration: "10 דקות קריאה",
    downloadable: true,
    tags: ["דיווח", "הפניה", "תיעוד"],
  },
  {
    id: "proto-3",
    slug: "intervention-steps",
    title: "שלבי התערבות בית ספרית",
    description: "תרשים זרימה להתערבות — מזיהוי ראשוני ועד מעקב.",
    category: "התערבות",
    type: "protocol",
    audience: "יועצים",
    duration: "20 דקות קריאה",
    downloadable: true,
    tags: ["התערבות", "תרשים", "שלבים"],
  },
  {
    id: "proto-4",
    slug: "parent-meeting",
    title: "שיחה עם הורים — מדריך",
    description: "איך לנהל שיחה מורכבת עם הורים על חשד לשימוש.",
    category: "תקשורת",
    type: "guide",
    audience: "יועצים",
    duration: "12 דקות קריאה",
    downloadable: true,
    tags: ["הורים", "שיחה", "קונפליקט"],
  },
  {
    id: "proto-5",
    slug: "classroom-activity",
    title: "פעילות מניעה לכיתה",
    description: "מערך שיעור מוכן להעברת פעילות מניעה — כולל מצגת ודפי עבודה.",
    category: "מניעה",
    type: "presentation",
    audience: "מורים",
    duration: "45 דקות",
    downloadable: true,
    tags: ["מניעה", "שיעור", "פעילות"],
  },
  {
    id: "proto-6",
    slug: "signs-checklist-pdf",
    title: "רשימת סימני אזהרה (PDF)",
    description: "רשימה להדפסה עם סימני האזהרה העיקריים — נוח לשימוש יומיומי.",
    category: "זיהוי",
    type: "worksheet",
    audience: "כולם",
    downloadable: true,
    tags: ["זיהוי", "סימנים", "רשימה"],
  },
  {
    id: "proto-7",
    slug: "staff-training-video",
    title: "הדרכת צוות — סרטון",
    description: "סרטון הדרכה של 20 דקות לצוות חינוכי — ניתן להעביר בישיבת צוות.",
    category: "זיהוי",
    type: "video",
    audience: "כולם",
    duration: "20 דקות",
    downloadable: false,
    tags: ["הדרכה", "צוות", "וידאו"],
  },
  {
    id: "proto-8",
    slug: "crisis-protocol",
    title: "פרוטוקול מצב חירום",
    description: "מה לעשות כשתלמיד/ה בהשפעה או במצב חירום — הנחיות מיידיות.",
    category: "התערבות",
    type: "protocol",
    audience: "כולם",
    duration: "5 דקות קריאה",
    downloadable: true,
    tags: ["חירום", "מיידי", "פעולה"],
  },
  {
    id: "proto-9",
    slug: "digital-addiction",
    title: "התמודדות עם התמכרות דיגיטלית",
    description: "מדריך לזיהוי והתערבות בהתמכרויות לטכנולוגיה — מסכים, משחקים, רשתות.",
    category: "זיהוי",
    type: "guide",
    audience: "כולם",
    duration: "15 דקות קריאה",
    downloadable: true,
    tags: ["דיגיטלי", "מסכים", "משחקים"],
  },
  {
    id: "proto-10",
    slug: "prevention-program",
    title: "תוכנית מניעה שנתית",
    description: "מתווה לתוכנית מניעה בית ספרית — פעילויות, הרצאות ומעקב.",
    category: "מניעה",
    type: "guide",
    audience: "הנהלה",
    duration: "30 דקות קריאה",
    downloadable: true,
    tags: ["מניעה", "שנתי", "תוכנית"],
  },
];

const FILTER_CATEGORIES = ["הכל", "זיהוי", "התערבות", "מניעה", "תקשורת", "דיווח"];

const AUDIENCE_TABS: AudienceTab[] = [
  { id: "user", label: "מתמודד/ת", route: "/user" },
  { id: "family", label: "הורים ובני משפחה", route: "/family" },
  { id: "education", label: "אנשי חינוך", route: "/education" },
  { id: "therapist", label: "אנשי מקצוע", route: "/therapist" },
];

const BREADCRUMB: BreadcrumbItem[] = [
  { label: "מרכז הידע", href: "/" },
  { label: "אנשי חינוך", href: "/education" },
  { label: "פרוטוקולים ומדריכים" },
];

const HERO_CONFIG: ListingHeroConfig = {
  badge: "ספריית פרוטוקולים",
  title: "פרוטוקולים ומדריכים",
  subtitle: "כל הכלים שאנשי חינוך צריכים — מזיהוי ועד התערבות.",
  stats: [
    { value: String(PROTOCOLS_DATA.length), label: "פרוטוקולים" },
    { value: String(PROTOCOLS_DATA.filter((p) => p.downloadable).length), label: "להורדה" },
  ],
};

const CTA_CONFIG: ListingCTAConfig = {
  title: "צריכים הדרכה מותאמת?",
  subtitle: "ICA מציע הדרכות פרונטליות לצוותי חינוך",
  primaryButton: { label: "צרו קשר", href: "https://ica.org.il/contact" },
  secondaryButton: { label: "← חזרה ללובי", href: "/education" },
};

// =============================================================================
// HELPER: Convert Protocol to ListingCard
// =============================================================================

function protocolToCard(protocol: Protocol): ListingCard {
  const typeIcons: Record<string, string> = {
    protocol: "📋",
    guide: "📖",
    worksheet: "📝",
    video: "🎬",
    presentation: "📊",
  };

  const categoryColors: Record<string, string> = {
    "זיהוי": "border-purple-400 bg-purple-50 text-purple-700",
    "התערבות": "border-red-400 bg-red-50 text-red-700",
    "מניעה": "border-green-400 bg-green-50 text-green-700",
    "תקשורת": "border-blue-400 bg-blue-50 text-blue-700",
    "דיווח": "border-orange-400 bg-orange-50 text-orange-700",
  };

  return {
    id: protocol.id,
    title: protocol.title,
    description: protocol.description,
    badges: [
      { label: protocol.category, color: categoryColors[protocol.category] || "border-gray-400" },
      { label: protocol.audience, color: "border-gray-300 bg-gray-50" },
      ...(protocol.downloadable ? [{ label: "להורדה", color: "border-green-300 bg-green-50 text-green-600" }] : []),
    ],
    meta: [
      { icon: typeIcons[protocol.type] || "📄", label: protocol.type === "video" ? "סרטון" : protocol.type === "presentation" ? "מצגת" : "מסמך" },
      ...(protocol.duration ? [{ icon: "⏱", label: protocol.duration }] : []),
    ],
    href: `/knowledge/content/${protocol.slug}`,
  };
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function EducationProtocolsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  // Filter protocols
  const filteredProtocols = PROTOCOLS_DATA.filter((protocol) => {
    const matchesSearch =
      searchQuery === "" ||
      protocol.title.includes(searchQuery) ||
      protocol.description.includes(searchQuery) ||
      protocol.tags.some((tag) => tag.includes(searchQuery));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("הכל") ||
      selectedCategories.includes(protocol.category);

    return matchesSearch && matchesCategory;
  });

  // Convert to cards
  const cards = filteredProtocols.map(protocolToCard);

  // Search config
  const searchConfig: ListingSearchConfig = {
    placeholder: "חיפוש בפרוטוקולים...",
    value: searchQuery,
    onChange: setSearchQuery,
  };

  // Filter config
  const filterGroups: FilterGroup[] = [
    {
      id: "category",
      label: "קטגוריה",
      type: "chips",
      options: FILTER_CATEGORIES.map((cat) => ({
        id: cat,
        label: cat,
        count: cat === "הכל" ? PROTOCOLS_DATA.length : PROTOCOLS_DATA.filter((p) => p.category === cat).length,
      })),
      selected: selectedCategories,
      onChange: (selected) => {
        if (selected.includes("הכל")) {
          setSelectedCategories([]);
        } else {
          setSelectedCategories(selected);
        }
      },
    },
  ];

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  return (
    <MasterListing
      view="grid"
      theme="education"
      breadcrumb={BREADCRUMB}
      hero={HERO_CONFIG}
      search={searchConfig}
      filterType="chips"
      filters={filterGroups}
      resultsCount={cards.length}
      totalCount={PROTOCOLS_DATA.length}
      columns={3}
      cards={cards}
      emptyMessage="לא נמצאו פרוטוקולים מתאימים. נסו מילות חיפוש אחרות."
      emptyIcon="📋"
      onClearFilters={handleClearFilters}
      cta={CTA_CONFIG}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="education"
      showSOS={false}
    />
  );
}
