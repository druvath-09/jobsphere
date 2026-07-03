import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardTitle } from '@/shared/components/ui';
import { Container } from '@/shared/components/layout';
import { getJobsPath } from '@/shared/constants/routes';

function JobNotFound() {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16">
      <Container padding="md">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="flex flex-col items-start gap-4 p-6 sm:p-8">
            <CardTitle>Job not found</CardTitle>
            <p className="text-sm leading-7 text-text-secondary">
              The job you are looking for does not exist or may have been removed.
            </p>
            <Button variant="primary" size="md" onClick={() => navigate(getJobsPath())}>
              Back to Jobs
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

export { JobNotFound };