import { Badge } from '@/shared/components/ui';
import { Container, MainLayout } from '@/shared/components/layout';
import { JobsListing } from '@/widgets/jobs-listing';

function getInitialQuery() {
  if (typeof window === 'undefined') {
    return '';
  }

  return new URLSearchParams(window.location.search).get('q') ?? '';
}

function JobsPage() {
  const initialQuery = getInitialQuery();

  return (
    <MainLayout>
      <section className="border-b border-border bg-gradient-to-b from-surface to-background">
        <Container padding="md" className="py-10 sm:py-14">
          <div className="max-w-3xl">
            <Badge variant="primary">Jobs listing</Badge>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Find roles that match your skills, pace, and salary goals.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              Browse verified openings from startups and scale-ups across engineering, product, design,
              data, and operations. Narrow the search with focused filters and compare roles quickly.
            </p>
          </div>
        </Container>
      </section>

      <JobsListing initialQuery={initialQuery} />
    </MainLayout>
  );
}

export { JobsPage };