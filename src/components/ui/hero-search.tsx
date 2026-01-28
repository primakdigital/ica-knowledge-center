"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HeroSearch - Molecule
 *
 * The main search bar component with elevated visual treatment.
 * Distinct from standard inputs with larger size and prominent styling.
 *
 * Visual Spec (from Persona Lobby PDF):
 * - Large height (h-14 or h-16)
 * - Rounded-full or rounded-2xl
 * - Elevated shadow (shadow-lg)
 * - Search icon on the right (RTL start)
 * - Optional action button on the left (RTL end)
 */

export interface HeroSearchProps {
  /**
   * Current search value
   */
  value: string;
  /**
   * Change handler
   */
  onChange: (value: string) => void;
  /**
   * Submit handler
   */
  onSubmit?: () => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Show action button
   */
  showButton?: boolean;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export function HeroSearch({
  value,
  onChange,
  onSubmit,
  placeholder = "חיפוש...",
  showButton = true,
  buttonText = "חיפוש",
  isLoading = false,
  className,
}: HeroSearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          // Container
          "relative flex items-center",
          "h-16",
          "rounded-2xl",
          "bg-white",
          "border border-[var(--ica-gray-200)]",
          // Elevated shadow
          "shadow-lg",
          // Focus-within state
          "transition-all duration-200",
          "focus-within:border-[var(--ica-secondary)]",
          "focus-within:shadow-xl",
          "focus-within:ring-4 focus-within:ring-[var(--ica-blue-100)]"
        )}
      >
        {/* Search Icon (Right side in RTL) */}
        <div className="flex h-full items-center ps-5">
          <Search className="h-6 w-6 text-[var(--ica-gray-400)]" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 h-full",
            "bg-transparent",
            "px-4",
            "text-base text-[var(--ica-primary)]",
            "placeholder:text-[var(--ica-gray-400)]",
            "focus:outline-none",
            // RTL text alignment
            "text-start"
          )}
        />

        {/* Action Button (Left side in RTL) */}
        {showButton && (
          <div className="flex h-full items-center pe-2">
            <button
              type="submit"
              disabled={isLoading || !value.trim()}
              className={cn(
                "h-12 px-8",
                "rounded-xl",
                "bg-[var(--ica-primary)] text-white",
                "font-semibold text-base",
                // Transitions
                "transition-all duration-200",
                // Hover
                "hover:bg-[var(--ica-navy-800)]",
                // Active
                "active:scale-[0.98]",
                // Disabled
                "disabled:opacity-50 disabled:cursor-not-allowed",
                // Focus
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ica-secondary)] focus-visible:ring-offset-2"
              )}
            >
              {isLoading ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                buttonText
              )}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
