import { NavbarAuth } from '@/widgets/navbar-auth';
import { MainLayout, Container } from '@/shared/components/layout';
import { DashboardWelcome } from '@/widgets/dashboard-welcome';
import { DashboardProfileCompletion } from '@/widgets/dashboard-profile-completion';
import { DashboardStatistics } from '@/widgets/dashboard-statistics';
import { DashboardRecentApplications } from '@/widgets/dashboard-recent-applications';
import { DashboardSavedJobs } from '@/widgets/dashboard-saved-jobs';
import { DashboardRecommendedJobs } from '@/widgets/dashboard-recommended-jobs';
import { DashboardQuickActions } from '@/widgets/dashboard-quick-actions';
import { useAuth } from '@/features/auth';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

function DashboardPage() {
	const { isAuthenticated } = useAuth();

	// Additional check just in case, though ProtectedRoute should handle this
	if (!isAuthenticated) {
		return <Navigate to={ROUTES.login} replace />;
	}

	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<div className="bg-surface-hover/30 pb-16 pt-8">
				<Container padding="md">
					<DashboardWelcome />
					<DashboardQuickActions />
					
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						<div className="flex flex-col gap-6 lg:col-span-2">
							<DashboardStatistics />
							<DashboardRecentApplications />
							<DashboardRecommendedJobs />
						</div>
						
						<div className="flex flex-col gap-6">
							<DashboardProfileCompletion />
							<DashboardSavedJobs />
						</div>
					</div>
				</Container>
			</div>
		</MainLayout>
	);
}

export { DashboardPage };
