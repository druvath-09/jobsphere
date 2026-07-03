import { getCompanyById } from '@/entities/company/model/company';

type JobEmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
type JobWorkMode = 'Remote' | 'Hybrid' | 'Onsite';
type JobSortKey = 'relevance' | 'newest' | 'salary-high' | 'salary-low';

interface JobMock {
  id: string;
  title: string;
  companyId: string;
  location: string;
  workMode: JobWorkMode;
  employmentType: JobEmploymentType;
  experienceLabel: string;
  experienceMin: number;
  experienceMax: number;
  salaryLabel: string;
  salaryMin: number;
  salaryMax: number;
  postedDaysAgo: number;
  featured: boolean;
  skills: string[];
  description: string;
}

interface JobListing extends JobMock {
  company: string;
  companyInitial: string;
  companyColor: string;
  companyLogo: string;
}

interface JobFilters {
  query: string;
  location: string;
  experience: string;
  employmentType: string;
  salary: string;
  sortBy: JobSortKey;
}

interface FilterOption {
  value: string;
  label: string;
}

const JOB_MOCKS: JobMock[] = [
  {
    id: 'job-001',
    title: 'Frontend Engineer',
    companyId: 'google',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '4-7 yrs',
    experienceMin: 4,
    experienceMax: 7,
    salaryLabel: '18-25 LPA',
    salaryMin: 18,
    salaryMax: 25,
    postedDaysAgo: 1,
    featured: true,
    skills: ['React', 'TypeScript', 'Next.js'],
    description: 'Build product surfaces used by thousands of engineers every day.',
  },
  {
    id: 'job-002',
    title: 'Backend Engineer',
    companyId: 'google',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '5-9 yrs',
    experienceMin: 5,
    experienceMax: 9,
    salaryLabel: '24-36 LPA',
    salaryMin: 24,
    salaryMax: 36,
    postedDaysAgo: 3,
    featured: false,
    skills: ['Go', 'gRPC', 'Kubernetes'],
    description: 'Design backend services for high-scale collaboration and productivity platforms.',
  },
  {
    id: 'job-003',
    title: 'ML Engineer',
    companyId: 'google',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '4-8 yrs',
    experienceMin: 4,
    experienceMax: 8,
    salaryLabel: '28-40 LPA',
    salaryMin: 28,
    salaryMax: 40,
    postedDaysAgo: 4,
    featured: true,
    skills: ['Python', 'TensorFlow', 'Data Pipelines'],
    description: 'Improve ranking, recommendations, and production model workflows.',
  },
  {
    id: 'job-004',
    title: 'Azure Engineer',
    companyId: 'microsoft',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '4-7 yrs',
    experienceMin: 4,
    experienceMax: 7,
    salaryLabel: '20-30 LPA',
    salaryMin: 20,
    salaryMax: 30,
    postedDaysAgo: 2,
    featured: true,
    skills: ['Azure', 'C#', 'Kubernetes'],
    description: 'Build cloud platform capabilities for enterprise Azure customers.',
  },
  {
    id: 'job-005',
    title: 'Full Stack Developer',
    companyId: 'microsoft',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '3-6 yrs',
    experienceMin: 3,
    experienceMax: 6,
    salaryLabel: '18-27 LPA',
    salaryMin: 18,
    salaryMax: 27,
    postedDaysAgo: 5,
    featured: false,
    skills: ['React', 'TypeScript', 'Node.js'],
    description: 'Ship user-facing workflows across cloud productivity products.',
  },
  {
    id: 'job-006',
    title: 'Cloud Security Engineer',
    companyId: 'microsoft',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    employmentType: 'Contract',
    experienceLabel: '6-10 yrs',
    experienceMin: 6,
    experienceMax: 10,
    salaryLabel: '26-38 LPA',
    salaryMin: 26,
    salaryMax: 38,
    postedDaysAgo: 6,
    featured: false,
    skills: ['Azure', 'Security', 'Terraform'],
    description: 'Improve identity, compliance, and cloud security automation.',
  },
  {
    id: 'job-007',
    title: 'SDE I',
    companyId: 'amazon',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '1-3 yrs',
    experienceMin: 1,
    experienceMax: 3,
    salaryLabel: '10-16 LPA',
    salaryMin: 10,
    salaryMax: 16,
    postedDaysAgo: 3,
    featured: false,
    skills: ['Java', 'AWS', 'Data Structures'],
    description: 'Build services for marketplace and fulfillment experiences.',
  },
  {
    id: 'job-008',
    title: 'DevOps Engineer',
    companyId: 'amazon',
    location: 'Pune',
    workMode: 'Remote',
    employmentType: 'Contract',
    experienceLabel: '5-9 yrs',
    experienceMin: 5,
    experienceMax: 9,
    salaryLabel: '22-32 LPA',
    salaryMin: 22,
    salaryMax: 32,
    postedDaysAgo: 2,
    featured: false,
    skills: ['AWS', 'Terraform', 'Prometheus'],
    description: 'Own deployment automation and observability for platform teams.',
  },
  {
    id: 'job-009',
    title: 'Logistics Platform Engineer',
    companyId: 'amazon',
    location: 'Chennai',
    workMode: 'Onsite',
    employmentType: 'Full-time',
    experienceLabel: '4-7 yrs',
    experienceMin: 4,
    experienceMax: 7,
    salaryLabel: '19-28 LPA',
    salaryMin: 19,
    salaryMax: 28,
    postedDaysAgo: 7,
    featured: false,
    skills: ['Java', 'Kafka', 'Redis'],
    description: 'Develop reliable systems for fulfillment and logistics workflows.',
  },
  {
    id: 'job-010',
    title: 'AI Engineer',
    companyId: 'nvidia',
    location: 'Gurgaon',
    workMode: 'Onsite',
    employmentType: 'Full-time',
    experienceLabel: '4-8 yrs',
    experienceMin: 4,
    experienceMax: 8,
    salaryLabel: '28-40 LPA',
    salaryMin: 28,
    salaryMax: 40,
    postedDaysAgo: 4,
    featured: true,
    skills: ['Python', 'PyTorch', 'CUDA'],
    description: 'Optimize inference workflows and production model serving.',
  },
  {
    id: 'job-011',
    title: 'CUDA Developer',
    companyId: 'nvidia',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '5-9 yrs',
    experienceMin: 5,
    experienceMax: 9,
    salaryLabel: '30-45 LPA',
    salaryMin: 30,
    salaryMax: 45,
    postedDaysAgo: 2,
    featured: true,
    skills: ['CUDA', 'C++', 'Linux'],
    description: 'Build accelerated computing libraries for AI and simulation workloads.',
  },
  {
    id: 'job-012',
    title: 'Computer Vision Engineer',
    companyId: 'nvidia',
    location: 'Pune',
    workMode: 'Hybrid',
    employmentType: 'Contract',
    experienceLabel: '3-6 yrs',
    experienceMin: 3,
    experienceMax: 6,
    salaryLabel: '20-30 LPA',
    salaryMin: 20,
    salaryMax: 30,
    postedDaysAgo: 6,
    featured: false,
    skills: ['Python', 'PyTorch', 'OpenCV'],
    description: 'Develop model evaluation and vision tooling for applied AI teams.',
  },
  {
    id: 'job-013',
    title: 'UI Engineer',
    companyId: 'adobe',
    location: 'Noida',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '2-5 yrs',
    experienceMin: 2,
    experienceMax: 5,
    salaryLabel: '14-20 LPA',
    salaryMin: 14,
    salaryMax: 20,
    postedDaysAgo: 3,
    featured: false,
    skills: ['React', 'TypeScript', 'Design Systems'],
    description: 'Ship polished creative and document product experiences.',
  },
  {
    id: 'job-014',
    title: 'React Developer',
    companyId: 'adobe',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '3-6 yrs',
    experienceMin: 3,
    experienceMax: 6,
    salaryLabel: '16-24 LPA',
    salaryMin: 16,
    salaryMax: 24,
    postedDaysAgo: 5,
    featured: false,
    skills: ['React', 'GraphQL', 'Accessibility'],
    description: 'Build accessible web workflows for creative cloud customers.',
  },
  {
    id: 'job-015',
    title: 'Experience Platform Engineer',
    companyId: 'adobe',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '6-10 yrs',
    experienceMin: 6,
    experienceMax: 10,
    salaryLabel: '26-38 LPA',
    salaryMin: 26,
    salaryMax: 38,
    postedDaysAgo: 8,
    featured: false,
    skills: ['Java', 'Node.js', 'Kafka'],
    description: 'Build backend systems for analytics and customer experience products.',
  },
  {
    id: 'job-016',
    title: 'Salesforce Platform Engineer',
    companyId: 'salesforce',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '4-7 yrs',
    experienceMin: 4,
    experienceMax: 7,
    salaryLabel: '18-26 LPA',
    salaryMin: 18,
    salaryMax: 26,
    postedDaysAgo: 4,
    featured: false,
    skills: ['Apex', 'Java', 'React'],
    description: 'Develop extensible CRM platform capabilities for enterprise customers.',
  },
  {
    id: 'job-017',
    title: 'Data Analyst',
    companyId: 'salesforce',
    location: 'Delhi',
    workMode: 'Onsite',
    employmentType: 'Full-time',
    experienceLabel: '1-3 yrs',
    experienceMin: 1,
    experienceMax: 3,
    salaryLabel: '10-16 LPA',
    salaryMin: 10,
    salaryMax: 16,
    postedDaysAgo: 3,
    featured: false,
    skills: ['SQL', 'Looker', 'A/B Testing'],
    description: 'Turn product and customer data into clear business decisions.',
  },
  {
    id: 'job-018',
    title: 'CRM Product Engineer',
    companyId: 'salesforce',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '5-8 yrs',
    experienceMin: 5,
    experienceMax: 8,
    salaryLabel: '24-34 LPA',
    salaryMin: 24,
    salaryMax: 34,
    postedDaysAgo: 7,
    featured: false,
    skills: ['React', 'Node.js', 'AWS'],
    description: 'Build customer workflows across sales, service, and analytics products.',
  },
  {
    id: 'job-019',
    title: 'Product Designer',
    companyId: 'atlassian',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Part-time',
    experienceLabel: '5-8 yrs',
    experienceMin: 5,
    experienceMax: 8,
    salaryLabel: '20-30 LPA',
    salaryMin: 20,
    salaryMax: 30,
    postedDaysAgo: 1,
    featured: false,
    skills: ['Figma', 'Design Systems', 'Accessibility'],
    description: 'Shape collaboration workflows for software teams.',
  },
  {
    id: 'job-020',
    title: 'Developer Tools Engineer',
    companyId: 'atlassian',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '4-7 yrs',
    experienceMin: 4,
    experienceMax: 7,
    salaryLabel: '21-31 LPA',
    salaryMin: 21,
    salaryMax: 31,
    postedDaysAgo: 2,
    featured: true,
    skills: ['TypeScript', 'Java', 'Kubernetes'],
    description: 'Improve developer workflows across planning, code, and release tools.',
  },
  {
    id: 'job-021',
    title: 'Frontend Platform Engineer',
    companyId: 'atlassian',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '6-10 yrs',
    experienceMin: 6,
    experienceMax: 10,
    salaryLabel: '26-38 LPA',
    salaryMin: 26,
    salaryMax: 38,
    postedDaysAgo: 5,
    featured: false,
    skills: ['React', 'TypeScript', 'Design Systems'],
    description: 'Build shared frontend systems for collaboration products.',
  },
  {
    id: 'job-022',
    title: 'Android Engineer',
    companyId: 'uber',
    location: 'Chennai',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '3-6 yrs',
    experienceMin: 3,
    experienceMax: 6,
    salaryLabel: '16-24 LPA',
    salaryMin: 16,
    salaryMax: 24,
    postedDaysAgo: 5,
    featured: false,
    skills: ['Kotlin', 'Jetpack Compose', 'Retrofit'],
    description: 'Build polished mobile experiences with a strong design system.',
  },
  {
    id: 'job-023',
    title: 'Marketplace Backend Engineer',
    companyId: 'uber',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '5-9 yrs',
    experienceMin: 5,
    experienceMax: 9,
    salaryLabel: '24-36 LPA',
    salaryMin: 24,
    salaryMax: 36,
    postedDaysAgo: 4,
    featured: false,
    skills: ['Go', 'Kafka', 'Redis'],
    description: 'Build marketplace systems for mobility and delivery products.',
  },
  {
    id: 'job-024',
    title: 'Maps Platform Engineer',
    companyId: 'uber',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Contract',
    experienceLabel: '6-10 yrs',
    experienceMin: 6,
    experienceMax: 10,
    salaryLabel: '26-38 LPA',
    salaryMin: 26,
    salaryMax: 38,
    postedDaysAgo: 8,
    featured: false,
    skills: ['Go', 'Kubernetes', 'PostgreSQL'],
    description: 'Improve routing, geospatial indexing, and operational tooling.',
  },
  {
    id: 'job-025',
    title: 'Backend Engineer',
    companyId: 'spotify',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '4-7 yrs',
    experienceMin: 4,
    experienceMax: 7,
    salaryLabel: '18-28 LPA',
    salaryMin: 18,
    salaryMax: 28,
    postedDaysAgo: 2,
    featured: false,
    skills: ['Java', 'Kafka', 'Python'],
    description: 'Build systems for personalization, playlists, and creator workflows.',
  },
  {
    id: 'job-026',
    title: 'Mobile Engineer',
    companyId: 'spotify',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '3-6 yrs',
    experienceMin: 3,
    experienceMax: 6,
    salaryLabel: '16-24 LPA',
    salaryMin: 16,
    salaryMax: 24,
    postedDaysAgo: 6,
    featured: false,
    skills: ['Kotlin', 'Swift', 'React'],
    description: 'Build audio discovery and playback experiences across mobile platforms.',
  },
  {
    id: 'job-027',
    title: 'Recruiter',
    companyId: 'spotify',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Internship',
    experienceLabel: '0-2 yrs',
    experienceMin: 0,
    experienceMax: 2,
    salaryLabel: '8-12 LPA',
    salaryMin: 8,
    salaryMax: 12,
    postedDaysAgo: 5,
    featured: false,
    skills: ['Hiring', 'Candidate Experience', 'Scheduling'],
    description: 'Support sourcing and candidate communication workflows.',
  },
  {
    id: 'job-028',
    title: 'Technical Program Manager',
    companyId: 'netflix',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '8-12 yrs',
    experienceMin: 8,
    experienceMax: 12,
    salaryLabel: '35-50 LPA',
    salaryMin: 35,
    salaryMax: 50,
    postedDaysAgo: 2,
    featured: true,
    skills: ['Roadmaps', 'Stakeholder Management', 'Execution'],
    description: 'Coordinate cross-functional teams around product delivery.',
  },
  {
    id: 'job-029',
    title: 'Streaming Platform Engineer',
    companyId: 'netflix',
    location: 'Mumbai',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '6-10 yrs',
    experienceMin: 6,
    experienceMax: 10,
    salaryLabel: '28-42 LPA',
    salaryMin: 28,
    salaryMax: 42,
    postedDaysAgo: 3,
    featured: false,
    skills: ['Java', 'AWS', 'Kafka'],
    description: 'Build resilient streaming systems for global entertainment delivery.',
  },
  {
    id: 'job-030',
    title: 'Personalization Engineer',
    companyId: 'netflix',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '5-9 yrs',
    experienceMin: 5,
    experienceMax: 9,
    salaryLabel: '26-40 LPA',
    salaryMin: 26,
    salaryMax: 40,
    postedDaysAgo: 7,
    featured: false,
    skills: ['Python', 'Machine Learning', 'A/B Testing'],
    description: 'Improve discovery, ranking, and experimentation systems.',
  },
  {
    id: 'job-031',
    title: 'QA Automation Engineer',
    companyId: 'intel',
    location: 'Hyderabad',
    workMode: 'Hybrid',
    employmentType: 'Contract',
    experienceLabel: '2-4 yrs',
    experienceMin: 2,
    experienceMax: 4,
    salaryLabel: '12-18 LPA',
    salaryMin: 12,
    salaryMax: 18,
    postedDaysAgo: 7,
    featured: false,
    skills: ['Playwright', 'TypeScript', 'CI'],
    description: 'Build robust test suites for platform and developer tooling.',
  },
  {
    id: 'job-032',
    title: 'Systems Software Engineer',
    companyId: 'intel',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '4-8 yrs',
    experienceMin: 4,
    experienceMax: 8,
    salaryLabel: '20-32 LPA',
    salaryMin: 20,
    salaryMax: 32,
    postedDaysAgo: 4,
    featured: false,
    skills: ['C++', 'Linux', 'Python'],
    description: 'Develop low-level software for compute and data center platforms.',
  },
  {
    id: 'job-033',
    title: 'AI Accelerator Engineer',
    companyId: 'intel',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '5-9 yrs',
    experienceMin: 5,
    experienceMax: 9,
    salaryLabel: '24-36 LPA',
    salaryMin: 24,
    salaryMax: 36,
    postedDaysAgo: 8,
    featured: false,
    skills: ['Python', 'C++', 'CUDA'],
    description: 'Optimize AI workloads for accelerator and compiler toolchains.',
  },
  {
    id: 'job-034',
    title: 'Network Automation Engineer',
    companyId: 'cisco',
    location: 'Chennai',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '4-7 yrs',
    experienceMin: 4,
    experienceMax: 7,
    salaryLabel: '18-28 LPA',
    salaryMin: 18,
    salaryMax: 28,
    postedDaysAgo: 6,
    featured: false,
    skills: ['Python', 'Terraform', 'Kubernetes'],
    description: 'Automate network infrastructure and observability workflows.',
  },
  {
    id: 'job-035',
    title: 'Cloud Infrastructure Engineer',
    companyId: 'cisco',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Contract',
    experienceLabel: '6-10 yrs',
    experienceMin: 6,
    experienceMax: 10,
    salaryLabel: '26-38 LPA',
    salaryMin: 26,
    salaryMax: 38,
    postedDaysAgo: 6,
    featured: false,
    skills: ['Go', 'Kubernetes', 'CI/CD'],
    description: 'Improve reliability and delivery speed across cloud services.',
  },
  {
    id: 'job-036',
    title: 'Security Platform Engineer',
    companyId: 'cisco',
    location: 'Remote',
    workMode: 'Remote',
    employmentType: 'Full-time',
    experienceLabel: '5-8 yrs',
    experienceMin: 5,
    experienceMax: 8,
    salaryLabel: '22-34 LPA',
    salaryMin: 22,
    salaryMax: 34,
    postedDaysAgo: 9,
    featured: false,
    skills: ['Go', 'Security', 'Kubernetes'],
    description: 'Build secure infrastructure for enterprise networking products.',
  },
];

function resolveCompany(job: JobMock): JobListing {
  const company = getCompanyById(job.companyId);

  if (!company) {
    throw new Error(`Company "${job.companyId}" was not found for job "${job.id}".`);
  }

  return {
    ...job,
    company: company.name,
    companyInitial: company.logo.initial,
    companyColor: company.logo.color,
    companyLogo: company.logo.path,
  };
}

const JOBS: JobListing[] = JOB_MOCKS.map(resolveCompany);

const JOB_LOCATION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All locations' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Gurgaon', label: 'Gurgaon' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Noida', label: 'Noida' },
];

const JOB_EXPERIENCE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All experience' },
  { value: '0-2', label: '0-2 years' },
  { value: '2-4', label: '2-4 years' },
  { value: '4-7', label: '4-7 years' },
  { value: '7+', label: '7+ years' },
];

const JOB_EMPLOYMENT_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All employment types' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Internship', label: 'Internship' },
];

const JOB_SALARY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All salary ranges' },
  { value: '8-16', label: '8-16 LPA' },
  { value: '16-25', label: '16-25 LPA' },
  { value: '25-35', label: '25-35 LPA' },
  { value: '35+', label: '35+ LPA' },
];

const JOB_SORT_OPTIONS: FilterOption[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
  { value: 'salary-high', label: 'Salary: High to low' },
  { value: 'salary-low', label: 'Salary: Low to high' },
];

function matchesSearch(job: JobListing, query: string) {
  if (!query) return true;

  const normalizedQuery = query.trim().toLowerCase();
  const haystack = [job.title, job.company, job.location, job.description, ...job.skills]
    .join(' ')
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

function matchesLocation(job: JobListing, location: string) {
  return location === 'all' || job.location === location;
}

function matchesExperience(job: JobListing, experience: string) {
  if (experience === 'all') return true;

  const normalizedExperience = experience.trim();
  const hasOpenEndedBand = normalizedExperience.endsWith('+');
  const [minimumRaw, maximumRaw] = normalizedExperience.replace('+', '').split('-');
  const minimum = Number(minimumRaw);
  const maximum = hasOpenEndedBand
    ? Number.POSITIVE_INFINITY
    : maximumRaw
      ? Number(maximumRaw)
      : Number.POSITIVE_INFINITY;

  if (Number.isNaN(minimum)) {
    return false;
  }

  if (!Number.isFinite(maximum)) {
    return job.experienceMax >= minimum;
  }

  return job.experienceMax >= minimum && job.experienceMin <= maximum;
}

function matchesEmploymentType(job: JobListing, employmentType: string) {
  return employmentType === 'all' || job.employmentType === employmentType;
}

function matchesSalary(job: JobListing, salary: string) {
  if (salary === 'all') return true;

  const normalizedSalary = salary.trim();
  const hasOpenEndedBand = normalizedSalary.endsWith('+');
  const [minimumRaw, maximumRaw] = normalizedSalary.replace('+', '').split('-');
  const minimum = Number(minimumRaw);
  const maximum = hasOpenEndedBand
    ? Number.POSITIVE_INFINITY
    : maximumRaw
      ? Number(maximumRaw)
      : Number.POSITIVE_INFINITY;

  if (Number.isNaN(minimum)) {
    return false;
  }

  return job.salaryMax >= minimum && job.salaryMin <= maximum;
}

function sortJobs(jobs: JobListing[], sortBy: JobSortKey) {
  const sorted = [...jobs];

  if (sortBy === 'salary-high') {
    return sorted.sort((left, right) => right.salaryMax - left.salaryMax || left.postedDaysAgo - right.postedDaysAgo);
  }

  if (sortBy === 'salary-low') {
    return sorted.sort((left, right) => left.salaryMin - right.salaryMin || left.postedDaysAgo - right.postedDaysAgo);
  }

  if (sortBy === 'newest') {
    return sorted.sort((left, right) => left.postedDaysAgo - right.postedDaysAgo);
  }

  return sorted.sort((left, right) => {
    const featuredScore = Number(right.featured) - Number(left.featured);
    if (featuredScore !== 0) return featuredScore;

    return left.postedDaysAgo - right.postedDaysAgo || right.salaryMax - left.salaryMax;
  });
}

function filterJobs(jobs: JobListing[], filters: JobFilters) {
  return jobs.filter((job) => {
    return (
      matchesSearch(job, filters.query) &&
      matchesLocation(job, filters.location) &&
      matchesExperience(job, filters.experience) &&
      matchesEmploymentType(job, filters.employmentType) &&
      matchesSalary(job, filters.salary)
    );
  });
}

export type {
  FilterOption,
  JobEmploymentType,
  JobFilters,
  JobListing,
  JobMock,
  JobSortKey,
  JobWorkMode,
};
export {
  JOBS,
  JOB_MOCKS,
  JOB_EMPLOYMENT_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_LOCATION_OPTIONS,
  JOB_SALARY_OPTIONS,
  JOB_SORT_OPTIONS,
  filterJobs,
  matchesEmploymentType,
  matchesExperience,
  matchesLocation,
  matchesSalary,
  matchesSearch,
  sortJobs,
};
