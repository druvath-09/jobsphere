import { getCompanyById } from '@/entities/company/model/company';

export type JobEmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type JobWorkMode = 'Remote' | 'Hybrid' | 'Onsite';

export interface JobMock {
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
  postedAt: string;
  easyApply: boolean;
  featured: boolean;
  trustBadge?: 'Verified Employer' | 'Actively Hiring' | 'Highly Responsive' | 'Fast Growing';
  skills: string[];
  description: string;
}

const COMPANIES = [
  'google', 'microsoft', 'amazon', 'adobe', 'nvidia', 'cisco',
  'atlassian', 'salesforce', 'oracle', 'uber', 'airbnb', 'spotify', 'intel'
];

const ROLES = [
  'Software Engineer', 'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer',
  'Data Scientist', 'Data Analyst', 'Data Engineer', 'Machine Learning Engineer',
  'Product Manager', 'UX Designer', 'UI Designer', 'Product Designer',
  'DevOps Engineer', 'Site Reliability Engineer', 'Cloud Architect',
  'Engineering Manager', 'Director of Engineering', 'Security Engineer'
];

const SKILLS_POOL = [
  'React', 'Node.js', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'SQL', 'PostgreSQL', 'MongoDB',
  'GraphQL', 'Redis', 'Kafka', 'Figma', 'PyTorch', 'TensorFlow', 'Spark'
];

const LOCATIONS = [
  'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
  'London, UK', 'Berlin, Germany', 'Amsterdam, Netherlands', 'Toronto, Canada',
  'Bengaluru, India', 'Hyderabad, India', 'Sydney, Australia', 'Singapore'
];

const EXP_LEVELS = [
  { label: 'Entry Level', min: 0, max: 2 },
  { label: 'Mid Level', min: 3, max: 5 },
  { label: 'Senior', min: 5, max: 8 },
  { label: 'Staff/Principal', min: 8, max: 15 }
];

const SALARY_RANGES = [
  { label: '$80k - $120k', min: 80, max: 120 },
  { label: '$120k - $160k', min: 120, max: 160 },
  { label: '$150k - $200k', min: 150, max: 200 },
  { label: '$180k - $250k+', min: 180, max: 250 },
  { label: '15-25 LPA', min: 15, max: 25 },
  { label: '30-45 LPA', min: 30, max: 45 },
  { label: '£60k - £90k', min: 60, max: 90 }
];

// Seeded PRNG for consistent mock data
let seed = 12345;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(random() * arr.length)]!;
}

function getRandomSubset<T>(arr: T[], size: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - random());
  return shuffled.slice(0, size);
}

function getPostedAt(daysAgo: number): string {
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return 'Yesterday';
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo === 7) return '1 week ago';
  return `${Math.floor(daysAgo / 7)} weeks ago`;
}

function generateMockJobs(count: number): JobMock[] {
  const jobs: JobMock[] = [];
  for (let i = 1; i <= count; i++) {
    const companyId = getRandom(COMPANIES);
    const role = getRandom(ROLES);
    const location = getRandom(LOCATIONS);
    const workMode = getRandom(['Remote', 'Hybrid', 'Onsite'] as JobWorkMode[]);
    const exp = getRandom(EXP_LEVELS);
    const salary = getRandom(SALARY_RANGES);
    const daysAgo = Math.floor(random() * 30);
    const skills = getRandomSubset(SKILLS_POOL, Math.floor(random() * 3) + 3); // 3-5 skills

    // Employment type based on experience
    let empType: JobEmploymentType = 'Full-time';
    if (exp.label === 'Entry Level' && random() > 0.8) empType = 'Internship';
    else if (random() > 0.9) empType = 'Contract';

    const companyDetails = getCompanyById(companyId);
    const companyName = companyDetails ? companyDetails.name : companyId;

    const trustBadges: ('Verified Employer' | 'Actively Hiring' | 'Highly Responsive' | 'Fast Growing' | undefined)[] = [
      'Verified Employer', 'Actively Hiring', 'Highly Responsive', 'Fast Growing', undefined, undefined, undefined
    ];
    const badge = getRandom(trustBadges);

    const jobMock: JobMock = {
      id: `job-${i.toString().padStart(4, '0')}`,
      title: role,
      companyId: companyId,
      location: workMode === 'Remote' ? 'Remote' : location,
      workMode: workMode,
      employmentType: empType,
      experienceLabel: exp.label,
      experienceMin: exp.min,
      experienceMax: exp.max,
      salaryLabel: salary.label,
      salaryMin: salary.min,
      salaryMax: salary.max,
      postedDaysAgo: daysAgo,
      postedAt: getPostedAt(daysAgo),
      easyApply: random() > 0.5,
      featured: random() > 0.8,
      skills: skills,
      description: `We are looking for a talented ${role} to join our team at ${companyName}. You will be responsible for building scalable systems and working closely with cross-functional teams.\n\nKey requirements:\n- Strong problem-solving skills\n- Excellent communication\n- Proficiency in ${skills.join(', ')}`
    };

    if (badge) {
      jobMock.trustBadge = badge;
    }

    jobs.push(jobMock);
  }
  return jobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
}

export const MOCK_JOBS: JobMock[] = generateMockJobs(300);
