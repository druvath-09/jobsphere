import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/layout';
import { Button, Badge } from '@/shared/components/ui';

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8.667A2 2 0 1 0 8 4.667a2 2 0 0 0 0 4zM8 1.333C5.42 1.333 3.333 3.42 3.333 6c0 3.5 4.667 8.667 4.667 8.667S12.667 9.5 12.667 6c0-2.58-2.087-4.667-4.667-4.667z" />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.333 14L8 10.667 12.667 14V2.667A1.333 1.333 0 0 0 11.333 1.333H4.667A1.333 1.333 0 0 0 3.333 2.667V14z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx="8" cy="8" r="6.333" strokeLinecap="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5v3.333L10 10" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface JobListing {
  id: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  workMode: 'Remote' | 'Hybrid' | 'Onsite';
  salary: string;
  experience: string;
  postedDaysAgo: number;
  tags: string[];
}

const JOB_LISTINGS: JobListing[] = [
  {
    id: '1',
    company: 'NovaTech',
    companyInitial: 'N',
    companyColor: '#0F766E',
    title: 'Senior Frontend Engineer',
    location: 'Hyderabad',
    type: 'Full-time',
    workMode: 'Remote',
    salary: '₹18–25 LPA',
    experience: '4–7 yrs',
    postedDaysAgo: 1,
    tags: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: '2',
    company: 'VertexLabs',
    companyInitial: 'V',
    companyColor: '#7C3AED',
    title: 'Staff Backend Engineer',
    location: 'Bangalore',
    type: 'Full-time',
    workMode: 'Hybrid',
    salary: '₹30–45 LPA',
    experience: '7–12 yrs',
    postedDaysAgo: 2,
    tags: ['Go', 'gRPC', 'Kubernetes'],
  },
  {
    id: '3',
    company: 'CloudPeak',
    companyInitial: 'C',
    companyColor: '#0284C7',
    title: 'Platform Engineer — SRE',
    location: 'Pune',
    type: 'Full-time',
    workMode: 'Remote',
    salary: '₹22–32 LPA',
    experience: '5–9 yrs',
    postedDaysAgo: 2,
    tags: ['AWS', 'Terraform', 'Prometheus'],
  },
  {
    id: '4',
    company: 'ByteForge',
    companyInitial: 'B',
    companyColor: '#DC2626',
    title: 'Full Stack Engineer',
    location: 'Mumbai',
    type: 'Full-time',
    workMode: 'Hybrid',
    salary: '₹14–20 LPA',
    experience: '2–5 yrs',
    postedDaysAgo: 3,
    tags: ['Node.js', 'React', 'PostgreSQL'],
  },
  {
    id: '5',
    company: 'HorizonAI',
    companyInitial: 'H',
    companyColor: '#D97706',
    title: 'ML Engineer — Inference',
    location: 'Gurgaon',
    type: 'Full-time',
    workMode: 'Onsite',
    salary: '₹28–40 LPA',
    experience: '4–8 yrs',
    postedDaysAgo: 4,
    tags: ['Python', 'PyTorch', 'CUDA'],
  },
  {
    id: '6',
    company: 'PrismaFlow',
    companyInitial: 'P',
    companyColor: '#059669',
    title: 'Android Engineer',
    location: 'Chennai',
    type: 'Full-time',
    workMode: 'Remote',
    salary: '₹16–24 LPA',
    experience: '3–6 yrs',
    postedDaysAgo: 5,
    tags: ['Kotlin', 'Jetpack Compose', 'Retrofit'],
  },
];

/* ------------------------------------------------------------------ */
/*  Work mode badge variant helper                                     */
/* ------------------------------------------------------------------ */

function workModeBadgeVariant(mode: JobListing['workMode']) {
  switch (mode) {
    case 'Remote':  return 'success' as const;
    case 'Hybrid':  return 'warning' as const;
    case 'Onsite':  return 'secondary' as const;
  }
}

/* ------------------------------------------------------------------ */
/*  Job Card                                                           */
/* ------------------------------------------------------------------ */

function JobCard({ job }: { job: JobListing }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-border bg-surface p-5',
        'transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5',
        'sm:flex-row sm:items-start sm:gap-4',
      )}
    >
      {/* Company logo */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
        style={{ backgroundColor: job.companyColor }}
        aria-hidden="true"
      >
        {job.companyInitial}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-2.5 min-w-0">
        {/* Company + posted */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-text-secondary">{job.company}</span>
          <span className="flex items-center gap-1 text-xs text-text-secondary shrink-0">
            <ClockIcon className="h-3 w-3" />
            {job.postedDaysAgo === 1 ? 'Today' : `${job.postedDaysAgo}d ago`}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-text-primary leading-snug">
          {job.title}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-1">
            <MapPinIcon className="h-3 w-3 shrink-0" />
            {job.location}
          </span>
          <span>{job.salary}</span>
          <span>{job.experience}</span>
        </div>

        {/* Badges + tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant={workModeBadgeVariant(job.workMode)} className="text-[11px]">
            {job.workMode}
          </Badge>
          <Badge variant="outline" className="text-[11px]">
            {job.type}
          </Badge>
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
        <Button variant="primary" size="sm" className="flex-1 justify-center sm:flex-none">
          Apply
        </Button>
        <button
          type="button"
          aria-label={`Save ${job.title} at ${job.company}`}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-md',
            'text-text-secondary border border-border bg-surface',
            'transition-colors duration-150',
            'hover:border-primary/40 hover:text-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          )}
        >
          <BookmarkIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LatestJobs Component                                               */
/* ------------------------------------------------------------------ */

/**
 * LatestJobs — list of recent job postings.
 * Realistic content: company, title, location, salary, experience, tags, work mode.
 * Apply + Save actions on each card.
 */
function LatestJobs() {
  return (
    <section
      aria-labelledby="latest-jobs-heading"
      className="border-t border-border py-12 sm:py-16"
    >
      <Container padding="md">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2
              id="latest-jobs-heading"
              className="text-xl font-semibold text-text-primary"
            >
              Latest openings
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              New roles posted in the last 7 days
            </p>
          </div>
          <a
            href="/jobs"
            className={cn(
              'hidden text-sm font-medium text-primary sm:block',
              'transition-colors duration-150 hover:text-primary/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'rounded-sm',
            )}
          >
            View all jobs →
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {JOB_LISTINGS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-6 sm:hidden">
          <Button variant="outline" size="md" className="w-full justify-center">
            View all jobs
          </Button>
        </div>

      </Container>
    </section>
  );
}

export { LatestJobs };
