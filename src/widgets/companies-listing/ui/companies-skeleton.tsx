import { Container } from '@/shared/components/layout';
import { Card } from '@/shared/components/ui';

function CompaniesSkeleton() {
  return (
    <section className="py-10 sm:py-12">
      <Container padding="md">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-5 sm:p-6">
              <div className="animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-surface" />
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-4 w-32 rounded bg-surface" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-3 w-full rounded bg-surface" />
                      <div className="h-3 w-full rounded bg-surface" />
                      <div className="h-3 w-full rounded bg-surface" />
                      <div className="h-3 w-full rounded bg-surface" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full rounded bg-surface" />
                  <div className="h-3 w-5/6 rounded bg-surface" />
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-surface" />
                  <div className="h-6 w-20 rounded-full bg-surface" />
                  <div className="h-6 w-14 rounded-full bg-surface" />
                </div>
                <div className="mt-5 h-10 rounded-lg bg-surface" />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { CompaniesSkeleton };
