import { useEffect, useState, useRef } from 'react';
import { Container } from '@/shared/components/layout';

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // ease-out quartic
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(easeProgress * end));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [end, duration, hasAnimated]);

  return { count, elementRef };
}

function StatCard({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, elementRef } = useCountUp(end);
  
  return (
    <div 
      ref={elementRef} 
      className="flex flex-col items-center justify-center p-6 bg-surface border border-border/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2 flex items-baseline group-hover:scale-105 transition-transform duration-300">
        {count}
        <span className="text-3xl md:text-4xl">{suffix}</span>
      </div>
      <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">{label}</p>
    </div>
  );
}

export function AnimatedStatistics() {
  return (
    <section className="py-20 bg-background/50">
      <Container padding="md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard end={120} suffix="K+" label="Active Jobs" />
          <StatCard end={15} suffix="K+" label="Verified Employers" />
          <StatCard end={2} suffix="M+" label="Monthly Matches" />
          <StatCard end={98} suffix="%" label="Success Rate" />
        </div>
      </Container>
    </section>
  );
}
