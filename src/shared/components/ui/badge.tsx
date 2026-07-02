import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

/**
 * Badge variant definitions using class-variance-authority.
 *
 * Variants:
 * - `variant`: Controls the color scheme.
 *
 * Generic semantic variants allow the same Badge to represent
 * domain concepts like job type (Remote/Hybrid/Onsite),
 * urgency (Featured/Urgent), or status (Active/Pending/Closed)
 * without hardcoding those labels — just pass them as children.
 *
 * @example
 * // Job type semantics
 * <Badge variant="info">Remote</Badge>
 * <Badge variant="secondary">Hybrid</Badge>
 * <Badge variant="default">Onsite</Badge>
 *
 * // Urgency / prominence
 * <Badge variant="accent">Featured</Badge>
 * <Badge variant="warning">Urgent</Badge>
 *
 * // Status
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error">Closed</Badge>
 */
const badgeVariants = cva(
  [
    'inline-flex items-center',
    'rounded-2xl px-2.5 py-0.5',
    'text-xs font-medium',
    'transition-colors duration-200',
    'whitespace-nowrap',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        /** Solid dark background — ideal for generic tags. */
        default: 'bg-secondary text-white',

        /** Primary brand color (translucent) — skill tags, primary categories. */
        primary: 'bg-primary/10 text-primary',

        /** Secondary muted style — neutral metadata labels (e.g., Hybrid). */
        secondary: 'bg-secondary/10 text-secondary',

        /** Accent highlight (translucent) — featured items, spotlights. */
        accent: 'bg-accent/10 text-accent',

        /** Informational blue — location type (e.g., Remote). */
        info: 'bg-primary/10 text-primary',

        /** Positive state — active, open, approved. */
        success: 'bg-success/10 text-success',

        /** Caution state — pending review, urgent, expiring soon. */
        warning: 'bg-warning/10 text-warning',

        /** Negative state — closed, rejected, error. */
        error: 'bg-error/10 text-error',

        /** Bordered transparent — subtle categorization. */
        outline: 'border border-border text-text-secondary bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

/**
 * A small label component for status indicators, tags, and categories.
 *
 * All labels are passed as children — the variant controls only the
 * visual style, keeping the component fully reusable and domain-agnostic.
 *
 * @example
 * <Badge variant="primary">React</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Urgent</Badge>
 * <Badge variant="info">Remote</Badge>
 * <Badge variant="accent">Featured</Badge>
 * <Badge variant="secondary">Hybrid</Badge>
 * <Badge variant="error">Closed</Badge>
 * <Badge variant="outline">Part-time</Badge>
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      className={cn(badgeVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export type { BadgeProps };
