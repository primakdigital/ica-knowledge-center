"use client";

/**
 * Family Guides - Using Master_Listing + SOS_Block
 * Route: /family/guides
 * מדריכים להורים - Guides and Resources for Family Members
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
// GUIDES DATA
// =============================================================================

interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "תקשורת" | "הבנה" | "התמודדות" | "תמיכה" | "מעשי";
  type: "article" | "video" | "guide" | "worksheet";
  duration?: string;
  audience: "הורים" | "בני זוג" | "אחים" | "כולם";
  tags: string[];
}

const GUIDES_DATA: Guide[] = [
  {
    id: "guide-1",
    slug: "how-to-talk",
    title: "איך לפתוח שיחה על התמכרות",
    description: "מדריך מעשי לשיחה פתוחה ובטוחה — מה לעשות ומה להימנע.",
    category: "תקשורת",
    type: "guide",
    duration: "10 דקות",
    audience: "הורים",
    tags: ["שיחה", "תקשורת", "פתיחות"],
  },
  {
    id: "guide-2",
    slug: "understanding-addiction",
    title: "להבין התמכרות: מדריך להורים",
    description: "מה זה התמכרות, למה היא קורה, ואיך זה משפיע על המוח והתנהגות.",
    category: "הבנה",
    type: "article",
    duration: "15 דקות",
    audience: "כולם",
    tags: ["הסברים", "מדע", "הבנה"],
  },
  {
    id: "guide-3",
    slug: "setting-boundaries",
    title: "הצבת גבולות בריאים",
    description: "איך להציב גבולות שמגינים עליכם מבלי לנתק את הקשר.",
    category: "התמודדות",
    type: "guide",
    duration: "12 דקות",
    audience: "הורים",
    tags: ["גבולות", "הגנה עצמית", "קשר"],
  },
  {
    id: "guide-4",
    slug: "self-care-for-families",
    title: "לשמור על עצמכם",
    description: "גם אתם צריכים תמיכה. טיפים לשמירה על בריאות נפשית.",
    category: "תמיכה",
    type: "article",
    duration: "8 דקות",
    audience: "כולם",
    tags: ["טיפול עצמי", "בריאות נפשית", "תמיכה"],
  },
  {
    id: "guide-5",
    slug: "warning-signs-video",
    title: "סימני אזהרה — סרטון להורים",
    description: "סרטון קצר שמסביר את סימני האזהרה העיקריים ומה לעשות.",
    category: "הבנה",
    type: "video",
    duration: "7 דקות",
    audience: "הורים",
    tags: ["סימנים", "זיהוי", "וידאו"],
  },
  {
    id: "guide-6",
    slug: "communication-techniques",
    title: "טכניקות תקשורת למתבגרים",
    description: "איך לדבר עם מתבגר שלא רוצה לדבר — כלים מעשיים.",
    category: "תקשורת",
    type: "video",
    duration: "12 דקות",
    audience: "הורים",
    tags: ["תקשורת", "מתבגרים", "כלים"],
  },
  {
    id: "guide-7",
    slug: "family-roles",
    title: "תפקידים במשפחה עם התמכרות",
    description: "איך התמכרות משפיעה על כל בני המשפחה ומה אפשר לעשות.",
    category: "הבנה",
    type: "article",
    duration: "10 דקות",
    audience: "כולם",
    tags: ["משפחה", "דינמיקה", "תפקידים"],
  },
  {
    id: "guide-8",
    slug: "emergency-plan",
    title: "תוכנית חירום למשפחה",
    description: "מה לעשות במצב חירום? תוכנית מסודרת לרגעים קשים.",
    category: "מעשי",
    type: "worksheet",
    duration: "20 דקות",
    audience: "כולם",
    tags: ["חירום", "תוכנית", "מוכנות"],
  },
  {
    id: "guide-9",
    slug: "support-partner",
    title: "איך לתמוך בבן/בת זוג",
    description: "מדריך מיוחד לבני זוג של מתמודדים עם התמכרות.",
    category: "תמיכה",
    type: "guide",
    duration: "12 דקות",
    audience: "בני זוג",
    tags: ["זוגיות", "תמיכה", "קשר"],
  },
  {
    id: "guide-10",
    slug: "siblings-guide",
    title: "מדריך לאחים ואחיות",
    description: "כשאח או אחות מתמודדים עם התמכרות — איך להתמודד.",
    category: "תמיכה",
    type: "guide",
    duration: "8 דקות",
    audience: "אחים",
    tags: ["אחים", "התמודדות", "תמיכה"],
  },
];

const FILTER_CATEGORIES = ["הכל", "תקשורת", "הבנה", "התמודדות", "תמיכה", "מעשי"];

const AUDIENCE_TABS: AudienceTab[] = [
  { id: "user", label: "מתמודד/ת", route: "/user" },
  { id: "family", label: "הורים ובני משפחה", route: "/family" },
  { id: "education", label: "אנשי חינוך", route: "/education" },
  { id: "therapist", label: "אנשי מקצוע", route: "/therapist" },
];

const BREADCRUMB: BreadcrumbItem[] = [
  { label: "מרכז הידע", href: "/" },
  { label: "הורים ובני משפחה", href: "/family" },
  { label: "מדריכים" },
];

const HERO_CONFIG: ListingHeroConfig = {
  badge: "ספריית מדריכים",
  title: "מדריכים להורים ובני משפחה",
  subtitle: "כל מה שצריך לדעת, להבין ולעשות — במקום אחד.",
  stats: [
    { value: String(GUIDES_DATA.length), label: "מדריכים" },
    { value: String(GUIDES_DATA.filter((g) => g.type === "video").length), label: "סרטונים" },
  ],
};

const CTA_CONFIG: ListingCTAConfig = {
  title: "לא מצאתם מה שחיפשתם?",
  subtitle: "התקשרו לקו התמיכה — נשמח לעזור",
  primaryButton: { label: "התקשרו: *2631", href: "tel:*2631" },
  secondaryButton: { label: "← חזרה ללובי", href: "/family" },
};

// =============================================================================
// HELPER: Convert Guide to ListingCard
// =============================================================================

function guideToCard(guide: Guide): ListingCard {
  const typeIcons: Record<string, string> = {
    article: "📄",
    video: "🎬",
    guide: "📖",
    worksheet: "📋",
  };

  const categoryColors: Record<string, string> = {
    "תקשורת": "border-blue-400 bg-blue-50 text-blue-700",
    "הבנה": "border-purple-400 bg-purple-50 text-purple-700",
    "התמודדות": "border-green-400 bg-green-50 text-green-700",
    "תמיכה": "border-orange-400 bg-orange-50 text-orange-700",
    "מעשי": "border-red-400 bg-red-50 text-red-700",
  };

  return {
    id: guide.id,
    title: guide.title,
    description: guide.description,
    badges: [
      { label: guide.category, color: categoryColors[guide.category] || "border-gray-400" },
      { label: guide.audience, color: "border-gray-300 bg-gray-50" },
    ],
    meta: [
      { icon: typeIcons[guide.type] || "📄", label: guide.type === "video" ? "סרטון" : guide.type === "worksheet" ? "דף עבודה" : "מאמר" },
      ...(guide.duration ? [{ icon: "⏱", label: guide.duration }] : []),
    ],
    href: `/knowledge/content/${guide.slug}`,
  };
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function FamilyGuidesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  // Filter guides
  const filteredGuides = GUIDES_DATA.filter((guide) => {
    const matchesSearch =
      searchQuery === "" ||
      guide.title.includes(searchQuery) ||
      guide.description.includes(searchQuery) ||
      guide.tags.some((tag) => tag.includes(searchQuery));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("הכל") ||
      selectedCategories.includes(guide.category);

    return matchesSearch && matchesCategory;
  });

  // Convert to cards
  const cards = filteredGuides.map(guideToCard);

  // Search config
  const searchConfig: ListingSearchConfig = {
    placeholder: "חיפוש במדריכים...",
    value: searchQuery,
    onChange: setSearchQuery,
  };

  // Filter config
  const filterGroups: FilterGroup[] = [
    {
      id: "category",
      label: "נושא",
      type: "chips",
      options: FILTER_CATEGORIES.map((cat) => ({
        id: cat,
        label: cat,
        count: cat === "הכל" ? GUIDES_DATA.length : GUIDES_DATA.filter((g) => g.category === cat).length,
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
      theme="family"
      breadcrumb={BREADCRUMB}
      hero={HERO_CONFIG}
      search={searchConfig}
      filterType="chips"
      filters={filterGroups}
      resultsCount={cards.length}
      totalCount={GUIDES_DATA.length}
      columns={3}
      cards={cards}
      emptyMessage="לא נמצאו מדריכים מתאימים. נסו מילות חיפוש אחרות."
      emptyIcon="📚"
      onClearFilters={handleClearFilters}
      cta={CTA_CONFIG}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="family"
      showSOS={true}
    />
  );
}
