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
	
	const resolvedJobs = savedJobs.map(resolveSavedJob).filter((sj): sj is import('@/entities/saved-job').ResolvedSavedJob => sj !== null).map(sj => sj.job);

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
						<div className="mx-auto max-w-2xl mt-10">
							<div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-sm">
								<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-50"></div>
								<div className="flex flex-col items-center gap-5 p-12 relative z-10 text-center">
									<div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-sm border border-border text-primary">
										<svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
											<path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
										</svg>
									</div>
									<div>
										<h2 className="text-xl font-bold text-text-primary mb-2">No saved jobs yet</h2>
										<p className="text-text-secondary max-w-sm mx-auto">Keep track of roles you're interested in. Bookmark jobs to review them later when you're ready to apply.</p>
									</div>
									<Button variant="primary" className="mt-2 shadow-md hover:shadow-lg transition-all rounded-lg px-8" onClick={() => navigate(ROUTES.jobs)}>
										Browse Jobs
									</Button>
								</div>
							</div>
						</div>
					)}
				</Container>
			</div>
		</MainLayout>
	);
}

export { SavedJobsPage };
