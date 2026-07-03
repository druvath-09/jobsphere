import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/layout';
import { Button } from '@/shared/components/ui';
import { getJobsPath } from '@/shared/constants/routes';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const POPULAR_SEARCHES = ['React', 'Python', 'Java', 'Remote', 'AI', 'Backend'];

const TRUSTED_COMPANIES = [
  'Google',
  'Microsoft',
  'Amazon',
  'Stripe',
  'Adobe',
  'Atlassian',
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.5 17.5l-4.167-4.167M13.333 8.333A5 5 0 1 1 3.333 8.333a5 5 0 0 1 10 0z"
      />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5V17h5v-3.5a2 2 0 1 1 4 0V17h5V9.5M1 9l9-7 9 7"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection Component                                              */
/* ------------------------------------------------------------------ */

/**
 * HeroSection — compact, functional hero section.
 *
 * No decorative blobs, no floating cards. Clean typography-led layout
 * with a practical search bar, secondary CTA, and trusted company strip.
 *
 * Inspired by Wellfound, Ashby, and LinkedIn Jobs aesthetics.
 */
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(getJobsPath(searchQuery));
  }

  return (
    <section
      className="bg-surface border-b border-border"
      aria-labelledby="hero-heading"
    >
      <Container padding="md" className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">

          {/* Eyebrow */}
          <p className="mb-3 text-sm font-medium text-primary">
            5,000+ verified tech roles
          </p>

          {/* Headline — typography-led, no gradient */}
          <h1
            id="hero-heading"
            className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl"
          >
            Find your next software{' '}
            engineering job.
          </h1>

          {/* Description */}
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            Discover verified opportunities from startups, product companies
            and enterprises. Apply directly — no middlemen.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            role="search"
            aria-label="Job search"
          >
            <div className="relative flex-1">
              <SearchIcon className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Role, company or skill..."
                aria-label="Search by role, company or skill"
                className={cn(
                  'h-11 w-full rounded-lg border border-border bg-surface',
                  'pl-10 pr-4 text-sm text-text-primary',
                  'placeholder:text-text-secondary',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary',
                  'hover:border-secondary/40',
                )}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="flex-1 sm:flex-none sm:px-6"
              >
                Search Jobs
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                leftIcon={<BuildingIcon className="h-4 w-4" />}
                className="flex-1 sm:flex-none"
                onClick={() => navigate('/companies')}
              >
                Browse Companies
              </Button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-text-secondary">Popular:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                className={cn(
                  'rounded-full border border-border bg-surface px-3 py-1',
                  'text-xs font-medium text-text-secondary',
                  'transition-colors duration-150',
                  'hover:border-primary/40 hover:text-primary hover:bg-primary/5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                  'cursor-pointer',
                )}
                onClick={() => setSearchQuery(term)}
              >
                {term}
              </button>
            ))}
          </div>

          {/* Trusted by strip */}
          <div className="mt-10 pt-8 border-t border-border">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-text-secondary">
              Trusted by engineers at
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {TRUSTED_COMPANIES.map((company) => (
                <span
                  key={company}
                  className="text-sm font-semibold text-text-secondary/60 select-none"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
