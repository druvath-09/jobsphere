import { MainLayout } from '@/shared/components/layout';
import { HeroSection } from '@/widgets/hero';

/**
 * HomePage — the public landing page.
 *
 * Currently contains only the Hero section.
 * Additional sections (job listings, company logos, testimonials, etc.)
 * will be added in later phases.
 */
function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
    </MainLayout>
  );
}

export { HomePage };
