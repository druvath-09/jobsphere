import { NavbarAuth } from '@/widgets/navbar-auth';
import { MainLayout, Container } from '@/shared/components/layout';
import { Card, CardContent, Badge, Button } from '@/shared/components/ui';
import { useApplications } from '@/entities/application';
import { Link } from 'react-router-dom';
import { getJobDetailsPath } from '@/shared/constants/routes';

function statusBadgeVariant(status: string) {
	switch (status) {
		case 'Applied':
			return 'info';
		case 'Reviewing':
			return 'warning';
		case 'Interviewing':
			return 'primary';
		case 'Offered':
		case 'Accepted':
			return 'success';
		case 'Rejected':
			return 'error';
		default:
			return 'default';
	}
}

function ApplicationsPage() {
	const { applications, withdrawApplication } = useApplications();

	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<section className="py-12 sm:py-16">
				<Container padding="md">
					<div className="mb-8">
						<h1 className="text-3xl font-bold tracking-tight text-text-primary">Your Applications</h1>
						<p className="mt-2 text-text-secondary">Track and manage your job applications.</p>
					</div>
					
					{applications.length === 0 ? (
						<Card className="mx-auto max-w-2xl text-center overflow-hidden border-border/60">
							<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-50"></div>
							<CardContent className="flex flex-col items-center gap-5 p-12 relative z-10">
								<div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-sm border border-border text-primary">
									<svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
									</svg>
								</div>
								<div>
									<h2 className="text-xl font-bold text-text-primary mb-2">No applications yet</h2>
									<p className="text-text-secondary max-w-sm mx-auto">Your job search journey starts here. Browse our curated list of opportunities and find your next great role.</p>
								</div>
								<Link to="/jobs" className="mt-2">
									<Button variant="primary" className="shadow-md hover:shadow-lg transition-all rounded-lg px-8">Browse Jobs</Button>
								</Link>
							</CardContent>
						</Card>
					) : (
						<div className="grid gap-4">
							{applications.map((app) => {
								const date = new Date(app.appliedDate).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								});
								const canWithdraw = app.status === 'Applied' || app.status === 'Reviewing';
								
								return (
									<Card key={app.id}>
										<CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
											<div className="flex items-start gap-4">
												<div
													className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm"
													style={{ backgroundColor: app.job.companyColor }}
													aria-hidden="true"
												>
													{app.job.companyInitial}
												</div>
												<div>
													<Link to={getJobDetailsPath(app.job.id)} className="font-semibold text-text-primary hover:underline">
														{app.job.title}
													</Link>
													<p className="mt-1 text-sm font-medium text-text-secondary">{app.job.company}</p>
													<p className="mt-2 text-xs text-text-secondary">Applied on {date}</p>
												</div>
											</div>
											<div className="flex flex-col items-start gap-3 sm:items-end">
												<Badge variant={statusBadgeVariant(app.status)}>{app.status}</Badge>
												<Button 
													variant="outline" 
													size="sm" 
													disabled={!canWithdraw}
													onClick={() => withdrawApplication(app.job.id)}
												>
													Withdraw
												</Button>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					)}
				</Container>
			</section>
		</MainLayout>
	);
}

export { ApplicationsPage };
