import type { JobListing } from '@/entities/job';
import { normalize } from './normalize';
import { rankResults } from './rank-results';

export interface SearchFilters {
  query: string;
  location: string;
  experience?: string[];
  employmentType?: string[];
  workMode?: string[];
}

export function searchJobs(jobs: JobListing[], filters: SearchFilters): JobListing[] {
  // 1. First, apply strict exact-match filters (Experience, Type, WorkMode)
  let filtered = jobs.filter(job => {
    if (filters.experience && filters.experience.length > 0) {
      if (!filters.experience.includes(job.experienceLabel)) return false;
    }
    
    if (filters.employmentType && filters.employmentType.length > 0) {
      // For employment type, sometimes values match exactly or need normalized comparison
      // The JobSphere mock data often uses exact strings like 'Full-time'
      const hasTypeMatch = filters.employmentType.some(
        type => normalize(type) === normalize(job.employmentType)
      );
      if (!hasTypeMatch) return false;
    }
    
    if (filters.workMode && filters.workMode.length > 0) {
      if (!filters.workMode.includes(job.workMode)) return false;
    }

    return true;
  });

  // 2. Rank and filter by query & location
  return rankResults(filtered, filters.query, filters.location);
}
