"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ActionCard - Molecule
 *
 * The "Shortcut" card used for quick actions like:
 * "התערבות ראשונית", "הערכת מצב ושאלונים", etc.
 *
 * Visual Spec (from Persona Lobby PDF):
 * - White background, rounded-xl, subtle border
 * - Shadow-sm default, shadow-md on hover
 * - Lift effect on hover (-translate-y-1)
 * - Icon container at top
 * - Title in bold
 * - Arrow indicator at bottom
 */

export interface ActionCardProps {
  /**
   * Icon component to display (Lucide icon)
   */
  icon: React.ReactNode;
  /**
   * Background color for icon container
   */
  iconBg?: string;
  /**
   * Icon color class
   */
  iconColor?: string;
  /**
   * Card title
   */
  title: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Optional badge/tag to display
   */
  badge?: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Additional class names
   */
  className?: string;
}

export function ActionCard({
  icon,
  iconBg = "bg-[var(--ica-blue-50)]",
  iconColor = "text-[var(--ica-primary)]",
  title,
  description,
  badge,
  onClick,
  className,
}: ActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Container
        "group relative flex w-full flex-col items-start",
        "rounded-xl bg-white",
        "border border-[var(--ica-gray-100)]",
        "p-5",
        // Shadow & Hover
        "shadow-sm",
        "transition-all duration-200 ease-out",
        "hover:shadow-md hover:-translate-y-1",
        "hover:border-[var(--ica-secondary)]",
        // Focus
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ica-secondary)] focus-visible:ring-offset-2",
        // Text alignment for RTL
        "text-start",
        className
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center",
          "rounded-xl",
          iconBg
        )}
      >
        <span className={cn("h-6 w-6", iconColor)}>{icon}</span>
      </div>

      {/* Title */}
      <h3 className="mb-1 text-base font-bold text-[var(--ica-gray-900)]">
        {title}
      </h3>

      {/* Description (optional) */}
      {description && (
        <p className="mb-3 text-sm text-[var(--ica-gray-500)] leading-relaxed">
          {description}
        </p>
      )}

      {/* Footer: Badge or Arrow */}
      <div className="mt-auto flex w-full items-center justify-between pt-2">
        {badge ? (
          badge
        ) : (
          <span className="flex items-center gap-1 text-sm font-medium text-[var(--ica-secondary)] opacity-0 transition-opacity group-hover:opacity-100">
            פתיחה
            <ArrowLeft className="h-4 w-4" />
          </span>
        )}
      </div>

      {/* Hover indicator line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl bg-[var(--ica-secondary)] opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
