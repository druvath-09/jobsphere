import {
	LoginPage,
	RegisterPage,
	ForgotPasswordPage,
	ResetPasswordPage,
} from '@/pages/auth';
import { HomePage } from '@/pages/home';
import { CompaniesPage } from '@/pages/companies';
import { JobDetailsPage } from '@/pages/job-details';
import { JobsPage } from '@/pages/jobs';
import { DashboardPage } from '@/pages/dashboard';
import { ProfilePage } from '@/pages/profile';
import { SavedJobsPage } from '@/pages/saved-jobs';
import { ApplicationsPage } from '@/pages/applications';
import { NotificationsPage } from '@/pages/notifications';
import { ProtectedRoute } from '@/app/providers/protected-route';
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

				{/* ---- Auth Routes ---- */}
				<Route path={ROUTES.login} element={<LoginPage />} />
				<Route path={ROUTES.register} element={<RegisterPage />} />
				<Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
				<Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />

				{/* ---- Protected Routes ---- */}
				<Route path={ROUTES.dashboard} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
				<Route path={ROUTES.profile} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
				<Route path={ROUTES.savedJobs} element={<ProtectedRoute><SavedJobsPage /></ProtectedRoute>} />
				<Route path={ROUTES.applications} element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
				<Route path={ROUTES.notifications} element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

				<Route path="*" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export { AppRouter };
