import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string | undefined;
  error?: string | undefined;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, id, label, helperText, error, required, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const descriptionId = `${textareaId}-description`;
    const hasDescription = Boolean(error ?? helperText);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
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
        <textarea
          id={textareaId}
          ref={ref}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={hasDescription ? descriptionId : undefined}
          className={cn(
            'flex w-full rounded-lg border min-h-[80px]',
            'bg-surface px-3 py-2 text-sm text-text-primary',
            'placeholder:text-text-secondary',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-error focus-visible:ring-error/30'
              : 'border-border focus-visible:ring-primary/30',
            className,
          )}
          {...props}
        />
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
Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
