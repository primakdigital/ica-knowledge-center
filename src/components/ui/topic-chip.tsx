"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * TopicChip - Molecule
 *
 * The "Explore" card used for topic navigation like:
 * "טיפול משפחתי", "בני נוער", "חומרים", etc.
 *
 * Visual Spec (from Persona Lobby PDF):
 * - Small rectangular card, centered content
 * - White background with subtle border
 * - Hover: border color changes to secondary (blue)
 * - Icon + Label centered vertically
 */

export interface TopicChipProps {
  /**
   * Icon component to display (Lucide icon)
   */
  icon: React.ReactNode;
  /**
   * Topic label
   */
  label: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Whether this chip is currently selected/active
   */
  isActive?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

export function TopicChip({
  icon,
  label,
  onClick,
  isActive = false,
  className,
}: TopicChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Container
        "group flex flex-col items-center justify-center gap-3",
        "min-w-[120px] p-5",
        "rounded-2xl bg-white",
        "border-2",
        // Border state
        isActive
          ? "border-[var(--ica-secondary)] shadow-md"
          : "border-[var(--ica-gray-100)]",
        // Shadow
        "shadow-sm",
        // Transitions
        "transition-all duration-200 ease-out",
        // Hover
        "hover:border-[var(--ica-secondary)]",
        "hover:shadow-md",
        "hover:-translate-y-0.5",
        // Focus
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ica-secondary)] focus-visible:ring-offset-2",
        className
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center",
          "rounded-full",
          "transition-colors duration-200",
          isActive
            ? "bg-[var(--ica-secondary)] text-white"
            : "bg-[var(--ica-blue-50)] text-[var(--ica-secondary)] group-hover:bg-[var(--ica-blue-100)]"
        )}
      >
        <span className="h-7 w-7">{icon}</span>
      </div>

      {/* Label */}
      <span
        className={cn(
          "text-sm font-semibold text-center leading-tight",
          "transition-colors duration-200",
          isActive
            ? "text-[var(--ica-secondary)]"
            : "text-[var(--ica-gray-700)] group-hover:text-[var(--ica-primary)]"
        )}
      >
        {label}
      </span>
    </button>
  );
}
