import { AuthProvider } from '@/features/auth';
import { type ReactNode } from 'react';

/**
 * A central provider component that wraps the entire application
 * with essential contexts, such as authentication.
 */
function AppProvider({ children }: { children: ReactNode }) {
	return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
