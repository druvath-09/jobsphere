import { useState, type FormEvent } from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/layout';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/shared/components/ui';

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const POPULAR_SEARCHES = ['React', 'Python', 'Java', 'Remote', 'Full Stack'];

const FEATURED_JOB = {
  company: 'NovaTech',
  companyInitial: 'N',
  title: 'Senior Frontend Engineer',
  location: 'Hyderabad',
  salary: '₹18–25 LPA',
  type: 'Remote',
  tags: ['React', 'TypeScript', 'Next.js'],
} as const;

/* ------------------------------------------------------------------ */
/*  Search Icon                                                        */
/* ------------------------------------------------------------------ */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Location Pin Icon                                                  */
/* ------------------------------------------------------------------ */

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433a19.695 19.695 0 002.683-2.006c1.9-1.705 3.945-4.28 3.945-7.343a8 8 0 00-16 0c0 3.064 2.045 5.638 3.945 7.343a19.695 19.695 0 002.683 2.006 12.31 12.31 0 00.757.433l.14.071.07.036.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Currency Icon                                                      */
/* ------------------------------------------------------------------ */

function CurrencyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.732 6.232a2.5 2.5 0 013.536 0 .75.75 0 101.06-1.06A4 4 0 006.5 8H6a.75.75 0 000 1.5h.25v1H6a.75.75 0 000 1.5h.5A4 4 0 0013.328 14.828a.75.75 0 10-1.06-1.06 2.5 2.5 0 01-3.536 0 .75.75 0 00-1.06 1.06A4.002 4.002 0 006.5 12H6a.75.75 0 010-1.5h.5v-1H6A.75.75 0 016 8h.5a4 4 0 011.232-1.768z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Job Card                                                  */
/* ------------------------------------------------------------------ */

function FeaturedJobCard() {
  return (
    <Card
      interactive
      className={cn(
        'group/card relative overflow-hidden',
        'border-border/40',
        'shadow-md hover:shadow-lg',
        'transition-all duration-300 ease-out',
      )}
    >
      {/* Subtle gradient accent along the top */}
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
        aria-hidden="true"
      />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          {/* Company logo placeholder */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center',
                'rounded-xl',
                'bg-gradient-to-br from-primary/10 to-accent/10',
                'text-lg font-bold text-primary',
                'ring-1 ring-border/50',
                'transition-transform duration-300 group-hover/card:scale-105',
              )}
              aria-hidden="true"
            >
              {FEATURED_JOB.companyInitial}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">
                {FEATURED_JOB.company}
              </p>
              <p className="text-xs text-text-secondary">AI · SaaS Platform</p>
            </div>
          </div>
          <Badge variant="info">{FEATURED_JOB.type}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <h3 className="text-base font-semibold leading-snug text-text-primary">
          {FEATURED_JOB.title}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <MapPinIcon className="h-3.5 w-3.5" />
            {FEATURED_JOB.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <CurrencyIcon className="h-3.5 w-3.5" />
            {FEATURED_JOB.salary}
          </span>
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5">
          {FEATURED_JOB.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t border-border/50 pt-4">
        <Button variant="primary" size="sm" className="w-full justify-center">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Pills (social proof)                                          */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: '5,000+', label: 'Active Jobs' },
  { value: '1,200+', label: 'Companies' },
  { value: '50K+', label: 'Developers' },
] as const;

function StatPills() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      {STATS.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="font-bold text-text-primary">{stat.value}</span>
            <span className="text-xs text-text-secondary">{stat.label}</span>
          </div>
          {i < STATS.length - 1 && (
            <div className="h-8 w-px bg-border" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection Component                                              */
/* ------------------------------------------------------------------ */

/**
 * HeroSection — the premium landing page hero.
 *
 * Two-column layout on desktop:
 * - Left: badge, headline, subtext, search bar with CTA, popular chips, stats
 * - Right: featured job card
 *
 * Stacks vertically on mobile with the search form first for UX priority.
 *
 * Uses all existing UI primitives (Button, Badge, Card, Input pattern)
 * and design tokens. No Firebase, routing, or authentication.
 */
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Search functionality will be implemented in a future phase.
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-b from-primary/[0.03] via-background to-background',
      )}
      aria-labelledby="hero-heading"
    >
      {/* Background decorative glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Central radial glow */}
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[128px]" />
        {/* Offset accent glow */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/[0.04] blur-[100px]" />
      </div>

      <Container padding="md" className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ---- Left Column: Copy + Search ---- */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow badge */}
            <div>
              <Badge
                variant="primary"
                className={cn(
                  'px-3 py-1 text-[13px]',
                  'animate-[fadeInUp_0.5s_ease-out_both]',
                )}
              >
                🚀 5,000+ Active Tech Jobs
              </Badge>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className={cn(
                'text-3xl font-extrabold leading-[1.15] tracking-tight',
                'text-text-primary',
                'sm:text-4xl lg:text-[2.75rem] xl:text-5xl',
              )}
            >
              Find your next{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                engineering
              </span>{' '}
              role.
            </h1>

            {/* Supporting text */}
            <p className="max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
              Discover verified opportunities from startups and global
              companies. Search, save and apply&nbsp;—&nbsp;all in one place.
            </p>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className={cn(
                'flex flex-col gap-3 sm:flex-row sm:items-stretch',
                'w-full max-w-xl',
              )}
              role="search"
              aria-label="Job search"
            >
              <div className="relative flex-1">
                <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by role, company or skill..."
                  aria-label="Search by role, company or skill"
                  className={cn(
                    'h-14 w-full rounded-2xl border border-border/60',
                    'bg-surface/80 pl-12 pr-5 text-base text-text-primary',
                    'placeholder:text-text-secondary/60',
                    'transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/60',
                    'hover:border-border',
                    'sm:rounded-r-none sm:border-r-0',
                  )}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                leftIcon={<SearchIcon className="h-4 w-4" />}
                className={cn(
                  'h-14 shrink-0 rounded-2xl',
                  'shadow-md shadow-primary/25',
                  'hover:shadow-lg hover:shadow-primary/30',
                  'sm:rounded-l-none sm:rounded-r-2xl',
                )}
              >
                Search Jobs
              </Button>
            </form>

            {/* Popular searches */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-text-secondary">
                Popular:
              </span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  className={cn(
                    'rounded-full border border-border bg-surface',
                    'px-3 py-1 text-xs font-medium text-text-secondary',
                    'transition-all duration-200',
                    'hover:border-primary/40 hover:bg-primary/5 hover:text-primary',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
                    'cursor-pointer',
                  )}
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Social proof stats */}
            <div className="mt-2">
              <StatPills />
            </div>
          </div>

          {/* ---- Right Column: Featured Job Card ---- */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Glow effect behind card */}
              <div
                className={cn(
                  'absolute -inset-4 -z-10 rounded-3xl',
                  'bg-gradient-to-br from-primary/[0.08] via-transparent to-accent/[0.06]',
                  'blur-3xl',
                  'opacity-50',
                )}
                aria-hidden="true"
              />

              {/* "Featured" label */}
              <div className="mb-3 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  Featured
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>

              <FeaturedJobCard />

              {/* Floating accent dots */}
              <div
                className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-accent/20 blur-sm"
                aria-hidden="true"
              />
              <div
                className="absolute -top-3 -right-3 h-4 w-4 rounded-full bg-primary/20 blur-sm"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
