import {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
	type ReactNode,
} from 'react';
import type { UserProfile } from './profile';
import { updateProfileInStorage, loadProfiles, saveProfiles } from './profile-storage';
import { useAuth } from '@/features/auth';
import { useNotifications } from '@/features/notifications';

export interface ProfileContextType {
	profile: UserProfile | null;
	completion: number;
	loading: boolean;
	updateProfile: (data: Partial<UserProfile>) => void;
	uploadResume: (filename: string) => void;
	removeResume: () => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

function calculateCompletion(profile: UserProfile | null): number {
	if (!profile) return 0;

	let score = 0;

	// Personal Details -> 20%
	if (profile.fullName && profile.email && profile.phone && profile.location) {
		score += 20;
	} else if (profile.fullName && profile.email) {
		score += 10;
	}

	// Skills -> 15%
	if (profile.skills && profile.skills.length > 0) score += 15;

	// Experience -> 15%
	if (profile.experience && profile.experience.length > 0) score += 15;

	// Education -> 15%
	if (profile.education && profile.education.length > 0) score += 15;

	// Resume -> 15%
	if (profile.resume && profile.resume.filename) score += 15;

	// Social Links -> 10%
	if (profile.linkedin || profile.github || profile.portfolio) score += 10;

	// About Me -> 10%
	if (profile.aboutMe && profile.aboutMe.trim().length > 0) score += 10;

	return score;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
	const { currentUser, isAuthenticated } = useAuth();
	const { addNotification } = useNotifications();
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	// Load or create profile on auth change
	useEffect(() => {
		if (isAuthenticated && currentUser) {
			const allProfiles = loadProfiles();
			const existingProfile = allProfiles.find((p) => p.userId === currentUser.id);

			if (existingProfile) {
				setProfile(existingProfile);
			} else {
				// Create default profile for new user
				const newProfile: UserProfile = {
					userId: currentUser.id,
					fullName: currentUser.fullName,
					email: currentUser.email,
					skills: [],
					experience: [],
					education: [],
				};
				saveProfiles([...allProfiles, newProfile]);
				setProfile(newProfile);
			}
		} else {
			setProfile(null);
		}
		setLoading(false);
	}, [currentUser, isAuthenticated]);

	const updateProfile = useCallback(
		(updates: Partial<UserProfile>) => {
			if (!currentUser || !profile) return;
			const updatedProfile = { ...profile, ...updates };
			updateProfileInStorage(updatedProfile);
			setProfile(updatedProfile);
			addNotification({
				title: 'Profile Updated',
				message: 'Your profile has been successfully updated.',
				type: 'success',
			});
		},
		[currentUser, profile, addNotification]
	);

	const uploadResume = useCallback(
		(filename: string) => {
			if (!currentUser || !profile) return;
			const updatedProfile = {
				...profile,
				resume: {
					filename,
					uploadedAt: new Date().toISOString(),
				},
			};
			updateProfileInStorage(updatedProfile);
			setProfile(updatedProfile);
			addNotification({
				title: 'Resume Uploaded',
				message: 'Your resume has been successfully attached to your profile.',
				type: 'success',
			});
		},
		[currentUser, profile, addNotification]
	);

	const removeResume = useCallback(() => {
		if (!currentUser || !profile) return;
		const updatedProfile = { ...profile };
		delete updatedProfile.resume;
		updateProfileInStorage(updatedProfile);
		setProfile(updatedProfile);
	}, [currentUser, profile]);

	const completion = useMemo(() => calculateCompletion(profile), [profile]);

	const value = useMemo(
		() => ({
			profile,
			completion,
			loading,
			updateProfile,
			uploadResume,
			removeResume,
		}),
		[profile, completion, loading, updateProfile, uploadResume, removeResume]
	);

	return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
	const context = useContext(ProfileContext);
	if (!context) {
		throw new Error('useProfile must be used within a ProfileProvider');
	}
	return context;
}
