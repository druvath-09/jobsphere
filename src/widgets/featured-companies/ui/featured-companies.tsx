import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/layout';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Company {
  name: string;
  initial: string;
  color: string;
  openRoles: number;
  sector: string;
}

const COMPANIES: Company[] = [
  { name: 'Google',     initial: 'G',  color: '#4285F4', openRoles: 142, sector: 'Search & Cloud' },
  { name: 'Amazon',     initial: 'A',  color: '#FF9900', openRoles: 318, sector: 'E-Commerce & Cloud' },
  { name: 'Microsoft',  initial: 'M',  color: '#00A4EF', openRoles: 207, sector: 'Enterprise Software' },
  { name: 'Stripe',     initial: 'S',  color: '#635BFF', openRoles: 89,  sector: 'Payments' },
  { name: 'Meta',       initial: 'M',  color: '#0866FF', openRoles: 176, sector: 'Social & VR' },
  { name: 'Adobe',      initial: 'A',  color: '#FF0000', openRoles: 64,  sector: 'Creative Software' },
  { name: 'Netflix',    initial: 'N',  color: '#E50914', openRoles: 53,  sector: 'Streaming' },
  { name: 'Atlassian',  initial: 'A',  color: '#0052CC', openRoles: 91,  sector: 'Dev Tools' },
];

/* ------------------------------------------------------------------ */
/*  Company Card                                                       */
/* ------------------------------------------------------------------ */

function CompanyCard({ company }: { company: Company }) {
  return (
    <a
      href={`/companies/${company.name.toLowerCase()}`}
      className={cn(
        'group flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5',
        'transition-all duration-200',
        'hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      )}
    >
      {/* Company logo placeholder */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-white"
        style={{ backgroundColor: company.color }}
        aria-hidden="true"
      >
        {company.initial}
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors duration-150">
          {company.name}
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">{company.sector}</p>
        <p className="mt-1.5 text-xs font-medium text-primary">
          {company.openRoles} open roles
        </p>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  FeaturedCompanies Component                                        */
/* ------------------------------------------------------------------ */

/**
 * FeaturedCompanies — scrollable grid of company cards.
 * Each card shows a company logo placeholder, name, sector, and open role count.
 */
function FeaturedCompanies() {
  return (
    <section aria-labelledby="companies-heading" className="py-12 sm:py-16">
      <Container padding="md">

        {/* Section header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2
              id="companies-heading"
              className="text-xl font-semibold text-text-primary"
            >
              Featured companies
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Discover roles at companies that are actively hiring
            </p>
          </div>
          <a
            href="/companies"
            className={cn(
              'hidden text-sm font-medium text-primary sm:block',
              'transition-colors duration-150 hover:text-primary/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'rounded-sm',
            )}
          >
            View all →
          </a>
        </div>

        {/* Company grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {COMPANIES.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>

      </Container>
    </section>
  );
}

export { FeaturedCompanies };
