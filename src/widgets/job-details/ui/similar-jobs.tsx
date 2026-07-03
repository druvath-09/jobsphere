import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { getSimilarJobs, type JobListing } from '@/entities/job';
import { CompanyLogoAvatar } from '@/entities/company';
import { getJobDetailsPath } from '@/shared/constants/routes';

function formatPostedLabel(postedDaysAgo: number) {
  if (postedDaysAgo === 0) return 'Today';
  if (postedDaysAgo === 1) return '1 day ago';
  return `${postedDaysAgo} days ago`;
}

function SimilarJobCard({ job }: { job: JobListing }) {
  const navigate = useNavigate();
  const jobDetailState = { state: { fromJobSphere: true } };

  return (
    <Card
      interactive
      role="link"
      aria-label={`View details for ${job.title} at ${job.company}`}
      className="cursor-pointer overflow-hidden"
      onClick={() => navigate(getJobDetailsPath(job.id), jobDetailState)}
    >
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <CompanyLogoAvatar
            logo={{ path: job.companyLogo, initial: job.companyInitial, color: job.companyColor }}
            fallbackInitial={job.companyInitial}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white shadow-sm"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-text-primary">{job.title}</h3>
              {job.featured && (
                <Badge variant="accent" className="text-[11px]">
                  Featured
                </Badge>
              )}
            </div>

            <p className="mt-1 text-sm font-medium text-text-secondary">{job.company}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">{job.location}</Badge>
              <Badge variant="outline">{job.salaryLabel}</Badge>
              <Badge variant="outline">{job.employmentType}</Badge>
            </div>

            <p className="mt-3 text-xs text-text-secondary">Posted {formatPostedLabel(job.postedDaysAgo)}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {job.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>

          <Button variant="ghost" size="sm" onClick={() => navigate(getJobDetailsPath(job.id), jobDetailState)}>
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface SimilarJobsProps {
  jobId: string;
}

function SimilarJobs({ jobId }: SimilarJobsProps) {
  const jobs = getSimilarJobs(jobId);

  if (jobs.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="similar-jobs-heading" className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle id="similar-jobs-heading">Similar Jobs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-3">
          {jobs.map((job) => (
            <SimilarJobCard key={job.id} job={job} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

export { SimilarJobs };
