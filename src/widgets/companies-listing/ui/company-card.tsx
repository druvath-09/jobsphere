import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { getCompanyDetailsPath } from '@/shared/constants/routes';
import { CompanyLogoAvatar, type CompanyListing } from '@/entities/company';

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 8.5l1.25 1.25L10 6.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 1.5l1.7 1.15 2.04.13.95 1.82 1.82.95.13 2.04L15.5 9l-.86 1.71-.13 2.04-1.82.95-.95 1.82-2.04.13L8 15.5l-1.7-1.15-2.04-.13-.95-1.82-1.82-.95-.13-2.04L.5 9l.86-1.71.13-2.04 1.82-.95.95-1.82 2.04-.13L8 1.5z" />
    </svg>
  );
}

function CompanyCard({ company }: { company: CompanyListing }) {
  const navigate = useNavigate();

  function goToCompany() {
    navigate(getCompanyDetailsPath(company.slug));
  }

  return (
    <Card
      interactive
      role="link"
      aria-label={`View company profile for ${company.name}`}
      className={cn(
        'flex h-full flex-col overflow-hidden cursor-pointer',
        'p-5 sm:p-6',
      )}
      onClick={goToCompany}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          goToCompany();
        }
      }}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={goToCompany}
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-base font-semibold text-white shadow-sm"
          aria-label={`Open ${company.name}`}
        >
          <CompanyLogoAvatar
            logo={company.logo}
            fallbackInitial={company.logo.initial}
            className="flex h-full w-full items-center justify-center text-base font-semibold text-white"
          />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={goToCompany}
              className="text-left text-base font-semibold text-text-primary transition-colors duration-150 hover:text-primary"
            >
              {company.name}
            </button>
            {company.verified && (
              <Badge variant="success" className="inline-flex items-center gap-1">
                <VerifiedIcon className="h-3.5 w-3.5" />
                Verified
              </Badge>
            )}
          </div>

          <div className="mt-2 grid gap-1 text-sm text-text-secondary sm:grid-cols-2">
            <p>{company.industry}</p>
            <p>{company.headquarters}</p>
            <p>{company.size} employees</p>
            <p>{company.openJobs} open jobs</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-text-secondary">{company.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {company.technologies.slice(0, 4).map((technology) => (
          <Badge key={technology} variant="outline" className="text-[11px]">
            {technology}
          </Badge>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <Button variant="outline" size="sm" className="w-full justify-center" onClick={goToCompany}>
          View Company
        </Button>
      </div>
    </Card>
  );
}

export { CompanyCard };
