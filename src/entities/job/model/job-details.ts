import { getCompanyById } from '@/entities/company/model/company';
import { JOBS, type JobListing } from './job';

interface JobDetails extends JobListing {
  companyDescription: string;
  industry: string;
  companySize: string;
  website: string;
  headquarters: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

function getJobById(jobId: string) {
  return JOBS.find((job) => job.id === jobId);
}

function buildResponsibilities(job: JobListing) {
  return [
    `Own the delivery of ${job.title.toLowerCase()} initiatives across the product lifecycle.`,
    `Collaborate with product, design, and engineering teams to ship reliable experiences using ${job.skills.slice(0, 2).join(' and ')}.`,
    'Improve quality, maintainability, and performance through thoughtful implementation and review.',
  ];
}

function buildRequirements(job: JobListing) {
  return [
    `At least ${job.experienceLabel} of relevant experience in a product-focused team.`,
    `Strong hands-on knowledge of ${job.skills[0]}.`,
    'Ability to communicate clearly and work well in a cross-functional environment.',
  ];
}

function buildBenefits(job: JobListing) {
  return [
    `Competitive compensation up to ${job.salaryLabel}.`,
    `Flexible working setup aligned to a ${job.workMode.toLowerCase()} team.`,
    'Opportunity to shape the candidate and hiring experience at a growing company.',
  ];
}

function getJobDetails(jobId: string): JobDetails | undefined {
  const job = getJobById(jobId);

  if (!job) {
    return undefined;
  }

  const company = getCompanyById(job.companyId);

  if (!company) {
    return undefined;
  }

  return {
    ...job,
    companyDescription: company.description,
    industry: company.industry,
    companySize: `${company.size} employees`,
    website: company.website,
    headquarters: company.headquarters,
    responsibilities: buildResponsibilities(job),
    requirements: buildRequirements(job),
    benefits: buildBenefits(job),
  };
}

function getSimilarJobs(jobId: string, limit = 3) {
  const currentJob = getJobById(jobId);

  if (!currentJob) {
    return [];
  }

  return JOBS.filter((job) => job.id !== jobId)
    .map((job) => {
      const sharedSkills = job.skills.filter((skill) => currentJob.skills.includes(skill)).length;
      const sameLocation = job.location === currentJob.location ? 2 : 0;
      const sameWorkMode = job.workMode === currentJob.workMode ? 2 : 0;
      const sameEmploymentType = job.employmentType === currentJob.employmentType ? 1 : 0;
      const featuredBonus = job.featured ? 1 : 0;

      return {
        job,
        score: sharedSkills * 3 + sameLocation + sameWorkMode + sameEmploymentType + featuredBonus,
      };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.job.postedDaysAgo - right.job.postedDaysAgo;
    })
    .slice(0, limit)
    .map(({ job }) => job);
}

export { getJobById, getJobDetails, getSimilarJobs };
export type { JobDetails };
