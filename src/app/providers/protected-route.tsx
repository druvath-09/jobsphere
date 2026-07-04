import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * A route guard that redirects unauthenticated users to the login page.
 * It preserves the intended destination to redirect back after login.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
	}

	return children;
}

export { ProtectedRoute };
