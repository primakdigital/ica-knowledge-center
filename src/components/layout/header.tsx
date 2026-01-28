import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ICA Global Header Component
 *
 * Styled according to ICA Design System v2.0:
 * - Height: 72px
 * - Background: Navy (#000F37)
 * - Logo + Brand name (right/start in RTL)
 * - Navigation (center)
 * - Breadcrumb support
 *
 * RTL: Logo appears on the right, nav flows right-to-left
 */

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  /**
   * Breadcrumb items to display
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Additional class names
   */
  className?: string;
}

export function Header({ breadcrumbs, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "h-[var(--ica-header-height)] w-full",
        "bg-[var(--ica-primary)]",
        "sticky top-0 z-50",
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-[var(--ica-content-desktop)] items-center justify-between px-[var(--ica-space-6)]">
        {/* Logo & Brand (Right side in RTL) */}
        <div className="flex items-center gap-[var(--ica-space-3)]">
          {/* ICA Logo */}
          <a
            href="https://ica.org.il"
            className="flex items-center gap-[var(--ica-space-2)] text-white transition-opacity hover:opacity-80"
            aria-label="ICA - דף הבית"
          >
            {/* Logo Icon Placeholder */}
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--ica-radius-md)] bg-white/10">
              <span className="text-lg font-bold text-white">ICA</span>
            </div>
            {/* Brand Name */}
            <span className="text-lg font-semibold text-white">מרכז ידע</span>
          </a>
        </div>

        {/* Breadcrumbs (Center/Left in RTL) */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="hidden md:block">
            <ol className="flex items-center gap-[var(--ica-space-2)] text-[var(--ica-text-small)] text-white/70">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-[var(--ica-space-2)]">
                  {index > 0 && (
                    <span className="text-white/40" aria-hidden="true">
                      ›
                    </span>
                  )}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-white">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Accessibility / Actions (Left side in RTL) */}
        <div className="flex items-center gap-[var(--ica-space-4)]">
          {/* Placeholder for accessibility toggle or other actions */}
          <button
            type="button"
            className="rounded-[var(--ica-radius-md)] p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="נגישות"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
