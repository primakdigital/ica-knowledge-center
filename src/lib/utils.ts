import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind classes intelligently
 * This is the standard shadcn/ui utility function
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
