import {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	type ReactNode,
} from 'react';
import { type AuthContextType, type User } from '../types/auth-types';

/* ------------------------------------------------------------------ */
/*  Context                                                          */
/* ------------------------------------------------------------------ */

const AuthContext = createContext<AuthContextType | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                         */
/* ------------------------------------------------------------------ */

interface AuthProviderProps {
	children: ReactNode;
}

/**
 * Provides authentication context to its children.
 * Manages user state and mock authentication logic.
 */
function AuthProvider({ children }: AuthProviderProps) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const isAuthenticated = useMemo(() => !!currentUser, [currentUser]);

	const login = useCallback(async (email: string) => {
		setIsLoading(true);
		console.log(`Attempting login for: ${email}`);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		const user: User = { id: '1', fullName: 'John Doe', email };
		setCurrentUser(user);
		setIsLoading(false);
		console.log('Login successful');
	}, []);

	const register = useCallback(async (fullName: string, email: string) => {
		setIsLoading(true);
		console.log(`Attempting registration for: ${fullName} <${email}>`);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		const user: User = { id: '1', fullName, email };
		setCurrentUser(user);
		setIsLoading(false);
		console.log('Registration successful');
	}, []);

	const logout = useCallback(async () => {
		setIsLoading(true);
		console.log('Attempting logout');
		await new Promise((resolve) => setTimeout(resolve, 500));
		setCurrentUser(null);
		setIsLoading(false);
		console.log('Logout successful');
	}, []);

	const value = useMemo(
		() => ({
			currentUser,
			isAuthenticated,
			isLoading,
			login,
			logout,
			register,
		}),
		[currentUser, isAuthenticated, isLoading, login, logout, register],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                             */
/* ------------------------------------------------------------------ */

/**
 * Custom hook to access the authentication context.
 * Throws an error if used outside of an AuthProvider.
 */
function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuth };
