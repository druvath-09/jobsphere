const ROUTES = {
	home: '/',
	jobs: '/jobs',
	companies: '/companies',
} as const;

type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export { ROUTES };
export type { RoutePath };
