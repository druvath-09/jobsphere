import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/layout';
import { Button } from '@/shared/components/ui';

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 17.5l-4.167-4.167M13.333 8.333A5 5 0 1 1 3.333 8.333a5 5 0 0 1 10 0z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Elements                                                  */
/* ------------------------------------------------------------------ */

function FloatingLogo({ text, className, delay }: { text: string; className: string; delay: string }) {
  return (
    <div 
      className={cn(
        "absolute hidden lg:flex items-center justify-center rounded-xl bg-surface/80 backdrop-blur-md shadow-lg border border-border px-4 py-2 font-bold text-text-secondary select-none animate-[float_4s_ease-in-out_infinite]",
        className
      )}
      style={{ animationDelay: delay }}
    >
      {text}
    </div>
  );
}

function FloatingJobCard({ company, title, salary, location, className, delay }: { company: string; title: string; salary: string; location: string; className: string; delay: string }) {
  return (
    <div 
      className={cn(
        "absolute hidden xl:flex flex-col gap-1 rounded-2xl bg-surface/80 backdrop-blur-xl shadow-xl border border-border/50 p-4 select-none animate-[float_5s_ease-in-out_infinite]",
        className
      )}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px]">
          {company[0]}
        </div>
        <span className="text-xs font-semibold text-text-secondary">{company}</span>
      </div>
      <p className="text-sm font-bold text-text-primary leading-tight">{title}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[11px] font-medium text-text-secondary bg-background rounded-full px-2 py-0.5">{location}</span>
        <span className="text-[11px] font-semibold text-success bg-success/10 rounded-full px-2 py-0.5">{salary}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSection Component                                              */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('all');
  const [employmentType, setEmploymentType] = useState('all');
  
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const placeholders = ['Software Engineer', 'Backend Engineer', 'AI Engineer', 'Data Scientist', 'Frontend Developer'];
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (jobTitle) params.set('q', jobTitle);
    if (location) params.set('location', location);
    if (experience !== 'all') params.set('experience', experience);
    if (employmentType !== 'all') params.set('employmentType', employmentType);
    navigate(`/jobs?${params.toString()}`);
  }

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  }

  return (
    <section 
      className="relative overflow-hidden bg-background pt-20 pb-28 lg:pt-32 lg:pb-40 border-b border-border/50"
      onMouseMove={handleMouseMove}
    >
      
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,var(--primary)_0%,transparent_50%)] opacity-[0.03]"></div>
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Floating Gradient Orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[spin-slow_15s_linear_infinite]"
          style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[spin-slow_20s_linear_infinite_reverse]"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        ></div>
      </div>

      {/* Floating Elements (Desktop only) */}
      <div className="absolute inset-0 z-10 pointer-events-none max-w-7xl mx-auto">
        <div style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`, transition: 'transform 0.1s ease-out' }}>
          <FloatingLogo text="Google" className="top-[25%] left-[10%] opacity-85" delay="0s" />
        </div>
        <div style={{ transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px)`, transition: 'transform 0.1s ease-out' }}>
          <FloatingLogo text="Stripe" className="top-[55%] left-[5%] opacity-85" delay="1.5s" />
        </div>
        <div style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`, transition: 'transform 0.1s ease-out' }}>
          <FloatingLogo text="Amazon" className="bottom-[10%] left-[12%] opacity-85" delay="0.8s" />
        </div>
        
        <div style={{ transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`, transition: 'transform 0.1s ease-out' }}>
          <FloatingLogo text="Microsoft" className="top-[30%] right-[10%] opacity-85" delay="0.5s" />
        </div>
        <div style={{ transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`, transition: 'transform 0.1s ease-out' }}>
          <FloatingLogo text="Atlassian" className="top-[65%] right-[6%] opacity-85" delay="2.1s" />
        </div>
        <div style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`, transition: 'transform 0.1s ease-out' }}>
          <FloatingLogo text="NVIDIA" className="bottom-[5%] right-[15%] opacity-85" delay="1.2s" />
        </div>
        
        <div style={{ transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px)`, transition: 'transform 0.1s ease-out' }}>
          <FloatingJobCard 
            company="Stripe" title="Backend Engineer" salary="$180k" location="Remote" 
            className="top-[70%] left-[18%] -rotate-3" delay="0.3s" 
          />
        </div>
        <div style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)`, transition: 'transform 0.1s ease-out' }}>
          <FloatingJobCard 
            company="Google" title="Senior SWE" salary="₹35-50 LPA" location="Hybrid" 
            className="top-[40%] right-[18%] rotate-3" delay="1.7s" 
          />
        </div>
      </div>

      <Container padding="md" className="relative z-20">
        <div className="mx-auto flex max-w-[54rem] flex-col items-center text-center">

          {/* Eyebrow */}
          <div className="mb-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Over 5,000+ top tech roles available
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold tracking-tight text-text-primary sm:text-6xl md:text-7xl animate-in slide-in-from-bottom-5 duration-700 fade-in fill-mode-both">
            Your next great <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2 drop-shadow-sm">
              opportunity awaits.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[42rem] text-lg leading-relaxed text-text-secondary sm:text-xl animate-in slide-in-from-bottom-6 duration-700 fade-in fill-mode-both delay-150">
            Discover premium engineering and design roles from startups to Fortune 500s. 
            Apply directly to hiring managers with a single click.
          </p>

          {/* Search Bar */}
          <div className="mt-10 w-full max-w-4xl animate-in slide-in-from-bottom-8 duration-700 fade-in fill-mode-both delay-300">
            <form 
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row items-center rounded-2xl bg-surface p-2 shadow-xl shadow-primary/5 border border-border/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 focus-within:ring-4 focus-within:ring-primary/20 focus-within:border-primary/50 relative z-30"
            >
              {/* Job Title */}
              <div className="relative flex-1 w-full md:border-r md:border-border group">
                <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-primary" />
                <div className="relative">
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-14 w-full bg-transparent pl-12 pr-4 text-text-primary placeholder:text-transparent focus:outline-none focus:ring-0 peer font-medium"
                  />
                  {/* Rotating Placeholder */}
                  {!jobTitle && (
                    <div className="absolute inset-y-0 left-12 flex items-center pointer-events-none overflow-hidden">
                      <span className="text-text-secondary/70 animate-[slideUp_0.3s_ease-out_forwards]" key={placeholderIdx}>
                        {placeholders[placeholderIdx]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="relative flex-1 w-full md:border-r md:border-border mt-2 md:mt-0 border-t border-border md:border-t-0 group">
                <LocationIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-primary" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, state, or remote"
                  className="h-14 w-full bg-transparent pl-12 pr-4 text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:ring-0 font-medium"
                />
              </div>

              {/* Employment Type */}
              <div className="relative w-full md:w-48 mt-2 md:mt-0 border-t border-border md:border-t-0 md:border-r group">
                <BriefcaseIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-text-secondary transition-colors group-focus-within:text-primary" />
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="h-14 w-full appearance-none bg-transparent pl-12 pr-10 text-text-primary focus:outline-none focus:ring-0 font-medium cursor-pointer"
                >
                  <option value="all">Any Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              {/* Experience */}
              <div className="relative w-full md:w-48 mt-2 md:mt-0 border-t border-border md:border-t-0 group">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="h-14 w-full appearance-none bg-transparent pl-4 pr-10 text-text-primary focus:outline-none focus:ring-0 font-medium cursor-pointer"
                >
                  <option value="all">Any Experience</option>
                  <option value="0-2">0-2 years</option>
                  <option value="2-4">2-4 years</option>
                  <option value="4-7">4-7 years</option>
                  <option value="7+">7+ years</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="w-full md:w-auto mt-2 md:mt-0 md:ml-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="h-14 w-full md:w-32 rounded-xl text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
