import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/layout';
import { getJobsPath } from '@/shared/constants/routes';

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 8l8-5 8 5-8 5-8-5zM2 13l8 5 8-5M2 10.5l8 5 8-5" />
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14v4H3v-4zm0 7h14v4H3v-4zm4 2h.01M3 6.5h.01" />
    </svg>
  );
}

function CodeBracketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 5L3 10l4 5M13 5l4 5-4 5M11 3l-2 14" />
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3H4a1 1 0 00-1 1v3M1 7h2M1 13h2M17 7h2M17 13h2M7 17H4a1 1 0 01-1-1v-3m10 4h3a1 1 0 001-1v-3m0-7V4a1 1 0 00-1-1h-3M7 3v2m6-2v2M7 17v-2m6 2v-2M6 7h8v6H6V7z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12V5M12 12V8M8 12v-2M4 12v-5" />
      <path strokeLinecap="round" d="M2 15h16" />
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 16A4.5 4.5 0 015 7.1a5 5 0 019.9-.6A3.5 3.5 0 0115 14" />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h14M3 3h14v14H3V3zm3 7l3-3-3-3m5 6h3" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <rect x="5" y="2" width="10" height="16" rx="2" strokeLinecap="round" />
      <path strokeLinecap="round" d="M8 16h4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Category {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  jobCount: number;
  query: string;
}

const CATEGORIES: Category[] = [
  { label: 'Frontend',   icon: LayersIcon,       jobCount: 1240, query: 'frontend' },
  { label: 'Backend',    icon: ServerIcon,       jobCount: 1832, query: 'backend' },
  { label: 'Full Stack', icon: CodeBracketIcon,  jobCount: 978,  query: 'full stack' },
  { label: 'AI & ML',    icon: CpuIcon,          jobCount: 543,  query: 'ai' },
  { label: 'Data',       icon: ChartIcon,        jobCount: 761,  query: 'data' },
  { label: 'Cloud',      icon: CloudIcon,        jobCount: 489,  query: 'cloud' },
  { label: 'DevOps',     icon: TerminalIcon,     jobCount: 412, query: 'devops' },
  { label: 'Mobile',     icon: PhoneIcon,        jobCount: 334,  query: 'mobile' },
];

/* ------------------------------------------------------------------ */
/*  Category Card                                                      */
/* ------------------------------------------------------------------ */

function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <Link
      to={getJobsPath(category.query)}
      className={cn(
        'group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5',
        'transition-all duration-200',
        'hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4.5 w-4.5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors duration-150">
          {category.label}
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">
          {category.jobCount.toLocaleString()} jobs
        </p>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  PopularCategories Component                                        */
/* ------------------------------------------------------------------ */

/**
 * PopularCategories — 8-item grid of job category cards.
 * Each card has an icon, category label, and live job count.
 */
function PopularCategories() {
  return (
    <section
      aria-labelledby="categories-heading"
      className="border-t border-border py-12 sm:py-16"
    >
      <Container padding="md">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2
              id="categories-heading"
              className="text-xl font-semibold text-text-primary"
            >
              Browse by category
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Explore roles by engineering discipline
            </p>
          </div>
          <Link
            to="/jobs"
            className={cn(
              'hidden text-sm font-medium text-primary sm:block',
              'transition-colors duration-150 hover:text-primary/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'rounded-sm',
            )}
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.label} category={category} />
          ))}
        </div>

      </Container>
    </section>
  );
}

export { PopularCategories };
