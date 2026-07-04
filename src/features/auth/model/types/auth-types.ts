/**
 * Represents the authenticated user.
 */
export interface User {
	id: string;
	fullName: string;
	email: string;
}

/**
 * Defines the shape of the authentication context.
 */
export interface AuthContextType {
	/** The current authenticated user, or null if not logged in. */
	currentUser: User | null;
	/** True if the user is authenticated, false otherwise. */
	isAuthenticated: boolean;
	/** True while an async authentication operation is in progress. */
	isLoading: boolean;
	/** Logs the user in. */
	login: (email: string, password?: string, rememberMe?: boolean) => Promise<void>;
	/** Logs the user out. */
	logout: () => Promise<void>;
	/** Registers a new user. */
	register: (fullName: string, email: string, password?: string) => Promise<void>;
}
