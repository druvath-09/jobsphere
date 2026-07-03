import { MainLayout } from '@/shared/components/layout';
import { HeroSection } from '@/widgets/hero';
import { FeaturedCompanies } from '@/widgets/featured-companies';
import { PopularCategories } from '@/widgets/popular-categories';
import { LatestJobs } from '@/widgets/latest-jobs';
import { WhyJobSphere } from '@/widgets/why-jobsphere';

/**
 * HomePage — the public landing page.
 *
 * Composes the full page structure:
 *   Navbar → Hero → Companies → Categories → Jobs → Why → Footer
 *
 * All sections are self-contained widgets from the widgets/ FSD layer.
 * No routing, authentication, or Firebase.
 */
function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedCompanies />
      <PopularCategories />
      <LatestJobs />
      <WhyJobSphere />
    </MainLayout>
  );
}

export { HomePage };
