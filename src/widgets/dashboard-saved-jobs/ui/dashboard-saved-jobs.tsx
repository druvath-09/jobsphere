import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui';
import { JOBS } from '@/entities/job';
import { CompanyLogoAvatar } from '@/entities/company';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES, getJobDetailsPath } from '@/shared/constants/routes';

function DashboardSavedJobs() {
	const navigate = useNavigate();
	// Mock: Get the first 5 jobs
	const savedJobs = JOBS.slice(0, 5);

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
				{savedJobs.map((job) => (
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
				{savedJobs.length === 0 && (
					<div className="py-4 text-center text-sm text-text-secondary">
						No saved jobs yet.
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export { DashboardSavedJobs };
