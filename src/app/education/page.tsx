"use client";

/**
 * Education Lobby - Using Master_Landing
 * Route: /education
 * לובי אנשי חינוך - Educators Knowledge Center Lobby
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
  badge: "מרכז לאנשי חינוך",
  title: "מרכז הידע לאנשי חינוך",
  subtitle: "כלים, פרוטוקולים ומידע — לזיהוי מוקדם ומניעה בבית הספר.",
  stats: [
    { value: "50+", label: "פרוטוקולים" },
    { value: "30+", label: "הדרכות" },
    { value: "100+", label: "מאמרים" },
  ],
};

const CONTENT_ZONES: ContentZone[] = [
  // Quick Actions
  {
    id: "quick-actions",
    type: "cards-grid",
    title: "התחלה מהירה",
    subtitle: "הכלים החשובים ביותר לעבודה היומיומית",
    columns: 3,
    background: "white",
    cards: [
      {
        id: "early-signs",
        icon: "🔍",
        title: "זיהוי סימנים מוקדמים",
        description: "רשימת סימני אזהרה לזיהוי תלמידים בסיכון",
        badge: "שאלון",
      },
      {
        id: "protocols",
        icon: "📋",
        title: "פרוטוקולי התערבות",
        description: "מה לעשות כשמזהים בעיה",
      },
      {
        id: "talk-guide",
        icon: "💬",
        title: "איך לדבר עם תלמיד/ה",
        description: "מדריך לשיחה ראשונית",
      },
    ],
  },
  // Professional Knowledge
  {
    id: "knowledge",
    type: "cards-grid",
    title: "ידע מקצועי",
    subtitle: "להבין את התופעה",
    columns: 4,
    background: "gray",
    cards: [
      {
        id: "addiction-101",
        icon: "📚",
        title: "התמכרות — מבוא",
        description: "מה צריך לדעת",
      },
      {
        id: "adolescent",
        icon: "🧒",
        title: "התמכרות בגיל ההתבגרות",
        description: "מאפיינים ייחודיים",
      },
      {
        id: "substances",
        icon: "💊",
        title: "חומרים נפוצים",
        description: "מידע על סמים ואלכוהול",
      },
      {
        id: "digital",
        icon: "📱",
        title: "התמכרויות דיגיטליות",
        description: "מסכים, משחקים והימורים",
      },
    ],
  },
  // Prevention Programs
  {
    id: "prevention",
    type: "cards-grid",
    title: "תוכניות מניעה",
    subtitle: "פעילויות וסדנאות לכיתה",
    columns: 3,
    background: "white",
    cards: [
      {
        id: "class-activity",
        icon: "🎓",
        title: "פעילויות לכיתה",
        description: "תוכניות מוכנות להפעלה",
        meta: "גילאי 12-18",
      },
      {
        id: "workshop",
        icon: "🎯",
        title: "סדנאות מניעה",
        description: "ערכות להעברת סדנאות",
        meta: "2-4 שעות",
      },
      {
        id: "parents-evening",
        icon: "👨‍👩‍👧",
        title: "ערב הורים",
        description: "מצגת ומדריך להורים",
        meta: "90 דקות",
      },
    ],
    showViewAll: true,
    viewAllLink: "/education/protocols",
  },
  // Resources
  {
    id: "resources",
    type: "cards-grid",
    title: "משאבים נוספים",
    subtitle: "חומרים להורדה ושימוש",
    columns: 2,
    background: "gray",
    cards: [
      {
        id: "posters",
        icon: "🖼",
        title: "פוסטרים ועזרי הסברה",
        description: "חומרים להדפסה ותלייה בבית הספר — כרזות, עלונים ומדבקות.",
        meta: "להורדה חינם →",
      },
      {
        id: "training",
        icon: "📺",
        title: "הדרכות צוות",
        description: "סרטונים ומצגות להדרכת צוות חינוכי — ניתן להעביר באופן עצמאי.",
        meta: "צפה בהדרכות →",
      },
    ],
  },
];

const CTA_CONFIG: CTAConfig = {
  title: "צריכים הדרכה לצוות?",
  subtitle: "ICA מציע הדרכות מותאמות לבתי ספר — פרונטלי או אונליין",
  primaryButton: { label: "צרו קשר להזמנת הדרכה", onClick: () => {} },
  secondaryButton: { label: "פרוטוקולים ומדריכים", onClick: () => {} },
  background: "dark",
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function EducationLobbyPage() {
  const router = useRouter();

  const searchConfig: SearchConfig = {
    placeholder: "חפשו פרוטוקולים, מדריכים או מידע...",
    dropdownOptions: ["הכל", "פרוטוקולים", "מדריכים", "סרטונים"],
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
        if (card.id === "early-signs") {
          router.push("/education/early-signs");
        } else if (card.id === "protocols" || zone.id === "prevention") {
          router.push("/education/protocols");
        } else {
          router.push(`/knowledge/search?q=${encodeURIComponent(card.title)}`);
        }
      },
    })),
  }));

  const ctaWithHandlers: CTAConfig = {
    ...CTA_CONFIG,
    primaryButton: {
      label: "צרו קשר להזמנת הדרכה",
      onClick: () => window.open("https://ica.org.il/contact", "_blank"),
    },
    secondaryButton: {
      label: "פרוטוקולים ומדריכים",
      onClick: () => router.push("/education/protocols"),
    },
  };

  return (
    <MasterLanding
      layout="lobby"
      theme="education"
      hero={HERO_CONFIG}
      search={searchConfig}
      zones={zonesWithHandlers}
      cta={ctaWithHandlers}
      audienceTabs={AUDIENCE_TABS}
      activeAudience="education"
      showSOS={false}
    />
  );
}
