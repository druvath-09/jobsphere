import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input. Automatically connected via htmlFor/id. */
  label?: string;
  /** Helper text shown below the input (hidden when `error` is provided). */
  helperText?: string;
  /** Error message shown below the input. Overrides helperText and applies error styling. */
  error?: string;
}

/**
 * A styled Input component with optional label, helper text, and error state.
 *
 * Features:
 * - Automatically generates a unique id and connects <label> via htmlFor.
 * - Uses aria-describedby to associate helper/error text with the input.
 * - Uses aria-invalid when an error is present.
 * - Shows a required indicator (*) when `required` is set.
 * - Consumes design tokens for all color, border, and focus styles.
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@company.com" required />
 * <Input label="Search" helperText="Try 'React', 'Node.js', or 'Remote'" />
 * <Input label="Password" type="password" error="Password must be at least 8 characters" />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = 'text', id, label, helperText, error, required, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const hasDescription = Boolean(error ?? helperText);

    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
            {required && (
              <span className="ml-0.5 text-error" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input field */}
        <input
          id={inputId}
          type={type}
          ref={ref}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          className={cn(
            'flex h-10 w-full rounded-lg border',
            'bg-surface px-3 py-2 text-sm text-text-primary',
            'placeholder:text-text-secondary',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            error
              ? 'border-error focus-visible:ring-error/30'
              : 'border-border focus-visible:ring-primary/30',
            className,
          )}
          {...props}
        />

        {/* Helper / Error text */}
        {hasDescription && (
          <p
            id={descriptionId}
            className={cn(
              'text-xs',
              error ? 'text-error' : 'text-text-secondary',
            )}
            role={error ? 'alert' : undefined}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
export type { InputProps };
