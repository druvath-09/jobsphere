import { JOBS, type JobListing } from '@/entities/job';
import { useSavedJobs } from '@/entities/saved-job';
import { CompanyLogoAvatar } from '@/entities/company';
import { Card, Badge, Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { getJobDetailsPath } from '@/shared/constants/routes';
import { useNavigate } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function MapPinIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M8 8.667A2 2 0 1 0 8 4.667a2 2 0 0 0 0 4zM8 1.333C5.42 1.333 3.333 3.42 3.333 6c0 3.5 4.667 8.667 4.667 8.667S12.667 9.5 12.667 6c0-2.58-2.087-4.667-4.667-4.667z" />
		</svg>
	);
}

function BookmarkIcon({ className, filled }: { className?: string; filled?: boolean }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M3.333 14L8 10.667 12.667 14V2.667A1.333 1.333 0 0 0 11.333 1.333H4.667A1.333 1.333 0 0 0 3.333 2.667V14z" />
		</svg>
	);
}

function ClockIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<circle cx="8" cy="8" r="6.333" strokeLinecap="round" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M8 5v3.333L10 10" />
		</svg>
	);
}

function workModeBadgeVariant(mode: JobListing['workMode']) {
	switch (mode) {
		case 'Remote':
			return 'success' as const;
		case 'Hybrid':
			return 'warning' as const;
		case 'Onsite':
			return 'secondary' as const;
	}
}

/* ------------------------------------------------------------------ */
/*  Job Card (Duplicated for Dashboard independence)                   */
/* ------------------------------------------------------------------ */

function DashboardJobCard({ job }: { job: JobListing }) {
	const navigate = useNavigate();
	const { isSaved, toggleSavedJob } = useSavedJobs();
	const saved = isSaved(job.id);

	return (
		<Card
			interactive
			className={cn(
				'flex flex-col gap-4 overflow-hidden p-5',
				'sm:flex-row sm:items-start sm:gap-4',
			)}
			role="link"
			aria-label={`View details for ${job.title} at ${job.company}`}
			onClick={() => navigate(getJobDetailsPath(job.id))}
			onKeyDown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					navigate(getJobDetailsPath(job.id));
				}
			}}
		>
			<CompanyLogoAvatar
				logo={{ path: job.companyLogo, initial: job.companyInitial, color: job.companyColor }}
				fallbackInitial={job.companyInitial}
				className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
			/>

			<div className="flex flex-1 flex-col gap-2.5 min-w-0">
				<div className="flex items-center justify-between gap-2">
					<span className="text-xs font-medium text-text-secondary">{job.company}</span>
					<span className="flex items-center gap-1 text-xs text-text-secondary shrink-0">
						<ClockIcon className="h-3 w-3" />
						{job.postedDaysAgo === 1 ? 'Today' : `${job.postedDaysAgo}d ago`}
					</span>
				</div>

				<h3 className="text-sm font-semibold text-text-primary leading-snug">
					{job.title}
				</h3>

				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
					<span className="inline-flex items-center gap-1">
						<MapPinIcon className="h-3 w-3 shrink-0" />
						{job.location}
					</span>
					<span>{job.salaryLabel}</span>
					<span>{job.experienceLabel}</span>
				</div>

				<div className="flex flex-wrap items-center gap-1.5">
					<Badge variant={workModeBadgeVariant(job.workMode)} className="text-[11px]">
						{job.workMode}
					</Badge>
					<Badge variant="outline" className="text-[11px]">
						{job.employmentType}
					</Badge>
					{job.skills.slice(0, 3).map((skill) => (
						<Badge key={skill} variant="outline" className="text-[11px]">
							{skill}
						</Badge>
					))}
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
				<Button
					variant="primary"
					size="sm"
					className="flex-1 justify-center sm:flex-none"
					onClick={(e) => {
						e.stopPropagation();
						navigate(getJobDetailsPath(job.id));
					}}
				>
					Apply Now
				</Button>
				<button
					type="button"
					aria-label={saved ? `Unsave ${job.title} at ${job.company}` : `Save ${job.title} at ${job.company}`}
					className={cn(
						'flex h-8 w-8 items-center justify-center rounded-md border transition-colors duration-150',
						saved 
							? 'border-primary text-primary bg-primary/5 hover:bg-primary/10'
							: 'border-border bg-surface text-text-secondary hover:border-primary/40 hover:text-primary',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
					)}
					onClick={(e) => {
						e.stopPropagation();
						toggleSavedJob(job.id);
					}}
				>
					<BookmarkIcon className="h-3.5 w-3.5" filled={saved} />
				</button>
			</div>
		</Card>
	);
}

/* ------------------------------------------------------------------ */
/*  Recommended Jobs Section                                           */
/* ------------------------------------------------------------------ */

function DashboardRecommendedJobs() {
	// Deterministic recommendations: Jobs with 'React' or 'Python' in skills
	const recommendedJobs = JOBS.filter(
		(job) => job.skills.includes('React') || job.skills.includes('Python')
	).slice(0, 4);

	return (
		<section aria-labelledby="recommended-jobs-heading" className="flex flex-col gap-4">
			<h2 id="recommended-jobs-heading" className="text-lg font-semibold text-text-primary">
				Recommended for You
			</h2>
			<div className="flex flex-col gap-3">
				{recommendedJobs.map((job) => (
					<DashboardJobCard key={job.id} job={job} />
				))}
				{recommendedJobs.length === 0 && (
					<div className="py-8 text-center text-sm text-text-secondary">
						No recommendations available at this time.
					</div>
				)}
			</div>
		</section>
	);
}

export { DashboardRecommendedJobs };
