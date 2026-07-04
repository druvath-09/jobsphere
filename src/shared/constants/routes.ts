export const ROUTES = {
	home: '/',
	jobs: '/jobs',
	companies: '/companies',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	resetPassword: '/reset-password',
	dashboard: '/dashboard',
	profile: '/profile',
	savedJobs: '/saved-jobs',
	applications: '/applications',
} as const;

export function getJobsPath(query = '') {
	const normalizedQuery = query.trim().toLowerCase();

	return normalizedQuery
		? `${ROUTES.jobs}?q=${encodeURIComponent(normalizedQuery)}`
		: ROUTES.jobs;
}

export function getJobDetailsPath(jobId: string) {
	return `${ROUTES.jobs}/${encodeURIComponent(jobId)}`;
}

export function getCompanyDetailsPath(companyId: string) {
	return `${ROUTES.companies}/${encodeURIComponent(companyId)}`;
}

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
