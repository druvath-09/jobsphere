import type { JobListing } from '@/entities/job';
import { normalize, fuzzyIncludes, fuzzyStartsWith } from './normalize';

export interface SearchScore {
  job: JobListing;
  score: number;
}

export function scoreJob(job: JobListing, rawQuery: string, rawLocation: string): number {
  let score = 0;
  
  const query = normalize(rawQuery);
  const location = normalize(rawLocation);
  
  const normTitle = normalize(job.title);
  const normCompany = normalize(job.company);
  const normLoc = normalize(job.location);
  const normDesc = normalize(job.description);
  const normSkills = job.skills.map(normalize);
  
  // Base location filtering - if location provided and doesn't match, score 0 (discard)
  if (location && !fuzzyIncludes(normLoc, location)) {
    return 0; // Did not match required location
  }
  
  if (!query) {
    return 1; // If no query but location matched (or no location), base score
  }

  let matchedQuery = false;

  // 1. Exact Job Title
  if (normTitle === query) {
    score += 100;
    matchedQuery = true;
  }
  // 2. Job Title Starts With
  else if (fuzzyStartsWith(normTitle, query)) {
    score += 50;
    matchedQuery = true;
  }
  // 2.5 Job Title Includes
  else if (fuzzyIncludes(normTitle, query)) {
    score += 30;
    matchedQuery = true;
  }

  // 3. Company Match
  if (normCompany === query) {
    score += 40;
    matchedQuery = true;
  } else if (fuzzyIncludes(normCompany, query)) {
    score += 20;
    matchedQuery = true;
  }

  // 4. Skills Match
  if (normSkills.some(s => s === query)) {
    score += 25;
    matchedQuery = true;
  } else if (normSkills.some(s => fuzzyIncludes(s, query))) {
    score += 15;
    matchedQuery = true;
  }

  // 5. Description Match (Lowest weight)
  if (!matchedQuery && fuzzyIncludes(normDesc, query)) {
    score += 5;
    matchedQuery = true;
  }

  if (!matchedQuery) {
    return 0; // Query was provided but no fields matched
  }

  return score;
}

export function rankResults(jobs: JobListing[], query: string, location: string): JobListing[] {
  if (!query && !location) return jobs;

  const scored: SearchScore[] = jobs.map(job => ({
    job,
    score: scoreJob(job, query, location)
  }));

  // Filter out non-matches and sort by score descending
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.job);
}
