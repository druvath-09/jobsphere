import {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
	type ReactNode,
} from 'react';
import type { SavedJob } from './saved-job';
import { useAuth } from '@/features/auth';
import { useNotifications } from '@/features/notifications';
import { JOBS } from '@/entities/job';

export interface SavedJobsContextType {
	savedJobs: SavedJob[];
	savedJobIds: string[];
	loading: boolean;
	saveJob: (jobId: string) => void;
	unsaveJob: (jobId: string) => void;
	toggleSavedJob: (jobId: string) => void;
	isSaved: (jobId: string) => boolean;
}

const SavedJobsContext = createContext<SavedJobsContextType | null>(null);

const STORAGE_KEY = 'jobsphere_saved_jobs';

export function SavedJobsProvider({ children }: { children: ReactNode }) {
	const [allSavedJobs, setAllSavedJobs] = useState<SavedJob[]>([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();
	const { addNotification } = useNotifications();

	// Hydrate from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored) as SavedJob[];
				if (Array.isArray(parsed)) {
					setAllSavedJobs(parsed);
				}
			}
		} catch (error) {
			console.error('Failed to parse saved jobs from localStorage', error);
		} finally {
			setLoading(false);
		}
	}, []);

	// Persist to localStorage whenever state changes
	useEffect(() => {
		if (!loading) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(allSavedJobs));
		}
	}, [allSavedJobs, loading]);

	// Expose only the current user's saved jobs
	const savedJobs = useMemo(() => {
		if (!currentUser) return [];
		return allSavedJobs.filter((sj) => sj.userId === currentUser.id);
	}, [allSavedJobs, currentUser]);

	const saveJob = useCallback((jobId: string) => {
		if (!currentUser) return;
		
		const jobDetails = JOBS.find((j: { id: string; title: string }) => j.id === jobId);
		const jobTitle = jobDetails?.title || 'a job';
		
		setAllSavedJobs((prev) => {
			if (prev.some((sj) => sj.jobId === jobId && sj.userId === currentUser.id)) return prev;
			const newSavedJob: SavedJob = {
				id: `saved-${Date.now()}-${jobId}`,
				userId: currentUser.id,
				jobId,
				savedAt: new Date().toISOString(),
			};
			return [newSavedJob, ...prev]; // Prepend new saved jobs
		});
		
		addNotification({
			title: 'Job Saved',
			message: `You saved ${jobTitle}.`,
			type: 'info'
		});
	}, [currentUser, addNotification]);

	const unsaveJob = useCallback((jobId: string) => {
		if (!currentUser) return;
		setAllSavedJobs((prev) => prev.filter((sj) => !(sj.jobId === jobId && sj.userId === currentUser.id)));
	}, [currentUser]);

	const isSaved = useCallback(
		(jobId: string) => {
			if (!currentUser) return false;
			return savedJobs.some((sj) => sj.jobId === jobId);
		},
		[savedJobs, currentUser]
	);

	const toggleSavedJob = useCallback(
		(jobId: string) => {
			if (!currentUser) return;
			const jobDetails = JOBS.find((j: { id: string; title: string }) => j.id === jobId);
			const jobTitle = jobDetails?.title || 'a job';
			
			setAllSavedJobs((prev) => {
				const exists = prev.some((sj) => sj.jobId === jobId && sj.userId === currentUser.id);
				if (exists) {
					return prev.filter((sj) => !(sj.jobId === jobId && sj.userId === currentUser.id));
				} else {
					const newSavedJob: SavedJob = {
						id: `saved-${Date.now()}-${jobId}`,
						userId: currentUser.id,
						jobId,
						savedAt: new Date().toISOString(),
					};
					return [newSavedJob, ...prev];
				}
			});
			
			// If we are saving (not unsaving), trigger notification
			if (!isSaved(jobId)) {
				addNotification({
					title: 'Job Saved',
					message: `You saved ${jobTitle}.`,
					type: 'info'
				});
			}
		},
		[currentUser, addNotification, isSaved]
	);

	const savedJobIds = useMemo(() => savedJobs.map((sj) => sj.jobId), [savedJobs]);

	const value = useMemo(
		() => ({
			savedJobs,
			savedJobIds,
			loading,
			saveJob,
			unsaveJob,
			toggleSavedJob,
			isSaved,
		}),
		[savedJobs, savedJobIds, loading, saveJob, unsaveJob, toggleSavedJob, isSaved]
	);

	return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>;
}

export function useSavedJobs() {
	const context = useContext(SavedJobsContext);
	if (!context) {
		throw new Error('useSavedJobs must be used within a SavedJobsProvider');
	}
	return context;
}
