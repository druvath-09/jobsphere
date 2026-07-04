import { Card, CardContent } from '@/shared/components/ui';
import { useSavedJobs } from '@/entities/saved-job';

function BriefcaseIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M3.333 4.667v8c0 .736.597 1.333 1.334 1.333h6.666a1.333 1.333 0 0 0 1.334-1.333v-8m-10.667 0h10.667m-10.667 0c0-.736.597-1.334 1.334-1.334h8c.736 0 1.333.598 1.333 1.334m-7.333 0V2a.667.667 0 0 1 .666-.667h2.667a.667.667 0 0 1 .667.667v2.667" />
		</svg>
	);
}

function EyeIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M1.333 8c1.334-3.333 4-5.333 6.667-5.333S13.333 4.667 14.667 8c-1.334 3.333-4 5.333-6.667 5.333S2.667 11.333 1.333 8z" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
		</svg>
	);
}

function CalendarIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M12.667 2.667H3.333A1.333 1.333 0 0 0 2 4v8.667A1.333 1.333 0 0 0 3.333 14h9.334A1.333 1.333 0 0 0 14 12.667V4a1.333 1.333 0 0 0-1.333-1.333z" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M10.667 1.333v2.667M5.333 1.333v2.667M2 6h12" />
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

import { useApplications } from '@/entities/application';

function DashboardStatistics() {
	const { savedJobs } = useSavedJobs();
	const { applications } = useApplications();

	const stats = [
		{ label: 'Saved Jobs', value: savedJobs.length, icon: BookmarkIcon },
		{ label: 'Applied Jobs', value: applications.length, icon: BriefcaseIcon },
		{ label: 'Profile Views', value: 47, icon: EyeIcon },
		{ label: 'Interviews', value: 1, icon: CalendarIcon },
	];

	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
			{stats.map((stat) => (
				<Card key={stat.label}>
					<CardContent className="flex flex-col items-start gap-3 p-5">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-hover text-text-secondary">
							<stat.icon className="h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-medium text-text-secondary">{stat.label}</p>
							<p className="mt-1 text-2xl font-bold text-text-primary">{stat.value}</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

export { DashboardStatistics };
