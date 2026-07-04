import { NavbarAuth } from '@/widgets/navbar-auth';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Badge, Button, Card, CardContent } from '@/shared/components/ui';
import { Container, MainLayout } from '@/shared/components/layout';
import { Input } from '@/shared/components/ui';
import { COMPANIES, CompanyLogoAvatar, getCompanyBySlug, getCompanyJobs } from '@/entities/company';
import { CompaniesListing } from '@/widgets/companies-listing';

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

import { JobCard } from '@/widgets/jobs-listing/ui/job-card';

function CompanyDetail({ companyId }: { companyId: string }) {
  const navigate = useNavigate();
  const company = getCompanyBySlug(companyId);
  const companyJobs = company ? getCompanyJobs(company.id) : [];

  if (!company) {
    return (
      <section className="py-20 text-center">
        <Container padding="md">
          <h1 className="text-2xl font-bold">Company not found</h1>
          <Button variant="primary" className="mt-6" onClick={() => navigate('/companies')}>
            Back to Companies
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-12 bg-surface-hover/30 min-h-screen">
      <Container padding="md">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" leftIcon={<BackIcon className="h-4 w-4" />} onClick={() => navigate('/companies')}>
            Back to Companies
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="overflow-hidden border-border/60">
              <div className="h-32 w-full bg-gradient-to-r from-primary/10 to-accent/10"></div>
              <CardContent className="p-6 sm:p-8 relative">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <CompanyLogoAvatar
                    logo={company.logo}
                    fallbackInitial={company.logo.initial || 'C'}
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-sm ring-4 ring-surface absolute -top-10"
                  />

                  <div className="min-w-0 flex-1 mt-10 sm:mt-0 sm:ml-24">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-3xl font-bold tracking-tight text-text-primary">{company.name}</h1>
                      {company.verified && (
                        <Badge variant="success" className="inline-flex items-center gap-1 shadow-sm">
                          <VerifiedIcon className="h-3.5 w-3.5" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-text-secondary text-sm flex items-center gap-2">
                      {company.industry} • {company.location} • <a href={company.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">{new URL(company.website).hostname}</a>
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold text-text-primary mb-3">About {company.name}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {company.description}
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold text-text-primary mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-surface">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-bold text-text-primary mb-4">Jobs at {company.name}</h2>
              <div className="grid gap-4">
                {companyJobs.length > 0 ? (
                  companyJobs.map(job => <JobCard key={job.id} job={job} />)
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-text-secondary">
                      No open positions at the moment.
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="border-border/60 sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Company Overview</h3>
                <dl className="grid gap-4 text-sm">
                  <div className="flex flex-col gap-1 pb-4 border-b border-border/50">
                    <dt className="text-text-secondary">Founded</dt>
                    <dd className="font-medium text-text-primary">{company.founded}</dd>
                  </div>
                  <div className="flex flex-col gap-1 pb-4 border-b border-border/50">
                    <dt className="text-text-secondary">Company Size</dt>
                    <dd className="font-medium text-text-primary">{company.size} employees</dd>
                  </div>
                  <div className="flex flex-col gap-1 pb-4 border-b border-border/50">
                    <dt className="text-text-secondary">Headquarters</dt>
                    <dd className="font-medium text-text-primary">{company.headquarters}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-text-secondary">Open Roles</dt>
                    <dd className="font-medium text-text-primary">{companyJobs.length} positions</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CompaniesPage() {
  const { companyId } = useParams();

  return (
    <MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
      {companyId ? <CompanyDetail companyId={companyId} /> : <CompaniesHero />}
      {!companyId && <CompaniesListing />}
    </MainLayout>
  );
}

export { CompaniesPage };
