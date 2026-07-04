import { Container } from '@/shared/components/layout';

const STEPS = [
  { id: 1, title: 'Create Profile', desc: 'Build your tech profile in minutes.' },
  { id: 2, title: 'Discover Jobs', desc: 'Get matched with verified tech roles.' },
  { id: 3, title: 'Apply Instantly', desc: 'One-click apply to hiring managers.' },
  { id: 4, title: 'Get Hired', desc: 'Track interviews and land the job.' },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-surface border-t border-border/50 overflow-hidden relative">
      <Container padding="md">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            How JobSphere works
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            Your journey to your next engineering role, simplified into four easy steps.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-border z-0">
            <div className="absolute top-0 left-0 h-full bg-primary animate-[marquee_3s_linear_infinite]" style={{ width: '100%', transformOrigin: 'left', animation: 'progressLine 3s ease-in-out infinite' }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface border-2 border-primary text-lg font-bold text-primary shadow-sm shadow-primary/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 relative">
                  {step.id}
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:animate-ping"></div>
                </div>
                
                {/* Mobile Connector */}
                {idx !== STEPS.length - 1 && (
                  <div className="md:hidden h-10 w-[2px] bg-border my-2 relative">
                     <div className="absolute top-0 left-0 w-full h-full bg-primary origin-top animate-[progressVertical_3s_ease-in-out_infinite]"></div>
                  </div>
                )}
                
                <h3 className="mt-6 text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
      
      {/* Add custom keyframes inline or rely on global keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progressLine {
          0% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @keyframes progressVertical {
          0% { transform: scaleY(0); opacity: 0; }
          50% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
      `}} />
    </section>
  );
}
