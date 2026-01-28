import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ICA Card Component
 *
 * Styled according to ICA Design System v2.0:
 * - Border radius: 16px
 * - Shadow: cardShadow (0 4px 8px rgba(0, 15, 55, 0.08))
 * - Padding: 32px (default)
 * - Optional top accent bar (6px)
 *
 * Variants:
 * - default: White background with shadow
 * - outline: White background with border
 * - elevated: White background with hero shadow
 * - highlight: Light blue background (for synthesis/summary)
 */

const cardVariants = cva(
  // Base styles
  [
    "rounded-[var(--ica-card-radius)]",
    "bg-white",
    "text-[var(--ica-primary)]",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        default: "shadow-[var(--ica-shadow-card)]",
        outline: "border border-[var(--ica-gray-200)]",
        elevated: "shadow-[var(--ica-shadow-hero)]",
        highlight: "bg-[var(--ica-blue-50)] border border-[var(--ica-blue-100)]",
      },
      padding: {
        none: "p-0",
        sm: "p-[var(--ica-space-4)]",
        md: "p-[var(--ica-space-6)]",
        lg: "p-[var(--ica-card-padding)]",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Accent bar color at the top of the card
   * Uses ICA color tokens
   */
  accentColor?: "primary" | "secondary" | "accent" | "sos" | "success" | "none";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, accentColor = "none", children, ...props }, ref) => {
    const accentColorMap = {
      primary: "bg-[var(--ica-primary)]",
      secondary: "bg-[var(--ica-secondary)]",
      accent: "bg-[var(--ica-accent)]",
      sos: "bg-[var(--ica-sos)]",
      success: "bg-[var(--ica-success)]",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      >
        {/* Accent bar at top */}
        {accentColor !== "none" && (
          <div
            className={cn(
              "h-[var(--ica-card-top-bar)] w-full",
              accentColorMap[accentColor]
            )}
          />
        )}
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

/**
 * Card Header - contains title and optional description
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-[var(--ica-space-2)]", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * Card Title - main heading
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-[var(--ica-font-bold)] text-[var(--ica-text-h3)] leading-[var(--ica-leading-tight)]",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * Card Description - secondary text
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[var(--ica-text-body)] text-[var(--ica-gray-600)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * Card Content - main content area
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Card Footer - actions or metadata
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-[var(--ica-space-4)] pt-[var(--ica-space-4)]", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
