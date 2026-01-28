"use client";

import * as React from "react";
import { Settings, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SiteHeader - Organism
 *
 * The main navigation header for the ICA Knowledge Center.
 *
 * Visual Spec (from Persona Lobby PDF):
 * - Background: Navy Blue (#000F37 / bg-ica-primary)
 * - Text: White
 * - Height: 72px
 * - Layout:
 *   - Right (RTL start): ICA Logo (white)
 *   - Center: Navigation links (opacity 80%, hover 100%)
 *   - Left (RTL end): Profile/Settings icon
 */

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isActive?: boolean;
}

export interface SiteHeaderProps {
  /**
   * Navigation items
   */
  navItems?: NavItem[];
  /**
   * Current active route
   */
  activeRoute?: string;
  /**
   * Show settings/profile button
   */
  showSettings?: boolean;
  /**
   * Settings click handler
   */
  onSettingsClick?: () => void;
  /**
   * Logo click handler
   */
  onLogoClick?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "אודות", href: "/about", hasDropdown: true },
  { label: "מרכז מידע", href: "/", hasDropdown: true, isActive: true },
  { label: "בתקשורת", href: "/media", hasDropdown: true },
  { label: "קמפוס הכשרות", href: "/campus", hasDropdown: true },
  { label: "אפשרויות טיפול", href: "/treatment", hasDropdown: true },
  { label: "צור קשר", href: "/contact" },
];

export function SiteHeader({
  navItems = defaultNavItems,
  activeRoute,
  showSettings = true,
  onSettingsClick,
  onLogoClick,
  className,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        // Container
        "w-full",
        "h-[72px]",
        // Navy background - MUST be this exact color
        "bg-[#000F37]",
        // Sticky positioning
        "sticky top-0 z-50",
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        {/* Right Side (RTL Start): Logo */}
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          {/* ICA Logo Mark */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <span className="text-xl font-bold text-white">ICA</span>
          </div>
          {/* Brand Text */}
          <span className="text-lg font-semibold text-white">מרכז ידע</span>
        </button>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-1",
                "px-4 py-2",
                "rounded-lg",
                "text-sm font-medium",
                "transition-all duration-200",
                // Default state: 80% opacity
                item.isActive || item.href === activeRoute
                  ? "text-white bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="h-4 w-4 opacity-60" />
              )}
            </a>
          ))}
        </nav>

        {/* Left Side (RTL End): Settings/Profile */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="תפריט"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          {/* Settings Button */}
          {showSettings && (
            <button
              type="button"
              onClick={onSettingsClick}
              className={cn(
                "flex items-center justify-center",
                "h-10 w-10",
                "rounded-lg",
                "text-white/80",
                "transition-all duration-200",
                "hover:text-white hover:bg-white/10"
              )}
              aria-label="הגדרות"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
