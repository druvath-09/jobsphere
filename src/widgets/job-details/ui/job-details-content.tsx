import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Container } from '@/shared/components/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import type { JobDetails } from '@/entities/job';
import { useSavedJobs } from '@/entities/saved-job';
import { CompanyLogoAvatar } from '@/entities/company';
import { useApplications } from '@/entities/application';
import { getCompanyDetailsPath, getJobsPath } from '@/shared/constants/routes';
import { SimilarJobs } from './similar-jobs';
import { cn } from '@/shared/lib/utils';



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

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 3.5L2.5 8l4 4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.667 3.333a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0zM5 8a1.667 1.667 0 1 0-3.334 0A1.667 1.667 0 0 0 5 8zm9.334 0a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.9 7.2l4.2-2.4M5.9 8.8l4.2 2.4" />
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

function SectionList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-text-secondary">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface JobDetailsContentProps {
  job: JobDetails;
  isSplitView?: boolean;
}

function JobDetailsContent({ job, isSplitView }: JobDetailsContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const fromJobSphere = (location.state as { fromJobSphere?: boolean } | null)?.fromJobSphere;
  
  const { isSaved, toggleSavedJob, savingJobId } = useSavedJobs();
  const saved = isSaved(job.id);
  const isSaving = savingJobId === job.id;

  const { applyToJob, isApplied, getApplication, applyingJobId } = useApplications();
  const isApplying = applyingJobId === job.id;
  
  const hasApplied = isApplied(job.id);
  const application = getApplication(job.id);

  function handleApply(e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    applyToJob(job.id);
  }

  function handleBackToJobs() {
    if (fromJobSphere) {
      navigate(-1);
      return;
    }
    navigate(getJobsPath());
  }

  return (
    <section className="flex flex-col min-h-full">
      {!isSplitView && (
        <Container padding="md" className="py-6">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeftIcon className="h-4 w-4" />}
              onClick={handleBackToJobs}
            >
              Back to Jobs
            </Button>
          </div>
        </Container>
      )}

      {/* Unified Sticky Header */}
      <div className={cn(
        "sticky top-0 z-20 bg-surface/95 backdrop-blur-md border-b border-border shadow-sm transition-all",
        isSplitView ? "pt-6 pb-5 px-6" : "pt-8 pb-6 px-4 sm:px-6 lg:px-8"
      )}>
        <div className={cn("mx-auto", !isSplitView && "max-w-[1280px]")}>
          
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <button 
                onClick={() => navigate(getCompanyDetailsPath(job.companyId))}
                className="group flex shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <CompanyLogoAvatar
                  logo={{ path: job.companyLogo, initial: job.companyInitial, color: job.companyColor }}
                  fallbackInitial={job.companyInitial}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-base font-semibold text-white shadow-sm transition-transform group-hover:scale-105"
                />
              </button>

              <div className="min-w-0 space-y-2">
                <div>
                  <button 
                    onClick={() => navigate(getCompanyDetailsPath(job.companyId))}
                    className="text-sm font-semibold text-text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {job.company}
                  </button>
                  <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                    {job.title}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-text-secondary">
                  {hasApplied && (
                    <Badge variant="success" className="font-semibold">Applied - {application?.status}</Badge>
                  )}
                  {job.featured && (
                    <Badge variant="accent" className="font-semibold">Featured</Badge>
                  )}
                  <span className="font-medium text-text-primary">{job.salaryLabel}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.workMode}</span>
                  <span>•</span>
                  <span>{job.employmentType}</span>
                  <span>•</span>
                  <span>{job.experienceLabel}</span>
                  <span>•</span>
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3 sm:flex-row md:flex-col lg:flex-row lg:items-center">
              {hasApplied ? (
                <Button variant="secondary" size="md" className="flex-1 sm:flex-none" disabled>
                  Applied ✓
                </Button>
              ) : (
                <Button variant="primary" size="md" className="flex-1 sm:flex-none" onClick={handleApply} disabled={isApplying}>
                  {isApplying ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Applying...
                    </span>
                  ) : job.easyApply ? (
                    <span className="flex items-center gap-2">
                      <ZapIcon className="h-4 w-4" /> Easy Apply
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Apply on Company Site <ExternalLinkIcon className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              )}
              <Button 
                variant={saved ? "secondary" : "outline"}
                size="md" 
                className={cn("flex-1 sm:flex-none", saved && "bg-primary/5 text-primary hover:bg-primary/10")} 
                leftIcon={isSaving ? <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <BookmarkIcon className="h-4 w-4" filled={saved} />}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSavedJob(job.id);
                }}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : saved ? 'Saved ✓' : 'Save'}
              </Button>
              <Button variant="ghost" size="md" className="flex-none" leftIcon={<ShareIcon className="h-4 w-4" />}>
                Share
              </Button>
            </div>
          </div>

        </div>
      </div>

      <div className={cn(
        "flex-1", 
        isSplitView ? "p-6 space-y-6" : "py-10 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full space-y-8"
      )}>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>About the Role</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-text-secondary whitespace-pre-wrap">{job.description}</p>
          </CardContent>
        </Card>

        {job.responsibilities?.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <SectionList items={job.responsibilities} />
            </CardContent>
          </Card>
        )}

        {job.requirements?.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <SectionList items={job.requirements} />
            </CardContent>
          </Card>
        )}

        {job.skills?.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-surface">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {job.benefits?.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <SectionList items={job.benefits} />
            </CardContent>
          </Card>
        )}

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Company Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 text-sm text-text-secondary">
              <p className="leading-7">{job.companyDescription}</p>
              <div className="grid gap-4 rounded-xl bg-surface-hover p-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="font-medium text-text-primary text-xs uppercase tracking-wider mb-1">Industry</dt>
                  <dd className="font-medium">{job.industry}</dd>
                </div>
                <div>
                  <dt className="font-medium text-text-primary text-xs uppercase tracking-wider mb-1">Company size</dt>
                  <dd className="font-medium">{job.companySize}</dd>
                </div>
                <div>
                  <dt className="font-medium text-text-primary text-xs uppercase tracking-wider mb-1">Headquarters</dt>
                  <dd className="font-medium">{job.headquarters}</dd>
                </div>
                <div>
                  <dt className="font-medium text-text-primary text-xs uppercase tracking-wider mb-1">Website</dt>
                  <dd className="font-medium truncate"><a href="#" className="text-primary hover:underline">{job.website}</a></dd>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="pt-4 pb-12">
          <SimilarJobs jobId={job.id} />
        </div>

      </div>
    </section>
  );
}

export { JobDetailsContent };
