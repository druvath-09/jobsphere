import { NavbarAuth } from '@/widgets/navbar-auth';
import { MainLayout, Container } from '@/shared/components/layout';
import { Card, CardContent, CardTitle, Button } from '@/shared/components/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

function SavedJobsPage() {
	const navigate = useNavigate();

	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<section className="py-12 sm:py-16">
				<Container padding="md">
					<Card className="mx-auto max-w-2xl">
						<CardContent className="flex flex-col items-start gap-4 p-6 sm:p-8">
							<CardTitle>Saved Jobs</CardTitle>
							<p className="text-sm leading-7 text-text-secondary">
								The full Saved Jobs module is coming soon.
							</p>
							<Button variant="primary" size="md" onClick={() => navigate(ROUTES.dashboard)}>
								Back to Dashboard
							</Button>
						</CardContent>
					</Card>
				</Container>
			</section>
		</MainLayout>
	);
}

export { SavedJobsPage };
