import { Container } from '@/shared/components/layout';
import { Select } from '@/shared/components/ui';
import {
  COMPANY_INDUSTRY_OPTIONS,
  COMPANY_LOCATION_OPTIONS,
  COMPANY_OPEN_POSITIONS_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  COMPANY_SORT_OPTIONS,
} from '@/entities/company';
import type { CompanyFilters } from '@/entities/company';

interface CompaniesControlsProps {
  filters: CompanyFilters;
  onChange: <K extends keyof CompanyFilters>(key: K, value: CompanyFilters[K]) => void;
}

function CompaniesControls({ filters, onChange }: CompaniesControlsProps) {
  return (
    <Container padding="md" className="mt-6">
      <div className="rounded-3xl border border-border bg-surface p-4 shadow-sm sm:p-5">
        <div className="grid gap-4 lg:grid-cols-5">
          <Select label="Industry" value={filters.industry} onChange={(event) => onChange('industry', event.target.value)}>
            {COMPANY_INDUSTRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select label="Company Size" value={filters.size} onChange={(event) => onChange('size', event.target.value)}>
            {COMPANY_SIZE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select label="Location" value={filters.location} onChange={(event) => onChange('location', event.target.value)}>
            {COMPANY_LOCATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            label="Open Positions"
            value={filters.positions}
            onChange={(event) => onChange('positions', event.target.value)}
          >
            {COMPANY_OPEN_POSITIONS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select label="Sort By" value={filters.sortBy} onChange={(event) => onChange('sortBy', event.target.value as CompanyFilters['sortBy'])}>
            {COMPANY_SORT_OPTIONS.map((option) => (
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

export { CompaniesControls };
