import { Button } from '@/shared/components/ui';

interface JobsEmptyStateProps {
  onReset: () => void;
}

function JobsEmptyState({ onReset }: JobsEmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-surface px-6 py-14 text-center shadow-sm sm:px-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-text-secondary">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 5.5h3M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 8.5h7M8.5 11.5h5" />
        </svg>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-text-primary">No jobs match your filters</h3>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Try widening the location, experience, salary, or search terms.
      </p>
      <div className="mt-6 flex justify-center">
        <Button variant="outline" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}

export { JobsEmptyState };