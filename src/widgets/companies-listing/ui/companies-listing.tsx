import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '@/shared/components/layout';
import { Button, Card } from '@/shared/components/ui';
import { COMPANIES, filterCompanies, sortCompanies, type CompanyFilters } from '@/entities/company';
import { CompanyCard } from './company-card';
import { CompaniesControls } from './companies-controls';
import { CompaniesEmptyState } from './companies-empty-state';
import { CompaniesPagination } from './companies-pagination';
import { CompaniesSkeleton } from './companies-skeleton';

const PAGE_SIZE = 6;

const INITIAL_FILTERS: CompanyFilters = {
  query: '',
  industry: 'all',
  size: 'all',
  location: 'all',
  positions: 'all',
  sortBy: 'az',
};

function readFiltersFromSearchParams(searchParams: URLSearchParams): CompanyFilters {
  const sortBy = searchParams.get('sortBy');

  return {
    query: searchParams.get('q')?.trim() ?? '',
    industry: searchParams.get('industry') ?? INITIAL_FILTERS.industry,
    size: searchParams.get('size') ?? INITIAL_FILTERS.size,
    location: searchParams.get('location') ?? INITIAL_FILTERS.location,
    positions: searchParams.get('positions') ?? INITIAL_FILTERS.positions,
    sortBy: sortBy === 'most-jobs' || sortBy === 'newest' ? sortBy : INITIAL_FILTERS.sortBy,
  };
}

function readPageFromSearchParams(searchParams: URLSearchParams) {
  const rawPage = Number(searchParams.get('page') ?? '1');

  if (!Number.isFinite(rawPage) || rawPage < 1) {
    return 1;
  }

  return Math.floor(rawPage);
}

function CompaniesListing() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => readFiltersFromSearchParams(searchParams), [searchParams]);
  const currentPage = useMemo(() => readPageFromSearchParams(searchParams), [searchParams]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timeout);
  }, []);

  const filteredCompanies = useMemo(() => {
    return sortCompanies(filterCompanies(COMPANIES, filters), filters.sortBy);
  }, [filters]);

  const totalResults = filteredCompanies.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + PAGE_SIZE);

  function updateSearchParams(nextParams: Partial<Record<'q' | 'industry' | 'size' | 'location' | 'positions' | 'sortBy' | 'page', string>>) {
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

  function updateFilter<K extends keyof CompanyFilters>(key: K, value: CompanyFilters[K]) {
    const nextFilters = { ...filters, [key]: value };

    updateSearchParams({
      q: nextFilters.query.trim(),
      industry: nextFilters.industry === INITIAL_FILTERS.industry ? '' : nextFilters.industry,
      size: nextFilters.size === INITIAL_FILTERS.size ? '' : nextFilters.size,
      location: nextFilters.location === INITIAL_FILTERS.location ? '' : nextFilters.location,
      positions: nextFilters.positions === INITIAL_FILTERS.positions ? '' : nextFilters.positions,
      sortBy: nextFilters.sortBy === INITIAL_FILTERS.sortBy ? '' : nextFilters.sortBy,
      page: '1',
    });
  }

  function resetFilters() {
    updateSearchParams({
      q: '',
      industry: '',
      size: '',
      location: '',
      positions: '',
      sortBy: '',
      page: '1',
    });
  }

  if (loading) {
    return <CompaniesSkeleton />;
  }

  return (
    <section aria-labelledby="companies-listing-heading" className="py-10 sm:py-12">
      <Container padding="md">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Company directory
            </p>
            <h2 id="companies-listing-heading" className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">
              Explore verified companies actively hiring
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
              Discover companies by industry, size, and hiring activity. Search instantly and compare employers at a glance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            <Card className="p-4">
              <p className="text-2xl font-semibold text-text-primary">{COMPANIES.length}</p>
              <p className="mt-1 text-sm text-text-secondary">Total companies</p>
            </Card>
            <Card className="p-4">
              <p className="text-2xl font-semibold text-text-primary">{COMPANIES.filter((company) => company.verified).length}</p>
              <p className="mt-1 text-sm text-text-secondary">Verified</p>
            </Card>
            <Card className="col-span-2 p-4 sm:col-span-1">
              <p className="text-2xl font-semibold text-text-primary">
                {COMPANIES.reduce((sum, company) => sum + company.openJobs, 0)}
              </p>
              <p className="mt-1 text-sm text-text-secondary">Open roles</p>
            </Card>
          </div>
        </div>
      </Container>

      <CompaniesControls filters={filters} onChange={updateFilter} />

      <Container padding="md" className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-text-secondary">
            {loading ? 'Loading companies...' : `${totalResults} compan${totalResults === 1 ? 'y' : 'ies'} found`}
          </p>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      </Container>

      {totalResults === 0 ? (
        <Container padding="md" className="mt-6">
          <CompaniesEmptyState onReset={resetFilters} />
        </Container>
      ) : (
        <Container padding="md" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginatedCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          <CompaniesPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            startIndex={startIndex}
            endIndex={Math.min(startIndex + PAGE_SIZE, totalResults) - 1}
            onPageChange={(page) => updateSearchParams({ page: String(page) })}
          />
        </Container>
      )}
    </section>
  );
}

export { CompaniesListing };
