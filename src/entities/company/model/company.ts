type CompanyIndustry = 'AI' | 'Cloud' | 'Fintech' | 'Healthcare' | 'Developer Tools' | 'E-commerce' | 'Mobile' | 'SaaS';
type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
type CompanySortKey = 'az' | 'most-jobs' | 'newest';

interface CompanyLogo {
  path: string;
  initial: string;
  color: string;
}

interface Company {
  id: string;
  name: string;
  slug: string;
  logo: CompanyLogo;
  verified: boolean;
  industry: CompanyIndustry;
  headquarters: string;
  location: string;
  size: CompanySize;
  openJobs: number;
  website: string;
  description: string;
  technologies: string[];
  founded: number;
}

type CompanyListing = Company;

interface CompanyFilters {
  query: string;
  industry: string;
  size: string;
  location: string;
  positions: string;
  sortBy: CompanySortKey;
}

interface FilterOption {
  value: string;
  label: string;
}

const COMPANIES: Company[] = [
  {
    id: 'google',
    name: 'Google',
    slug: 'google',
    logo: { path: '/logos/google.svg', initial: 'G', color: '#4285F4' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'Mountain View, United States',
    location: 'Remote',
    size: '1000+',
    openJobs: 3,
    website: 'https://careers.google.com',
    description: 'Global technology company building products across search, cloud infrastructure, AI, productivity, and consumer platforms.',
    technologies: ['Go', 'Kubernetes', 'TensorFlow', 'TypeScript'],
    founded: 1998,
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    slug: 'microsoft',
    logo: { path: '/logos/microsoft.svg', initial: 'M', color: '#00A4EF' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'Redmond, United States',
    location: 'Hyderabad',
    size: '1000+',
    openJobs: 3,
    website: 'https://careers.microsoft.com',
    description: 'Enterprise software and cloud company behind Azure, Microsoft 365, developer tools, gaming, and AI platforms.',
    technologies: ['C#', 'Azure', 'TypeScript', 'React'],
    founded: 1975,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    slug: 'amazon',
    logo: { path: '/logos/amazon.svg', initial: 'A', color: '#FF9900' },
    verified: true,
    industry: 'E-commerce',
    headquarters: 'Seattle, United States',
    location: 'Bangalore',
    size: '1000+',
    openJobs: 3,
    website: 'https://www.amazon.jobs',
    description: 'Technology and commerce company operating global marketplaces, logistics systems, streaming products, and AWS cloud services.',
    technologies: ['Java', 'AWS', 'Kotlin', 'React'],
    founded: 1994,
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    slug: 'nvidia',
    logo: { path: '/logos/nvidia.svg', initial: 'N', color: '#76B900' },
    verified: true,
    industry: 'AI',
    headquarters: 'Santa Clara, United States',
    location: 'Pune',
    size: '1000+',
    openJobs: 3,
    website: 'https://www.nvidia.com/en-us/about-nvidia/careers',
    description: 'Accelerated computing company building GPUs, AI platforms, simulation systems, and high-performance developer tooling.',
    technologies: ['CUDA', 'Python', 'PyTorch', 'C++'],
    founded: 1993,
  },
  {
    id: 'adobe',
    name: 'Adobe',
    slug: 'adobe',
    logo: { path: '/logos/adobe.svg', initial: 'A', color: '#FF0000' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'San Jose, United States',
    location: 'Noida',
    size: '1000+',
    openJobs: 3,
    website: 'https://careers.adobe.com',
    description: 'Digital media and experience software company powering creative workflows, documents, analytics, and enterprise marketing products.',
    technologies: ['React', 'Java', 'Node.js', 'GraphQL'],
    founded: 1982,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    slug: 'salesforce',
    logo: { path: '/logos/salesforce.svg', initial: 'S', color: '#00A1E0' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'San Francisco, United States',
    location: 'Hyderabad',
    size: '1000+',
    openJobs: 3,
    website: 'https://careers.salesforce.com',
    description: 'Customer relationship management and enterprise platform company building cloud products for sales, service, analytics, and AI.',
    technologies: ['Java', 'Apex', 'React', 'AWS'],
    founded: 1999,
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    slug: 'atlassian',
    logo: { path: '/logos/atlassian.svg', initial: 'A', color: '#0052CC' },
    verified: true,
    industry: 'Developer Tools',
    headquarters: 'Sydney, Australia',
    location: 'Remote',
    size: '1000+',
    openJobs: 3,
    website: 'https://www.atlassian.com/company/careers',
    description: 'Collaboration and developer tools company behind Jira, Confluence, Bitbucket, Trello, and enterprise teamwork products.',
    technologies: ['React', 'TypeScript', 'Java', 'Kubernetes'],
    founded: 2002,
  },
  {
    id: 'uber',
    name: 'Uber',
    slug: 'uber',
    logo: { path: '/logos/uber.svg', initial: 'U', color: '#000000' },
    verified: true,
    industry: 'Mobile',
    headquarters: 'San Francisco, United States',
    location: 'Bangalore',
    size: '1000+',
    openJobs: 3,
    website: 'https://www.uber.com/us/en/careers',
    description: 'Mobility and delivery technology company operating real-time marketplace, logistics, mapping, payments, and mobile platforms.',
    technologies: ['Go', 'Kotlin', 'Swift', 'Kafka'],
    founded: 2009,
  },
  {
    id: 'spotify',
    name: 'Spotify',
    slug: 'spotify',
    logo: { path: '/logos/spotify.svg', initial: 'S', color: '#1DB954' },
    verified: true,
    industry: 'Mobile',
    headquarters: 'Stockholm, Sweden',
    location: 'Remote',
    size: '1000+',
    openJobs: 3,
    website: 'https://www.lifeatspotify.com',
    description: 'Audio streaming technology company building personalized music, podcast, advertising, creator, and platform experiences.',
    technologies: ['Java', 'Kotlin', 'Python', 'React'],
    founded: 2006,
  },
  {
    id: 'netflix',
    name: 'Netflix',
    slug: 'netflix',
    logo: { path: '/logos/netflix.svg', initial: 'N', color: '#E50914' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'Los Gatos, United States',
    location: 'Mumbai',
    size: '1000+',
    openJobs: 3,
    website: 'https://jobs.netflix.com',
    description: 'Entertainment technology company building global streaming, personalization, content production, infrastructure, and data platforms.',
    technologies: ['Java', 'Python', 'AWS', 'React'],
    founded: 1997,
  },
  {
    id: 'intel',
    name: 'Intel',
    slug: 'intel',
    logo: { path: '/logos/intel.svg', initial: 'I', color: '#0071C5' },
    verified: true,
    industry: 'AI',
    headquarters: 'Santa Clara, United States',
    location: 'Bangalore',
    size: '1000+',
    openJobs: 3,
    website: 'https://jobs.intel.com',
    description: 'Semiconductor and computing company developing processors, data center platforms, edge systems, AI accelerators, and developer tools.',
    technologies: ['C++', 'Python', 'Linux', 'CUDA'],
    founded: 1968,
  },
  {
    id: 'cisco',
    name: 'Cisco',
    slug: 'cisco',
    logo: { path: '/logos/cisco.svg', initial: 'C', color: '#1BA0D7' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'San Jose, United States',
    location: 'Chennai',
    size: '1000+',
    openJobs: 3,
    website: 'https://jobs.cisco.com',
    description: 'Networking and security technology company building infrastructure, observability, collaboration, cloud, and enterprise security products.',
    technologies: ['Go', 'Python', 'Kubernetes', 'Terraform'],
    founded: 1984,
  },
];

const COMPANY_INDUSTRY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All industries' },
  { value: 'AI', label: 'AI' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Fintech', label: 'Fintech' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Developer Tools', label: 'Developer Tools' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'SaaS', label: 'SaaS' },
];

const COMPANY_SIZE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All sizes' },
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-500', label: '201-500' },
  { value: '501-1000', label: '501-1000' },
  { value: '1000+', label: '1000+' },
];

const COMPANY_LOCATION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All locations' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Noida', label: 'Noida' },
];

const COMPANY_OPEN_POSITIONS_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Any open roles' },
  { value: '1-5', label: '1-5 roles' },
  { value: '6-10', label: '6-10 roles' },
  { value: '11-20', label: '11-20 roles' },
  { value: '20+', label: '20+ roles' },
];

const COMPANY_SORT_OPTIONS: FilterOption[] = [
  { value: 'az', label: 'A-Z' },
  { value: 'most-jobs', label: 'Most Jobs' },
  { value: 'newest', label: 'Newest' },
];

function matchesSearch(company: Company, query: string) {
  if (!query) return true;

  const normalizedQuery = query.trim().toLowerCase();
  const haystack = [company.name, company.industry, company.headquarters, company.location, company.description, ...company.technologies]
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

function matchesIndustry(company: Company, industry: string) {
  return industry === 'all' || company.industry === industry;
}

function matchesSize(company: Company, size: string) {
  return size === 'all' || company.size === size;
}

function matchesLocation(company: Company, location: string) {
  return location === 'all' || company.location === location || company.headquarters.toLowerCase().includes(location.toLowerCase());
}

function matchesOpenPositions(company: Company, positions: string) {
  if (positions === 'all') return true;

  if (positions === '1-5') return company.openJobs >= 1 && company.openJobs <= 5;
  if (positions === '6-10') return company.openJobs >= 6 && company.openJobs <= 10;
  if (positions === '11-20') return company.openJobs >= 11 && company.openJobs <= 20;
  if (positions === '20+') return company.openJobs >= 20;

  return true;
}

function sortCompanies(companies: Company[], sortBy: CompanySortKey) {
  const sorted = [...companies];

  if (sortBy === 'most-jobs') {
    return sorted.sort((left, right) => right.openJobs - left.openJobs || left.name.localeCompare(right.name));
  }

  if (sortBy === 'newest') {
    return sorted.sort((left, right) => right.founded - left.founded || left.name.localeCompare(right.name));
  }

  return sorted.sort((left, right) => left.name.localeCompare(right.name));
}

function filterCompanies(companies: Company[], filters: CompanyFilters) {
  return companies.filter((company) => {
    return (
      matchesSearch(company, filters.query) &&
      matchesIndustry(company, filters.industry) &&
      matchesSize(company, filters.size) &&
      matchesLocation(company, filters.location) &&
      matchesOpenPositions(company, filters.positions)
    );
  });
}

function getCompanyById(companyId: string) {
  return COMPANIES.find((company) => company.id === companyId);
}

function getCompanyBySlug(slug: string) {
  return COMPANIES.find((company) => company.slug === slug || company.id === slug);
}

function getFeaturedCompanies(limit = 6) {
  return COMPANIES.slice(0, limit);
}

function getRelatedCompanies(companyId: string, limit = 3) {
  const company = getCompanyById(companyId);

  if (!company) {
    return [];
  }

  return COMPANIES.filter((relatedCompany) => {
    return relatedCompany.id !== company.id && relatedCompany.industry === company.industry;
  }).slice(0, limit);
}

export {
  COMPANIES,
  COMPANY_INDUSTRY_OPTIONS,
  COMPANY_LOCATION_OPTIONS,
  COMPANY_OPEN_POSITIONS_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  COMPANY_SORT_OPTIONS,
  filterCompanies,
  getCompanyById,
  getCompanyBySlug,
  getFeaturedCompanies,
  getRelatedCompanies,
  matchesIndustry,
  matchesLocation,
  matchesOpenPositions,
  matchesSearch,
  matchesSize,
  sortCompanies,
};
export type {
  Company,
  CompanyFilters,
  CompanyIndustry,
  CompanyListing,
  CompanyLogo,
  CompanySize,
  CompanySortKey,
  FilterOption,
};
