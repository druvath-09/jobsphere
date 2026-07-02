import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

/* ------------------------------------------------------------------ */
/*  Card (container)                                                   */
/* ------------------------------------------------------------------ */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * When true, enables interactive hover effects:
   * subtle upward translate, elevated shadow, and smooth transitions.
   * Preserves keyboard focus accessibility.
   * When false (default), the card is a static container.
   */
  interactive?: boolean;
}

/**
 * Card — the root container.
 * Provides surface color, border, rounded corners, and shadow.
 *
 * @example
 * // Static card (default)
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Software Engineer</CardTitle>
 *     <CardDescription>Acme Corp · Remote</CardDescription>
 *   </CardHeader>
 *   <CardContent><p>Build scalable APIs…</p></CardContent>
 *   <CardFooter><Button>Apply</Button></CardFooter>
 * </Card>
 *
 * // Interactive card with hover elevation
 * <Card interactive>
 *   <CardHeader>
 *     <CardTitle>Senior Frontend Engineer</CardTitle>
 *   </CardHeader>
 * </Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-border bg-surface shadow-sm',
        interactive && [
          'transition-all duration-200 ease-out',
          'hover:-translate-y-0.5 hover:shadow-lg',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        ],
        !interactive && 'transition-shadow duration-200',
        className,
      )}
      /* Only make interactive cards focusable for keyboard navigation */
      tabIndex={interactive ? 0 : undefined}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

/* ------------------------------------------------------------------ */
/*  CardHeader                                                         */
/* ------------------------------------------------------------------ */

type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

/**
 * CardHeader — top section containing title and description.
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  ),
);
CardHeader.displayName = 'CardHeader';

/* ------------------------------------------------------------------ */
/*  CardTitle                                                          */
/* ------------------------------------------------------------------ */

type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

/**
 * CardTitle — primary heading within a CardHeader.
 */
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-tight text-text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
);
CardTitle.displayName = 'CardTitle';

/* ------------------------------------------------------------------ */
/*  CardDescription                                                    */
/* ------------------------------------------------------------------ */

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/**
 * CardDescription — secondary text within a CardHeader.
 */
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    />
  ),
);
CardDescription.displayName = 'CardDescription';

/* ------------------------------------------------------------------ */
/*  CardContent                                                        */
/* ------------------------------------------------------------------ */

type CardContentProps = HTMLAttributes<HTMLDivElement>;

/**
 * CardContent — main body area of the card.
 */
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 pb-6', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

/* ------------------------------------------------------------------ */
/*  CardFooter                                                         */
/* ------------------------------------------------------------------ */

type CardFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * CardFooter — bottom section, typically for actions.
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center px-6 pb-6', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};
