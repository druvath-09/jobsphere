import { useEffect, useState } from 'react';
import { HomePage } from '@/pages/home';
import { CompaniesPage } from '@/pages/companies';
import { JobsPage } from '@/pages/jobs';
import { ROUTES } from '@/shared/constants/routes';

function getLocationKey() {
	return typeof window === 'undefined'
		? ROUTES.home
		: `${window.location.pathname}${window.location.search}`;
}

function AppRouter() {
	const [locationKey, setLocationKey] = useState(getLocationKey);
	const pathname = locationKey.split('?')[0];

	useEffect(() => {
		function handlePopState() {
			setLocationKey(`${window.location.pathname}${window.location.search}`);
		}

		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	if (pathname === ROUTES.jobs) {
		return <JobsPage />;
	}

	if (pathname === ROUTES.companies) {
		return <CompaniesPage />;
	}

	return <HomePage />;
}

export { AppRouter };
