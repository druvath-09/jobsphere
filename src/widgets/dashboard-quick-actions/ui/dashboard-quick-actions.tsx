import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

function SearchIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<circle cx="7" cy="7" r="4.5" />
			<path strokeLinecap="round" strokeLinejoin="round" d="m10 10 3.5 3.5" />
		</svg>
	);
}

function BookmarkIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M4 2.5h8a.5.5 0 0 1 .5.5v10.5L8 10.75 3.5 13.5V3a.5.5 0 0 1 .5-.5z" />
		</svg>
	);
}

function BriefcaseIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M3.333 4.667v8c0 .736.597 1.333 1.334 1.333h6.666a1.333 1.333 0 0 0 1.334-1.333v-8m-10.667 0h10.667m-10.667 0c0-.736.597-1.334 1.334-1.334h8c.736 0 1.333.598 1.333 1.334m-7.333 0V2a.667.667 0 0 1 .666-.667h2.667a.667.667 0 0 1 .667.667v2.667" />
		</svg>
	);
}

function UserIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<circle cx="8" cy="5" r="3" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M2.667 13.333c0-2.209 2.388-4 5.333-4s5.333 1.791 5.333 4" />
		</svg>
	);
}

function ArrowRightIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M3.333 8h9.334M8 3.333 12.667 8 8 12.667" />
		</svg>
	);
}

function DashboardQuickActions() {

	const actions = [
		{
			title: 'Browse Jobs',
			description: 'Find your next career opportunity',
			route: ROUTES.jobs,
			icon: SearchIcon,
			color: 'text-primary bg-primary/10',
		},
		{
			title: 'Saved Jobs',
			description: 'Review jobs you bookmarked',
			route: ROUTES.savedJobs,
			icon: BookmarkIcon,
			color: 'text-warning bg-warning/10',
		},
		{
			title: 'Applications',
			description: 'Track your application status',
			route: ROUTES.applications,
			icon: BriefcaseIcon,
			color: 'text-success bg-success/10',
		},
		{
			title: 'My Profile',
			description: 'Update your resume and details',
			route: ROUTES.profile,
			icon: UserIcon,
			color: 'text-info bg-info/10',
		},
	];

	return (
		<section aria-label="Quick actions" className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{actions.map((action) => {
				const Icon = action.icon;
				return (
					<Link
						key={action.title}
						to={action.route}
						aria-label={action.title}
						className="group flex cursor-pointer flex-col justify-between rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
					>
						<div className="mb-4 flex items-center justify-between">
							<div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${action.color}`}>
								<Icon className="h-6 w-6" />
							</div>
							<ArrowRightIcon className="h-5 w-5 text-text-secondary transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
						</div>
						<div>
							<h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">{action.title}</h3>
							<p className="mt-1 text-sm text-text-secondary">{action.description}</p>
						</div>
					</Link>
				);
			})}
		</section>
	);
}

export { DashboardQuickActions };
