import { NavbarAuth } from '@/widgets/navbar-auth';
import { JobsListing } from '@/widgets/jobs-listing';
import { MainLayout } from '@/shared/components/layout';

function JobsPage() {
	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<JobsListing />
		</MainLayout>
	);
}

export { JobsPage };