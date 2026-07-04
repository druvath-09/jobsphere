import { getJobById, type JobListing } from '@/entities/job';

/**
 * The single source of truth for a saved job.
 * Only stores the ID and metadata (savedAt), not the duplicated Job object.
 */
export interface SavedJob {
	id: string; // The saved-job unique ID
	userId: string;
	jobId: string;
	savedAt: string; // ISO date string
}

/**
 * A resolved saved job, enriched with the actual job listing data.
 */
export interface ResolvedSavedJob extends SavedJob {
	job: JobListing;
}

/**
 * Resolves a SavedJob into a ResolvedSavedJob by looking up the job details.
 * Throws an error if the job cannot be found (which in a real app might happen if a job is deleted).
 */
export function resolveSavedJob(savedJob: SavedJob): ResolvedSavedJob | null {
	const job = getJobById(savedJob.jobId);
	if (!job) {
		console.warn(`Job "${savedJob.jobId}" not found for saved job "${savedJob.id}". This saved job will be ignored.`);
		return null;
	}
	return {
		...savedJob,
		job,
	};
}
