"use client";

/**
 * Tools Index - Using Master_Listing
 * Route: /therapist/tools
 * כלי אבחון וסקרינינג - Assessment & Screening Tools
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
// TOOLS DATA
// =============================================================================

interface Tool {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  category: "סקרינינג" | "הערכה" | "מעקב" | "נוער";
  targetSubstance?: string;
  duration: string;
  format: "אונליין" | "להורדה" | "שניהם";
  questions: number;
  validated: boolean;
}

const TOOLS_DATA: Tool[] = [
  {
    id: "tool-assist",
    slug: "assist",
    name: "ASSIST",
    nameEn: "Alcohol, Smoking and Substance Involvement Screening Test",
    description: "שאלון סקרינינג לזיהוי שימוש בעייתי בחומרים פסיכואקטיביים. מפותח על ידי ארגון הבריאות העולמי.",
    category: "סקרינינג",
    targetSubstance: "חומרים מרובים",
    duration: "5-10 דקות",
    format: "שניהם",
    questions: 8,
    validated: true,
  },
  {
    id: "tool-audit",
    slug: "audit",
    name: "AUDIT",
    nameEn: "Alcohol Use Disorders Identification Test",
    description: "שאלון לזיהוי שימוש בעייתי באלכוהול. כלי הסקרינינג המומלץ לאיתור מוקדם של בעיות אלכוהול.",
    category: "סקרינינג",
    targetSubstance: "אלכוהול",
    duration: "3-5 דקות",
    format: "שניהם",
    questions: 10,
    validated: true,
  },
  {
    id: "tool-dast",
    slug: "dast-10",
    name: "DAST-10",
    nameEn: "Drug Abuse Screening Test",
    description: "שאלון קצר לסקרינינג שימוש בסמים. גרסה מקוצרת של 10 שאלות לזיהוי מהיר.",
    category: "סקרינינג",
    targetSubstance: "סמים",
    duration: "3-5 דקות",
    format: "שניהם",
    questions: 10,
    validated: true,
  },
  {
    id: "tool-crafft",
    slug: "crafft",
    name: "CRAFFT",
    nameEn: "Car, Relax, Alone, Forget, Friends, Trouble",
    description: "שאלון סקרינינג לזיהוי שימוש בעייתי בקרב בני נוער. מותאם לגילאי 12-21.",
    category: "נוער",
    targetSubstance: "חומרים מרובים",
    duration: "3-5 דקות",
    format: "שניהם",
    questions: 6,
    validated: true,
  },
  {
    id: "tool-cage",
    slug: "cage",
    name: "CAGE",
    nameEn: "Cut down, Annoyed, Guilty, Eye-opener",
    description: "שאלון סקרינינג קצר לזיהוי תלות באלכוהול. ארבע שאלות בסיסיות לאיתור מהיר.",
    category: "סקרינינג",
    targetSubstance: "אלכוהול",
    duration: "1-2 דקות",
    format: "שניהם",
    questions: 4,
    validated: true,
  },
  {
    id: "tool-mast",
    slug: "mast",
    name: "MAST",
    nameEn: "Michigan Alcohol Screening Test",
    description: "שאלון להערכת חומרת בעיות אלכוהול. גרסה מלאה להערכה מעמיקה.",
    category: "הערכה",
    targetSubstance: "אלכוהול",
    duration: "10-15 דקות",
    format: "להורדה",
    questions: 25,
    validated: true,
  },
  {
    id: "tool-dudit",
    slug: "dudit",
    name: "DUDIT",
    nameEn: "Drug Use Disorders Identification Test",
    description: "שאלון להערכת חומרת שימוש בסמים. מקביל ל-AUDIT עבור סמים שאינם אלכוהול.",
    category: "הערכה",
    targetSubstance: "סמים",
    duration: "5-10 דקות",
    format: "שניהם",
    questions: 11,
    validated: true,
  },
  {
    id: "tool-socrates",
    slug: "socrates",
    name: "SOCRATES",
    nameEn: "Stages of Change Readiness and Treatment Eagerness Scale",
    description: "שאלון להערכת מוכנות לשינוי ומוטיבציה לטיפול. מבוסס על מודל שלבי השינוי.",
    category: "מעקב",
    duration: "10-15 דקות",
    format: "להורדה",
    questions: 19,
    validated: true,
  },
];

const FILTER_CATEGORIES = ["הכל", "סקרינינג", "הערכה", "מעקב", "נוער"];

const AUDIENCE_TABS: AudienceTab[] = [
  { id: "user", label: "מתמודד/ת", route: "/user" },
  { id: "family", label: "הורים ובני משפחה", route: "/family" },
  { id: "education", label: "אנשי חינוך", route: "/education" },
  { id: "therapist", label: "אנשי מקצוע", route: "/therapist" },
];

const BREADCRUMB: BreadcrumbItem[] = [
  { label: "מרכז הידע", href: "/" },
  { label: "אנשי מקצוע", href: "/therapist" },
  { label: "כלי אבחון וסקרינינג" },
];

const HERO_CONFIG: ListingHeroConfig = {
  badge: "ספריית כלים",
  title: "כלי אבחון וסקרינינג",
  subtitle: "שאלונים מתוקפים לזיהוי שימוש בעייתי, הערכת חומרה, ומעקב התקדמות. כל הכלים זמינים להורדה ולשימוש מיידי.",
  stats: [
    { value: String(TOOLS_DATA.length), label: "כלים זמינים" },
    { value: String(TOOLS_DATA.filter((t) => t.validated).length), label: "מתוקפים" },
  ],
};

const CTA_CONFIG: ListingCTAConfig = {
  title: "מחפשים משהו אחר?",
  subtitle: "חזרו ללובי אנשי המקצוע או חפשו תוכן נוסף במרכז הידע",
  primaryButton: { label: "למאמרים ומחקרים ←", href: "/therapist/articles" },
  secondaryButton: { label: "← חזרה ללובי", href: "/therapist" },
};

// =============================================================================
// HELPER: Convert Tool to ListingCard
// =============================================================================

function toolToCard(tool: Tool): ListingCard {
  const formatColor =
    tool.format === "אונליין"
      ? "border-green-400 bg-green-50 text-green-700"
      : tool.format === "להורדה"
      ? "border-blue-400 bg-blue-50 text-blue-700"
      : "border-purple-400 bg-purple-50 text-purple-700";

  return {
    id: tool.id,
    title: tool.name,
    titleEn: tool.nameEn,
    description: tool.description,
    badges: [
      { label: tool.format, color: formatColor },
      { label: tool.category, color: "border-gray-400 bg-gray-100" },
      ...(tool.targetSubstance ? [{ label: tool.targetSubstance, color: "border-gray-300" }] : []),
    ],
    meta: [
      { icon: "⏱", label: tool.duration },
      { icon: "📋", label: `${tool.questions} שאלות` },
      ...(tool.validated ? [{ icon: "✓", label: "מתוקף" }] : []),
    ],
    href: `/therapist/tools/${tool.slug}`,
  };
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function TherapistToolsIndex() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  // Filter tools
  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesSearch =
      searchQuery === "" ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.includes(searchQuery);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("הכל") ||
      selectedCategories.includes(tool.category);

    return matchesSearch && matchesCategory;
  });

  // Convert to cards
  const cards = filteredTools.map(toolToCard);

  // Search config
  const searchConfig: ListingSearchConfig = {
    placeholder: "חיפוש לפי שם כלי, חומר או תיאור...",
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
        count: cat === "הכל" ? TOOLS_DATA.length : TOOLS_DATA.filter((t) => t.category === cat).length,
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
      theme="therapist"
      breadcrumb={BREADCRUMB}
      hero={HERO_CONFIG}
      search={searchConfig}
      filterType="chips"
      filters={filterGroups}
      resultsCount={cards.length}
      totalCount={TOOLS_DATA.length}
      columns={3}
      cards={cards}
      emptyMessage="נסו לשנות את מילות החיפוש או לבחור קטגוריה אחרת"
      emptyIcon="🔍"
      onClearFilters={handleClearFilters}
      cta={CTA_CONFIG}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="therapist"
    />
  );
}
