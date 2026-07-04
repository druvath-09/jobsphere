import { AuthProvider } from '@/features/auth';
import { SavedJobsProvider } from '@/entities/saved-job';
import { ApplicationProvider } from '@/entities/application';
import { ProfileProvider } from '@/features/profile';
import { NotificationProvider } from '@/features/notifications';
import { ToastProvider } from '@/shared/components/ui';
import { type ReactNode } from 'react';

/**
 * A central provider component that wraps the entire application
 * with essential contexts, such as authentication and saved jobs.
 */
function AppProvider({ children }: { children: ReactNode }) {
	return (
		<ToastProvider>
			<AuthProvider>
				<NotificationProvider>
					<ProfileProvider>
						<SavedJobsProvider>
							<ApplicationProvider>{children}</ApplicationProvider>
						</SavedJobsProvider>
					</ProfileProvider>
				</NotificationProvider>
			</AuthProvider>
		</ToastProvider>
	);
}

export { AppProvider };
