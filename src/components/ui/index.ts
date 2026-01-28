/**
 * ICA UI Components
 *
 * Export all primitive UI components for easy importing:
 * import { Button, Input, Card, Badge } from "@/components/ui";
 */

export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";

export { Input, inputVariants } from "./input";
export type { InputProps } from "./input";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
export type { CardProps } from "./card";

export { Badge, badgeVariants } from "./badge";
export type { BadgeProps } from "./badge";

// Molecules
export { ActionCard } from "./action-card";
export type { ActionCardProps } from "./action-card";

export { TopicChip } from "./topic-chip";
export type { TopicChipProps } from "./topic-chip";

export { HeroSearch } from "./hero-search";
export type { HeroSearchProps } from "./hero-search";

// Organisms
export { SiteHeader } from "./site-header";
export type { SiteHeaderProps, NavItem } from "./site-header";
