"use client";

/**
 * User Lobby - Using Master_Landing
 * Route: /user
 * לובי מתמודד/ת - Patient/User Knowledge Center Lobby
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
  badge: "מרכז תמיכה",
  title: "ברוכים הבאים למרכז הידע",
  subtitle: "מידע מהימן, כלים לעזרה עצמית, ומשאבים להתמודדות — הכל במקום אחד.",
  stats: [
    { value: "100+", label: "מדריכים" },
    { value: "50+", label: "כלי עזרה" },
    { value: "24/7", label: "זמינות" },
  ],
};

const CONTENT_ZONES: ContentZone[] = [
  // Quick Actions
  {
    id: "quick-actions",
    type: "cards-grid",
    title: "התחלה מהירה",
    subtitle: "בחר/י את הצעד הראשון שלך",
    columns: 3,
    background: "white",
    cards: [
      {
        id: "assessment",
        icon: "📝",
        title: "הערכה עצמית",
        description: "שאלון קצר לבדיקת המצב שלך",
        badge: "3 דקות",
      },
      {
        id: "info",
        icon: "📚",
        title: "למד/י על התמכרות",
        description: "מידע מקצועי בשפה פשוטה",
      },
      {
        id: "help",
        icon: "🆘",
        title: "צריך/ה עזרה עכשיו?",
        description: "קווי סיוע וחירום",
        badge: "24/7",
      },
    ],
  },
  // Understanding Section
  {
    id: "understanding",
    type: "cards-grid",
    title: "להבין את מה שעובר עליך",
    subtitle: "מידע מקצועי ואמין",
    columns: 4,
    background: "gray",
    cards: [
      {
        id: "what-is",
        icon: "❓",
        title: "מה זה התמכרות?",
        description: "הסברים פשוטים ומדויקים",
      },
      {
        id: "signs",
        icon: "🔍",
        title: "סימנים ותסמינים",
        description: "איך לזהות את המצב",
      },
      {
        id: "types",
        icon: "📋",
        title: "סוגי התמכרויות",
        description: "חומרים, התנהגויות ועוד",
      },
      {
        id: "recovery",
        icon: "🌱",
        title: "תהליך ההחלמה",
        description: "מה מחכה לך בדרך",
      },
    ],
  },
  // Self-Help Tools
  {
    id: "self-help",
    type: "cards-grid",
    title: "כלים לעזרה עצמית",
    subtitle: "תרגילים וטכניקות שתוכל/י לעשות לבד",
    columns: 3,
    background: "white",
    cards: [
      {
        id: "coping",
        icon: "🧘",
        title: "טכניקות הרגעה",
        description: "לרגעים קשים ולחץ",
        meta: "5 תרגילים",
      },
      {
        id: "triggers",
        icon: "⚡",
        title: "זיהוי טריגרים",
        description: "מה מפעיל אותך?",
        meta: "מדריך אינטראקטיבי",
      },
      {
        id: "journal",
        icon: "📓",
        title: "יומן מעקב",
        description: "לעקוב אחרי ההתקדמות",
        meta: "כלי דיגיטלי",
      },
    ],
    showViewAll: true,
    viewAllLink: "/user/resources",
  },
  // Stories & Hope
  {
    id: "hope",
    type: "cards-grid",
    title: "אתה לא לבד",
    subtitle: "סיפורי החלמה והשראה",
    columns: 2,
    background: "gray",
    cards: [
      {
        id: "story-1",
        image: true,
        title: "הסיפור שלי: משה, 34",
        description: "אחרי 5 שנים של התמודדות, היום אני 3 שנים נקי ומסייע לאחרים.",
        meta: "קרא עוד →",
      },
      {
        id: "story-2",
        image: true,
        title: "הסיפור שלי: דנה, 28",
        description: "לא האמנתי שאצא מזה, אבל עם תמיכה נכונה הכל אפשרי.",
        meta: "קרא עוד →",
      },
    ],
  },
];

const CTA_CONFIG: CTAConfig = {
  title: "מוכן/ה לצעד הראשון?",
  subtitle: "הערכה עצמית לוקחת 3 דקות ותעזור לך להבין את המצב שלך טוב יותר",
  primaryButton: { label: "לשאלון הערכה →", onClick: () => {} },
  secondaryButton: { label: "דבר/י עם מישהו", onClick: () => {} },
  background: "dark",
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function UserLobbyPage() {
  const router = useRouter();

  const searchConfig: SearchConfig = {
    placeholder: "חפש/י מידע, כלי עזרה או תשובה לשאלה...",
    dropdownOptions: ["הכל", "מאמרים", "כלים", "סרטונים"],
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
        if (card.id === "assessment") {
          router.push("/user/assessment");
        } else if (card.id === "help") {
          // Scroll to SOS or show modal
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (zone.id === "self-help") {
          router.push("/user/resources");
        } else {
          router.push(`/knowledge/search?q=${encodeURIComponent(card.title)}`);
        }
      },
    })),
  }));

  const ctaWithHandlers: CTAConfig = {
    ...CTA_CONFIG,
    primaryButton: {
      label: "לשאלון הערכה →",
      onClick: () => router.push("/user/assessment"),
    },
    secondaryButton: {
      label: "משאבים ועזרה",
      onClick: () => router.push("/user/resources"),
    },
  };

  return (
    <MasterLanding
      layout="lobby"
      theme="user"
      hero={HERO_CONFIG}
      search={searchConfig}
      zones={zonesWithHandlers}
      cta={ctaWithHandlers}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="user"
      showSOS={true}
    />
  );
}
