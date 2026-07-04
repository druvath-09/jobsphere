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
      className="border-t border-border bg-surface py-20 sm:py-28 overflow-hidden"
    >
      <Container padding="md">

        <div className="mb-16 max-w-2xl">
          <h2
            id="why-heading"
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
          >
            Why engineers choose JobSphere
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            Built specifically for software engineers and technical roles. 
            We focus on transparency, speed, and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-gradient-to-b from-surface to-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/20 overflow-hidden"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-0 pointer-events-none" />
                
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed text-text-secondary">
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
