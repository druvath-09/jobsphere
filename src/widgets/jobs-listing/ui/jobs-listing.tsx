import { useEffect, useMemo, useState } from 'react';
import { Container } from '@/shared/components/layout';
import { Button, Card } from '@/shared/components/ui';
import { JOBS, filterJobs, sortJobs, type JobFilters } from '@/entities/job';
import { JobCard } from './job-card';
import { JobsControls } from './jobs-controls';
import { JobsEmptyState } from './jobs-empty-state';
import { JobsPagination } from './jobs-pagination';
import { JobsSkeleton } from './jobs-skeleton';

const PAGE_SIZE = 6;

const INITIAL_FILTERS: JobFilters = {
  query: '',
  location: 'all',
  experience: 'all',
  employmentType: 'all',
  salary: 'all',
  sortBy: 'relevance',
};

interface JobsListingProps {
  initialQuery?: string;
}

function JobsListing({ initialQuery = '' }: JobsListingProps) {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>(() => ({
    ...INITIAL_FILTERS,
    query: initialQuery.trim(),
  }));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const nextQuery = initialQuery.trim();

    setFilters((previous) => {
      if (previous.query === nextQuery) {
        return previous;
      }

      return {
        ...previous,
        query: nextQuery,
      };
    });
    setCurrentPage(1);
  }, [initialQuery]);

  const filteredJobs = useMemo(() => {
    const results = filterJobs(JOBS, filters);
    return sortJobs(results, filters.sortBy);
  }, [filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.query, filters.location, filters.experience, filters.employmentType, filters.salary, filters.sortBy]);

  const totalResults = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + PAGE_SIZE);

  function updateFilter<K extends keyof JobFilters>(key: K, value: JobFilters[K]) {
    setFilters((previous) => ({ ...previous, [key]: value }));
  }

  function resetFilters() {
    setFilters(INITIAL_FILTERS);
  }

  if (loading) {
    return <JobsSkeleton />;
  }

  return (
    <section aria-labelledby="jobs-listing-heading" className="py-10 sm:py-12">
      <Container padding="md">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Live job market
            </p>
            <h2 id="jobs-listing-heading" className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">
              Explore roles tailored to your next move
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
              Search product, engineering, design, and operations openings with filters for location,
              experience, employment type, and salary.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            <Card className="p-4">
              <p className="text-2xl font-semibold text-text-primary">{JOBS.length}</p>
              <p className="mt-1 text-sm text-text-secondary">Open roles</p>
            </Card>
            <Card className="p-4">
              <p className="text-2xl font-semibold text-text-primary">
                {new Set(JOBS.map((job) => job.location)).size}
              </p>
              <p className="mt-1 text-sm text-text-secondary">Locations</p>
            </Card>
            <Card className="col-span-2 p-4 sm:col-span-1">
              <p className="text-2xl font-semibold text-text-primary">
                {JOBS.filter((job) => job.workMode === 'Remote').length}
              </p>
              <p className="mt-1 text-sm text-text-secondary">Remote roles</p>
            </Card>
          </div>
        </div>
      </Container>

      <JobsControls filters={filters} onChange={updateFilter} />

      <Container padding="md" className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-text-secondary">
            {loading ? 'Loading jobs...' : `${totalResults} role${totalResults === 1 ? '' : 's'} found`}
          </p>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      </Container>

      {totalResults === 0 ? (
        <Container padding="md" className="mt-6">
          <JobsEmptyState onReset={resetFilters} />
        </Container>
      ) : (
        <Container padding="md" className="mt-6">
          <div className="grid gap-4">
            {paginatedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <JobsPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            startIndex={startIndex}
            endIndex={Math.min(startIndex + PAGE_SIZE, totalResults) - 1}
            onPageChange={setCurrentPage}
          />
        </Container>
      )}
    </section>
  );
}

export { JobsListing };