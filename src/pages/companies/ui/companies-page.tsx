import { Badge } from '@/shared/components/ui';
import { Container, MainLayout } from '@/shared/components/layout';

function CompaniesPage() {
  return (
    <MainLayout>
      <section className="border-b border-border bg-surface">
        <Container padding="md" className="py-12 sm:py-16">
          <div className="max-w-3xl">
            <Badge variant="primary">Companies</Badge>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              Companies page coming next.
            </h1>
            <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
              This is a temporary placeholder so the homepage Browse Companies CTA has a valid route
              while the full companies experience is built.
            </p>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}

export { CompaniesPage };