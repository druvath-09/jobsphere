import type { UserProfile } from './profile';

export const PROFILE_STORAGE_KEY = 'jobsphere_profiles';

export function loadProfiles(): UserProfile[] {
	try {
		const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				return parsed;
			}
		}
	} catch (error) {
		console.error('Failed to load profiles from localStorage', error);
	}
	return [];
}

export function saveProfiles(profiles: UserProfile[]): void {
	try {
		localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
	} catch (error) {
		console.error('Failed to save profiles to localStorage', error);
	}
}

export function getProfile(userId: string): UserProfile | undefined {
	const profiles = loadProfiles();
	return profiles.find((p) => p.userId === userId);
}

export function updateProfileInStorage(updatedProfile: UserProfile): void {
	const profiles = loadProfiles();
	const index = profiles.findIndex((p) => p.userId === updatedProfile.userId);
	
	if (index >= 0) {
		profiles[index] = updatedProfile;
	} else {
		profiles.push(updatedProfile);
	}
	
	saveProfiles(profiles);
}
