import { NavbarAuth } from '@/widgets/navbar-auth';
import { FeaturedCompanies } from '@/widgets/featured-companies';
import { HeroSection } from '@/widgets/hero';
import { LatestJobs } from '@/widgets/latest-jobs';
import { PopularCategories } from '@/widgets/popular-categories';
import { WhyJobSphere } from '@/widgets/why-jobsphere';
import { MainLayout } from '@/shared/components/layout';

function HomePage() {
	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<HeroSection />
			<FeaturedCompanies />
			<LatestJobs />
			<PopularCategories />
			<WhyJobSphere />
		</MainLayout>
	);
}

export { HomePage };
