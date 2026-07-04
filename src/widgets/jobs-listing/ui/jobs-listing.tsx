import { useEffect, useMemo, useState, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/shared/components/layout';
import { Button } from '@/shared/components/ui';
import { JOBS, filterJobs, sortJobs, getJobDetails, type JobFilters } from '@/entities/job';
import { JobCard } from './job-card';
import { JobsControls } from './jobs-controls';
import { JobsPagination } from './jobs-pagination';
import { JobsSkeleton } from './jobs-skeleton';
import { JobDetailsContent } from '@/widgets/job-details';

const PAGE_SIZE = 6;

const INITIAL_FILTERS: JobFilters = {
  query: '',
  location: 'all',
  experience: 'all',
  employmentType: 'all',
  salary: 'all',
  sortBy: 'relevance',
};

function readFiltersFromSearchParams(searchParams: URLSearchParams): JobFilters {
  const sortBy = searchParams.get('sortBy');

  return {
    query: searchParams.get('q')?.trim() ?? '',
    location: searchParams.get('location') ?? INITIAL_FILTERS.location,
    experience: searchParams.get('experience') ?? INITIAL_FILTERS.experience,
    employmentType: searchParams.get('employmentType') ?? INITIAL_FILTERS.employmentType,
    salary: searchParams.get('salary') ?? INITIAL_FILTERS.salary,
    sortBy: sortBy === 'newest' || sortBy === 'salary-high' || sortBy === 'salary-low'
      ? sortBy
      : INITIAL_FILTERS.sortBy,
  };
}

function readPageFromSearchParams(searchParams: URLSearchParams) {
  const rawPage = Number(searchParams.get('page') ?? '1');

  if (!Number.isFinite(rawPage) || rawPage < 1) {
    return 1;
  }

  return Math.floor(rawPage);
}

function JobsListing() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, currentPage] = useMemo(() => {
    return [readFiltersFromSearchParams(searchParams), readPageFromSearchParams(searchParams)] as const;
  }, [searchParams]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timeout);
  }, []);

  const filteredJobs = useMemo(() => {
    const results = filterJobs(JOBS, filters);
    return sortJobs(results, filters.sortBy);
  }, [filters]);

  const totalResults = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + PAGE_SIZE);

  const selectedJobId = searchParams.get('selected');
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paginatedJobs.length > 0) {
      if (!selectedJobId || !filteredJobs.find(j => j.id === selectedJobId)) {
        if (paginatedJobs[0]) {
          updateSearchParams({ selected: paginatedJobs[0].id });
        }
      }
    } else {
      if (selectedJobId) {
        updateSearchParams({ selected: '' });
      }
    }
  }, [paginatedJobs, filteredJobs, selectedJobId]);

  useEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedJobId]);

  const selectedJobData = useMemo(() => {
    if (!selectedJobId) return null;
    return getJobDetails(selectedJobId) || null;
  }, [selectedJobId]);

  function updateSearchParams(nextParams: Partial<Record<'q' | 'location' | 'experience' | 'employmentType' | 'salary' | 'sortBy' | 'page' | 'selected', string>>) {
    const nextSearchParams = new URLSearchParams(searchParams);

    Object.entries(nextParams).forEach(([key, value]) => {
      if (!value) {
        nextSearchParams.delete(key);
        return;
      }
      nextSearchParams.set(key, value);
    });

    setSearchParams(nextSearchParams, { replace: true });
  }

  function updateFilter<K extends keyof JobFilters>(key: K, value: JobFilters[K]) {
    const nextFilters = { ...filters, [key]: value };

    updateSearchParams({
      q: nextFilters.query.trim(),
      location: nextFilters.location === INITIAL_FILTERS.location ? '' : nextFilters.location,
      experience: nextFilters.experience === INITIAL_FILTERS.experience ? '' : nextFilters.experience,
      employmentType: nextFilters.employmentType === INITIAL_FILTERS.employmentType ? '' : nextFilters.employmentType,
      salary: nextFilters.salary === INITIAL_FILTERS.salary ? '' : nextFilters.salary,
      sortBy: nextFilters.sortBy === INITIAL_FILTERS.sortBy ? '' : nextFilters.sortBy,
      page: '1',
      selected: '',
    });
  }

  function resetFilters() {
    updateSearchParams({
      q: '',
      location: '',
      experience: '',
      employmentType: '',
      salary: '',
      sortBy: '',
      page: '1',
      selected: '',
    });
  }

  function handleLeftListKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (!paginatedJobs.length) return;
    
    const currentIndex = paginatedJobs.findIndex(j => j.id === selectedJobId);
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentIndex < paginatedJobs.length - 1) {
        updateSearchParams({ selected: paginatedJobs[currentIndex + 1]!.id });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentIndex > 0) {
        updateSearchParams({ selected: paginatedJobs[currentIndex - 1]!.id });
      }
    }
  }

  if (loading) {
    return (
      <div className="py-10 sm:py-12">
        <Container padding="md">
          <JobsSkeleton />
        </Container>
      </div>
    );
  }

  return (
    <section aria-labelledby="jobs-listing-heading" className="bg-background">
      <div className="py-10 sm:py-12">
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
          </div>
        </Container>
      </div>

      <div className="border-b border-border pb-4 pt-4 bg-background">
        <Container padding="md">
          <JobsControls filters={filters} onChange={updateFilter} />
        </Container>
      </div>

      <div className="bg-surface-hover/30 pt-6 pb-12 min-h-[calc(100vh-15rem)]">
        {totalResults === 0 ? (
          <Container padding="md">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start max-w-5xl mx-auto">
              <div className="rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-2">No jobs found</h3>
                <p className="text-text-secondary mb-6">Try changing your filters or searching with different keywords.</p>
                <Button onClick={resetFilters}>Clear Filters</Button>
              </div>
              <div className="hidden lg:flex rounded-xl border border-border bg-surface p-8 shadow-sm h-full items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-1">Select a different search</h3>
                  <p className="text-sm text-text-secondary">Adjust your filters to see available roles here.</p>
                </div>
              </div>
            </div>
          </Container>
        ) : (
          <Container padding="md" className="max-w-[1400px]">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
              
              {/* Left Panel */}
              <div 
                className="flex flex-col gap-4 lg:w-[40%] xl:w-[35%] lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                tabIndex={0}
                onKeyDown={handleLeftListKeyDown}
                ref={leftPanelRef}
                aria-label="Job list (Use up and down arrows to navigate)"
              >
                <div className="flex items-center justify-between px-1">
                  <p className="text-sm font-medium text-text-secondary">
                    Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, totalResults)} of {totalResults} jobs
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {paginatedJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      isSelected={job.id === selectedJobId}
                      onSelect={() => updateSearchParams({ selected: job.id })}
                    />
                  ))}
                </div>
                
                <div className="mt-4 mb-8">
                  <JobsPagination
                    currentPage={safeCurrentPage}
                    totalPages={totalPages}
                    totalResults={totalResults}
                    startIndex={startIndex}
                    endIndex={Math.min(startIndex + PAGE_SIZE, totalResults) - 1}
                    onPageChange={(page) => {
                      updateSearchParams({ page: String(page) });
                      if (leftPanelRef.current) {
                        leftPanelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  />
                </div>
              </div>

              {/* Right Panel */}
              <div 
                ref={rightPanelRef}
                className="hidden lg:block lg:w-[60%] xl:w-[65%] lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto rounded-xl border border-border bg-surface shadow-md relative"
              >
                {selectedJobData ? (
                  <JobDetailsContent job={selectedJobData} isSplitView={true} />
                ) : (
                  <div className="flex h-full min-h-[500px] flex-col items-center justify-center p-8 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Select a role</h3>
                    <p className="text-text-secondary max-w-sm">Click on a job from the list to view its complete description, requirements, and benefits here.</p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        )}
      </div>
    </section>
  );
}

export { JobsListing };