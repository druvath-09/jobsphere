import { Link } from 'react-router-dom';
import { Container } from '@/shared/components/layout';
import { Button } from '@/shared/components/ui';
import { ROUTES } from '@/shared/constants/routes';

export function CallToActionSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none"></div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Container padding="md" className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl mb-6">
            Your next opportunity starts here.
          </h2>
          <p className="text-lg text-text-secondary mb-10 leading-relaxed">
            Join thousands of software engineers finding their dream roles on JobSphere.
            Apply directly, get hired faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.register} className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold px-8 py-3 text-base">
                Start Applying →
              </Button>
            </Link>
            <Link to={ROUTES.jobs} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-surface hover:bg-surface-hover shadow-sm hover:shadow-md transition-all duration-300 font-medium px-8 py-3 text-base">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
