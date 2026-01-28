/**
 * Master_Listing_v1.0
 *
 * Flexible listing page template supporting multiple views and filter patterns:
 * - Grid view: Cards in 2-4 column grid (Tools Index, Articles Index, Protocols)
 * - List view: Vertical list with more detail (Search Results)
 * - With sidebar: Faceted filters on side (Search Results)
 * - Inline filters: Filter chips above content (Index pages)
 *
 * @version 1.0
 * @extracted_from /therapist/tools/page.tsx, /therapist/search/page.tsx
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/** View mode for listing */
export type ListingView = "grid" | "list";

/** Filter type */
export type FilterType = "chips" | "sidebar" | "dropdown";

/** Persona theme */
export type PersonaTheme = "therapist" | "user" | "family" | "education";

/** Breadcrumb item */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Hero configuration (optional, smaller than Landing hero) */
export interface ListingHeroConfig {
  badge?: string;
  title: string;
  subtitle?: string;
  stats?: { value: string; label: string }[];
}

/** Search configuration */
export interface ListingSearchConfig {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}

/** Filter option */
export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

/** Filter group */
export interface FilterGroup {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "chips";
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

/** Card badge */
export interface CardBadge {
  label: string;
  color?: string;
}

/** Listing card item */
export interface ListingCard {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  badges?: CardBadge[];
  meta?: { icon?: string; label: string }[];
  tags?: string[];
  image?: boolean;
  icon?: string;
  href: string;
  /** For search results: content type */
  type?: string;
  typeIcon?: string;
  typeColor?: string;
}

/** Pagination configuration */
export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** CTA block configuration */
export interface ListingCTAConfig {
  title: string;
  subtitle?: string;
  primaryButton: { label: string; href: string };
  secondaryButton?: { label: string; href: string };
}

/** Audience tab */
export interface AudienceTab {
  id: string;
  label: string;
  route: string;
}

/** Main component props */
export interface MasterListingProps {
  /** View mode */
  view?: ListingView;
  /** Persona theme */
  theme?: PersonaTheme;
  /** Breadcrumb navigation */
  breadcrumb?: BreadcrumbItem[];
  /** Hero section (optional) */
  hero?: ListingHeroConfig;
  /** Search configuration */
  search?: ListingSearchConfig;
  /** Filter display type */
  filterType?: FilterType;
  /** Filter groups */
  filters?: FilterGroup[];
  /** Active filters for display */
  activeFilters?: { group: string; value: string; onRemove: () => void }[];
  /** Clear all filters callback */
  onClearFilters?: () => void;
  /** Results count */
  resultsCount?: number;
  /** Total count (before filtering) */
  totalCount?: number;
  /** Sort options */
  sortOptions?: { value: string; label: string }[];
  /** Current sort value */
  sortValue?: string;
  /** Sort change handler */
  onSortChange?: (value: string) => void;
  /** Grid columns (for grid view) */
  columns?: 2 | 3 | 4;
  /** Listing cards */
  cards: ListingCard[];
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state icon */
  emptyIcon?: string;
  /** Pagination */
  pagination?: PaginationConfig;
  /** CTA block */
  cta?: ListingCTAConfig;
  /** Audience tabs */
  audienceTabs?: AudienceTab[];
  /** Active audience */
  activeAudience?: string;
  /** Show SOS button */
  showSOS?: boolean;
}

// =============================================================================
// THEME COLORS
// =============================================================================

const themeColors: Record<PersonaTheme, { primary: string; accent: string; hero: string }> = {
  therapist: { primary: "gray-800", accent: "gray-600", hero: "bg-gray-50" },
  user: { primary: "blue-600", accent: "blue-500", hero: "bg-blue-50" },
  family: { primary: "green-600", accent: "green-500", hero: "bg-green-50" },
  education: { primary: "purple-600", accent: "purple-500", hero: "bg-purple-50" },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Header */
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

/** Audience tabs */
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

/** Breadcrumb */
function Breadcrumb({
  items,
  onNavigate,
}: {
  items: BreadcrumbItem[];
  onNavigate: (href: string) => void;
}) {
  return (
    <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center gap-2 font-mono text-sm text-gray-500">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span>›</span>}
              {item.href ? (
                <button
                  onClick={() => onNavigate(item.href!)}
                  className="hover:text-gray-900"
                >
                  {item.label}
                </button>
              ) : (
                <span className="font-medium text-gray-900">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

/** Hero section (compact) */
function HeroSection({
  config,
  heroClass,
}: {
  config: ListingHeroConfig;
  heroClass: string;
}) {
  return (
    <section className={`border-b-2 border-gray-300 ${heroClass} py-12`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          {config.badge && (
            <div className="mb-4 inline-block border-2 border-gray-600 bg-white px-3 py-1 font-mono text-xs font-bold">
              {config.badge}
            </div>
          )}
          <h1 className="mb-4 font-mono text-4xl font-bold text-gray-900">
            {config.title}
          </h1>
          {config.subtitle && (
            <p className="mb-6 font-mono text-lg text-gray-600 leading-relaxed">
              {config.subtitle}
            </p>
          )}
          {config.stats && config.stats.length > 0 && (
            <div className="flex gap-8">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="font-mono text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="font-mono text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Search and inline filters section */
function SearchAndFilters({
  search,
  filters,
  filterType,
  resultsCount,
  totalCount,
}: {
  search?: ListingSearchConfig;
  filters?: FilterGroup[];
  filterType?: FilterType;
  resultsCount?: number;
  totalCount?: number;
}) {
  if (!search && (!filters || filterType !== "chips")) return null;

  return (
    <section className="border-b-2 border-gray-300 py-6">
      <div className="mx-auto max-w-6xl px-6">
        {/* Search bar */}
        {search && (
          <div className="mb-6 flex border-2 border-gray-400 bg-white">
            <input
              type="text"
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              placeholder={search.placeholder}
              className="flex-1 p-4 font-mono text-base outline-none"
            />
            <button
              onClick={search.onSubmit}
              className="border-s-2 border-gray-400 bg-gray-100 px-8 font-mono font-bold hover:bg-gray-200"
            >
              🔍 חיפוש
            </button>
          </div>
        )}

        {/* Chip filters */}
        {filters && filterType === "chips" && (
          <div className="flex flex-wrap gap-2">
            <span className="ml-2 self-center font-mono text-sm text-gray-600">סינון:</span>
            {filters.map((group) =>
              group.options.map((opt) => (
                <button
                  key={`${group.id}-${opt.id}`}
                  onClick={() => {
                    const isSelected = group.selected.includes(opt.id);
                    const newSelected = isSelected
                      ? group.selected.filter((s) => s !== opt.id)
                      : [...group.selected, opt.id];
                    group.onChange(newSelected);
                  }}
                  className={`border-2 px-4 py-2 font-mono text-sm transition-colors ${
                    group.selected.includes(opt.id)
                      ? "border-gray-600 bg-gray-800 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                  }`}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        )}

        {/* Results count */}
        {resultsCount !== undefined && (
          <p className="mt-4 font-mono text-sm text-gray-500">
            מציג {resultsCount} {totalCount ? `מתוך ${totalCount}` : ""} פריטים
          </p>
        )}
      </div>
    </section>
  );
}

/** Sidebar filters */
function SidebarFilters({
  filters,
  activeFilters,
  onClearFilters,
}: {
  filters: FilterGroup[];
  activeFilters?: { group: string; value: string; onRemove: () => void }[];
  onClearFilters?: () => void;
}) {
  const hasActive = activeFilters && activeFilters.length > 0;

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-6 border-2 border-gray-400 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold text-gray-900">סינון תוצאות</h2>
          {hasActive && (
            <button
              onClick={onClearFilters}
              className="font-mono text-xs text-blue-600 hover:text-blue-800"
            >
              נקה הכל
            </button>
          )}
        </div>

        {/* Filter groups */}
        {filters.map((group) => (
          <div key={group.id} className="mb-6">
            <h3 className="mb-3 font-mono text-sm font-medium text-gray-700">{group.label}</h3>
            <div className="space-y-2">
              {group.options.map((opt) => (
                <label key={opt.id} className="flex cursor-pointer items-center gap-2">
                  <input
                    type={group.type === "radio" ? "radio" : "checkbox"}
                    name={group.id}
                    checked={group.selected.includes(opt.id)}
                    onChange={() => {
                      if (group.type === "radio") {
                        group.onChange([opt.id]);
                      } else {
                        const isSelected = group.selected.includes(opt.id);
                        const newSelected = isSelected
                          ? group.selected.filter((s) => s !== opt.id)
                          : [...group.selected, opt.id];
                        group.onChange(newSelected);
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-gray-600"
                  />
                  <span className="font-mono text-sm text-gray-600">{opt.label}</span>
                  {opt.count !== undefined && (
                    <span className="mr-auto font-mono text-xs text-gray-400">({opt.count})</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Active filters */}
        {hasActive && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="mb-2 font-mono text-sm font-medium text-gray-700">סינון פעיל</h3>
            <div className="flex flex-wrap gap-2">
              {activeFilters!.map((af, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700"
                >
                  {af.value}
                  <button onClick={af.onRemove} className="hover:text-gray-900">×</button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

/** Grid card */
function GridCard({ card, onNavigate }: { card: ListingCard; onNavigate: (href: string) => void }) {
  return (
    <button
      onClick={() => onNavigate(card.href)}
      className="border-2 border-gray-400 bg-white p-6 text-start transition-all hover:border-gray-600 hover:shadow-lg"
    >
      {/* Header with title and badge */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-mono text-xl font-bold text-gray-900">{card.title}</h3>
          {card.titleEn && (
            <p className="font-mono text-xs text-gray-500">{card.titleEn}</p>
          )}
        </div>
        {card.badges && card.badges[0] && (
          <span className={`shrink-0 border px-2 py-1 font-mono text-xs ${card.badges[0].color || "border-gray-400 bg-gray-100"}`}>
            {card.badges[0].label}
          </span>
        )}
      </div>

      {/* Additional badges */}
      {card.badges && card.badges.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {card.badges.slice(1).map((badge, idx) => (
            <span key={idx} className={`border px-2 py-0.5 font-mono text-xs ${badge.color || "border-gray-300"}`}>
              {badge.label}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="mb-4 font-mono text-sm text-gray-600 leading-relaxed line-clamp-3">
        {card.description}
      </p>

      {/* Meta info */}
      {card.meta && (
        <div className="flex flex-wrap gap-4 border-t border-gray-200 pt-4 font-mono text-xs text-gray-500">
          {card.meta.map((m, idx) => (
            <span key={idx}>{m.icon} {m.label}</span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-4 font-mono text-sm font-bold text-gray-900">לפרטים ←</div>
    </button>
  );
}

/** List card (for search results) */
function ListCard({ card, onNavigate }: { card: ListingCard; onNavigate: (href: string) => void }) {
  return (
    <button
      onClick={() => onNavigate(card.href)}
      className="flex w-full gap-4 border-2 border-gray-400 bg-white p-6 text-start transition-all hover:border-gray-600 hover:shadow-md"
    >
      {/* Type icon */}
      {card.typeIcon && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-gray-300 bg-gray-100 text-2xl">
          {card.typeIcon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Type and badges */}
        <div className="mb-1 flex items-center gap-2">
          {card.type && (
            <span className={`px-2 py-0.5 font-mono text-xs font-medium ${card.typeColor || "bg-gray-100 text-gray-700"}`}>
              {card.type}
            </span>
          )}
          {card.badges?.map((badge, idx) => (
            <span key={idx} className="font-mono text-xs text-gray-500">{badge.label}</span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mb-2 font-mono text-lg font-medium text-gray-900">{card.title}</h3>

        {/* Description */}
        <p className="mb-3 font-mono text-sm text-gray-600 line-clamp-2">{card.description}</p>

        {/* Meta */}
        {card.meta && (
          <div className="flex items-center gap-4 font-mono text-xs text-gray-500">
            {card.meta.map((m, idx) => (
              <span key={idx}>{m.label}</span>
            ))}
          </div>
        )}

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {card.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="bg-gray-100 px-2 py-1 font-mono text-xs text-gray-600">
                {tag}
              </span>
            ))}
            {card.tags.length > 3 && (
              <span className="font-mono text-xs text-gray-400">+{card.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

/** Empty state */
function EmptyState({
  icon,
  message,
  onClear,
}: {
  icon?: string;
  message: string;
  onClear?: () => void;
}) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border-2 border-gray-300 bg-gray-100">
        <span className="text-4xl">{icon || "🔍"}</span>
      </div>
      <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">לא נמצאו תוצאות</h3>
      <p className="mb-6 font-mono text-sm text-gray-600">{message}</p>
      {onClear && (
        <button
          onClick={onClear}
          className="border-2 border-gray-400 bg-white px-6 py-2 font-mono text-sm hover:bg-gray-100"
        >
          איפוס חיפוש
        </button>
      )}
    </div>
  );
}

/** Pagination */
function Pagination({ config }: { config: PaginationConfig }) {
  const { currentPage, totalPages, onPageChange } = config;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ← הקודם
      </button>

      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 font-mono text-sm ${
            page === currentPage
              ? "border-2 border-gray-600 bg-gray-800 text-white"
              : "border-2 border-gray-400 bg-white hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {totalPages > 5 && (
        <>
          <span className="px-2 text-gray-400">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="border-2 border-gray-400 bg-white px-4 py-2 font-mono text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        הבא →
      </button>
    </div>
  );
}

/** CTA Block */
function CTABlock({ config, onNavigate }: { config: ListingCTAConfig; onNavigate: (href: string) => void }) {
  return (
    <section className="border-t-2 border-gray-300 bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">{config.title}</h3>
            {config.subtitle && (
              <p className="font-mono text-sm text-gray-600">{config.subtitle}</p>
            )}
          </div>
          <div className="flex gap-4">
            {config.secondaryButton && (
              <button
                onClick={() => onNavigate(config.secondaryButton!.href)}
                className="border-2 border-gray-400 bg-white px-6 py-3 font-mono text-sm hover:bg-gray-100"
              >
                {config.secondaryButton.label}
              </button>
            )}
            <button
              onClick={() => onNavigate(config.primaryButton.href)}
              className="border-2 border-gray-600 bg-gray-800 px-6 py-3 font-mono text-sm font-bold text-white hover:bg-gray-700"
            >
              {config.primaryButton.label}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Footer */
function Footer() {
  return (
    <footer className="border-t-2 border-gray-300 bg-gray-100 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6 font-mono text-sm text-gray-600">
            <button className="hover:text-gray-900">מרכז הידע</button>
            <button className="hover:text-gray-900">אפשרויות טיפול</button>
            <button className="hover:text-gray-900">אודות</button>
            <button className="hover:text-gray-900">צור קשר</button>
          </div>
          <p className="font-mono text-xs text-gray-500">
            © ICA — המרכז הישראלי להתמכרויות | info@ica.org.il
          </p>
        </div>
      </div>
    </footer>
  );
}

/** SOS Button */
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

export default function MasterListing({
  view = "grid",
  theme = "therapist",
  breadcrumb,
  hero,
  search,
  filterType = "chips",
  filters,
  activeFilters,
  onClearFilters,
  resultsCount,
  totalCount,
  sortOptions,
  sortValue,
  onSortChange,
  columns = 3,
  cards,
  emptyMessage = "נסו לשנות את מילות החיפוש או לבחור קטגוריה אחרת",
  emptyIcon,
  pagination,
  cta,
  audienceTabs,
  activeAudience,
  showSOS = false,
}: MasterListingProps) {
  const router = useRouter();
  const colors = themeColors[theme];

  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3";

  const hasSidebar = filterType === "sidebar" && filters && filters.length > 0;

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

      {/* Breadcrumb */}
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb items={breadcrumb} onNavigate={(href) => router.push(href)} />
      )}

      {/* Hero */}
      {hero && <HeroSection config={hero} heroClass={colors.hero} />}

      {/* Search and inline filters */}
      {(search || (filters && filterType === "chips")) && (
        <SearchAndFilters
          search={search}
          filters={filters}
          filterType={filterType}
          resultsCount={resultsCount}
          totalCount={totalCount}
        />
      )}

      {/* Main content area */}
      <main className="py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`flex gap-8 ${hasSidebar ? "" : ""}`}>
            {/* Sidebar filters */}
            {hasSidebar && (
              <SidebarFilters
                filters={filters!}
                activeFilters={activeFilters}
                onClearFilters={onClearFilters}
              />
            )}

            {/* Content area */}
            <div className="flex-1">
              {/* Results header (for sidebar layout) */}
              {hasSidebar && (
                <div className="mb-6 flex items-center justify-between">
                  <div className="font-mono text-sm text-gray-600">
                    {resultsCount !== undefined && (
                      <span>
                        נמצאו <strong className="text-gray-900">{resultsCount}</strong> תוצאות
                      </span>
                    )}
                  </div>
                  {sortOptions && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-500">מיון:</span>
                      <select
                        value={sortValue}
                        onChange={(e) => onSortChange?.(e.target.value)}
                        className="border border-gray-300 px-3 py-2 font-mono text-sm"
                      >
                        {sortOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Cards */}
              {cards.length > 0 ? (
                view === "grid" ? (
                  <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
                    {cards.map((card) => (
                      <GridCard key={card.id} card={card} onNavigate={(href) => router.push(href)} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cards.map((card) => (
                      <ListCard key={card.id} card={card} onNavigate={(href) => router.push(href)} />
                    ))}
                  </div>
                )
              ) : (
                <EmptyState icon={emptyIcon} message={emptyMessage} onClear={onClearFilters} />
              )}

              {/* Pagination */}
              {pagination && cards.length > 0 && <Pagination config={pagination} />}
            </div>
          </div>
        </div>
      </main>

      {/* CTA */}
      {cta && <CTABlock config={cta} onNavigate={(href) => router.push(href)} />}

      {/* Footer */}
      <Footer />

      {/* SOS */}
      {showSOS && <SOSButton />}
    </div>
  );
}

// =============================================================================
// EXPORTS - Types are already exported at their definitions above
// =============================================================================
