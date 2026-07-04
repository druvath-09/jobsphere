import { AuthProvider } from '@/features/auth';
import { SavedJobsProvider } from '@/entities/saved-job';
import { ApplicationProvider } from '@/entities/application';
import { type ReactNode } from 'react';

/**
 * A central provider component that wraps the entire application
 * with essential contexts, such as authentication and saved jobs.
 */
function AppProvider({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<SavedJobsProvider>
				<ApplicationProvider>{children}</ApplicationProvider>
			</SavedJobsProvider>
		</AuthProvider>
	);
}

export { AppProvider };
