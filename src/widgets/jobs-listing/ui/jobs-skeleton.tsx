import { Container } from '@/shared/components/layout';
import { Card } from '@/shared/components/ui';

function JobsSkeleton() {
  return (
    <section aria-labelledby="jobs-listing-heading" className="py-10 sm:py-12">
      <Container padding="md">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl animate-pulse space-y-3">
            <div className="h-4 w-36 rounded-full bg-slate-200" />
            <div className="h-8 w-3/4 rounded-full bg-slate-200 sm:w-2/3" />
            <div className="h-4 w-full rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 rounded-full bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-4">
                <div className="animate-pulse space-y-3">
                  <div className="h-7 w-16 rounded-full bg-slate-200" />
                  <div className="h-4 w-24 rounded-full bg-slate-200" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      <Container padding="md" className="mt-6">
        <div className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))]">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse space-y-2">
                <div className="h-4 w-20 rounded-full bg-slate-200" />
                <div className="h-10 w-full rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container padding="md" className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-40 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-8 w-24 rounded-lg bg-slate-200 animate-pulse" />
        </div>
      </Container>

      <Container padding="md" className="mt-6">
        <div className="grid gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="animate-pulse p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-2/3 rounded-full bg-slate-200" />
                    <div className="h-3 w-1/3 rounded-full bg-slate-200" />
                    <div className="flex flex-wrap gap-2 pt-1">
                      <div className="h-6 w-16 rounded-full bg-slate-200" />
                      <div className="h-6 w-24 rounded-full bg-slate-200" />
                      <div className="h-6 w-20 rounded-full bg-slate-200" />
                    </div>
                  </div>
                  <div className="h-3 w-16 rounded-full bg-slate-200" />
                </div>
                <div className="mt-5 h-3 w-full rounded-full bg-slate-200" />
                <div className="mt-3 h-3 w-5/6 rounded-full bg-slate-200" />
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-9 w-28 rounded-lg bg-slate-200" />
                  <div className="h-9 w-9 rounded-lg bg-slate-200" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { JobsSkeleton };