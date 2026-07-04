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
import { useToast } from '@/shared/components/ui/toast';
import { Link } from 'react-router-dom';
import { mockApi } from '@/shared/api/mockApi';
import { LoginModal } from '@/widgets/auth-modal';

export interface SavedJobsContextType {
	savedJobs: SavedJob[];
	savedJobIds: string[];
	loading: boolean;
	isSaving: boolean; // Legacy
	savingJobId: string | null;
	saveJob: (jobId: string) => Promise<void>;
	unsaveJob: (jobId: string) => Promise<void>;
	toggleSavedJob: (jobId: string) => Promise<void>;
	isSaved: (jobId: string) => boolean;
}

const SavedJobsContext = createContext<SavedJobsContextType | null>(null);

export function SavedJobsProvider({ children }: { children: ReactNode }) {
	const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [savingJobId, setSavingJobId] = useState<string | null>(null);
	const [pendingSaveJobId, setPendingSaveJobId] = useState<string | null>(null);
	const { currentUser } = useAuth();
	const { addNotification } = useNotifications();
	const { toast } = useToast();

	const fetchSavedJobs = useCallback(async () => {
		if (!currentUser) {
			setSavedJobIds([]);
			setLoading(false);
			return;
		}
		try {
			setLoading(true);
			const ids = await mockApi.getSavedJobs(currentUser.id);
			setSavedJobIds(ids);
		} catch (error) {
			console.error('Failed to fetch saved jobs', error);
		} finally {
			setLoading(false);
		}
	}, [currentUser]);

	useEffect(() => {
		fetchSavedJobs();
		
		const handleSync = () => fetchSavedJobs();
		window.addEventListener('mock_db_updated', handleSync);
		return () => window.removeEventListener('mock_db_updated', handleSync);
	}, [fetchSavedJobs]);

	const savedJobs = useMemo(() => {
		if (!currentUser) return [];
		return savedJobIds.map(jobId => ({
			id: `saved-${jobId}`,
			userId: currentUser.id,
			jobId,
			savedAt: new Date().toISOString()
		}));
	}, [savedJobIds, currentUser]);

	const isSaved = useCallback(
		(jobId: string) => {
			return savedJobIds.includes(jobId);
		},
		[savedJobIds]
	);

	const saveJob = useCallback(async (jobId: string) => {
		if (!currentUser) {
			setPendingSaveJobId(jobId);
			return;
		}

		if (isSaved(jobId)) {
			return;
		}

		if (savingJobId === jobId) {
			return;
		}
		
		try {
			setSavingJobId(jobId);
			await mockApi.saveJob(currentUser.id, jobId);
			await fetchSavedJobs();
			
			const jobDetails = JOBS.find((j: { id: string; title: string; company: string }) => j.id === jobId);
			const jobTitle = jobDetails?.title || 'a job';
			const companyName = jobDetails?.company || '';
			
			addNotification({
				title: 'Job Saved',
				message: `You saved ${jobTitle} at ${companyName}.`,
				type: 'info'
			});
			
			toast(
				<div className="flex flex-col gap-1">
					<span className="font-medium">⭐ Job Saved</span>
					<span className="text-sm font-medium">{jobTitle}</span>
					{companyName && <span className="text-sm text-text-secondary">{companyName}</span>}
					<Link to="/saved-jobs" className="text-primary hover:underline text-sm font-semibold mt-1 w-fit">
						View Saved Jobs →
					</Link>
				</div>,
				'success'
			);
		} catch (error) {
			console.error(error);
		} finally {
			setSavingJobId(null);
		}
	}, [currentUser, isSaved, savingJobId, fetchSavedJobs, addNotification, toast]);

	// Auto-save if there's a pending job ID and the user logs in
	useEffect(() => {
		if (currentUser && pendingSaveJobId) {
			saveJob(pendingSaveJobId);
			setPendingSaveJobId(null);
		}
	}, [currentUser, pendingSaveJobId, saveJob]);

	const unsaveJob = useCallback(async (jobId: string) => {
		if (!currentUser) return;
		if (!isSaved(jobId)) return;
		if (savingJobId === jobId) return;

		try {
			setSavingJobId(jobId);
			await mockApi.unsaveJob(currentUser.id, jobId);
			await fetchSavedJobs();
		} catch (error) {
			console.error(error);
		} finally {
			setSavingJobId(null);
		}
	}, [currentUser, isSaved, savingJobId, fetchSavedJobs]);

	const toggleSavedJob = useCallback(
		async (jobId: string) => {
			if (!currentUser) {
				setPendingSaveJobId(jobId);
				return;
			}
			if (savingJobId === jobId) return;

			if (isSaved(jobId)) {
				await unsaveJob(jobId);
			} else {
				await saveJob(jobId);
			}
		},
		[currentUser, isSaved, savingJobId, saveJob, unsaveJob]
	);

	const value = useMemo(
		() => ({
			savedJobs,
			savedJobIds,
			loading,
			isSaving: false, // Legacy
			savingJobId,
			saveJob,
			unsaveJob,
			toggleSavedJob,
			isSaved,
		}),
		[savedJobs, savedJobIds, loading, savingJobId, saveJob, unsaveJob, toggleSavedJob, isSaved]
	);

	return (
		<SavedJobsContext.Provider value={value}>
			{children}
			<LoginModal 
				isOpen={!!pendingSaveJobId} 
				onClose={() => setPendingSaveJobId(null)} 
			/>
		</SavedJobsContext.Provider>
	);
}

export function useSavedJobs() {
	const context = useContext(SavedJobsContext);
	if (!context) {
		throw new Error('useSavedJobs must be used within a SavedJobsProvider');
	}
	return context;
}
