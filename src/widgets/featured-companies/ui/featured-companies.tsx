import { Link } from 'react-router-dom';
import { CompanyLogoAvatar, getFeaturedCompanies, type CompanyListing } from '@/entities/company';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/layout';
import { getCompanyDetailsPath } from '@/shared/constants/routes';

/* ------------------------------------------------------------------ */
/*  Company Card                                                       */
/* ------------------------------------------------------------------ */

function CompanyCard({ company }: { company: CompanyListing }) {
  return (
    <Link
      to={getCompanyDetailsPath(company.slug)}
      className={cn(
        'group flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5',
        'transition-all duration-200',
        'hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      )}
    >
      {/* Company logo placeholder */}
      <CompanyLogoAvatar
        logo={company.logo}
        fallbackInitial={company.logo.initial}
        className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-white"
      />

      <div className="text-center">
        <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors duration-150">
          {company.name}
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">{company.industry}</p>
        <p className="mt-1.5 text-xs font-medium text-primary">
          {company.openJobs} open roles
        </p>
      </div>
    </Link>
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
  const companies = getFeaturedCompanies();

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
          <Link
            to="/companies"
            className={cn(
              'hidden text-sm font-medium text-primary sm:block',
              'transition-colors duration-150 hover:text-primary/80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'rounded-sm',
            )}
          >
            View all →
          </Link>
        </div>

        {/* Company grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

      </Container>
    </section>
  );
}

export { FeaturedCompanies };
