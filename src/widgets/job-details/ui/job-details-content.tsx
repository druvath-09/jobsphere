import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Container } from '@/shared/components/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import type { JobDetails } from '@/entities/job';
import { useSavedJobs } from '@/entities/saved-job';
import { CompanyLogoAvatar } from '@/entities/company';
import { useApplications } from '@/entities/application';
import { useAuth } from '@/features/auth';
import { getJobsPath, ROUTES } from '@/shared/constants/routes';
import { SimilarJobs } from './similar-jobs';
import { cn } from '@/shared/lib/utils';

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
}

function JobDetailsContent({ job }: JobDetailsContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const fromJobSphere = (location.state as { fromJobSphere?: boolean } | null)?.fromJobSphere;
  
  const { isSaved, toggleSavedJob } = useSavedJobs();
  const saved = isSaved(job.id);

  const { applyToJob, isApplied, getApplication } = useApplications();
  const { isAuthenticated } = useAuth();
  
  const hasApplied = isApplied(job.id);
  const application = getApplication(job.id);

  function handleApply() {
    if (!isAuthenticated) {
      navigate(ROUTES.login, { state: { from: location } });
      return;
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
    <section className="py-8 sm:py-10">
      <Container padding="md">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeftIcon className="h-4 w-4" />}
            onClick={handleBackToJobs}
          >
            Back to Jobs
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <CompanyLogoAvatar
                  logo={{ path: job.companyLogo, initial: job.companyInitial, color: job.companyColor }}
                  fallbackInitial={job.companyInitial}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-semibold text-white shadow-sm"
                />

                <div className="min-w-0 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">{job.company}</p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">
                      {job.title}
                    </h1>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hasApplied && (
                      <Badge variant="success">Applied - {application?.status}</Badge>
                    )}
                    {job.featured && (
                      <Badge variant="accent">Featured</Badge>
                    )}
                    <Badge variant="outline">{job.location}</Badge>
                    <Badge variant="outline">{job.employmentType}</Badge>
                    <Badge variant="outline">{job.experienceLabel}</Badge>
                    <Badge variant="outline">{job.salaryLabel}</Badge>
                    <Badge variant="primary">{job.postedAt}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                {hasApplied ? (
                  <Button variant="secondary" size="md" className="w-full sm:w-auto" disabled>
                    Applied
                  </Button>
                ) : (
                  <Button variant="primary" size="md" className="w-full sm:w-auto" onClick={handleApply}>
                    Apply Now
                  </Button>
                )}
                <Button 
                  variant={saved ? "secondary" : "outline"}
                  size="md" 
                  className={cn("w-full sm:w-auto", saved && "bg-primary/5 text-primary hover:bg-primary/10")} 
                  leftIcon={<BookmarkIcon className="h-4 w-4" filled={saved} />}
                  onClick={() => toggleSavedJob(job.id)}
                >
                  {saved ? 'Saved' : 'Save Job'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-text-secondary">{job.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <SectionList items={job.responsibilities} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <SectionList items={job.requirements} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <SectionList items={job.benefits} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-text-secondary">
                  <p className="leading-7">{job.companyDescription}</p>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <dt className="font-medium text-text-primary">Industry</dt>
                      <dd className="mt-1">{job.industry}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">Company size</dt>
                      <dd className="mt-1">{job.companySize}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">Website</dt>
                      <dd className="mt-1 break-all text-primary">{job.website}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">Headquarters</dt>
                      <dd className="mt-1">{job.headquarters}</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hasApplied ? (
                  <Button variant="secondary" size="md" className="w-full" disabled>
                    Applied
                  </Button>
                ) : (
                  <Button variant="primary" size="md" className="w-full" onClick={handleApply}>
                    Apply Now
                  </Button>
                )}
                <Button 
                  variant={saved ? "secondary" : "outline"}
                  size="md" 
                  className={cn("w-full", saved && "bg-primary/5 text-primary hover:bg-primary/10")} 
                  leftIcon={<BookmarkIcon className="h-4 w-4" filled={saved} />}
                  onClick={() => toggleSavedJob(job.id)}
                >
                  {saved ? 'Saved' : 'Save Job'}
                </Button>
                <Button variant="ghost" size="md" className="w-full" leftIcon={<ShareIcon className="h-4 w-4" />}>
                  Share Job
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4 text-sm text-text-secondary">
                  <div>
                    <dt className="font-medium text-text-primary">Posted</dt>
                    <dd className="mt-1">{job.postedAt}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text-primary">Job ID</dt>
                    <dd className="mt-1">{job.id}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text-primary">Employment type</dt>
                    <dd className="mt-1">{job.employmentType}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text-primary">Salary</dt>
                    <dd className="mt-1">{job.salaryLabel}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text-primary">Experience</dt>
                    <dd className="mt-1">{job.experienceLabel}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </aside>
        </div>

        <SimilarJobs jobId={job.id} />
      </Container>
    </section>
  );
}

export { JobDetailsContent };
