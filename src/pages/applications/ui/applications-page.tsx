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
						<Card className="mx-auto max-w-2xl text-center">
							<CardContent className="flex flex-col items-center gap-4 p-8">
								<p className="text-text-secondary">You haven't applied to any jobs yet.</p>
								<Link to="/jobs">
									<Button variant="primary">Browse Jobs</Button>
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
