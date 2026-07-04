import { Card, CardContent } from '@/shared/components/ui';

function BookmarkIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M3.333 14L8 10.667 12.667 14V2.667A1.333 1.333 0 0 0 11.333 1.333H4.667A1.333 1.333 0 0 0 3.333 2.667V14z" />
		</svg>
	);
}

function BriefcaseIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M10.667 4.667V3.333a1.333 1.333 0 0 0-1.334-1.333H6.667A1.333 1.333 0 0 0 5.333 3.333v1.334" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M2.667 4.667h10.666a1.333 1.333 0 0 1 1.334 1.333v6a1.333 1.333 0 0 1-1.334 1.333H2.667A1.333 1.333 0 0 1 1.333 12V6a1.333 1.333 0 0 1 1.334-1.333z" />
		</svg>
	);
}

function EyeIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M1.333 8s2.667-5.333 6.667-5.333S14.667 8 14.667 8s-2.667 5.333-6.667 5.333S1.333 8 1.333 8z" />
			<circle cx="8" cy="8" r="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function CalendarIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M10.667 1.333v2.667M5.333 1.333v2.667M2 6h12M2.667 2.667h10.666A1.333 1.333 0 0 1 14.667 4v9.333a1.333 1.333 0 0 1-1.334 1.334H2.667A1.333 1.333 0 0 1 1.333 13.333V4a1.333 1.333 0 0 1 1.334-1.333z" />
		</svg>
	);
}

const STATS = [
	{ label: 'Saved Jobs', value: 12, icon: BookmarkIcon },
	{ label: 'Applied Jobs', value: 4, icon: BriefcaseIcon },
	{ label: 'Profile Views', value: 47, icon: EyeIcon },
	{ label: 'Interviews', value: 1, icon: CalendarIcon },
];

function DashboardStatistics() {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
			{STATS.map((stat) => (
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
