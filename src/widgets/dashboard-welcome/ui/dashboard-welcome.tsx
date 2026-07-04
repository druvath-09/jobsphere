import { useAuth } from '@/features/auth';

function DashboardWelcome() {
	const { currentUser } = useAuth();
	
	if (!currentUser) return null;

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	const initials = getInitials(currentUser.fullName);

	return (
		<section aria-label="Welcome section" className="mb-8 flex items-center gap-4">
			<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white shadow-sm">
				{initials}
			</div>
			<div>
				<h1 className="text-2xl font-semibold text-text-primary tracking-tight sm:text-3xl">
					Welcome back, {currentUser.fullName}!
				</h1>
				<p className="mt-1 text-sm text-text-secondary">
					Here is what is happening with your job search today.
				</p>
			</div>
		</section>
	);
}

export { DashboardWelcome };
