import { type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { JobListing } from '@/entities/job';
import { useSavedJobs } from '@/entities/saved-job';
import { useApplications } from '@/entities/application';
import { useAuth } from '@/features/auth';
import { CompanyLogoAvatar } from '@/entities/company';
import { getJobDetailsPath, ROUTES } from '@/shared/constants/routes';
import { useLocation } from 'react-router-dom';

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4.75v3.5l2.25 1.5" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8.5A1.5 1.5 0 1 0 8 5.5a1.5 1.5 0 0 0 0 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 1.75C5.14 1.75 2.833 4.06 2.833 6.917c0 3.65 5.167 7.333 5.167 7.333s5.167-3.683 5.167-7.333C13.167 4.06 10.86 1.75 8 1.75z" />
    </svg>
  );
}

function BookmarkIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 2.5h8a.5.5 0 0 1 .5.5v10.5L8 10.75 3.5 13.5V3a.5.5 0 0 1 .5-.5z" />
    </svg>
  );
}

function workModeVariant(workMode: JobListing['workMode']) {
  if (workMode === 'Remote') return 'success' as const;
  if (workMode === 'Hybrid') return 'warning' as const;
  return 'secondary' as const;
}

interface JobCardProps {
  job: JobListing;
}

function JobCard({ job }: JobCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const jobDetailState = { state: { fromJobSphere: true } };
  const { isSaved, toggleSavedJob } = useSavedJobs();
  const saved = isSaved(job.id);
  const { applyToJob, isApplied, getApplication } = useApplications();
  const { isAuthenticated } = useAuth();
  
  const hasApplied = isApplied(job.id);
  const application = getApplication(job.id);

  function handleApply(e: React.MouseEvent) {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate(ROUTES.login, { state: { from: location } });
      return;
    }
    applyToJob(job.id);
  }

  function handleCardClick() {
    navigate(getJobDetailsPath(job.id), jobDetailState);
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(getJobDetailsPath(job.id), jobDetailState);
    }
  }

  return (
    <Card
      interactive
      role="link"
      aria-label={`View details for ${job.title} at ${job.company}`}
      className="flex h-full flex-col overflow-hidden cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <div className="flex items-start gap-4 p-5 sm:p-6">
        <CompanyLogoAvatar
          logo={{ path: job.companyLogo, initial: job.companyInitial, color: job.companyColor }}
          fallbackInitial={job.companyInitial}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white shadow-sm"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-text-primary">{job.title}</h3>
            {hasApplied && (
              <Badge variant="success" className="text-[11px]">
                Applied - {application?.status}
              </Badge>
            )}
            {job.featured && (
              <Badge variant="accent" className="text-[11px]">
                Featured
              </Badge>
            )}
          </div>

          <p className="mt-1 text-sm font-medium text-text-secondary">{job.company}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span>{job.salaryLabel}</span>
            <span>{job.experienceLabel}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-text-secondary">
          <ClockIcon className="h-3.5 w-3.5" />
          {job.postedAt}
        </div>
      </div>

      <div className="px-5 sm:px-6">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={workModeVariant(job.workMode)}>{job.workMode}</Badge>
          <Badge variant="outline">{job.employmentType}</Badge>
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <p className="px-5 pt-4 text-sm leading-6 text-text-secondary sm:px-6">{job.description}</p>

      <div className="mt-auto flex items-center gap-3 px-5 py-5 sm:px-6">
        {hasApplied ? (
          <Button variant="secondary" size="sm" className="flex-1 sm:flex-none" disabled>
            Applied
          </Button>
        ) : (
          <Button variant="primary" size="sm" className="flex-1 sm:flex-none" onClick={handleApply}>
            Apply now
          </Button>
        )}
        <button
          type="button"
          aria-label={saved ? `Unsave ${job.title} at ${job.company}` : `Save ${job.title} at ${job.company}`}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg border bg-surface transition-colors duration-150',
            saved 
              ? 'border-primary text-primary bg-primary/5 hover:bg-primary/10'
              : 'border-border text-text-secondary hover:border-primary/30 hover:text-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          )}
          onClick={(e) => {
            e.stopPropagation();
            toggleSavedJob(job.id);
          }}
        >
          <BookmarkIcon className="h-4 w-4" filled={saved} />
        </button>
      </div>
    </Card>
  );
}

export { JobCard };
