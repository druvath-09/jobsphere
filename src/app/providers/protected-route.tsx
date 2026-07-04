import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * A route guard that redirects unauthenticated users to the login page.
 * It preserves the intended destination to redirect back after login.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return null; // Or a loading spinner
	}

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
	}

	return children;
}

export { ProtectedRoute };
