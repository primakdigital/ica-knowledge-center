import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ICA Badge/Chip Component
 *
 * Styled according to ICA Design System v2.0:
 * - Used for tags, labels, content types, status indicators
 * - Font size: tiny (10px) or caption (12px)
 * - Border radius: full (pill shape) or sm (rounded rectangle)
 *
 * Variants match the color system:
 * - default: Navy (primary)
 * - secondary: Blue
 * - accent: Yellow
 * - sos: Coral (for alerts/warnings)
 * - success: Green
 * - outline: Transparent with border
 * - muted: Gray (subtle)
 */

const badgeVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center",
    "font-medium",
    "whitespace-nowrap",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        // Solid variants
        default: [
          "bg-[var(--ica-primary)] text-white",
        ],
        secondary: [
          "bg-[var(--ica-secondary)] text-white",
        ],
        accent: [
          "bg-[var(--ica-accent)] text-[var(--ica-primary)]",
        ],
        sos: [
          "bg-[var(--ica-sos)] text-white",
        ],
        success: [
          "bg-[var(--ica-success)] text-white",
        ],
        // Subtle/soft variants (light background)
        "default-soft": [
          "bg-[var(--ica-navy-50)] text-[var(--ica-primary)]",
        ],
        "secondary-soft": [
          "bg-[var(--ica-blue-50)] text-[var(--ica-blue-800)]",
        ],
        "accent-soft": [
          "bg-[var(--ica-yellow-50)] text-[var(--ica-yellow-900)]",
        ],
        "sos-soft": [
          "bg-[var(--ica-coral-50)] text-[var(--ica-coral-800)]",
        ],
        "success-soft": [
          "bg-emerald-50 text-emerald-800",
        ],
        // Outline variants
        outline: [
          "border border-[var(--ica-gray-300)] text-[var(--ica-gray-700)]",
          "bg-transparent",
        ],
        "outline-primary": [
          "border border-[var(--ica-primary)] text-[var(--ica-primary)]",
          "bg-transparent",
        ],
        "outline-secondary": [
          "border border-[var(--ica-secondary)] text-[var(--ica-secondary)]",
          "bg-transparent",
        ],
        // Muted (very subtle)
        muted: [
          "bg-[var(--ica-gray-100)] text-[var(--ica-gray-600)]",
        ],
      },
      size: {
        sm: [
          "h-5 px-2",
          "text-[var(--ica-text-tiny)]",
          "rounded-[var(--ica-radius-sm)]",
        ],
        md: [
          "h-6 px-3",
          "text-[var(--ica-text-caption)]",
          "rounded-[var(--ica-radius-md)]",
        ],
        lg: [
          "h-7 px-4",
          "text-[var(--ica-text-small)]",
          "rounded-[var(--ica-radius-md)]",
        ],
      },
      shape: {
        rounded: "", // Uses size-defined border-radius
        pill: "!rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "pill",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Optional icon to display before the text
   * RTL-aware: will appear on the right side in RTL mode
   */
  icon?: React.ReactNode;
  /**
   * If true, shows a dot indicator instead of/before text
   */
  dot?: boolean;
  /**
   * Dot color (uses ICA semantic colors)
   */
  dotColor?: "default" | "success" | "warning" | "error" | "info";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      icon,
      dot,
      dotColor = "default",
      children,
      ...props
    },
    ref
  ) => {
    const dotColorMap = {
      default: "bg-current",
      success: "bg-[var(--ica-success)]",
      warning: "bg-[var(--ica-warning)]",
      error: "bg-[var(--ica-error)]",
      info: "bg-[var(--ica-info)]",
    };

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape, className }))}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full me-1.5",
              dotColorMap[dotColor]
            )}
          />
        )}
        {/* Icon (RTL-aware with me- margin) */}
        {icon && !dot && <span className="me-1">{icon}</span>}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
