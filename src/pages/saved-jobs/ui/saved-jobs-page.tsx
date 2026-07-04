import { NavbarAuth } from '@/widgets/navbar-auth';
import { MainLayout, Container } from '@/shared/components/layout';
import { useSavedJobs, resolveSavedJob } from '@/entities/saved-job';
import { JobCard } from '@/widgets/jobs-listing/ui/job-card';
import { Button } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

function SavedJobsPage() {
	const navigate = useNavigate();
	const { savedJobs } = useSavedJobs();
	
	const resolvedJobs = savedJobs.map(resolveSavedJob).map(sj => sj.job);

	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<div className="bg-surface-hover/30 min-h-screen pb-16 pt-8">
				<Container padding="md">
					<div className="mb-8 flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
								Saved Jobs
							</h1>
							<p className="mt-2 text-sm text-text-secondary">
								Jobs you have saved to review later.
							</p>
						</div>
					</div>

					{resolvedJobs.length > 0 ? (
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{resolvedJobs.map((job) => (
								<JobCard key={job.id} job={job} />
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface py-24 text-center">
							<div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
								<svg className="h-6 w-6" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" d="M4 2.5h8a.5.5 0 0 1 .5.5v10.5L8 10.75 3.5 13.5V3a.5.5 0 0 1 .5-.5z" />
								</svg>
							</div>
							<h3 className="text-lg font-medium text-text-primary">No saved jobs yet</h3>
							<p className="mt-2 max-w-sm text-sm text-text-secondary">
								When you see a job you like, click the bookmark icon to save it here for later.
							</p>
							<Button variant="primary" className="mt-6" onClick={() => navigate(ROUTES.jobs)}>
								Browse Jobs
							</Button>
						</div>
					)}
				</Container>
			</div>
		</MainLayout>
	);
}

export { SavedJobsPage };
