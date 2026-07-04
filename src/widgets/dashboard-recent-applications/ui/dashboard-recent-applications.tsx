import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/shared/components/ui';
import { useApplications } from '@/entities/application';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

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

function DashboardRecentApplications() {
	const { recentApplications: applications } = useApplications();

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-lg">Recent Applications</CardTitle>
				<Link
					to={ROUTES.applications}
					className="text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
				>
					View All
				</Link>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm" aria-label="Recent applications">
						<thead className="border-b border-border text-text-secondary">
							<tr>
								<th className="py-3 font-medium">Company</th>
								<th className="py-3 font-medium">Position</th>
								<th className="py-3 font-medium">Status</th>
								<th className="py-3 font-medium">Applied Date</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{applications.map((app) => {
								const date = new Date(app.appliedDate).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								});
								return (
									<tr key={app.id} className="transition-colors hover:bg-surface-hover/50">
										<td className="py-3">
											<div className="flex items-center gap-3">
												<div
													className="flex h-8 w-8 items-center justify-center rounded-md font-bold text-white text-xs"
													style={{ backgroundColor: app.job.companyColor }}
													aria-hidden="true"
												>
													{app.job.companyInitial}
												</div>
												<span className="font-medium text-text-primary">{app.job.company}</span>
											</div>
										</td>
										<td className="py-3 text-text-secondary">{app.job.title}</td>
										<td className="py-3">
											<Badge variant={statusBadgeVariant(app.status)} className="text-[11px]">
												{app.status}
											</Badge>
										</td>
										<td className="py-3 text-text-secondary">{date}</td>
									</tr>
								);
							})}
							{applications.length === 0 && (
								<tr>
									<td colSpan={4} className="py-8 text-center text-text-secondary">
										You haven't applied to any jobs yet.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}

export { DashboardRecentApplications };
