import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  children: ReactNode;
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
    </svg>
  );
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, id, label, helperText, error, required, children, ...props }, ref) => {
    const generatedId = id ?? useId();
    const descriptionId = `${generatedId}-description`;
    const hasDescription = Boolean(error ?? helperText);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={generatedId} className="text-sm font-medium text-text-primary">
            {label}
            {required && (
              <span className="ml-0.5 text-error" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            id={generatedId}
            ref={ref}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            className={cn(
              'flex h-10 w-full appearance-none rounded-lg border bg-surface px-3 pr-10 py-2 text-sm text-text-primary',
              'transition-colors duration-200 placeholder:text-text-secondary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:border-primary',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error
                ? 'border-error focus-visible:ring-error/30'
                : 'border-border focus-visible:ring-primary/30',
              className,
            )}
            {...props}
          >
            {children}
          </select>

          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        </div>

        {hasDescription && (
          <p
            id={descriptionId}
            className={cn('text-xs', error ? 'text-error' : 'text-text-secondary')}
            role={error ? 'alert' : undefined}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

export { Select };
export type { SelectProps };