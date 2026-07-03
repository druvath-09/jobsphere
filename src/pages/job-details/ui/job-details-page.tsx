import { useEffect } from 'react';
import { MainLayout } from '@/shared/components/layout';
import { getJobDetails } from '@/entities/job';
import { JobDetailsContent, JobNotFound } from '@/widgets/job-details';

interface JobDetailsPageProps {
  jobId: string;
}

function JobDetailsPage({ jobId }: JobDetailsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [jobId]);

  const job = getJobDetails(jobId);

  return (
    <MainLayout>
      {job ? <JobDetailsContent job={job} /> : <JobNotFound />}
    </MainLayout>
  );
}

export { JobDetailsPage };