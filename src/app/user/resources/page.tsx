"use client";

/**
 * User Resources - Using Master_Listing + SOS_Block
 * Route: /user/resources
 * משאבים וכלים - Resources and Self-Help Tools for Users
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
// RESOURCES DATA
// =============================================================================

interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "מידע" | "כלי עזרה" | "סרטון" | "מדריך" | "קו סיוע";
  type: "article" | "tool" | "video" | "guide" | "link";
  duration?: string;
  level: "קל לקריאה" | "מעמיק";
  tags: string[];
}

const RESOURCES_DATA: Resource[] = [
  {
    id: "res-1",
    slug: "what-is-addiction",
    title: "מה זה התמכרות?",
    description: "הסבר פשוט ומובן על מה זו התמכרות, למה היא קורה, ומה אפשר לעשות.",
    category: "מידע",
    type: "article",
    duration: "5 דקות קריאה",
    level: "קל לקריאה",
    tags: ["בסיסי", "התמכרות", "הבנה"],
  },
  {
    id: "res-2",
    slug: "coping-techniques",
    title: "טכניקות הרגעה לרגעים קשים",
    description: "5 תרגילים פשוטים שיעזרו לך להירגע כשאת/ה מרגיש/ה דחף או לחץ.",
    category: "כלי עזרה",
    type: "tool",
    duration: "10 דקות תרגול",
    level: "קל לקריאה",
    tags: ["התמודדות", "הרגעה", "תרגילים"],
  },
  {
    id: "res-3",
    slug: "triggers-guide",
    title: "זיהוי הטריגרים שלך",
    description: "מדריך אינטראקטיבי שיעזור לך לזהות מה מפעיל אותך ואיך להתמודד.",
    category: "כלי עזרה",
    type: "guide",
    duration: "15 דקות",
    level: "קל לקריאה",
    tags: ["טריגרים", "מודעות עצמית", "התמודדות"],
  },
  {
    id: "res-4",
    slug: "recovery-stages",
    title: "שלבי ההחלמה",
    description: "מה מחכה לך בדרך להחלמה? מדריך לכל השלבים עם טיפים להצלחה.",
    category: "מדריך",
    type: "guide",
    duration: "10 דקות קריאה",
    level: "מעמיק",
    tags: ["החלמה", "שלבים", "מוטיבציה"],
  },
  {
    id: "res-5",
    slug: "breathing-exercise",
    title: "תרגיל נשימה מודרך",
    description: "סרטון קצר עם תרגיל נשימה שיעזור לך להירגע תוך דקות.",
    category: "סרטון",
    type: "video",
    duration: "4 דקות",
    level: "קל לקריאה",
    tags: ["נשימה", "הרגעה", "וידאו"],
  },
  {
    id: "res-6",
    slug: "support-line",
    title: "קו התמיכה של ICA",
    description: "קו חם לשיחה עם מומחים — 24 שעות ביממה, 7 ימים בשבוע.",
    category: "קו סיוע",
    type: "link",
    level: "קל לקריאה",
    tags: ["עזרה", "קו חם", "תמיכה"],
  },
  {
    id: "res-7",
    slug: "types-of-addiction",
    title: "סוגי התמכרויות",
    description: "סקירה של סוגי ההתמכרויות השונים — לחומרים, להתנהגויות ועוד.",
    category: "מידע",
    type: "article",
    duration: "8 דקות קריאה",
    level: "מעמיק",
    tags: ["סוגים", "חומרים", "התנהגויות"],
  },
  {
    id: "res-8",
    slug: "daily-tracker",
    title: "יומן מעקב יומי",
    description: "כלי פשוט לעקוב אחרי מצב הרוח, הטריגרים, וההתקדמות שלך.",
    category: "כלי עזרה",
    type: "tool",
    duration: "2 דקות ביום",
    level: "קל לקריאה",
    tags: ["מעקב", "יומן", "התקדמות"],
  },
];

const FILTER_CATEGORIES = ["הכל", "מידע", "כלי עזרה", "סרטון", "מדריך", "קו סיוע"];

const AUDIENCE_TABS: AudienceTab[] = [
  { id: "user", label: "מתמודד/ת", route: "/user" },
  { id: "family", label: "הורים ובני משפחה", route: "/family" },
  { id: "education", label: "אנשי חינוך", route: "/education" },
  { id: "therapist", label: "אנשי מקצוע", route: "/therapist" },
];

const BREADCRUMB: BreadcrumbItem[] = [
  { label: "מרכז הידע", href: "/" },
  { label: "מתמודד/ת", href: "/user" },
  { label: "משאבים וכלים" },
];

const HERO_CONFIG: ListingHeroConfig = {
  badge: "עזרה עצמית",
  title: "משאבים וכלים",
  subtitle: "מידע מהימן, כלים פרקטיים, וסרטונים — הכל כדי לעזור לך להתמודד.",
  stats: [
    { value: String(RESOURCES_DATA.length), label: "משאבים" },
    { value: "24/7", label: "זמינות" },
  ],
};

const CTA_CONFIG: ListingCTAConfig = {
  title: "צריך/ה עזרה אישית?",
  subtitle: "לפעמים שיחה עם מומחה יכולה לעזור יותר מכל מדריך",
  primaryButton: { label: "התקשר/י: *2631", href: "tel:*2631" },
  secondaryButton: { label: "← חזרה ללובי", href: "/user" },
};

// =============================================================================
// HELPER: Convert Resource to ListingCard
// =============================================================================

function resourceToCard(resource: Resource): ListingCard {
  const typeIcons: Record<string, string> = {
    article: "📄",
    tool: "🛠",
    video: "🎬",
    guide: "📖",
    link: "🔗",
  };

  const categoryColors: Record<string, string> = {
    "מידע": "border-blue-400 bg-blue-50 text-blue-700",
    "כלי עזרה": "border-green-400 bg-green-50 text-green-700",
    "סרטון": "border-purple-400 bg-purple-50 text-purple-700",
    "מדריך": "border-orange-400 bg-orange-50 text-orange-700",
    "קו סיוע": "border-red-400 bg-red-50 text-red-700",
  };

  return {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    badges: [
      { label: resource.category, color: categoryColors[resource.category] || "border-gray-400" },
      { label: resource.level, color: "border-gray-300 bg-gray-50" },
    ],
    meta: [
      { icon: typeIcons[resource.type] || "📄", label: resource.category },
      ...(resource.duration ? [{ icon: "⏱", label: resource.duration }] : []),
    ],
    href: resource.type === "link" ? "tel:*2631" : `/knowledge/content/${resource.slug}`,
  };
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function UserResourcesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  // Filter resources
  const filteredResources = RESOURCES_DATA.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.title.includes(searchQuery) ||
      resource.description.includes(searchQuery) ||
      resource.tags.some((tag) => tag.includes(searchQuery));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("הכל") ||
      selectedCategories.includes(resource.category);

    return matchesSearch && matchesCategory;
  });

  // Convert to cards
  const cards = filteredResources.map(resourceToCard);

  // Search config
  const searchConfig: ListingSearchConfig = {
    placeholder: "חיפוש במשאבים...",
    value: searchQuery,
    onChange: setSearchQuery,
  };

  // Filter config
  const filterGroups: FilterGroup[] = [
    {
      id: "category",
      label: "סוג",
      type: "chips",
      options: FILTER_CATEGORIES.map((cat) => ({
        id: cat,
        label: cat,
        count: cat === "הכל" ? RESOURCES_DATA.length : RESOURCES_DATA.filter((r) => r.category === cat).length,
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
      theme="user"
      breadcrumb={BREADCRUMB}
      hero={HERO_CONFIG}
      search={searchConfig}
      filterType="chips"
      filters={filterGroups}
      resultsCount={cards.length}
      totalCount={RESOURCES_DATA.length}
      columns={3}
      cards={cards}
      emptyMessage="לא נמצאו משאבים מתאימים. נסה/י מילות חיפוש אחרות."
      emptyIcon="📚"
      onClearFilters={handleClearFilters}
      cta={CTA_CONFIG}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="user"
      showSOS={true}
    />
  );
}
