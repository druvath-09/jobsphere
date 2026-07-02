import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

/**
 * Inline SVG spinner for the loading state.
 * Uses currentColor so it inherits the button's text color automatically.
 * Sized relative to the current font-size via `1em` so it scales with button size.
 */
function Spinner() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
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
  );
}

/**
 * Button variant definitions using class-variance-authority.
 *
 * Variants:
 * - `variant`: Controls the visual style (primary, secondary, accent, outline, ghost, destructive).
 * - `size`: Controls the padding and font size (sm, md, lg, icon).
 *
 * All variants consume design tokens via Tailwind utility classes
 * mapped to our CSS custom properties.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium whitespace-nowrap',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white shadow-sm hover:bg-primary/90 focus-visible:ring-primary',
        secondary:
          'bg-secondary text-white shadow-sm hover:bg-secondary/90 focus-visible:ring-secondary',
        accent:
          'bg-accent text-white shadow-sm hover:bg-accent/90 focus-visible:ring-accent',
        outline:
          'border border-border bg-transparent text-text-primary shadow-sm hover:bg-surface hover:shadow-md focus-visible:ring-primary',
        ghost:
          'bg-transparent text-text-primary hover:bg-surface focus-visible:ring-primary',
        destructive:
          'bg-error text-white shadow-sm hover:bg-error/90 focus-visible:ring-error',
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-10 rounded-lg px-4 text-sm',
        lg: 'h-12 rounded-lg px-6 text-base',
        icon: 'h-10 w-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows a spinner and disables the button while preserving its width. */
  loading?: boolean;
  /** ReactNode rendered before the button label. */
  leftIcon?: ReactNode;
  /** ReactNode rendered after the button label. */
  rightIcon?: ReactNode;
}

/**
 * A polymorphic Button component with variant, size, loading, and icon support.
 *
 * @example
 * // Basic variants
 * <Button variant="primary" size="md">Apply Now</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * <Button variant="destructive">Delete</Button>
 *
 * // Loading state — preserves width, shows spinner, disables interaction
 * <Button loading>Submitting…</Button>
 *
 * // With icons
 * <Button leftIcon={<PlusIcon />}>Add Job</Button>
 * <Button rightIcon={<ArrowRightIcon />} variant="accent">Next</Button>
 *
 * // Icon-only
 * <Button variant="ghost" size="icon" aria-label="Open menu"><MenuIcon /></Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      disabled={disabled || loading}
      aria-disabled={disabled || loading || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* Left icon slot — hidden when loading so the spinner replaces it */}
      {loading ? (
        <Spinner />
      ) : (
        leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )
      )}

      {/* Label — always rendered to preserve button width during loading */}
      {children}

      {/* Right icon slot — hidden during loading to keep visual balance */}
      {!loading && rightIcon && (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
