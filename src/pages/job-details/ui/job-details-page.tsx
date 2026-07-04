import { NavbarAuth } from '@/widgets/navbar-auth';
import { JobDetailsContent, JobNotFound } from '@/widgets/job-details';
import { MainLayout } from '@/shared/components/layout';
import { getJobDetails } from '@/entities/job';

interface JobDetailsPageProps {
	jobId: string;
}

function JobDetailsPage({ jobId }: JobDetailsPageProps) {
	const job = getJobDetails(jobId);

	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			{job ? <JobDetailsContent job={job} /> : <JobNotFound />}
		</MainLayout>
	);
}

export { JobDetailsPage };