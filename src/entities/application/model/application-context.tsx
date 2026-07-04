import {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	useEffect,
	type ReactNode,
} from 'react';
import type { Application, ApplicationMock } from './application';
import { resolveApplication } from './application';
import { useAuth } from '@/features/auth';
import { mockApi } from '@/shared/api/mockApi';
import { useNotifications } from '@/features/notifications';
import { useToast } from '@/shared/components/ui/toast';
import { Link } from 'react-router-dom';
import { LoginModal } from '@/widgets/auth-modal';

export interface ApplicationContextType {
	applications: Application[];
	recentApplications: Application[];
	loading: boolean;
	isApplying: boolean; // Legacy
	applyingJobId: string | null;
	applyToJob: (jobId: string) => Promise<void>;
	withdrawApplication: (jobId: string) => Promise<void>;
	isApplied: (jobId: string) => boolean;
	getApplication: (jobId: string) => Application | undefined;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

export function ApplicationProvider({ children }: { children: ReactNode }) {
	const [allApplications, setAllApplications] = useState<ApplicationMock[]>([]);
	const [loading, setLoading] = useState(true);
	const [pendingApplyJobId, setPendingApplyJobId] = useState<string | null>(null);
	const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
	const { currentUser } = useAuth();
	const { addNotification } = useNotifications();
	const { toast } = useToast();

	const fetchApplications = useCallback(async () => {
		if (!currentUser) {
			setAllApplications([]);
			setLoading(false);
			return;
		}
		try {
			setLoading(true);
			const data = await mockApi.getApplications(currentUser.id);
			setAllApplications(data);
		} catch (error) {
			console.error('Failed to fetch applications', error);
		} finally {
			setLoading(false);
		}
	}, [currentUser]);

	useEffect(() => {
		fetchApplications();
		
		// Sync across tabs or providers
		const handleSync = () => fetchApplications();
		window.addEventListener('mock_db_updated', handleSync);
		return () => window.removeEventListener('mock_db_updated', handleSync);
	}, [fetchApplications]);

	const applications = useMemo(() => {
		if (!currentUser) return [];
		return allApplications
			.map(resolveApplication)
			.filter((app): app is Application => app !== null)
			.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
	}, [allApplications, currentUser]);

	const recentApplications = useMemo(() => {
		return applications.slice(0, 4);
	}, [applications]);

	const isApplied = useCallback(
		(jobId: string) => {
			if (!currentUser) return false;
			return applications.some((app) => app.jobId === jobId);
		},
		[applications, currentUser]
	);

	const applyToJob = useCallback(async (jobId: string) => {
		if (!currentUser) {
			setPendingApplyJobId(jobId);
			return;
		}

		if (isApplied(jobId)) {
			return;
		}

		if (applyingJobId === jobId) {
			return;
		}
		
		try {
			setApplyingJobId(jobId);
			await mockApi.applyJob(currentUser.id, jobId);
			
			// Job Title for Toast
			const jobDetails = resolveApplication({ id: '', userId: '', jobId, status: 'Applied', appliedDate: '' });
			const jobTitle = jobDetails?.job?.title || 'a job';
			const companyName = jobDetails?.job?.company || '';
			
			await fetchApplications();
			
			addNotification({
				title: 'Application Submitted',
				message: `You have successfully applied to ${jobTitle} at ${companyName}.`,
				type: 'success'
			});
			
			toast(
				<div className="flex flex-col gap-1">
					<span className="font-medium">✅ Application Submitted</span>
					<span className="text-sm font-medium">{jobTitle}</span>
					{companyName && <span className="text-sm text-text-secondary">{companyName}</span>}
					<Link to="/applications" className="text-primary hover:underline text-sm font-semibold mt-1 w-fit">
						View Applications →
					</Link>
				</div>,
				'success'
			);
		} catch (error) {
			console.error(error);
		} finally {
			setApplyingJobId(null);
		}
	}, [currentUser, isApplied, applyingJobId, addNotification, toast, fetchApplications]);

	// Auto-apply if there's a pending job ID and the user logs in
	useEffect(() => {
		if (currentUser && pendingApplyJobId) {
			applyToJob(pendingApplyJobId);
			setPendingApplyJobId(null);
		}
	}, [currentUser, pendingApplyJobId, applyToJob]);

	const withdrawApplication = useCallback(async (jobId: string) => {
		if (!currentUser) return;
		try {
			await mockApi.withdrawApplication(currentUser.id, jobId);
			await fetchApplications();
		} catch (e) {
			console.error(e);
		}
	}, [currentUser, fetchApplications]);

	const getApplication = useCallback(
		(jobId: string) => {
			if (!currentUser) return undefined;
			return applications.find((app) => app.jobId === jobId);
		},
		[applications, currentUser]
	);

	const value = useMemo(
		() => ({
			applications,
			recentApplications,
			loading,
			isApplying: false, // Legacy compatibility, not strictly needed if we update all
			applyingJobId,
			applyToJob,
			withdrawApplication,
			isApplied,
			getApplication,
		}),
		[applications, recentApplications, loading, applyingJobId, applyToJob, withdrawApplication, isApplied, getApplication]
	);

	return (
		<ApplicationContext.Provider value={value}>
			{children}
			<LoginModal 
				isOpen={!!pendingApplyJobId} 
				onClose={() => setPendingApplyJobId(null)} 
			/>
		</ApplicationContext.Provider>
	);
}

export function useApplications() {
	const context = useContext(ApplicationContext);
	if (!context) {
		throw new Error('useApplications must be used within an ApplicationProvider');
	}
	return context;
}
