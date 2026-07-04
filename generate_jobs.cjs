const fs = require('fs');

const companies = [
  { id: 'google', size: 182000, ind: 'Cloud' },
  { id: 'microsoft', size: 221000, ind: 'SaaS' },
  { id: 'amazon', size: 1525000, ind: 'E-commerce' },
  { id: 'nvidia', size: 29000, ind: 'AI' },
  { id: 'adobe', size: 29000, ind: 'SaaS' },
  { id: 'salesforce', size: 72000, ind: 'SaaS' },
  { id: 'atlassian', size: 11000, ind: 'Developer Tools' },
  { id: 'uber', size: 30000, ind: 'Mobile' },
  { id: 'spotify', size: 8000, ind: 'Mobile' },
  { id: 'netflix', size: 13000, ind: 'Cloud' },
  { id: 'intel', size: 124000, ind: 'AI' },
  { id: 'cisco', size: 84000, ind: 'Cloud' },
  { id: 'resend', size: 25, ind: 'Developer Tools' },
  { id: 'convex', size: 30, ind: 'Cloud' },
  { id: 'betterstack', size: 40, ind: 'Developer Tools' },
  { id: 'supabase', size: 90, ind: 'Cloud' },
  { id: 'clerk', size: 80, ind: 'SaaS' },
  { id: 'neon', size: 120, ind: 'Cloud' },
  { id: 'vercel', size: 400, ind: 'Cloud' },
  { id: 'posthog', size: 220, ind: 'SaaS' },
  { id: 'render', size: 250, ind: 'Cloud' },
  { id: 'huggingface', size: 550, ind: 'AI' },
  { id: 'replit', size: 600, ind: 'Developer Tools' },
  { id: 'planetscale', size: 650, ind: 'Cloud' },
  { id: 'stripe', size: 3000, ind: 'Fintech' },
  { id: 'figma', size: 1300, ind: 'SaaS' },
  { id: 'notion', size: 1500, ind: 'SaaS' }
];

const locations = ['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Noida', 'Gurgaon', 'Seattle', 'Mountain View', 'San Francisco', 'Austin', 'London', 'Dublin', 'Sydney', 'Toronto', 'Remote'];
const workModes = ['Remote', 'Hybrid', 'Onsite'];
const employmentTypes = ['Full-time', 'Contract', 'Internship', 'Part-time'];

const jobTitles = {
  'AI': ['AI Engineer', 'ML Engineer', 'Data Scientist', 'CUDA Developer', 'Computer Vision Engineer', 'AI Researcher'],
  'Cloud': ['Cloud Engineer', 'DevOps Engineer', 'Platform Engineer', 'Infrastructure Engineer', 'SRE', 'Backend Engineer'],
  'SaaS': ['Full Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'Product Manager', 'Data Analyst', 'UI Engineer'],
  'Developer Tools': ['Developer Advocate', 'Systems Engineer', 'Frontend Engineer', 'Backend Engineer', 'Technical Writer'],
  'E-commerce': ['Backend Engineer', 'Data Engineer', 'Supply Chain Engineer', 'SDE II', 'SDE III', 'Frontend Engineer'],
  'Mobile': ['iOS Engineer', 'Android Engineer', 'Mobile Backend Engineer', 'React Native Developer', 'QA Automation Engineer'],
  'Fintech': ['Security Engineer', 'Backend Engineer', 'Data Engineer', 'Risk Analyst', 'Compliance Engineer']
};

const experienceRanges = [
  { label: 'Fresher', min: 0, max: 0 },
  { label: '0-2 years', min: 0, max: 2 },
  { label: '2-4 years', min: 2, max: 4 },
  { label: '3-5 years', min: 3, max: 5 },
  { label: '5+ years', min: 5, max: 10 }
];

let jobIdCounter = 1;
const jobs = [];

for (const company of companies) {
  let numJobs = 0;
  if (company.size <= 50) numJobs = Math.floor(Math.random() * 5) + 1; // 1-5
  else if (company.size <= 200) numJobs = Math.floor(Math.random() * 5) + 6; // 6-10
  else if (company.size <= 1000) numJobs = Math.floor(Math.random() * 10) + 11; // 11-20
  else numJobs = Math.floor(Math.random() * 10) + 21; // 21-30

  for (let i = 0; i < numJobs; i++) {
    const titleOpts = jobTitles[company.ind] || jobTitles['SaaS'];
    const title = titleOpts[Math.floor(Math.random() * titleOpts.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const workMode = workModes[Math.floor(Math.random() * workModes.length)];
    const empType = employmentTypes[Math.floor(Math.random() * employmentTypes.length)];
    const exp = experienceRanges[Math.floor(Math.random() * experienceRanges.length)];
    
    let salaryLabel, salaryMin, salaryMax;
    if (['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Noida', 'Gurgaon'].includes(location)) {
      salaryMin = exp.min === 0 ? 8 + Math.floor(Math.random() * 4) : 15 + exp.min * 3;
      salaryMax = salaryMin + 8 + Math.floor(Math.random() * 10);
      salaryLabel = `${salaryMin}-${salaryMax} LPA`;
    } else if (['London', 'Dublin'].includes(location)) {
      salaryMin = exp.min === 0 ? 40 : 60 + exp.min * 10;
      salaryMax = salaryMin + 20 + Math.floor(Math.random() * 20);
      const curr = location === 'London' ? '£' : '€';
      salaryLabel = `${curr}${salaryMin}k - ${curr}${salaryMax}k`;
    } else {
      salaryMin = exp.min === 0 ? 90 : 120 + exp.min * 10;
      salaryMax = salaryMin + 30 + Math.floor(Math.random() * 40);
      salaryLabel = `$${salaryMin}k - $${salaryMax}k`;
    }

    const skills = ['React', 'Node.js', 'Python', 'Go', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'SQL', 'Rust'].sort(() => 0.5 - Math.random()).slice(0, 3);
    
    jobs.push({
      id: `job-${String(jobIdCounter++).padStart(3, '0')}`,
      title,
      companyId: company.id,
      location,
      workMode,
      employmentType: empType,
      experienceLabel: exp.label,
      experienceMin: exp.min,
      experienceMax: exp.max,
      salaryLabel,
      salaryMin,
      salaryMax,
      postedDaysAgo: Math.floor(Math.random() * 14) + 1,
      featured: Math.random() > 0.8,
      skills,
      description: `Exciting opportunity as a ${title} at ${company.id} working on scale.`
    });
  }
}

const jobTsContent = fs.readFileSync('src/entities/job/model/job.ts', 'utf-8');
const beforeRegex = /const JOB_MOCKS: JobMock\[\] = \[[\s\S]*?\];/;
const replacement = `const JOB_MOCKS: JobMock[] = ${JSON.stringify(jobs, null, 2).replace(/"([^"]+)":/g, '$1:')};`;

if (beforeRegex.test(jobTsContent)) {
  fs.writeFileSync('src/entities/job/model/job.ts', jobTsContent.replace(beforeRegex, replacement));
  console.log(`Replaced jobs successfully. Total jobs: ${jobs.length}`);
} else {
  console.log('Regex did not match.');
}
