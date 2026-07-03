import { HomePage } from '@/pages/home';
import { CompaniesPage } from '@/pages/companies';
import { JobDetailsPage } from '@/pages/job-details';
import { JobsPage } from '@/pages/jobs';
import { ROUTES } from '@/shared/constants/routes';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';

function AppRouter() {
	function JobDetailsRoute() {
		const { jobId = '' } = useParams();
		return <JobDetailsPage jobId={jobId} />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.home} element={<HomePage />} />
				<Route path={ROUTES.jobs} element={<JobsPage />} />
				<Route path={`${ROUTES.jobs}/:jobId`} element={<JobDetailsRoute />} />
				<Route path={ROUTES.companies} element={<CompaniesPage />} />
				<Route path={`${ROUTES.companies}/:companyId`} element={<CompaniesPage />} />
				<Route path="*" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export { AppRouter };
