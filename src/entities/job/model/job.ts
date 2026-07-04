import { getCompanyById } from '@/entities/company/model/company';
import { MOCK_JOBS, type JobMock, type JobEmploymentType, type JobWorkMode } from './mock-jobs';
import { searchJobs } from '@/shared/lib/search';

export type JobSortKey = 'relevance' | 'newest' | 'salary-high' | 'salary-low';

export interface JobListing extends JobMock {
  company: string;
  companyInitial: string;
  companyColor: string;
  companyLogo: string;
}

export interface JobFilters {
  query: string;
  location: string;
  experience: string;
  employmentType: string;
  salary: string;
  sortBy: JobSortKey;
}

export interface FilterOption {
  value: string;
  label: string;
}

export const JOB_EMPLOYMENT_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All types' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
];

export const JOB_EXPERIENCE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All experience' },
  { value: 'Entry Level', label: 'Entry Level' },
  { value: 'Mid Level', label: 'Mid Level' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Staff/Principal', label: 'Staff/Principal' },
];

export const JOB_LOCATION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All locations' },
  { value: 'Remote', label: 'Remote' },
  { value: 'San Francisco, CA', label: 'San Francisco, CA' },
  { value: 'New York, NY', label: 'New York, NY' },
  { value: 'Seattle, WA', label: 'Seattle, WA' },
  { value: 'London, UK', label: 'London, UK' },
  { value: 'Bengaluru, India', label: 'Bengaluru, India' },
];

export const JOB_SALARY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All salaries' },
  { value: '0-50', label: '< $50k' },
  { value: '50-100', label: '$50k - $100k' },
  { value: '100-150', label: '$100k - $150k' },
  { value: '150+', label: '$150k+' },
];

export const JOB_SORT_OPTIONS: FilterOption[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'salary-high', label: 'Highest Salary' },
  { value: 'salary-low', label: 'Lowest Salary' },
];

export const JOBS: JobListing[] = MOCK_JOBS.map(job => {
  const company = getCompanyById(job.companyId);
  return {
    ...job,
    company: company?.name || job.companyId,
    companyInitial: company?.logo.initial || job.companyId.charAt(0).toUpperCase(),
    companyColor: company?.logo.color || '#000000',
    companyLogo: company?.logo.path || '',
  };
});

export function getJobDetails(id: string): JobListing | undefined {
  return JOBS.find(job => job.id === id);
}

export function filterJobs(jobs: JobListing[], filters: JobFilters): JobListing[] {
  const searchFilters: any = {
    query: filters.query,
    location: filters.location === 'all' ? '' : filters.location,
  };

  if (filters.experience !== 'all') {
    searchFilters.experience = [filters.experience];
  }

  if (filters.employmentType !== 'all') {
    searchFilters.employmentType = [filters.employmentType];
  }

  const searchResults = searchJobs(jobs, searchFilters);

  // Apply salary filter
  if (filters.salary && filters.salary !== 'all') {
    return searchResults.filter(job => {
      // Basic salary mapping logic based on UI filters
      if (filters.salary === '0-50') return job.salaryMin < 50;
      if (filters.salary === '50-100') return job.salaryMin >= 50 && job.salaryMax <= 100;
      if (filters.salary === '100-150') return job.salaryMin >= 100 && job.salaryMax <= 150;
      if (filters.salary === '150+') return job.salaryMax > 150;
      return true;
    });
  }

  return searchResults;
}

export function sortJobs(jobs: JobListing[], sortBy: JobSortKey): JobListing[] {
  if (sortBy === 'relevance' || (sortBy as string) === '') {
    // Relevance is already sorted by searchJobs score natively
    return jobs;
  }
  
  return [...jobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return a.postedDaysAgo - b.postedDaysAgo;
      case 'salary-high':
        return b.salaryMax - a.salaryMax;
      case 'salary-low':
        return a.salaryMin - b.salaryMin;
      default:
        return 0;
    }
  });
}

export type { JobMock, JobEmploymentType, JobWorkMode };
