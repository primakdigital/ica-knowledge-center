/**
 * Master_Landing_v1.0
 *
 * Flexible landing page template supporting three layouts:
 * - "lobby": Full persona landing with multiple content zones (Therapist, User, Family, Education lobbies)
 * - "intro": Compact wizard introduction with explanation and CTA (Assessment intro)
 * - "results": Summary layout with results display and action cards (Assessment results)
 *
 * @version 1.0
 * @extracted_from /therapist/page.tsx
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/** Layout modes for the landing page */
export type LandingLayout = "lobby" | "intro" | "results";

/** Persona color themes */
export type PersonaTheme = "therapist" | "user" | "family" | "education";

/** Hero configuration */
export interface HeroConfig {
  badge?: string;
  title: string;
  subtitle?: string;
  stats?: { value: string; label: string }[];
  /** For results layout: summary text */
  resultSummary?: string;
  /** For results layout: risk level badge */
  resultLevel?: { label: string; color: string };
}

/** Search configuration */
export interface SearchConfig {
  placeholder: string;
  dropdownOptions?: string[];
  onSearch: (query: string) => void;
  showAdvancedLink?: boolean;
}

/** Content zone types */
export type ZoneType = "cards-grid" | "cards-row" | "featured" | "info-cards" | "action-cards" | "cta-block";

/** Card item in a zone */
export interface ZoneCard {
  id: string;
  icon?: string;
  title: string;
  description?: string;
  meta?: string;
  badge?: string;
  image?: boolean;
  onClick?: () => void;
}

/** Content zone configuration */
export interface ContentZone {
  id: string;
  type: ZoneType;
  title?: string;
  subtitle?: string;
  cards: ZoneCard[];
  columns?: 2 | 3 | 4;
  background?: "white" | "gray" | "dark";
  showViewAll?: boolean;
  viewAllLink?: string;
}

/** CTA block configuration */
export interface CTAConfig {
  title: string;
  subtitle?: string;
  primaryButton: { label: string; onClick: () => void };
  secondaryButton?: { label: string; onClick: () => void };
  background?: "dark" | "light";
}

/** Audience tab configuration */
export interface AudienceTab {
  id: string;
  label: string;
  route: string;
  active?: boolean;
}

/** Main component props */
export interface MasterLandingProps {
  /** Layout mode */
  layout: LandingLayout;
  /** Persona theme for colors */
  theme?: PersonaTheme;
  /** Hero section configuration */
  hero: HeroConfig;
  /** Search bar (optional, typically for lobby) */
  search?: SearchConfig;
  /** Content zones */
  zones?: ContentZone[];
  /** CTA block at bottom */
  cta?: CTAConfig;
  /** Audience tabs */
  audienceTabs?: AudienceTab[];
  /** Active audience tab ID */
  activeAudience?: string;
  /** Show SOS button (for user-facing pages) */
  showSOS?: boolean;
  /** Custom footer content */
  footerLinks?: { label: string; href: string }[];
}

// =============================================================================
// THEME COLORS
// =============================================================================

const themeColors: Record<PersonaTheme, { primary: string; accent: string; hero: string }> = {
  therapist: {
    primary: "gray-800",
    accent: "gray-600",
    hero: "bg-gray-50",
  },
  user: {
    primary: "blue-600",
    accent: "blue-500",
    hero: "bg-blue-50",
  },
  family: {
    primary: "green-600",
    accent: "green-500",
    hero: "bg-green-50",
  },
  education: {
    primary: "purple-600",
    accent: "purple-500",
    hero: "bg-purple-50",
  },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Header component */
function Header({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <header className="border-b-2 border-gray-300 bg-gray-100 p-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <button
          onClick={onLogoClick}
          className="border-2 border-gray-400 px-4 py-2 font-mono text-sm hover:bg-gray-200"
        >
          [LOGO] ICA מרכז ידע
        </button>
        <nav className="flex gap-6 font-mono text-sm text-gray-600">
          <span className="cursor-pointer hover:text-gray-900">אודות</span>
          <span className="cursor-pointer hover:text-gray-900">מרכז מידע</span>
          <span className="cursor-pointer hover:text-gray-900">קמפוס הכשרות</span>
          <span className="cursor-pointer hover:text-gray-900">אפשרויות טיפול</span>
          <span className="cursor-pointer hover:text-gray-900">צור קשר</span>
        </nav>
      </div>
    </header>
  );
}

/** Audience tabs component */
function AudienceTabs({
  tabs,
  activeId,
  onTabClick,
}: {
  tabs: AudienceTab[];
  activeId?: string;
  onTabClick: (route: string) => void;
}) {
  return (
    <div className="border-b-2 border-gray-300 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.route)}
              className={`border-b-4 px-6 py-3 font-mono text-sm transition-colors ${
                tab.id === activeId
                  ? "border-gray-800 bg-gray-100 font-bold text-gray-900"
                  : "border-transparent text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Hero section component */
function HeroSection({
  config,
  layout,
  heroClass,
}: {
  config: HeroConfig;
  layout: LandingLayout;
  heroClass: string;
}) {
  return (
    <section className={`border-b-2 border-gray-300 ${heroClass} py-12`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className={layout === "lobby" ? "text-center" : "max-w-3xl"}>
          {/* Badge */}
          {config.badge && (
            <div className="mb-4 inline-block border-2 border-gray-600 bg-white px-4 py-1 font-mono text-sm font-bold">
              {config.badge}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 font-mono text-4xl font-bold text-gray-900">
            {config.title}
          </h1>

          {/* Subtitle */}
          {config.subtitle && (
            <p className="mb-8 font-mono text-lg text-gray-600 leading-relaxed">
              {config.subtitle}
            </p>
          )}

          {/* Results summary (for results layout) */}
          {layout === "results" && config.resultSummary && (
            <div className="mb-6 border-2 border-gray-400 bg-white p-6">
              <p className="font-mono text-base text-gray-700 leading-relaxed">
                {config.resultSummary}
              </p>
              {config.resultLevel && (
                <div className={`mt-4 inline-block border-2 px-4 py-2 font-mono text-sm font-bold ${config.resultLevel.color}`}>
                  {config.resultLevel.label}
                </div>
              )}
            </div>
          )}

          {/* Stats (for lobby layout) */}
          {config.stats && config.stats.length > 0 && (
            <div className="flex justify-center gap-12">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="font-mono text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="font-mono text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Search section component */
function SearchSection({ config }: { config: SearchConfig }) {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    config.onSearch(query);
  };

  return (
    <section className="border-b-2 border-gray-300 py-8">
      <div className="mx-auto max-w-4xl px-6">
        <form onSubmit={handleSubmit}>
          <div className="flex border-2 border-gray-400 bg-white">
            {config.dropdownOptions && (
              <div className="border-e-2 border-gray-400 bg-gray-100 px-4 py-3">
                <select className="bg-transparent font-mono text-sm outline-none">
                  {config.dropdownOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={config.placeholder}
              className="flex-1 p-4 font-mono text-base outline-none"
            />
            <button
              type="submit"
              className="border-s-2 border-gray-400 bg-gray-800 px-8 font-mono font-bold text-white hover:bg-gray-700"
            >
              חיפוש
            </button>
          </div>
        </form>
        {config.showAdvancedLink && (
          <div className="mt-3 text-center">
            <button className="font-mono text-sm text-gray-600 hover:text-gray-900">
              חיפוש מתקדם →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Content zone renderer */
function ContentZoneRenderer({ zone }: { zone: ContentZone }) {
  const bgClass =
    zone.background === "dark"
      ? "bg-gray-800 text-white"
      : zone.background === "gray"
      ? "bg-gray-50"
      : "bg-white";

  const gridCols =
    zone.columns === 2
      ? "md:grid-cols-2"
      : zone.columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-3";

  return (
    <section className={`border-b-2 border-gray-300 ${bgClass} py-10`}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Zone header */}
        {(zone.title || zone.subtitle) && (
          <div className={`mb-6 ${zone.type === "cards-grid" ? "" : "text-center"}`}>
            {zone.title && (
              <h2 className="mb-1 font-mono text-2xl font-bold">
                {zone.title}
              </h2>
            )}
            {zone.subtitle && (
              <p className="font-mono text-sm text-gray-600">{zone.subtitle}</p>
            )}
          </div>
        )}

        {/* Cards grid */}
        {(zone.type === "cards-grid" || zone.type === "cards-row") && (
          <div className={`grid grid-cols-1 gap-4 ${gridCols}`}>
            {zone.cards.map((card) => (
              <button
                key={card.id}
                onClick={card.onClick}
                className="border-2 border-gray-400 bg-white p-6 text-start transition-all hover:border-gray-600 hover:shadow-md"
              >
                {card.image && (
                  <div className="mb-3 flex h-32 items-center justify-center border-2 border-gray-300 bg-gray-100 font-mono text-xs text-gray-500">
                    [תמונה]
                  </div>
                )}
                {card.icon && <div className="mb-3 text-4xl">{card.icon}</div>}
                {card.badge && (
                  <span className="mb-2 inline-block border border-gray-400 px-2 py-0.5 font-mono text-xs">
                    {card.badge}
                  </span>
                )}
                <h3 className="mb-2 font-mono text-base font-bold text-gray-900">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="font-mono text-xs text-gray-600">{card.description}</p>
                )}
                {card.meta && (
                  <p className="mt-2 font-mono text-xs text-gray-500">{card.meta}</p>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Info cards (for intro layout) */}
        {zone.type === "info-cards" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {zone.cards.map((card) => (
              <div
                key={card.id}
                className="border-2 border-gray-400 bg-white p-6"
              >
                {card.icon && <div className="mb-3 text-3xl">{card.icon}</div>}
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="font-mono text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action cards (for results layout) */}
        {zone.type === "action-cards" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {zone.cards.map((card) => (
              <button
                key={card.id}
                onClick={card.onClick}
                className="border-2 border-gray-400 bg-white p-6 text-start transition-all hover:border-gray-600 hover:shadow-md"
              >
                {card.icon && <div className="mb-3 text-3xl">{card.icon}</div>}
                <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">
                  {card.title}
                </h3>
                {card.description && (
                  <p className="mb-4 font-mono text-sm text-gray-600">
                    {card.description}
                  </p>
                )}
                <span className="font-mono text-sm font-bold text-gray-900">
                  {card.meta || "להמשיך ←"}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* View all link */}
        {zone.showViewAll && (
          <div className="mt-6 text-center">
            <button className="font-mono text-sm text-gray-600 underline hover:text-gray-900">
              צפה בכל התכנים ←
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** CTA block component */
function CTABlock({ config }: { config: CTAConfig }) {
  const bgClass = config.background === "dark" ? "bg-gray-800 text-white" : "bg-gray-50";

  return (
    <section className={`border-b-2 border-gray-300 ${bgClass} py-12`}>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-2 font-mono text-2xl font-bold">{config.title}</h2>
        {config.subtitle && (
          <p className={`mb-8 font-mono text-base ${config.background === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {config.subtitle}
          </p>
        )}
        <div className="flex justify-center gap-4">
          <button
            onClick={config.primaryButton.onClick}
            className={`border-2 px-8 py-3 font-mono text-sm font-bold ${
              config.background === "dark"
                ? "border-white bg-white text-gray-900 hover:bg-gray-100"
                : "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {config.primaryButton.label}
          </button>
          {config.secondaryButton && (
            <button
              onClick={config.secondaryButton.onClick}
              className={`border-2 px-8 py-3 font-mono text-sm ${
                config.background === "dark"
                  ? "border-white bg-transparent text-white hover:bg-white hover:text-gray-900"
                  : "border-gray-400 bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {config.secondaryButton.label}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/** Footer component */
function Footer({ links }: { links?: { label: string; href: string }[] }) {
  const defaultLinks = [
    { label: "תנאי שימוש", href: "#" },
    { label: "מדיניות פרטיות", href: "#" },
    { label: "צור קשר", href: "#" },
    { label: "עזרה", href: "#" },
  ];

  const footerLinks = links || defaultLinks;

  return (
    <footer className="border-t-2 border-gray-300 bg-gray-100 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6 font-mono text-sm text-gray-600">
            {footerLinks.map((link) => (
              <button key={link.label} className="hover:text-gray-900">
                {link.label}
              </button>
            ))}
          </div>
          <p className="font-mono text-xs text-gray-500">
            © ICA — המרכז הישראלי להתמכרויות | info@ica.org.il
          </p>
        </div>
      </div>
    </footer>
  );
}

/** SOS floating button */
function SOSButton() {
  return (
    <button
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-600 bg-red-600 text-white shadow-lg hover:bg-red-700"
      aria-label="עזרה דחופה"
    >
      <span className="font-mono text-xs font-bold">SOS</span>
    </button>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function MasterLanding({
  layout,
  theme = "therapist",
  hero,
  search,
  zones = [],
  cta,
  audienceTabs,
  activeAudience,
  showSOS = false,
  footerLinks,
}: MasterLandingProps) {
  const router = useRouter();
  const colors = themeColors[theme];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Header */}
      <Header onLogoClick={() => router.push("/")} />

      {/* Audience Tabs */}
      {audienceTabs && audienceTabs.length > 0 && (
        <AudienceTabs
          tabs={audienceTabs}
          activeId={activeAudience}
          onTabClick={(route) => router.push(route)}
        />
      )}

      {/* Hero Section */}
      <HeroSection config={hero} layout={layout} heroClass={colors.hero} />

      {/* Search Section (typically for lobby) */}
      {search && <SearchSection config={search} />}

      {/* Content Zones */}
      {zones.map((zone) => (
        <ContentZoneRenderer key={zone.id} zone={zone} />
      ))}

      {/* CTA Block */}
      {cta && <CTABlock config={cta} />}

      {/* Footer */}
      <Footer links={footerLinks} />

      {/* SOS Button */}
      {showSOS && <SOSButton />}
    </div>
  );
}

// =============================================================================
// EXPORTS - Types are already exported at their definitions above
// =============================================================================
