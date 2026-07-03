import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Badge, Button, Card, CardContent } from '@/shared/components/ui';
import { Container, MainLayout } from '@/shared/components/layout';
import { Input } from '@/shared/components/ui';
import { COMPANIES, CompanyLogoAvatar, getCompanyBySlug, getCompanyJobs } from '@/entities/company';
import { CompaniesListing } from '@/widgets/companies-listing';
import { getCompanyDetailsPath } from '@/shared/constants/routes';

function BackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 3.5L2.5 8l4 4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10" />
    </svg>
  );
}

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 8.5l1.25 1.25L10 6.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 1.5l1.7 1.15 2.04.13.95 1.82 1.82.95.13 2.04L15.5 9l-.86 1.71-.13 2.04-1.82.95-.95 1.82-2.04.13L8 15.5l-1.7-1.15-2.04-.13-.95-1.82-1.82-.95-.13-2.04L.5 9l.86-1.71.13-2.04 1.82-.95.95-1.82 2.04-.13L8 1.5z" />
    </svg>
  );
}

function useCompanySearchState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  function updateQuery(nextQuery: string) {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextQuery.trim()) {
      nextSearchParams.set('q', nextQuery.trim());
    } else {
      nextSearchParams.delete('q');
    }

    nextSearchParams.delete('page');
    setSearchParams(nextSearchParams, { replace: true });
  }

  return { query, updateQuery };
}

function CompaniesHero() {
  const { query, updateQuery } = useCompanySearchState();
  const totalCompanies = COMPANIES.length;

  return (
    <section className="border-b border-border bg-gradient-to-b from-surface to-background" aria-labelledby="companies-heading">
      <Container padding="md" className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <Badge variant="primary">Companies</Badge>
          <h1 id="companies-heading" className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Discover companies hiring right now.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            Search verified employers, compare open roles, and explore teams by industry, size, and hiring activity.
          </p>

          <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              type="search"
              label="Search companies"
              placeholder="Company name, technology, or industry"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
            <Card className="flex items-center justify-center px-5 py-4 sm:min-w-40">
              <div>
                <p className="text-2xl font-semibold text-text-primary">{totalCompanies}</p>
                <p className="mt-1 text-sm text-text-secondary">Companies</p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CompanyDetailPlaceholder({ companyId }: { companyId: string }) {
  const navigate = useNavigate();
  const company = getCompanyBySlug(companyId);
  const companyJobs = company ? getCompanyJobs(company.id) : [];
  const title = company?.name ?? 'Company profile';
  const description = company
    ? 'This is a temporary company profile placeholder while the full company details experience is being built.'
    : 'This company profile is not available yet, but the route is in place and linked from the Companies module.';

  return (
    <section className="py-10 sm:py-12">
      <Container padding="md">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" leftIcon={<BackIcon className="h-4 w-4" />} onClick={() => navigate('/companies')}>
            Back to Companies
          </Button>
        </div>

        <Card className="mx-auto max-w-3xl">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <CompanyLogoAvatar
                logo={company?.logo}
                fallbackInitial={(company?.logo.initial ?? title.charAt(0)) || 'C'}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold text-white shadow-sm"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl">{title}</h1>
                  {company?.verified && (
                    <Badge variant="success" className="inline-flex items-center gap-1">
                      <VerifiedIcon className="h-3.5 w-3.5" />
                      Verified
                    </Badge>
                  )}
                </div>

                <p className="mt-3 text-sm leading-7 text-text-secondary">{description}</p>

                {company && (
                  <dl className="mt-6 grid gap-4 text-sm text-text-secondary sm:grid-cols-2">
                    <div>
                      <dt className="font-medium text-text-primary">Industry</dt>
                      <dd className="mt-1">{company.industry}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">Headquarters</dt>
                      <dd className="mt-1">{company.headquarters}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">Company size</dt>
                      <dd className="mt-1">{company.size} employees</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-text-primary">Open positions</dt>
                      <dd className="mt-1">{companyJobs.length}</dd>
                    </div>
                  </dl>
                )}

                {company && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-text-primary">Technologies used</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {company.technologies.map((technology) => (
                        <Badge key={technology} variant="outline">
                          {technology}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {!company && (
                  <p className="mt-6 text-sm text-text-secondary">
                    The Companies listing still works and this placeholder route is ready for future company pages.
                  </p>
                )}

                {company && (
                  <div className="mt-6 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {getCompanyDetailsPath(company.slug)}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

function CompaniesPage() {
  const { companyId } = useParams();

  return (
    <MainLayout>
      {companyId ? <CompanyDetailPlaceholder companyId={companyId} /> : <CompaniesHero />}
      {!companyId && <CompaniesListing />}
    </MainLayout>
  );
}

export { CompaniesPage };
