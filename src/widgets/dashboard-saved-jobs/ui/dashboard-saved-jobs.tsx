import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui';
import { useSavedJobs, resolveSavedJob } from '@/entities/saved-job';
import { CompanyLogoAvatar } from '@/entities/company';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, getJobDetailsPath } from '@/shared/constants/routes';

function DashboardSavedJobs() {
	const navigate = useNavigate();
	const { savedJobs } = useSavedJobs();
	
	// Resolve the first 5 saved jobs
	const recentSavedJobs = savedJobs
		.slice(0, 5)
		.map(resolveSavedJob)
		.filter((sj): sj is import('@/entities/saved-job').ResolvedSavedJob => sj !== null)
		.slice(0, 3)
		.map(sj => sj.job);

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-lg">Saved Jobs</CardTitle>
				<Link
					to={ROUTES.savedJobs}
					className="text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
				>
					View All
				</Link>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{recentSavedJobs.map((job) => (
					<div
						key={job.id}
						role="button"
						tabIndex={0}
						onClick={() => navigate(getJobDetailsPath(job.id))}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								navigate(getJobDetailsPath(job.id));
							}
						}}
						className="group flex cursor-pointer items-start gap-3 rounded-lg border border-transparent p-2 transition-colors hover:bg-surface-hover hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
						aria-label={`View saved job ${job.title} at ${job.company}`}
					>
						<CompanyLogoAvatar
							logo={{ path: job.companyLogo, initial: job.companyInitial, color: job.companyColor }}
							fallbackInitial={job.companyInitial}
							className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white"
						/>
						<div className="flex min-w-0 flex-1 flex-col">
							<span className="truncate text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
								{job.title}
							</span>
							<span className="truncate text-xs text-text-secondary">{job.company}</span>
							<div className="mt-1 flex items-center gap-2 text-[11px] text-text-secondary">
								<span>{job.location}</span>
								<span>•</span>
								<span>{job.salaryLabel}</span>
							</div>
						</div>
					</div>
				))}
				{recentSavedJobs.length === 0 && (
					<div className="flex flex-col items-center justify-center py-8 text-center">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-hover mb-3 text-text-secondary">
							<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
							</svg>
						</div>
						<p className="text-sm font-medium text-text-primary">No saved jobs</p>
						<p className="mt-1 text-xs text-text-secondary max-w-[180px]">Bookmark jobs you like to easily find them later.</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export { DashboardSavedJobs };
