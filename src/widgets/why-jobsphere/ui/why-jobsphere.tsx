import { Container } from '@/shared/components/layout';

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.5l2 2 3-3.5M10 2l6.5 2.5v5c0 3.5-2.5 5.5-6.5 7-4-1.5-6.5-3.5-6.5-7V4.5L10 2z" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 2L4 11h7l-2 7 9-9h-7l2-7z" />
    </svg>
  );
}

function ClipboardListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1h-3M7 3a2 2 0 002 2h2a2 2 0 002-2M7 3a2 2 0 012-2h2a2 2 0 012 2m-6 6h6m-6 3h4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: ShieldCheckIcon,
    title: 'Verified companies',
    description:
      'Every company on JobSphere goes through a manual verification process. No ghost listings, no spam recruiters.',
  },
  {
    icon: BoltIcon,
    title: 'Fast applications',
    description:
      'Apply with your JobSphere profile in one click. No repetitive forms. Your profile travels with you.',
  },
  {
    icon: ClipboardListIcon,
    title: 'Track applications',
    description:
      'See every application you have sent, its status, and any recruiter messages in one organized dashboard.',
  },
] as const;

/* ------------------------------------------------------------------ */
/*  WhyJobSphere Component                                             */
/* ------------------------------------------------------------------ */

/**
 * WhyJobSphere — a simple 3-column feature section.
 * Icon, title, description. No decorative extras.
 */
function WhyJobSphere() {
  return (
    <section
      aria-labelledby="why-heading"
      className="border-t border-border bg-surface py-12 sm:py-16"
    >
      <Container padding="md">

        <div className="mb-10">
          <h2
            id="why-heading"
            className="text-xl font-semibold text-text-primary"
          >
            Why engineers choose JobSphere
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Built specifically for software engineers and technical roles.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export { WhyJobSphere };
