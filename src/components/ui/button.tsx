import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ICA Button Component
 *
 * Styled according to ICA Design System v2.0:
 * - Primary (default): Navy background (#000F37)
 * - Secondary: Blue background (#70B2EB)
 * - Accent: Yellow background (#FCC645)
 * - SOS: Coral background (#E67167)
 * - Outline: Transparent with Navy border
 * - Ghost: Transparent with hover state
 *
 * RTL Support: Uses logical properties (ms-/me-) for icon spacing
 */

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold whitespace-nowrap",
    "rounded-[var(--ica-radius-md)]",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
    // RTL-aware: gap handles spacing between icon and text automatically
  ],
  {
    variants: {
      variant: {
        // Primary: Navy background (ICA primary color)
        default: [
          "bg-[var(--ica-primary)] text-white",
          "hover:bg-[var(--ica-navy-800)]",
          "active:bg-[var(--ica-navy-700)]",
          "focus-visible:ring-[var(--ica-secondary)]",
          "shadow-[var(--ica-shadow-button)]",
        ],
        // Secondary: Blue background
        secondary: [
          "bg-[var(--ica-secondary)] text-white",
          "hover:bg-[var(--ica-blue-600)]",
          "active:bg-[var(--ica-blue-700)]",
          "focus-visible:ring-[var(--ica-primary)]",
          "shadow-[var(--ica-shadow-button)]",
        ],
        // Accent: Yellow background (for CTAs)
        accent: [
          "bg-[var(--ica-accent)] text-[var(--ica-primary)]",
          "hover:bg-[var(--ica-yellow-600)]",
          "active:bg-[var(--ica-yellow-700)]",
          "focus-visible:ring-[var(--ica-primary)]",
          "shadow-[var(--ica-shadow-button)]",
        ],
        // SOS: Coral background (emergency actions)
        sos: [
          "bg-[var(--ica-sos)] text-white",
          "hover:bg-[var(--ica-coral-600)]",
          "active:bg-[var(--ica-coral-700)]",
          "focus-visible:ring-[var(--ica-coral-300)]",
          "shadow-[var(--ica-shadow-sos)]",
        ],
        // Outline: Transparent with Navy border
        outline: [
          "border-2 border-[var(--ica-primary)] text-[var(--ica-primary)]",
          "bg-transparent",
          "hover:bg-[var(--ica-navy-50)]",
          "active:bg-[var(--ica-navy-100)]",
          "focus-visible:ring-[var(--ica-secondary)]",
        ],
        // Ghost: Minimal, for secondary actions
        ghost: [
          "text-[var(--ica-primary)]",
          "bg-transparent",
          "hover:bg-[var(--ica-gray-100)]",
          "active:bg-[var(--ica-gray-200)]",
          "focus-visible:ring-[var(--ica-secondary)]",
        ],
        // Link: Text-only, looks like a link
        link: [
          "text-[var(--ica-secondary)]",
          "bg-transparent",
          "hover:text-[var(--ica-blue-700)] hover:underline",
          "active:text-[var(--ica-blue-800)]",
          "focus-visible:ring-[var(--ica-secondary)]",
          "p-0 h-auto",
        ],
      },
      size: {
        // Sizes from ICA Design System
        xs: "h-[var(--ica-btn-xs)] px-3 text-[var(--ica-text-caption)]",
        sm: "h-[var(--ica-btn-sm)] px-4 text-[var(--ica-text-small)]",
        md: "h-[var(--ica-btn-md)] px-6 text-[var(--ica-text-body)]",
        lg: "h-[var(--ica-btn-lg)] px-8 text-[var(--ica-text-body-lg)]",
        // Icon-only button (square)
        icon: "h-[var(--ica-btn-md)] w-[var(--ica-btn-md)] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as a Slot (for composition with links, etc.)
   */
  asChild?: boolean;
  /**
   * Loading state - shows spinner and disables button
   */
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            {/* RTL-aware spinner with logical margin (me = margin-end) */}
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
