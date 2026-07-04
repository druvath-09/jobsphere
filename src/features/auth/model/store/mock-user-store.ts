import { type User } from '../types/auth-types';
import { AUTH_USERS_KEY } from '../constants/auth-constants';

export interface UserRecord extends User {
	password?: string | undefined;
}

const DEFAULT_SEED_USER: UserRecord = {
	id: '1',
	fullName: 'Demo User',
	email: 'demo@jobsphere.dev',
	password: 'password123',
};

/**
 * Initializes the mock user store if it doesn't exist.
 */
function initializeStore(): UserRecord[] {
	try {
		const stored = localStorage.getItem(AUTH_USERS_KEY);
		if (stored) {
			return JSON.parse(stored) as UserRecord[];
		}
	} catch (error) {
		console.error('Failed to parse mock users from localStorage', error);
	}
	// Seed if empty
	const initial = [DEFAULT_SEED_USER];
	localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(initial));
	return initial;
}

/**
 * Returns all registered users from the mock store.
 */
function getUsers(): UserRecord[] {
	return initializeStore();
}

/**
 * Saves all users to the mock store.
 */
function saveUsers(users: UserRecord[]): void {
	localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

/**
 * Finds a user by email.
 */
export function findUserByEmail(email: string): UserRecord | undefined {
	const users = getUsers();
	return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * Creates a new user in the mock store.
 * Throws an error if the email is already in use.
 */
export function createUser(fullName: string, email: string, password?: string): UserRecord {
	const users = getUsers();
	if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
		throw new Error('Email is already registered.');
	}

	const newUser: UserRecord = {
		id: `user-${Date.now()}`,
		fullName,
		email,
	};
	if (password !== undefined) {
		newUser.password = password;
	}

	users.push(newUser);
	saveUsers(users);
	return newUser;
}

/**
 * Updates the password for an existing user.
 * Throws an error if the user is not found.
 */
export function updateUserPassword(email: string, newPassword: string): void {
	const users = getUsers();
	const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
	
	if (userIndex === -1) {
		throw new Error('User not found.');
	}

	const user = users[userIndex];
	if (user) {
		user.password = newPassword;
	}
	saveUsers(users);
}
