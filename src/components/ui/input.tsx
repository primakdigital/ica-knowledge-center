import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * ICA Input Component
 *
 * Styled according to ICA Design System v2.0:
 * - Default border: Gray (#D1D5DB)
 * - Focus state: Blue ring (#70B2EB)
 * - Error state: Coral border (#E67167)
 * - Success state: Green border (#10B981)
 *
 * RTL Support: Text alignment inherits from parent (dir="rtl")
 * Icons use logical properties (ps-/pe-) for correct RTL spacing
 */

const inputVariants = cva(
  // Base styles
  [
    "flex w-full",
    "bg-white",
    "border border-[var(--ica-gray-300)]",
    "rounded-[var(--ica-radius-md)]",
    "text-[var(--ica-primary)]",
    "text-[var(--ica-text-body)]",
    "placeholder:text-[var(--ica-gray-400)]",
    "transition-all duration-200",
    // Focus state with ICA secondary (Blue)
    "focus:outline-none focus:ring-2 focus:ring-[var(--ica-secondary)] focus:ring-offset-0",
    "focus:border-[var(--ica-secondary)]",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--ica-gray-50)]",
    // File input styling
    "file:border-0 file:bg-transparent file:text-[var(--ica-text-small)] file:font-medium",
    "file:text-[var(--ica-primary)]",
  ],
  {
    variants: {
      inputSize: {
        sm: "h-[var(--ica-btn-sm)] px-3 text-[var(--ica-text-small)]",
        md: "h-[var(--ica-btn-md)] px-4 text-[var(--ica-text-body)]",
        lg: "h-[var(--ica-btn-lg)] px-5 text-[var(--ica-text-body-lg)]",
      },
      state: {
        default: "",
        error: [
          "border-[var(--ica-error)]",
          "focus:ring-[var(--ica-coral-300)] focus:border-[var(--ica-error)]",
        ],
        success: [
          "border-[var(--ica-success)]",
          "focus:ring-emerald-200 focus:border-[var(--ica-success)]",
        ],
      },
    },
    defaultVariants: {
      inputSize: "md",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * Icon to display at the start (right side in RTL)
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display at the end (left side in RTL)
   */
  endIcon?: React.ReactNode;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      inputSize,
      state,
      startIcon,
      endIcon,
      error,
      helperText,
      ...props
    },
    ref
  ) => {
    // If there's an error message, override state to error
    const effectiveState = error ? "error" : state;

    // If we have icons, wrap in a container
    if (startIcon || endIcon) {
      return (
        <div className="flex flex-col gap-1">
          <div className="relative flex items-center">
            {/* Start icon (right side in RTL) - uses ps- for padding-start */}
            {startIcon && (
              <span className="absolute start-0 flex h-full items-center ps-3 text-[var(--ica-gray-500)]">
                {startIcon}
              </span>
            )}
            <input
              type={type}
              className={cn(
                inputVariants({ inputSize, state: effectiveState }),
                startIcon && "ps-10", // padding-start for RTL-aware spacing
                endIcon && "pe-10", // padding-end for RTL-aware spacing
                className
              )}
              ref={ref}
              {...props}
            />
            {/* End icon (left side in RTL) - uses pe- for padding-end */}
            {endIcon && (
              <span className="absolute end-0 flex h-full items-center pe-3 text-[var(--ica-gray-500)]">
                {endIcon}
              </span>
            )}
          </div>
          {/* Error or helper text */}
          {(error || helperText) && (
            <span
              className={cn(
                "text-[var(--ica-text-small)]",
                error ? "text-[var(--ica-error)]" : "text-[var(--ica-gray-500)]"
              )}
            >
              {error || helperText}
            </span>
          )}
        </div>
      );
    }

    // Simple input without icons
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            inputVariants({ inputSize, state: effectiveState, className })
          )}
          ref={ref}
          {...props}
        />
        {/* Error or helper text */}
        {(error || helperText) && (
          <span
            className={cn(
              "text-[var(--ica-text-small)]",
              error ? "text-[var(--ica-error)]" : "text-[var(--ica-gray-500)]"
            )}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
