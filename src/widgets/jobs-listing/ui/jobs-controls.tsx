import { Input, Select } from '@/shared/components/ui';
import { Container } from '@/shared/components/layout';
import {
  JOB_EMPLOYMENT_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_LOCATION_OPTIONS,
  JOB_SALARY_OPTIONS,
  JOB_SORT_OPTIONS,
} from '@/entities/job';
import type { JobFilters } from '@/entities/job';

interface JobsControlsProps {
  filters: JobFilters;
  onChange: <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => void;
}

function JobsControls({ filters, onChange }: JobsControlsProps) {
  return (
    <Container padding="md" className="mt-6">
      <div className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_repeat(5,minmax(0,1fr))]">
          <Input
            label="Search"
            placeholder="Role, company, skill, or keyword"
            value={filters.query}
            onChange={(event) => onChange('query', event.target.value)}
          />

          <Select
            label="Location"
            value={filters.location}
            onChange={(event) => onChange('location', event.target.value)}
          >
            {JOB_LOCATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            label="Experience"
            value={filters.experience}
            onChange={(event) => onChange('experience', event.target.value)}
          >
            {JOB_EXPERIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            label="Employment type"
            value={filters.employmentType}
            onChange={(event) => onChange('employmentType', event.target.value)}
          >
            {JOB_EMPLOYMENT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            label="Salary"
            value={filters.salary}
            onChange={(event) => onChange('salary', event.target.value)}
          >
            {JOB_SALARY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            label="Sort by"
            value={filters.sortBy}
            onChange={(event) => onChange('sortBy', event.target.value as JobFilters['sortBy'])}
          >
            {JOB_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </Container>
  );
}

export { JobsControls };