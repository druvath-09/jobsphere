import { useState } from 'react';
import { Container } from '@/shared/components/layout';
import { cn } from '@/shared/lib/utils';

const COMPANIES = [
  'Google', 'Microsoft', 'Amazon', 'Adobe', 'Salesforce', 
  'Atlassian', 'Spotify', 'Intel', 'NVIDIA', 'Cisco'
];

function CompanyLogo({ name }: { name: string }) {
  const logoPath = `/logos/${name.toLowerCase()}.svg`;
  const [hasError, setHasError] = useState(false);
  
  return (
    <div className="flex items-center justify-center gap-3 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300 px-8 py-4 min-w-[160px]">
      {!hasError && (
        <img 
          src={logoPath} 
          alt={`${name} logo`} 
          onError={() => setHasError(true)}
          className="h-8 md:h-9 w-auto object-contain pointer-events-none" 
        />
      )}
      <span className={cn("text-xl font-bold tracking-tight text-text-primary", hasError ? "opacity-100" : "opacity-0 hidden")}>
        {name}
      </span>
      {!hasError && (
        <span className="text-xl font-bold tracking-tight text-text-primary hidden md:block">
          {name}
        </span>
      )}
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="py-12 border-b border-border/50 bg-background overflow-hidden flex flex-col items-center">
      <Container padding="md" className="flex flex-col items-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-text-secondary text-center mb-8">
          Trusted by hiring teams worldwide
        </p>
      </Container>
      
      {/* Marquee Container */}
      <div className="relative w-full max-w-[100vw] flex overflow-hidden group">
        {/* Left/Right fading edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
        
        {/* Marquee Track */}
        <div className="flex animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap">
          {COMPANIES.map((company) => (
            <CompanyLogo key={company} name={company} />
          ))}
          {/* Duplicate for infinite loop */}
          {COMPANIES.map((company) => (
            <CompanyLogo key={`${company}-dup`} name={company} />
          ))}
        </div>
      </div>
    </section>
  );
}
