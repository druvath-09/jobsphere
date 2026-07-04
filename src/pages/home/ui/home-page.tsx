import { NavbarAuth } from '@/widgets/navbar-auth';
import { HeroSection } from '@/widgets/hero';
import { TrustSection } from '@/widgets/trust-section';
import { AnimatedStatistics } from '@/widgets/animated-statistics';
import { WhyJobSphere } from '@/widgets/why-jobsphere';
import { LatestJobs } from '@/widgets/latest-jobs';
import { HowItWorks } from '@/widgets/how-it-works';
import { Testimonials } from '@/widgets/testimonials';
import { CallToActionSection } from '@/widgets/call-to-action';
import { MainLayout } from '@/shared/components/layout';

function HomePage() {
	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<HeroSection />
			<TrustSection />
			<AnimatedStatistics />
			<WhyJobSphere />
			<LatestJobs />
			<HowItWorks />
			<Testimonials />
			<CallToActionSection />
		</MainLayout>
	);
}

export { HomePage };
