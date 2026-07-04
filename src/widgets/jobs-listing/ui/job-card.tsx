import { type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Card } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { JobListing } from '@/entities/job';
import { useApplications } from '@/entities/application';
import { CompanyLogoAvatar } from '@/entities/company';
import { getJobDetailsPath } from '@/shared/constants/routes';

function workModeVariant(workMode: JobListing['workMode']) {
  if (workMode === 'Remote') return 'success' as const;
  if (workMode === 'Hybrid') return 'warning' as const;
  return 'secondary' as const;
}

interface JobCardProps {
  job: JobListing;
  isSelected?: boolean;
  onSelect?: () => void;
}

function JobCard({ job, isSelected, onSelect }: JobCardProps) {
  const navigate = useNavigate();
  const jobDetailState = { state: { fromJobSphere: true } };
  
  const { isApplied } = useApplications();
  const hasApplied = isApplied(job.id);

  function handleCardClick() {
    if (onSelect && window.matchMedia('(min-width: 1024px)').matches) {
      onSelect();
    } else {
      navigate(getJobDetailsPath(job.id), jobDetailState);
    }
  }

  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  }

  return (
    <Card
      interactive
      role="link"
      aria-label={`View details for ${job.title} at ${job.company}`}
      className={cn(
        "group flex items-start gap-4 p-4 sm:p-5 transition-all duration-200 border-l-[4px]",
        isSelected 
          ? "bg-primary/5 border-l-primary shadow-md border-y-primary/20 border-r-primary/20" 
          : "border-l-transparent border-y-border border-r-border hover:border-border hover:shadow-sm bg-surface"
      )}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <CompanyLogoAvatar
        logo={{ path: job.companyLogo, initial: job.companyInitial, color: job.companyColor }}
        fallbackInitial={job.companyInitial}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white shadow-sm mt-1"
      />

      <div className="min-w-0 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0 pr-2">
            <h3 className={cn(
              "truncate text-base font-semibold transition-colors duration-150",
              isSelected ? "text-primary" : "text-text-primary group-hover:text-primary"
            )}>
              {job.title}
            </h3>
            <p className="truncate text-sm text-text-secondary mt-0.5">{job.company}</p>
          </div>
          <div className="text-right shrink-0 flex flex-col items-end gap-1 mt-0.5">
            <span className="text-sm font-medium text-text-primary">{job.salaryLabel}</span>
            <span className="text-xs text-text-secondary">{job.postedAt}</span>
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {job.featured && <Badge variant="accent" className="text-[10px] py-0 px-1.5 h-5 leading-5 font-semibold">Featured</Badge>}
          {job.trustBadge && (
            <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-5 leading-5 border-primary/20 text-primary bg-primary/5 flex items-center gap-1">
              {job.trustBadge === 'Verified Employer' && <svg className="h-3 w-3 -ml-0.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
              {job.trustBadge}
            </Badge>
          )}
          {hasApplied && <Badge variant="success" className="text-[10px] py-0 px-1.5 h-5 leading-5">Applied</Badge>}
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-5 leading-5">{job.location}</Badge>
          <Badge variant={workModeVariant(job.workMode)} className="text-[10px] py-0 px-1.5 h-5 leading-5">{job.workMode}</Badge>
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-5 leading-5">{job.employmentType}</Badge>
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-5 leading-5">{job.experienceLabel}</Badge>
        </div>
        
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 3).map(skill => (
            <span key={skill} className={cn(
              "inline-flex items-center rounded bg-surface/50 px-1.5 py-0.5 text-[10px] font-medium text-text-secondary ring-1 ring-inset",
              isSelected ? "ring-primary/20 bg-primary/5" : "ring-border/80"
            )}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export { JobCard };
