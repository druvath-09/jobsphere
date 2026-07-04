import {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
	type ReactNode,
} from 'react';
import { type AuthContextType, type User } from '../types/auth-types';
import { AUTH_USER_KEY, AUTH_REMEMBER_KEY } from '../constants/auth-constants';
import { findUserByEmail, createUser } from '../store/mock-user-store';

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
	const [isLoading, setIsLoading] = useState(true);

	// Hydrate session on startup
	useEffect(() => {
		try {
			const storedSessionUser = sessionStorage.getItem(AUTH_USER_KEY);
			const storedLocalUser = localStorage.getItem(AUTH_USER_KEY);
			
			if (storedSessionUser) {
				setCurrentUser(JSON.parse(storedSessionUser));
			} else if (storedLocalUser) {
				setCurrentUser(JSON.parse(storedLocalUser));
			}
		} catch (error) {
			console.error('Failed to parse stored user session', error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const isAuthenticated = useMemo(() => !!currentUser, [currentUser]);

	const login = useCallback(async (email: string, password?: string, rememberMe?: boolean) => {
		setIsLoading(true);
		
		// Simulate network request
		await new Promise((resolve) => setTimeout(resolve, 800));
		
		const userRecord = findUserByEmail(email);
		
		if (!userRecord || userRecord.password !== password) {
			setIsLoading(false);
			throw new Error('Invalid email or password.');
		}

		const user: User = { 
			id: userRecord.id, 
			fullName: userRecord.fullName, 
			email: userRecord.email 
		};
		
		setCurrentUser(user);

		if (rememberMe) {
			localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
			localStorage.setItem(AUTH_REMEMBER_KEY, 'true');
		} else {
			sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
			localStorage.removeItem(AUTH_USER_KEY);
			localStorage.removeItem(AUTH_REMEMBER_KEY);
		}

		setIsLoading(false);
	}, []);

	const register = useCallback(async (fullName: string, email: string, password?: string) => {
		setIsLoading(true);
		
		// Simulate network request
		await new Promise((resolve) => setTimeout(resolve, 800));

		try {
			// This will throw if the email is already in use
			const userRecord = createUser(fullName, email, password);
			
			const user: User = { 
				id: userRecord.id, 
				fullName: userRecord.fullName, 
				email: userRecord.email 
			};
			
			setCurrentUser(user);
			sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
			
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			throw error;
		}
	}, []);

	const logout = useCallback(async () => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 300));
		
		setCurrentUser(null);
		localStorage.removeItem(AUTH_USER_KEY);
		localStorage.removeItem(AUTH_REMEMBER_KEY);
		sessionStorage.removeItem(AUTH_USER_KEY);
		
		setIsLoading(false);
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
