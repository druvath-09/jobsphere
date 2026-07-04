import { Button } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

function DashboardQuickActions() {
	const navigate = useNavigate();

	const actions = [
		{ label: 'Browse Jobs', route: ROUTES.jobs },
		{ label: 'Update Profile', route: ROUTES.profile },
		{ label: 'View Saved Jobs', route: ROUTES.savedJobs },
		{ label: 'View Applications', route: ROUTES.applications },
	];

	return (
		<section aria-label="Quick actions" className="mb-8 flex flex-wrap gap-3">
			{actions.map((action) => (
				<Button
					key={action.label}
					variant="secondary"
					size="md"
					onClick={() => navigate(action.route)}
					className="bg-surface hover:bg-surface-hover"
				>
					{action.label}
				</Button>
			))}
		</section>
	);
}

export { DashboardQuickActions };
