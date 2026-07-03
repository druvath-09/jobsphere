import { JOBS, type JobListing } from '@/entities/job/model/job';

function getCompanyJobs(companyId: string): JobListing[] {
  return JOBS.filter((job) => job.companyId === companyId);
}

export { getCompanyJobs };
