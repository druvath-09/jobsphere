'use client';

import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/components/ui';
import { Link, useNavigate } from 'react-router-dom';

/**
 * NavbarAuth — renders either the authenticated user state
 * (welcome + logout) or guest actions (login + register).
 *
 * Designed to be passed as the `authSlot` prop to the Navbar component.
 */
function NavbarAuth() {
	const { isAuthenticated, logout, currentUser } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate(ROUTES.home);
	};

	if (isAuthenticated) {
		return (
			<div className="flex items-center gap-2">
				<Link
					to={ROUTES.dashboard}
					className="text-sm font-medium text-text-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm transition-colors"
				>
					Welcome, {currentUser?.fullName}
				</Link>
				<div className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
				<Button
					variant="ghost"
					size="sm"
					onClick={handleLogout}
					className="text-text-secondary font-medium"
				>
					Logout
				</Button>
			</div>
		);
	}

	return (
		<>
			<Link to={ROUTES.login}>
				<Button variant="ghost" size="sm" className="text-text-secondary font-medium">
					Login
				</Button>
			</Link>
			<Link to={ROUTES.register}>
				<Button variant="primary" size="sm">
					Register
				</Button>
			</Link>
		</>
	);
}

export { NavbarAuth };
