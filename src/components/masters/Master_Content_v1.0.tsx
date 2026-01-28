/**
 * Master_Content_v1.0
 *
 * Flexible content detail page template supporting multiple variants:
 * - "article": Prose content with author, abstract, references (Articles, Research)
 * - "tool": Tabbed interface with optional interactive questionnaire (Assessment Tools)
 * - "guide": Step-by-step numbered guide format (Communication Guide, Intervention Guide)
 * - "protocol": Structured sections with version info (Clinical Protocols)
 *
 * @version 1.0
 * @extracted_from /therapist/articles/[slug]/page.tsx, /therapist/tools/[slug]/page.tsx
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/** Content variant types */
export type ContentVariant = "article" | "tool" | "guide" | "protocol";

/** Persona theme */
export type PersonaTheme = "therapist" | "user" | "family" | "education";

/** Breadcrumb item */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Badge configuration */
export interface ContentBadge {
  label: string;
  color?: string;
}

/** Author information */
export interface AuthorInfo {
  name: string;
  role?: string;
  image?: string;
}

/** Meta information */
export interface MetaInfo {
  icon?: string;
  label: string;
}

/** Tab configuration (for tool variant) */
export interface TabConfig {
  id: string;
  label: string;
}

/** Question option (for interactive tools) */
export interface QuestionOption {
  value: number;
  label: string;
}

/** Question (for interactive tools) */
export interface Question {
  id: string;
  text: string;
  helpText?: string;
  options: QuestionOption[];
}

/** Scoring range (for interactive tools) */
export interface ScoringRange {
  min: number;
  max: number;
  level: string;
  recommendation: string;
}

/** Interactive tool configuration */
export interface InteractiveConfig {
  questions: Question[];
  scoring: ScoringRange[];
  disclaimer?: string;
}

/** Content section */
export interface ContentSection {
  id: string;
  title?: string;
  content: string;
  type?: "prose" | "list" | "quote" | "step";
  stepNumber?: number;
}

/** Related item */
export interface RelatedItem {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
}

/** Sidebar block */
export interface SidebarBlock {
  id: string;
  title: string;
  type: "links" | "related" | "cta" | "progress";
  items?: RelatedItem[];
  links?: { label: string; href: string }[];
  ctaText?: string;
  ctaButton?: string;
  ctaHref?: string;
}

/** Download item */
export interface DownloadItem {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
}

/** Audience tab */
export interface AudienceTab {
  id: string;
  label: string;
  route: string;
}

/** Main component props */
export interface MasterContentProps {
  /** Content variant */
  variant: ContentVariant;
  /** Persona theme */
  theme?: PersonaTheme;
  /** Breadcrumb */
  breadcrumb?: BreadcrumbItem[];
  /** Badges (category, status, etc.) */
  badges?: ContentBadge[];
  /** Main title */
  title: string;
  /** Subtitle or English name */
  subtitle?: string;
  /** Full descriptive title (for tools) */
  fullTitle?: string;
  /** Author info (for articles) */
  author?: AuthorInfo;
  /** Meta information (date, read time, etc.) */
  meta?: MetaInfo[];
  /** Topic tags */
  tags?: string[];
  /** Abstract or summary */
  abstract?: string;
  /** Content sections */
  sections: ContentSection[];
  /** References/sources */
  references?: string[];
  /** Tabs (for tool variant) */
  tabs?: TabConfig[];
  /** Active tab */
  activeTab?: string;
  /** Tab change handler */
  onTabChange?: (tabId: string) => void;
  /** Interactive tool config */
  interactive?: InteractiveConfig;
  /** Downloads (for tool/protocol) */
  downloads?: DownloadItem[];
  /** Sidebar blocks */
  sidebar?: SidebarBlock[];
  /** Back link */
  backLink?: { label: string; href: string };
  /** Action buttons */
  actions?: { icon: string; label: string; onClick: () => void }[];
  /** Audience tabs */
  audienceTabs?: AudienceTab[];
  /** Active audience */
  activeAudience?: string;
  /** Show SOS */
  showSOS?: boolean;
}

// =============================================================================
// THEME COLORS
// =============================================================================

const themeColors: Record<PersonaTheme, { primary: string; accent: string }> = {
  therapist: { primary: "gray-800", accent: "gray-600" },
  user: { primary: "blue-600", accent: "blue-500" },
  family: { primary: "green-600", accent: "green-500" },
  education: { primary: "purple-600", accent: "purple-500" },
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
                <button onClick={() => onNavigate(item.href!)} className="hover:text-gray-900">
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

/** Content header section */
function ContentHeader({
  variant,
  badges,
  title,
  subtitle,
  fullTitle,
  author,
  meta,
  tags,
  actions,
}: {
  variant: ContentVariant;
  badges?: ContentBadge[];
  title: string;
  subtitle?: string;
  fullTitle?: string;
  author?: AuthorInfo;
  meta?: MetaInfo[];
  tags?: string[];
  actions?: { icon: string; label: string; onClick: () => void }[];
}) {
  const isCompact = variant === "article";

  return (
    <section className={`border-b-2 border-gray-300 ${isCompact ? "bg-white py-8" : "bg-gray-50 py-8"}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            {/* Badges */}
            {badges && badges.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`border-2 px-3 py-1 font-mono text-xs font-bold ${badge.color || "border-gray-600 bg-gray-200"}`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-2 font-mono text-4xl font-bold text-gray-900">{title}</h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mb-2 font-mono text-lg text-gray-600">{subtitle}</p>
            )}

            {/* Full title (for tools) */}
            {fullTitle && (
              <p className="font-mono text-base text-gray-700">{fullTitle}</p>
            )}

            {/* Author (for articles) */}
            {author && (
              <div className="mt-4 flex items-center gap-4 border-t border-gray-200 pt-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-100 font-mono text-xs text-gray-500">
                  {author.image ? "[תמונה]" : author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-mono text-sm font-medium text-gray-900">{author.name}</p>
                  {author.role && (
                    <p className="font-mono text-xs text-gray-500">{author.role}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons (for tools/protocols) */}
          {actions && actions.length > 0 && (
            <div className="flex flex-col gap-3">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={`border-2 px-6 py-3 font-mono text-sm ${
                    idx === 0
                      ? "border-gray-600 bg-gray-800 font-bold text-white hover:bg-gray-700"
                      : "border-gray-400 bg-white hover:bg-gray-100"
                  }`}
                >
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Meta info */}
        {meta && meta.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-6 border-t border-gray-300 pt-4 font-mono text-sm text-gray-600">
            {meta.map((m, idx) => (
              <span key={idx}>{m.icon} {m.label}</span>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="border border-gray-300 bg-gray-100 px-3 py-1 font-mono text-xs text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** Content tabs (for tool variant) */
function ContentTabs({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) {
  return (
    <div className="border-b-2 border-gray-300 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`border-b-4 px-6 py-3 font-mono text-sm transition-colors ${
                activeTab === tab.id
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

/** Abstract block */
function AbstractBlock({ text }: { text: string }) {
  return (
    <div className="mb-8 border-s-4 border-gray-400 bg-gray-50 p-6">
      <h2 className="mb-2 font-mono text-sm font-bold text-gray-900">תקציר</h2>
      <p className="font-mono text-base text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

/** Content section renderer */
function SectionRenderer({ section, variant }: { section: ContentSection; variant: ContentVariant }) {
  return (
    <div className="mb-8">
      {/* Step number (for guide variant) */}
      {variant === "guide" && section.stepNumber && (
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-gray-600 bg-gray-800 font-mono text-lg font-bold text-white">
            {section.stepNumber}
          </div>
          {section.title && (
            <h2 className="font-mono text-xl font-bold text-gray-900">{section.title}</h2>
          )}
        </div>
      )}

      {/* Regular title */}
      {section.title && variant !== "guide" && (
        <h2 className="mb-4 font-mono text-2xl font-bold text-gray-900">{section.title}</h2>
      )}

      {/* Content */}
      {section.type === "quote" ? (
        <blockquote className="border-s-4 border-gray-400 bg-gray-50 p-4 font-mono text-base italic text-gray-700">
          {section.content}
        </blockquote>
      ) : section.type === "list" ? (
        <ul className="space-y-2 font-mono text-base text-gray-700">
          {section.content.split("\n").map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="font-mono text-base text-gray-700 leading-relaxed whitespace-pre-line">
          {section.content}
        </div>
      )}
    </div>
  );
}

/** Interactive questionnaire */
function InteractiveQuestionnaire({
  config,
  answers,
  setAnswers,
  showResults,
  setShowResults,
}: {
  config: InteractiveConfig;
  answers: Record<string, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = config.questions.length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const riskLevel = config.scoring.find(
    (range) => totalScore >= range.min && totalScore <= range.max
  );

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="border-2 border-gray-600 bg-white p-6">
        <h2 className="mb-6 border-b-2 border-gray-300 pb-4 font-mono text-xl font-bold text-gray-900">
          תוצאות הערכה
        </h2>

        {/* Score display */}
        <div className="mb-6 border-2 border-gray-400 bg-gray-50 p-8 text-center">
          <p className="font-mono text-sm text-gray-600">ציון כולל</p>
          <p className="font-mono text-6xl font-bold text-gray-900">{totalScore}</p>
        </div>

        {/* Risk level */}
        {riskLevel && (
          <div className="mb-6 border-2 border-gray-500 bg-gray-100 p-6">
            <h3 className="mb-2 font-mono text-lg font-bold text-gray-900">
              רמת סיכון: {riskLevel.level}
            </h3>
            <p className="font-mono text-sm text-gray-700">
              <span className="font-bold">המלצה:</span> {riskLevel.recommendation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="border-2 border-gray-600 bg-gray-800 px-6 py-3 font-mono text-sm font-bold text-white hover:bg-gray-700">
            ↓ הורדת דוח PDF
          </button>
          <button
            onClick={handleReset}
            className="border-2 border-gray-400 bg-white px-6 py-3 font-mono text-sm hover:bg-gray-100"
          >
            ↻ מילוי מחדש
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-600 bg-white p-6">
      <div className="mb-6 border-b-2 border-gray-300 pb-4">
        <h2 className="font-mono text-xl font-bold text-gray-900">שאלון</h2>
        <p className="mt-2 font-mono text-sm text-gray-600">
          ענו על כל השאלות בכנות. אין תשובות נכונות או לא נכונות.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between font-mono text-xs text-gray-600">
          <span>{answeredCount} מתוך {totalQuestions}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-3 w-full border-2 border-gray-400 bg-white">
          <div
            className="h-full bg-gray-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {config.questions.map((question, qIdx) => (
          <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
            <p className="mb-2 font-mono text-base font-bold text-gray-900">
              {qIdx + 1}. {question.text}
            </p>
            {question.helpText && (
              <p className="mb-4 font-mono text-xs text-gray-500">{question.helpText}</p>
            )}
            <div className="space-y-2">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 border-2 p-3 transition-colors ${
                    answers[question.id] === option.value
                      ? "border-gray-600 bg-gray-100"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    checked={answers[question.id] === option.value}
                    onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option.value }))}
                    className="h-4 w-4"
                  />
                  <span className="font-mono text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="mt-6 flex gap-4 pt-4">
        <button
          onClick={() => setShowResults(true)}
          disabled={answeredCount < totalQuestions}
          className="border-2 border-gray-600 bg-gray-800 px-8 py-3 font-mono text-sm font-bold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          חישוב תוצאה ←
        </button>
        <button
          onClick={handleReset}
          className="border-2 border-gray-400 bg-white px-6 py-3 font-mono text-sm hover:bg-gray-100"
        >
          איפוס
        </button>
      </div>

      {/* Disclaimer */}
      {config.disclaimer && (
        <div className="mt-6 border-2 border-gray-400 bg-gray-100 p-4">
          <p className="font-mono text-xs text-gray-600 leading-relaxed">{config.disclaimer}</p>
        </div>
      )}
    </div>
  );
}

/** Downloads section */
function DownloadsSection({ items }: { items: DownloadItem[] }) {
  return (
    <div className="border-2 border-gray-400 bg-white p-6">
      <h2 className="mb-4 font-mono text-xl font-bold text-gray-900">חומרים להורדה</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            className="flex w-full items-center justify-between border-2 border-gray-300 bg-gray-50 p-4 hover:border-gray-500"
          >
            <div className="text-start">
              <p className="font-mono text-sm font-bold text-gray-900">{item.title}</p>
              {item.subtitle && (
                <p className="font-mono text-xs text-gray-600">{item.subtitle}</p>
              )}
            </div>
            <span className="font-mono text-sm">↓</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** References section */
function ReferencesSection({ items }: { items: string[] }) {
  return (
    <section className="mt-12 border-t-2 border-gray-300 pt-8">
      <h2 className="mb-4 font-mono text-xl font-bold text-gray-900">מקורות</h2>
      <ol className="list-inside list-decimal space-y-2 font-mono text-sm text-gray-600">
        {items.map((ref, idx) => (
          <li key={idx} className="leading-relaxed">{ref}</li>
        ))}
      </ol>
    </section>
  );
}

/** Actions bar */
function ActionsBar({ actions }: { actions: { icon: string; label: string; onClick: () => void }[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-4 border-t-2 border-gray-300 pt-6">
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          className="flex items-center gap-2 border-2 border-gray-400 bg-gray-100 px-4 py-2 font-mono text-sm hover:bg-gray-200"
        >
          <span>{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
}

/** Sidebar */
function Sidebar({ blocks, onNavigate }: { blocks: SidebarBlock[]; onNavigate: (href: string) => void }) {
  return (
    <aside className="w-80 flex-shrink-0 space-y-6">
      {blocks.map((block) => (
        <div key={block.id} className="border-2 border-gray-400 bg-white p-6">
          <h3 className="mb-4 border-b-2 border-gray-300 pb-2 font-mono text-sm font-bold text-gray-900">
            {block.title}
          </h3>

          {/* Related items */}
          {block.type === "related" && block.items && (
            <div className="space-y-3">
              {block.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.href)}
                  className="block w-full border border-gray-300 p-3 text-start hover:border-gray-500 hover:bg-gray-50"
                >
                  {item.subtitle && (
                    <span className="font-mono text-xs text-gray-500">{item.subtitle}</span>
                  )}
                  <p className="font-mono text-sm font-bold text-gray-900">{item.title}</p>
                </button>
              ))}
            </div>
          )}

          {/* Links */}
          {block.type === "links" && block.links && (
            <div className="space-y-2">
              {block.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(link.href)}
                  className="block w-full border-2 border-gray-400 bg-white p-3 font-mono text-sm hover:bg-gray-100"
                >
                  ← {link.label}
                </button>
              ))}
            </div>
          )}

          {/* CTA */}
          {block.type === "cta" && (
            <div>
              {block.ctaText && (
                <p className="mb-4 font-mono text-sm text-gray-600">{block.ctaText}</p>
              )}
              {block.ctaButton && block.ctaHref && (
                <button
                  onClick={() => onNavigate(block.ctaHref!)}
                  className="w-full border-2 border-gray-600 bg-gray-800 px-4 py-3 font-mono text-sm font-bold text-white hover:bg-gray-700"
                >
                  {block.ctaButton}
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </aside>
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

export default function MasterContent({
  variant,
  theme = "therapist",
  breadcrumb,
  badges,
  title,
  subtitle,
  fullTitle,
  author,
  meta,
  tags,
  abstract,
  sections,
  references,
  tabs,
  activeTab: initialActiveTab,
  onTabChange,
  interactive,
  downloads,
  sidebar,
  backLink,
  actions,
  audienceTabs,
  activeAudience,
  showSOS = false,
}: MasterContentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(initialActiveTab || tabs?.[0]?.id || "info");
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [showResults, setShowResults] = React.useState(false);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const hasSidebar = sidebar && sidebar.length > 0;
  const hasTabs = tabs && tabs.length > 0;

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

      {/* Content Header */}
      <ContentHeader
        variant={variant}
        badges={badges}
        title={title}
        subtitle={subtitle}
        fullTitle={fullTitle}
        author={author}
        meta={meta}
        tags={tags}
        actions={variant === "tool" || variant === "protocol" ? actions : undefined}
      />

      {/* Content Tabs (for tool variant) */}
      {hasTabs && (
        <ContentTabs tabs={tabs!} activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Main content area */}
      <main className="py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className={`flex gap-8 ${hasSidebar ? "" : ""}`}>
            {/* Main content */}
            <div className={hasSidebar ? "flex-1" : "max-w-4xl"}>
              {/* Back link */}
              {backLink && (
                <button
                  onClick={() => router.push(backLink.href)}
                  className="mb-6 font-mono text-sm text-gray-600 hover:text-gray-900"
                >
                  → {backLink.label}
                </button>
              )}

              {/* Abstract */}
              {abstract && activeTab === "info" && <AbstractBlock text={abstract} />}

              {/* Tab content */}
              {hasTabs ? (
                <>
                  {activeTab === "info" && (
                    <div className="space-y-6">
                      {sections.map((section) => (
                        <SectionRenderer key={section.id} section={section} variant={variant} />
                      ))}
                    </div>
                  )}
                  {activeTab === "tool" && interactive && (
                    <InteractiveQuestionnaire
                      config={interactive}
                      answers={answers}
                      setAnswers={setAnswers}
                      showResults={showResults}
                      setShowResults={setShowResults}
                    />
                  )}
                  {activeTab === "resources" && downloads && (
                    <DownloadsSection items={downloads} />
                  )}
                </>
              ) : (
                /* Non-tabbed content */
                <div className="space-y-6">
                  {sections.map((section) => (
                    <SectionRenderer key={section.id} section={section} variant={variant} />
                  ))}
                </div>
              )}

              {/* References (for articles) */}
              {references && references.length > 0 && !hasTabs && (
                <ReferencesSection items={references} />
              )}

              {/* Actions bar (for articles) */}
              {variant === "article" && actions && <ActionsBar actions={actions} />}
            </div>

            {/* Sidebar */}
            {hasSidebar && (
              <Sidebar blocks={sidebar!} onNavigate={(href) => router.push(href)} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* SOS */}
      {showSOS && <SOSButton />}
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export type {
  BreadcrumbItem,
  ContentBadge,
  AuthorInfo,
  MetaInfo,
  TabConfig,
  QuestionOption,
  Question,
  ScoringRange,
  InteractiveConfig,
  ContentSection,
  RelatedItem,
  SidebarBlock,
  DownloadItem,
};
