type JobEmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
type JobWorkMode = 'Remote' | 'Hybrid' | 'Onsite';
type JobSortKey = 'relevance' | 'newest' | 'salary-high' | 'salary-low';

interface JobListing {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  companyColor: string;
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

const JOBS: JobListing[] = [
  {
    id: 'job-001',
    title: 'Senior Frontend Engineer',
    company: 'NovaTech',
    companyInitial: 'N',
    companyColor: '#0F766E',
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
    title: 'Staff Backend Engineer',
    company: 'VertexLabs',
    companyInitial: 'V',
    companyColor: '#7C3AED',
    location: 'Bangalore',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    experienceLabel: '7-12 yrs',
    experienceMin: 7,
    experienceMax: 12,
    salaryLabel: '30-45 LPA',
    salaryMin: 30,
    salaryMax: 45,
    postedDaysAgo: 2,
    featured: true,
    skills: ['Go', 'gRPC', 'Kubernetes'],
    description: 'Design services and infrastructure for high-throughput systems.',
  },
  {
    id: 'job-003',
    title: 'Platform Engineer',
    company: 'CloudPeak',
    companyInitial: 'C',
    companyColor: '#0284C7',
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
    id: 'job-004',
    title: 'Full Stack Engineer',
    company: 'ByteForge',
    companyInitial: 'B',
    companyColor: '#DC2626',
    location: 'Mumbai',
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
    skills: ['Node.js', 'React', 'PostgreSQL'],
    description: 'Ship customer-facing features across the web stack.',
  },
  {
    id: 'job-005',
    title: 'ML Engineer',
    company: 'HorizonAI',
    companyInitial: 'H',
    companyColor: '#D97706',
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
    id: 'job-006',
    title: 'Android Engineer',
    company: 'PrismaFlow',
    companyInitial: 'P',
    companyColor: '#059669',
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
    id: 'job-007',
    title: 'Product Designer',
    company: 'PaperTrail',
    companyInitial: 'P',
    companyColor: '#EC4899',
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
    description: 'Shape hiring workflows and employer-facing experiences.',
  },
  {
    id: 'job-008',
    title: 'DevOps Engineer',
    company: 'InfraSquare',
    companyInitial: 'I',
    companyColor: '#0EA5E9',
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
    skills: ['Docker', 'Kubernetes', 'CI/CD'],
    description: 'Improve reliability and delivery speed across services.',
  },
  {
    id: 'job-009',
    title: 'Data Analyst',
    company: 'InsightWorks',
    companyInitial: 'I',
    companyColor: '#6366F1',
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
    description: 'Turn hiring funnel data into clear product decisions.',
  },
  {
    id: 'job-010',
    title: 'Technical Program Manager',
    company: 'OrbitScale',
    companyInitial: 'O',
    companyColor: '#14B8A6',
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
    id: 'job-011',
    title: 'QA Automation Engineer',
    company: 'SignalPath',
    companyInitial: 'S',
    companyColor: '#B45309',
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
    description: 'Build robust test suites for the platform experience.',
  },
  {
    id: 'job-012',
    title: 'Recruiter',
    company: 'PeopleMesh',
    companyInitial: 'P',
    companyColor: '#F97316',
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
];

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
  JobSortKey,
  JobWorkMode,
};
export {
  JOBS,
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