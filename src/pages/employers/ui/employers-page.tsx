import { NavbarAuth } from '@/widgets/navbar-auth';
import { MainLayout, Container } from '@/shared/components/layout';
import { Button, Card, CardContent } from '@/shared/components/ui';
import { useToast } from '@/shared/components/ui/toast';

export function EmployersPage() {
	const { toast } = useToast();

	const handlePostJob = () => {
		toast(
			<div className="flex flex-col gap-1">
				<span className="font-medium">Coming Soon</span>
				<span className="text-sm text-text-secondary">Employer dashboard and job posting features are currently in development.</span>
			</div>,
			'info'
		);
	};

	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-background pt-24 pb-20 lg:pt-32 lg:pb-28 border-b border-border/50">
				<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,var(--primary)_0%,transparent_50%)] opacity-[0.03]"></div>
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[spin-slow_15s_linear_infinite]"></div>
				</div>

				<Container padding="md" className="relative z-10">
					<div className="mx-auto flex max-w-4xl flex-col items-center text-center">
						<div className="mb-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
							<span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary shadow-sm">
								For Employers
							</span>
						</div>
						<h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl animate-in slide-in-from-bottom-5 duration-700 fade-in fill-mode-both">
							Hire the top 1% of <br className="hidden sm:block"/>
							<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2 drop-shadow-sm">
								software engineering talent.
							</span>
						</h1>
						<p className="mt-6 max-w-[42rem] text-lg leading-relaxed text-text-secondary sm:text-xl animate-in slide-in-from-bottom-6 duration-700 fade-in fill-mode-both delay-150">
							Post your jobs where the best developers are looking. Get immediate access to a curated pool of vetted engineering and design professionals.
						</p>
						<div className="mt-10 animate-in slide-in-from-bottom-8 duration-700 fade-in fill-mode-both delay-300">
							<Button variant="primary" size="lg" className="rounded-xl px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all" onClick={handlePostJob}>
								Post a Job — $299
							</Button>
							<p className="mt-4 text-xs font-medium text-text-secondary">
								Includes 30 days of premium placement.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* Benefits Section */}
			<section className="py-20 bg-surface-hover/30">
				<Container padding="md">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-text-primary">Why hire on JobSphere?</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card className="border-border/60 shadow-sm">
							<CardContent className="p-8 flex flex-col items-center text-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
									<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
								</div>
								<h3 className="text-xl font-bold mb-2">Curated Talent</h3>
								<p className="text-text-secondary text-sm leading-relaxed">Reach passive candidates and senior engineers who don't browse traditional job boards.</p>
							</CardContent>
						</Card>
						<Card className="border-border/60 shadow-sm">
							<CardContent className="p-8 flex flex-col items-center text-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
									<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
								</div>
								<h3 className="text-xl font-bold mb-2">High Intent</h3>
								<p className="text-text-secondary text-sm leading-relaxed">Candidates apply directly through our streamlined 1-click Easy Apply process, increasing conversion rates.</p>
							</CardContent>
						</Card>
						<Card className="border-border/60 shadow-sm">
							<CardContent className="p-8 flex flex-col items-center text-center">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
									<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
								</div>
								<h3 className="text-xl font-bold mb-2">Brand Visibility</h3>
								<p className="text-text-secondary text-sm leading-relaxed">Showcase your engineering culture, tech stack, and benefits on a dedicated company profile.</p>
							</CardContent>
						</Card>
					</div>
				</Container>
			</section>

		</MainLayout>
	);
}
