import { useNavigate } from 'react-router-dom';
import { JOBS, type JobListing } from '@/entities/job';
import { useSavedJobs } from '@/entities/saved-job';
import { CompanyLogoAvatar } from '@/entities/company';
import { Container } from '@/shared/components/layout';
import { Button, Badge, Card } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { getJobDetailsPath, getJobsPath } from '@/shared/constants/routes';
import { useApplications } from '@/entities/application';

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function BookmarkIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
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

const JOB_LISTINGS = [...JOBS]
  .sort((left, right) => left.postedDaysAgo - right.postedDaysAgo)
  .slice(0, 6);

/* ------------------------------------------------------------------ */
/*  Work mode badge variant helper                                     */
/* ------------------------------------------------------------------ */

function workModeBadgeVariant(mode: JobListing['workMode']) {
  switch (mode) {
    case 'Remote':
      return 'success' as const;
    case 'Hybrid':
      return 'warning' as const;
    case 'Onsite':
      return 'secondary' as const;
  }
}

/* ------------------------------------------------------------------ */
function JobCard({ job }: { job: JobListing }) {
  const navigate = useNavigate();
  const jobDetailState = { state: { fromJobSphere: true } };
  const { isSaved, toggleSavedJob, savingJobId } = useSavedJobs();
  const { applyToJob, applyingJobId, isApplied } = useApplications();
  const saved = isSaved(job.id);
  const hasApplied = isApplied(job.id);
  const isSaving = savingJobId === job.id;
  const isApplying = applyingJobId === job.id;

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    applyToJob(job.id);
  };

  return (
    <Card
      interactive
      role="link"
      aria-label={`View details for ${job.title} at ${job.company}`}
      className="group relative flex flex-col items-start gap-4 p-5 transition-all duration-300 border-[1px] hover:border-primary hover:bg-primary/[0.02] border-border hover:shadow-lg bg-surface overflow-hidden h-full"
      onClick={() => navigate(getJobDetailsPath(job.id), jobDetailState)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(getJobDetailsPath(job.id), jobDetailState);
        }
      }}
    >
      <div className="flex items-start gap-3 w-full">
        <CompanyLogoAvatar
          logo={{ path: job.companyLogo, initial: job.companyInitial, color: job.companyColor }}
          fallbackInitial={job.companyInitial}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm mt-1"
        />
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="truncate text-sm font-semibold text-text-secondary">{job.company}</span>
            {job.company === 'Google' || job.company === 'Microsoft' ? (
              <svg className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between min-w-0 h-full w-full">
        <div className="flex items-center justify-between gap-3 mt-1">
          <div className="flex flex-col shrink-0 gap-1 mt-0.5 w-auto">
            <span className="text-[11px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full inline-block">{job.salaryLabel}</span>
            <span className="text-[10px] font-medium text-text-secondary flex items-center gap-1 mt-1">
              <ClockIcon className="h-3 w-3" /> {job.postedAt}
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.featured && <Badge variant="accent" className="text-[10px] font-semibold py-0.5 px-1.5">Featured</Badge>}
          {job.trustBadge && (
            <Badge variant="outline" className="text-[10px] py-0.5 px-1.5 border-primary/20 text-primary bg-primary/5 flex items-center gap-1">
              {job.trustBadge === 'Verified Employer' && <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
              {job.trustBadge}
            </Badge>
          )}
          <Badge variant="outline" className="text-[10px] py-0.5 px-1.5 border-border text-text-secondary">{job.location}</Badge>
          <Badge variant={workModeBadgeVariant(job.workMode)} className="text-[10px] py-0.5 px-1.5">{job.workMode}</Badge>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {job.skills.slice(0, 3).map(skill => (
              <span key={skill} className="inline-flex items-center rounded-md bg-surface-hover px-2 py-1 text-[11px] font-semibold text-text-secondary ring-1 ring-inset ring-border/60">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {hasApplied ? (
              <Button variant="secondary" size="sm" className="flex-1 justify-center sm:flex-none" disabled>
                Applied ✓
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="flex-1 sm:flex-none shadow-sm hover:shadow-md transition-shadow font-semibold py-1.5"
                onClick={handleApply}
                disabled={isApplying}
              >
                {isApplying ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="animate-spin h-3 w-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Applying
                  </span>
                ) : job.easyApply ? (
                  <span className="flex items-center gap-1.5">
                    <ZapIcon className="h-4 w-4" /> Easy Apply
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    Apply <ExternalLinkIcon className="h-4 w-4" />
                  </span>
                )}
              </Button>
            )}
            <button
              type="button"
              aria-label={saved ? `Unsave ${job.title}` : `Save ${job.title}`}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm',
                saved 
                  ? 'border-primary text-primary bg-primary/10 hover:bg-primary/20'
                  : 'border-border bg-surface text-text-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isSaving && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSavedJob(job.id);
              }}
              disabled={isSaving}
            >
              {isSaving ? <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <BookmarkIcon className="h-4 w-4" filled={saved} />}
            </button>
          </div>
        </div>
      </div>
    </Card>
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
  const navigate = useNavigate();

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
          <button
            type="button"
            onClick={() => navigate(getJobsPath())}
            className={cn(
              'hidden rounded-sm bg-transparent p-0 text-sm font-medium text-primary sm:block',
              'transition-colors duration-150 hover:text-primary/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            )}
          >
            View all jobs →
          </button>
        </div>

        <div className="relative w-full max-w-[100vw] flex overflow-hidden group py-4 -mx-4 px-4 sm:mx-0 sm:px-0 mt-6">
          {/* Left/Right fading edges */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
          {/* Marquee Track */}
          <div className="flex animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4 w-max">
            {JOB_LISTINGS.map((job) => (
              <div key={job.id} className="w-[300px] sm:w-[350px] shrink-0">
                <JobCard job={job} />
              </div>
            ))}
            {/* Duplicate for infinite loop */}
            {JOB_LISTINGS.map((job) => (
              <div key={`${job.id}-dup`} className="w-[300px] sm:w-[350px] shrink-0">
                <JobCard job={job} />
              </div>
            ))}
            {JOB_LISTINGS.map((job) => (
              <div key={`${job.id}-dup2`} className="w-[300px] sm:w-[350px] shrink-0">
                <JobCard job={job} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center w-full">
          <Button variant="outline" size="md" className="w-full sm:w-auto px-8" onClick={() => navigate(getJobsPath())}>
            View all jobs
          </Button>
        </div>

      </Container>
    </section>
  );
}

export { LatestJobs };
