type CompanyIndustry = 'AI' | 'Cloud' | 'Fintech' | 'Healthcare' | 'Developer Tools' | 'E-commerce' | 'Mobile' | 'SaaS';
type CompanySize = string;
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

import { getCompanyJobs } from './company-jobs';

const COMPANIES: Company[] = [
  {
    id: 'google',
    name: 'Google',
    slug: 'google',
    logo: { path: '/logos/google.svg', initial: 'G', color: '#4285F4' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'Mountain View, California',
    location: 'Mountain View',
    size: '182,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://careers.google.com',
    description: 'Google specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware.',
    technologies: ['Go', 'Kubernetes', 'TensorFlow', 'TypeScript', 'Python'],
    founded: 1998,
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    slug: 'microsoft',
    logo: { path: '/logos/microsoft.svg', initial: 'M', color: '#00A4EF' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'Redmond, Washington',
    location: 'Seattle',
    size: '221,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://careers.microsoft.com',
    description: 'Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Its mission is to empower every person and every organization on the planet to achieve more.',
    technologies: ['C#', '.NET', 'Azure', 'TypeScript', 'React'],
    founded: 1975,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    slug: 'amazon',
    logo: { path: '/logos/amazon.svg', initial: 'A', color: '#FF9900' },
    verified: true,
    industry: 'E-commerce',
    headquarters: 'Seattle, Washington',
    location: 'Seattle',
    size: '1,525,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://www.amazon.jobs',
    description: 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.',
    technologies: ['Java', 'AWS', 'Python', 'React', 'DynamoDB'],
    founded: 1994,
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    slug: 'nvidia',
    logo: { path: '/logos/nvidia.svg', initial: 'N', color: '#76B900' },
    verified: true,
    industry: 'AI',
    headquarters: 'Santa Clara, California',
    location: 'Mountain View',
    size: '29,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://www.nvidia.com/en-us/about-nvidia/careers',
    description: 'NVIDIA pioneered accelerated computing to tackle challenges no one else can solve. Our work in AI and the metaverse is transforming the world\'s largest industries.',
    technologies: ['CUDA', 'C++', 'Python', 'PyTorch', 'TensorRT'],
    founded: 1993,
  },
  {
    id: 'adobe',
    name: 'Adobe',
    slug: 'adobe',
    logo: { path: '/logos/adobe.svg', initial: 'A', color: '#FF0000' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'San Jose, California',
    location: 'San Francisco',
    size: '29,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://careers.adobe.com',
    description: 'Adobe is the global leader in digital media and digital marketing solutions. Our creative, marketing and document solutions empower everyone to bring digital creations to life.',
    technologies: ['C++', 'React', 'Java', 'Node.js', 'Objective-C'],
    founded: 1982,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    slug: 'salesforce',
    logo: { path: '/logos/salesforce.svg', initial: 'S', color: '#00A1E0' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'San Francisco, California',
    location: 'San Francisco',
    size: '72,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://careers.salesforce.com',
    description: 'Salesforce is the world\'s #1 customer relationship management (CRM) platform. We help your marketing, sales, commerce, service and IT teams work as one.',
    technologies: ['Java', 'Apex', 'Lightning Web Components', 'React', 'PostgreSQL'],
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
    location: 'Sydney',
    size: '11,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://www.atlassian.com/company/careers',
    description: 'Atlassian develops products for software developers, project managers, and content management. We unleash the potential of every team through open work.',
    technologies: ['React', 'TypeScript', 'Java', 'Kotlin', 'GraphQL'],
    founded: 2002,
  },
  {
    id: 'uber',
    name: 'Uber',
    slug: 'uber',
    logo: { path: '/logos/uber.svg', initial: 'U', color: '#000000' },
    verified: true,
    industry: 'Mobile',
    headquarters: 'San Francisco, California',
    location: 'San Francisco',
    size: '30,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://www.uber.com/us/en/careers',
    description: 'Uber is a technology platform that uses a massive network, top technology, operational excellence and product expertise to power movement from point A to point B.',
    technologies: ['Go', 'Java', 'Swift', 'Kotlin', 'Kafka'],
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
    location: 'London',
    size: '8,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://www.lifeatspotify.com',
    description: 'Spotify is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world.',
    technologies: ['Java', 'Python', 'C++', 'React', 'GCP'],
    founded: 2006,
  },
  {
    id: 'netflix',
    name: 'Netflix',
    slug: 'netflix',
    logo: { path: '/logos/netflix.svg', initial: 'N', color: '#E50914' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'Los Gatos, California',
    location: 'San Francisco',
    size: '13,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://jobs.netflix.com',
    description: 'Netflix is one of the world\'s leading entertainment services with over 260 million paid memberships in over 190 countries enjoying TV series, films and games.',
    technologies: ['Java', 'Python', 'Node.js', 'React', 'AWS'],
    founded: 1997,
  },
  {
    id: 'intel',
    name: 'Intel',
    slug: 'intel',
    logo: { path: '/logos/intel.svg', initial: 'I', color: '#0071C5' },
    verified: true,
    industry: 'AI',
    headquarters: 'Santa Clara, California',
    location: 'Austin',
    size: '124,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://jobs.intel.com',
    description: 'Intel is an industry leader, creating world-changing technology that enables global progress and enriches lives. We stand at the brink of several technology inflections.',
    technologies: ['C++', 'Python', 'C', 'Verilog', 'CUDA'],
    founded: 1968,
  },
  {
    id: 'cisco',
    name: 'Cisco',
    slug: 'cisco',
    logo: { path: '/logos/cisco.svg', initial: 'C', color: '#1BA0D7' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'San Jose, California',
    location: 'San Francisco',
    size: '84,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://jobs.cisco.com',
    description: 'Cisco enables people to make powerful connections--whether in business, education, philanthropy, or creativity. Cisco hardware, software, and service offerings are used to create the Internet solutions that make networks possible.',
    technologies: ['Go', 'Python', 'C++', 'Kubernetes', 'React'],
    founded: 1984,
  },
  {
    id: 'resend',
    name: 'Resend',
    slug: 'resend',
    logo: { path: '/logos/resend.svg', initial: 'R', color: '#000000' },
    verified: true,
    industry: 'Developer Tools',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '25',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://resend.com',
    description: 'Email for developers. The best API to reach humans instead of spam folders.',
    technologies: ['TypeScript', 'React', 'Node.js', 'Next.js'],
    founded: 2022,
  },
  {
    id: 'convex',
    name: 'Convex',
    slug: 'convex',
    logo: { path: '/logos/convex.svg', initial: 'C', color: '#F14E32' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '30',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://convex.dev',
    description: 'Convex is the reactive backend for modern web developers.',
    technologies: ['Rust', 'TypeScript', 'React', 'Node.js'],
    founded: 2020,
  },
  {
    id: 'betterstack',
    name: 'Better Stack',
    slug: 'betterstack',
    logo: { path: '/logos/betterstack.svg', initial: 'B', color: '#3152F9' },
    verified: true,
    industry: 'Developer Tools',
    headquarters: 'Prague, Czechia',
    location: 'Remote',
    size: '40',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://betterstack.com',
    description: 'Log management and uptime monitoring that just works.',
    technologies: ['Ruby', 'ClickHouse', 'Vue.js', 'Go'],
    founded: 2021,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    slug: 'supabase',
    logo: { path: '/logos/supabase.svg', initial: 'S', color: '#3ECF8E' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'Remote',
    location: 'Remote',
    size: '90',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://supabase.com',
    description: 'The open source Firebase alternative.',
    technologies: ['PostgreSQL', 'TypeScript', 'Go', 'Elixir'],
    founded: 2020,
  },
  {
    id: 'clerk',
    name: 'Clerk',
    slug: 'clerk',
    logo: { path: '/logos/clerk.svg', initial: 'C', color: '#6C47FF' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '80',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://clerk.com',
    description: 'More than authentication. Complete user management.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Go'],
    founded: 2019,
  },
  {
    id: 'neon',
    name: 'Neon',
    slug: 'neon',
    logo: { path: '/logos/neon.svg', initial: 'N', color: '#00E699' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '120',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://neon.tech',
    description: 'Serverless Postgres built for the cloud.',
    technologies: ['Rust', 'PostgreSQL', 'Go', 'React'],
    founded: 2021,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    slug: 'vercel',
    logo: { path: '/logos/vercel.svg', initial: 'V', color: '#000000' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '400',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://vercel.com',
    description: 'Vercel is the frontend cloud. Build, scale, and secure a faster, personalized web.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js'],
    founded: 2015,
  },
  {
    id: 'posthog',
    name: 'PostHog',
    slug: 'posthog',
    logo: { path: '/logos/posthog.svg', initial: 'P', color: '#F54E00' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '220',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://posthog.com',
    description: 'The open source product operating system.',
    technologies: ['Python', 'Django', 'React', 'ClickHouse'],
    founded: 2020,
  },
  {
    id: 'render',
    name: 'Render',
    slug: 'render',
    logo: { path: '/logos/render.svg', initial: 'R', color: '#45DF95' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '250',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://render.com',
    description: 'The easiest cloud for all your apps and websites.',
    technologies: ['Go', 'React', 'Kubernetes', 'PostgreSQL'],
    founded: 2018,
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    slug: 'huggingface',
    logo: { path: '/logos/huggingface.svg', initial: 'H', color: '#FFD21E' },
    verified: true,
    industry: 'AI',
    headquarters: 'New York, New York',
    location: 'Remote',
    size: '550',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://huggingface.co',
    description: 'The AI community building the future.',
    technologies: ['Python', 'PyTorch', 'Rust', 'Transformers'],
    founded: 2016,
  },
  {
    id: 'replit',
    name: 'Replit',
    slug: 'replit',
    logo: { path: '/logos/replit.svg', initial: 'R', color: '#F26207' },
    verified: true,
    industry: 'Developer Tools',
    headquarters: 'San Francisco, California',
    location: 'San Francisco',
    size: '600',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://replit.com',
    description: 'Build software collaboratively from anywhere in the world, on any device.',
    technologies: ['Nix', 'Go', 'React', 'TypeScript'],
    founded: 2016,
  },
  {
    id: 'planetscale',
    name: 'PlanetScale',
    slug: 'planetscale',
    logo: { path: '/logos/planetscale.svg', initial: 'P', color: '#000000' },
    verified: true,
    industry: 'Cloud',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '650',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://planetscale.com',
    description: 'The world’s most advanced serverless MySQL platform.',
    technologies: ['Go', 'Vitess', 'React', 'MySQL'],
    founded: 2018,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    slug: 'stripe',
    logo: { path: '/logos/stripe.svg', initial: 'S', color: '#635BFF' },
    verified: true,
    industry: 'Fintech',
    headquarters: 'San Francisco, California',
    location: 'Remote',
    size: '3,000',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://stripe.com',
    description: 'Financial infrastructure platform for the internet.',
    technologies: ['Ruby', 'Go', 'React', 'Java'],
    founded: 2010,
  },
  {
    id: 'figma',
    name: 'Figma',
    slug: 'figma',
    logo: { path: '/logos/figma.svg', initial: 'F', color: '#F24E1E' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'San Francisco, California',
    location: 'San Francisco',
    size: '1,300',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://figma.com',
    description: 'How the world designs, builds, and delivers software.',
    technologies: ['C++', 'Rust', 'React', 'WebAssembly'],
    founded: 2012,
  },
  {
    id: 'notion',
    name: 'Notion',
    slug: 'notion',
    logo: { path: '/logos/notion.svg', initial: 'N', color: '#000000' },
    verified: true,
    industry: 'SaaS',
    headquarters: 'San Francisco, California',
    location: 'San Francisco',
    size: '1,500',
    get openJobs() { return getCompanyJobs(this.id).length; },
    website: 'https://notion.so',
    description: 'The connected workspace where better, faster work happens.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    founded: 2013,
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
  { value: '1-50', label: '1-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-500', label: '201-500' },
  { value: '501-1000', label: '501-1,000' },
  { value: '1000-5000', label: '1,000-5,000' },
  { value: '5000-10000', label: '5,000-10,000' },
  { value: '10000+', label: '10,000+' },
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
  { value: '21-30', label: '21-30 roles' },
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
  if (size === 'all') return true;

  const empCount = parseInt(company.size.replace(/,/g, ''), 10);

  if (size === '1-50') return empCount >= 1 && empCount <= 50;
  if (size === '51-200') return empCount >= 51 && empCount <= 200;
  if (size === '201-500') return empCount >= 201 && empCount <= 500;
  if (size === '501-1000') return empCount >= 501 && empCount <= 1000;
  if (size === '1000-5000') return empCount >= 1001 && empCount <= 5000;
  if (size === '5000-10000') return empCount >= 5001 && empCount <= 10000;
  if (size === '10000+') return empCount > 10000;

  return true;
}

function matchesLocation(company: Company, location: string) {
  return location === 'all' || company.location === location || company.headquarters.toLowerCase().includes(location.toLowerCase());
}

function matchesOpenPositions(company: Company, positions: string) {
  if (positions === 'all') return true;

  if (positions === '1-5') return company.openJobs >= 1 && company.openJobs <= 5;
  if (positions === '6-10') return company.openJobs >= 6 && company.openJobs <= 10;
  if (positions === '11-20') return company.openJobs >= 11 && company.openJobs <= 20;
  if (positions === '21-30') return company.openJobs >= 21 && company.openJobs <= 30;

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
