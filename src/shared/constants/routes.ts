const ROUTES = {
	home: '/',
	jobs: '/jobs',
	companies: '/companies',
} as const;

function getJobsPath(query = '') {
	const normalizedQuery = query.trim().toLowerCase();

	return normalizedQuery
		? `${ROUTES.jobs}?q=${encodeURIComponent(normalizedQuery)}`
		: ROUTES.jobs;
}

function getJobDetailsPath(jobId: string) {
	return `${ROUTES.jobs}/${encodeURIComponent(jobId)}`;
}

function getCompanyDetailsPath(companyId: string) {
	return `${ROUTES.companies}/${encodeURIComponent(companyId)}`;
}

type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export { ROUTES };
export { getCompanyDetailsPath, getJobDetailsPath, getJobsPath };
export type { RoutePath };
