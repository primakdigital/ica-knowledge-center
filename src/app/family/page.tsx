"use client";

/**
 * Family Lobby - Using Master_Landing
 * Route: /family
 * לובי הורים ובני משפחה - Family Members Knowledge Center Lobby
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
// CONTENT DATA
// =============================================================================

const AUDIENCE_TABS: AudienceTab[] = [
  { id: "user", label: "מתמודד/ת", route: "/user" },
  { id: "family", label: "הורים ובני משפחה", route: "/family" },
  { id: "education", label: "אנשי חינוך", route: "/education" },
  { id: "therapist", label: "אנשי מקצוע", route: "/therapist" },
];

const HERO_CONFIG: HeroConfig = {
  badge: "תמיכה למשפחות",
  title: "מרכז הידע להורים ובני משפחה",
  subtitle: "מידע, כלים ותמיכה — כי גם אתם צריכים עזרה כדי לעזור.",
  stats: [
    { value: "80+", label: "מדריכים" },
    { value: "30+", label: "סרטונים" },
    { value: "קהילה", label: "תמיכה" },
  ],
};

const CONTENT_ZONES: ContentZone[] = [
  // Quick Actions
  {
    id: "quick-actions",
    type: "cards-grid",
    title: "איפה להתחיל?",
    subtitle: "בחרו את הנושא שהכי רלוונטי עכשיו",
    columns: 3,
    background: "white",
    cards: [
      {
        id: "signs",
        icon: "🔍",
        title: "האם הילד/ה שלי בבעיה?",
        description: "רשימת סימנים לזיהוי מוקדם",
        badge: "שאלון",
      },
      {
        id: "talk",
        icon: "💬",
        title: "איך לדבר על זה?",
        description: "מדריך לשיחה פתוחה ובטוחה",
      },
      {
        id: "help-now",
        icon: "🆘",
        title: "צריכים עזרה עכשיו?",
        description: "קווי סיוע וחירום",
        badge: "24/7",
      },
    ],
  },
  // Understanding Section
  {
    id: "understanding",
    type: "cards-grid",
    title: "להבין את המצב",
    subtitle: "ידע הוא הצעד הראשון",
    columns: 4,
    background: "gray",
    cards: [
      {
        id: "what-is",
        icon: "📚",
        title: "מה זה התמכרות?",
        description: "הסברים להורים",
      },
      {
        id: "why",
        icon: "❓",
        title: "למה זה קורה?",
        description: "גורמים וסיבות",
      },
      {
        id: "brain",
        icon: "🧠",
        title: "מה קורה במוח?",
        description: "הבסיס המדעי",
      },
      {
        id: "types",
        icon: "📋",
        title: "סוגי התמכרויות",
        description: "חומרים והתנהגויות",
      },
    ],
  },
  // Practical Tools
  {
    id: "practical",
    type: "cards-grid",
    title: "כלים מעשיים להורים",
    subtitle: "מה אפשר לעשות בפועל",
    columns: 3,
    background: "white",
    cards: [
      {
        id: "boundaries",
        icon: "🛡",
        title: "הצבת גבולות",
        description: "איך לשמור על גבולות בריאים",
        meta: "מדריך",
      },
      {
        id: "communication",
        icon: "🗣",
        title: "תקשורת אפקטיבית",
        description: "טכניקות לשיחה פתוחה",
        meta: "סרטון",
      },
      {
        id: "self-care",
        icon: "❤️",
        title: "לשמור על עצמכם",
        description: "כי גם אתם צריכים תמיכה",
        meta: "מאמר",
      },
    ],
    showViewAll: true,
    viewAllLink: "/family/guides",
  },
  // Support
  {
    id: "support",
    type: "cards-grid",
    title: "תמיכה ועזרה",
    subtitle: "אתם לא לבד",
    columns: 2,
    background: "gray",
    cards: [
      {
        id: "groups",
        icon: "👥",
        title: "קבוצות תמיכה להורים",
        description: "להפגש עם הורים אחרים שעוברים את אותו הדבר. קבוצות פרונטליות ואונליין.",
        meta: "מצא קבוצה →",
      },
      {
        id: "counseling",
        icon: "💡",
        title: "ייעוץ משפחתי",
        description: "לפעמים כל המשפחה צריכה עזרה. מטפלים מומחים בהתמכרויות.",
        meta: "מצא מטפל →",
      },
    ],
  },
];

const CTA_CONFIG: CTAConfig = {
  title: "חושדים שיש בעיה?",
  subtitle: "רשימת הסימנים תעזור לכם להבין את המצב — לוקח 5 דקות",
  primaryButton: { label: "לרשימת הסימנים →", onClick: () => {} },
  secondaryButton: { label: "מדריכים להורים", onClick: () => {} },
  background: "dark",
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function FamilyLobbyPage() {
  const router = useRouter();

  const searchConfig: SearchConfig = {
    placeholder: "חפשו מידע, מדריכים או תשובות...",
    dropdownOptions: ["הכל", "מדריכים", "סרטונים", "מאמרים"],
    onSearch: (query) => {
      router.push(`/knowledge/search?q=${encodeURIComponent(query)}`);
    },
    showAdvancedLink: false,
  };

  // Add click handlers to zones
  const zonesWithHandlers = CONTENT_ZONES.map((zone) => ({
    ...zone,
    cards: zone.cards.map((card) => ({
      ...card,
      onClick: () => {
        if (card.id === "signs") {
          router.push("/family/signs");
        } else if (card.id === "help-now") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (zone.id === "practical" || zone.id === "understanding") {
          router.push("/family/guides");
        } else {
          router.push(`/knowledge/search?q=${encodeURIComponent(card.title)}`);
        }
      },
    })),
  }));

  const ctaWithHandlers: CTAConfig = {
    ...CTA_CONFIG,
    primaryButton: {
      label: "לרשימת הסימנים →",
      onClick: () => router.push("/family/signs"),
    },
    secondaryButton: {
      label: "מדריכים להורים",
      onClick: () => router.push("/family/guides"),
    },
  };

  return (
    <MasterLanding
      layout="lobby"
      theme="family"
      hero={HERO_CONFIG}
      search={searchConfig}
      zones={zonesWithHandlers}
      cta={ctaWithHandlers}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="family"
      showSOS={true}
    />
  );
}
