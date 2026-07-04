import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui';

import { useProfile } from '@/features/profile';

function CheckIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
			<path strokeLinecap="round" strokeLinejoin="round" d="M3.333 8.667L6 11.333l6.667-6.666" />
		</svg>
	);
}

function CircleIcon({ className }: { className?: string }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
			<circle cx="8" cy="8" r="6.667" />
		</svg>
	);
}

function DashboardProfileCompletion() {
	const { profile, completion: completionPercentage } = useProfile();

	const hasPersonalDetails = Boolean(profile && profile.fullName && profile.email && profile.phone && profile.location);
	const hasSkills = Boolean(profile && profile.skills && profile.skills.length > 0);
	const hasExperience = Boolean(profile && profile.experience && profile.experience.length > 0);
	const hasEducation = Boolean(profile && profile.education && profile.education.length > 0);
	const hasResume = Boolean(profile && profile.resume && profile.resume.filename);
	const hasSocial = Boolean(profile && (profile.linkedin || profile.github || profile.portfolio));
	const hasAbout = Boolean(profile && profile.aboutMe && profile.aboutMe.trim().length > 0);

	const checklist = [
		{ label: 'Personal Details', completed: hasPersonalDetails },
		{ label: 'About Me', completed: hasAbout },
		{ label: 'Skills Added', completed: hasSkills },
		{ label: 'Experience Added', completed: hasExperience },
		{ label: 'Education Added', completed: hasEducation },
		{ label: 'Social Links Added', completed: hasSocial },
		{ label: 'Resume Uploaded', completed: hasResume },
	];

	const isComplete = completionPercentage === 100;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Profile Completion</CardTitle>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="mb-4 flex items-center justify-between">
					<span className="text-2xl font-bold text-text-primary">{completionPercentage}%</span>
					<span className="text-sm font-medium text-text-secondary">{isComplete ? 'Complete!' : 'Almost there!'}</span>
				</div>
				<div className="h-2 w-full overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin={0} aria-valuemax={100}>
					<div className="h-full bg-primary transition-all duration-500 ease-in-out" style={{ width: `${completionPercentage}%` }} />
				</div>
				<ul className="mt-6 flex flex-col gap-3" aria-label="Profile completion checklist">
					{checklist.map((item) => (
						<li key={item.label} className="flex items-center gap-3 text-sm">
							{item.completed ? (
								<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/20 text-success">
									<CheckIcon className="h-3 w-3" />
								</div>
							) : (
								<div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-muted">
									<CircleIcon className="h-4 w-4" />
								</div>
							)}
							<span className={item.completed ? 'text-text-primary' : 'text-text-secondary'}>
								{item.label}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}

export { DashboardProfileCompletion };
