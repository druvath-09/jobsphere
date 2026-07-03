import { Button } from '@/shared/components/ui';

interface CompaniesEmptyStateProps {
  onReset: () => void;
}

function CompaniesEmptyState({ onReset }: CompaniesEmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-surface px-6 py-14 text-center shadow-sm sm:px-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-text-secondary">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15M7 19.5v-13h10v13M10 19.5v-4h4v4M8.5 9h1M8.5 12h1M14.5 9h1M14.5 12h1" />
        </svg>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-text-primary">No companies match your filters</h3>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Try widening the industry, size, location, or search terms.
      </p>
      <div className="mt-6 flex justify-center">
        <Button variant="outline" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}

export { CompaniesEmptyState };
