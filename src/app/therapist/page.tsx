"use client";

/**
 * Therapist Lobby - Using Master_Landing
 * Route: /therapist
 * לובי מטפל/ת - Therapist Knowledge Center Lobby
 */

import { useRouter } from "next/navigation";
import MasterLanding, {
  type ContentZone,
  type HeroConfig,
  type SearchConfig,
  type CTAConfig,
  type AudienceTab,
} from "@/components/masters/Master_Landing_v1.0";

// =============================================================================
// CONTENT DATA (Extracted from original)
// =============================================================================

const AUDIENCE_TABS: AudienceTab[] = [
  { id: "user", label: "מתמודד/ת", route: "/user" },
  { id: "family", label: "הורים ובני משפחה", route: "/family" },
  { id: "education", label: "אנשי חינוך", route: "/education" },
  { id: "therapist", label: "אנשי מקצוע", route: "/therapist" },
];

const HERO_CONFIG: HeroConfig = {
  badge: "מרכז ידע",
  title: "מרכז הידע למטפל/ת",
  subtitle: "ידע מקצועי, כלים שימושיים — בשבילך מהיר ומדויק לפעולה.",
  stats: [
    { value: "500+", label: "קורסים" },
    { value: "1,200+", label: "הרצאות" },
    { value: "50,000+", label: "משתמשים" },
  ],
};

const CONTENT_ZONES: ContentZone[] = [
  // Quick Guide Cards
  {
    id: "quick-guide",
    type: "cards-grid",
    title: "מדריך מהיר לכיוון הנכון",
    subtitle: "בחרו קטגוריה להתחלה",
    columns: 4,
    background: "white",
    cards: [
      {
        id: "cbt",
        icon: "🧠",
        title: "טיפול קוגניטיבי",
        description: "CBT ושיטות מבוססות ראיות",
      },
      {
        id: "emotional",
        icon: "💬",
        title: "טיפול רגשי",
        description: "גישות דינמיות ויחסיות",
      },
      {
        id: "trauma",
        icon: "🌟",
        title: "טראומה",
        description: "EMDR וטיפול בטראומה",
      },
      {
        id: "family-therapy",
        icon: "👨‍👩‍👧",
        title: "משפחה וזוגיות",
        description: "עבודה עם מערכות יחסים",
      },
    ],
    showViewAll: true,
  },
  // Courses
  {
    id: "courses",
    type: "cards-grid",
    title: "קורסים נבחרים",
    subtitle: "הקורסים הפופולריים ביותר השבוע",
    columns: 4,
    background: "gray",
    cards: [
      {
        id: "course-1",
        image: true,
        badge: "טיפול קוגניטיבי",
        title: "יסודות CBT למתחילים",
        description: "ד״ר מיכל כהן",
        meta: "12 שיעורים | ⭐ 4.9",
      },
      {
        id: "course-2",
        image: true,
        badge: "טראומה",
        title: "Evidence-Based Treatment",
        description: "פרופ׳ דוד לוי",
        meta: "18 שיעורים | ⭐ 4.8",
      },
      {
        id: "course-3",
        image: true,
        badge: "זוגיות",
        title: "טיפול זוגי אינטגרטיבי",
        description: "ד״ר רחל שמיר",
        meta: "15 שיעורים | ⭐ 4.7",
      },
      {
        id: "course-4",
        image: true,
        badge: "מיינדפולנס",
        title: "MBCT - מיינדפולנס קוגניטיבי",
        description: "ד״ר יעל ברק",
        meta: "10 שיעורים | ⭐ 4.9",
      },
    ],
  },
  // Events
  {
    id: "events",
    type: "cards-grid",
    title: "אירועים קרובים",
    subtitle: "הרצאות ווובינרים בקרוב",
    columns: 3,
    background: "white",
    cards: [
      {
        id: "event-1",
        title: "כנס שנתי לפסיכולוגים קליניים",
        description: "הכנס השנתי הגדול ביותר בישראל - עדכונים וחידושים בתחום",
        meta: "📅 15 בפברואר 2026 | פרופ׳ אברהם שלום",
      },
      {
        id: "event-2",
        title: "הרצאה: חדשנות בטיפול בחרדה",
        description: "גישות חדשות ומחקרים עדכניים בטיפול בהפרעות חרדה",
        meta: "📅 22 בפברואר 2026 | ד״ר נועה פרידמן",
      },
      {
        id: "event-3",
        title: "וובינר: עבודה עם ילדים ונוער",
        description: "כלים מעשיים לעבודה טיפולית עם אוכלוסיית הצעירים",
        meta: "📅 1 במרץ 2026 | ד״ר תמר גולן",
      },
    ],
  },
  // Professional Topics
  {
    id: "topics",
    type: "cards-grid",
    title: "תחומים מקצועיים",
    subtitle: "בחר תחום התמחות",
    columns: 3,
    background: "gray",
    cards: [
      {
        id: "topic-1",
        icon: "🧠",
        title: "פסיכולוגיה קלינית",
        meta: "64 קורסים | 128 הרצאות",
      },
      {
        id: "topic-2",
        icon: "💼",
        title: "עבודה סוציאלית",
        meta: "42 קורסים | 86 הרצאות",
      },
      {
        id: "topic-3",
        icon: "🎨",
        title: "טיפול באומנויות",
        meta: "28 קורסים | 54 הרצאות",
      },
    ],
  },
  // Tools Quick Access
  {
    id: "tools",
    type: "cards-grid",
    title: "כלי אבחון וסקרינינג",
    subtitle: "כלים מקצועיים לעבודה קלינית",
    columns: 3,
    background: "white",
    cards: [
      {
        id: "tool-audit",
        icon: "📋",
        title: "AUDIT",
        description: "הערכת שימוש באלכוהול",
        meta: "10 שאלות | 3-5 דקות",
      },
      {
        id: "tool-assist",
        icon: "📋",
        title: "ASSIST",
        description: "סקרינינג חומרים מרובים",
        meta: "8 שאלות | 5-10 דקות",
      },
      {
        id: "tool-crafft",
        icon: "📋",
        title: "CRAFFT",
        description: "סקרינינג לבני נוער",
        meta: "6 שאלות | 3-5 דקות",
      },
    ],
    showViewAll: true,
    viewAllLink: "/therapist/tools",
  },
];

const CTA_CONFIG: CTAConfig = {
  title: "מה אפשר לעשות מכאן",
  subtitle: "הצטרפו לקהילת המטפלים - התחילו ללמוד היום",
  primaryButton: { label: "התחל עכשיו", onClick: () => {} },
  secondaryButton: { label: "למד עוד", onClick: () => {} },
  background: "dark",
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function TherapistLobbyPage() {
  const router = useRouter();

  const searchConfig: SearchConfig = {
    placeholder: "חפש נושא מקצועי, כלי, שיטה או שאלה...",
    dropdownOptions: ["כל התכנים", "קורסים", "הרצאות", "מאמרים"],
    onSearch: (query) => {
      router.push(`/knowledge/search?q=${encodeURIComponent(query)}`);
    },
    showAdvancedLink: true,
  };

  // Add click handlers to zones
  const zonesWithHandlers = CONTENT_ZONES.map((zone) => ({
    ...zone,
    cards: zone.cards.map((card) => ({
      ...card,
      onClick: () => {
        if (zone.id === "tools") {
          router.push(`/therapist/tools/${card.id.replace("tool-", "")}`);
        } else if (zone.id === "courses") {
          router.push(`/knowledge/content/${card.id}`);
        } else {
          router.push(`/knowledge/search?q=${encodeURIComponent(card.title)}`);
        }
      },
    })),
  }));

  const ctaWithHandlers: CTAConfig = {
    ...CTA_CONFIG,
    primaryButton: {
      label: "כלי אבחון וסקרינינג",
      onClick: () => router.push("/therapist/tools"),
    },
    secondaryButton: {
      label: "מאמרים ומחקרים",
      onClick: () => router.push("/therapist/articles"),
    },
  };

  return (
    <MasterLanding
      layout="lobby"
      theme="therapist"
      hero={HERO_CONFIG}
      search={searchConfig}
      zones={zonesWithHandlers}
      cta={ctaWithHandlers}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="therapist"
    />
  );
}
