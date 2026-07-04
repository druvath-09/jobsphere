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
import { resolveApplication, APPLICATION_MOCKS } from './application';
import { useAuth } from '@/features/auth';
import { useNotifications } from '@/features/notifications';

export interface ApplicationContextType {
	applications: Application[];
	recentApplications: Application[];
	loading: boolean;
	applyToJob: (jobId: string) => void;
	withdrawApplication: (jobId: string) => void;
	isApplied: (jobId: string) => boolean;
	getApplication: (jobId: string) => Application | undefined;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

const STORAGE_KEY = 'jobsphere_applications';

export function ApplicationProvider({ children }: { children: ReactNode }) {
	const [allApplications, setAllApplications] = useState<ApplicationMock[]>([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();
	const { addNotification } = useNotifications();

	// Hydrate from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored) as ApplicationMock[];
				if (Array.isArray(parsed)) {
					setAllApplications(parsed);
				}
			} else {
				setAllApplications(APPLICATION_MOCKS);
				localStorage.setItem(STORAGE_KEY, JSON.stringify(APPLICATION_MOCKS));
			}
		} catch (error) {
			console.error('Failed to parse applications from localStorage', error);
			setAllApplications(APPLICATION_MOCKS);
		} finally {
			setLoading(false);
		}
	}, []);

	// Persist to localStorage whenever state changes
	useEffect(() => {
		if (!loading) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(allApplications));
		}
	}, [allApplications, loading]);

	// Expose only the current user's applications
	const applications = useMemo(() => {
		if (!currentUser) return [];
		return allApplications
			.filter((app) => app.userId === currentUser.id)
			.map(resolveApplication)
			.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
	}, [allApplications, currentUser]);

	const recentApplications = useMemo(() => {
		return applications.slice(0, 4);
	}, [applications]);

	const applyToJob = useCallback((jobId: string) => {
		if (!currentUser) return;
		
		const jobDetails = resolveApplication({ id: '', userId: '', jobId, status: 'Applied', appliedDate: '' });
		const jobTitle = jobDetails?.job?.title || 'a job';
		
		setAllApplications((prev) => {
			if (prev.some((app) => app.jobId === jobId && app.userId === currentUser.id)) return prev;
			const newApp: ApplicationMock = {
				id: `app-${Date.now()}-${jobId}`,
				userId: currentUser.id,
				jobId,
				status: 'Applied',
				appliedDate: new Date().toISOString(),
			};
			return [newApp, ...prev];
		});
		
		addNotification({
			title: 'Application Submitted',
			message: `You have successfully applied to ${jobTitle}.`,
			type: 'success'
		});
	}, [currentUser, addNotification]);

	const withdrawApplication = useCallback((jobId: string) => {
		if (!currentUser) return;
		setAllApplications((prev) => prev.filter((app) => !(app.jobId === jobId && app.userId === currentUser.id)));
	}, [currentUser]);

	const isApplied = useCallback(
		(jobId: string) => {
			if (!currentUser) return false;
			return applications.some((app) => app.jobId === jobId);
		},
		[applications, currentUser]
	);

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
			applyToJob,
			withdrawApplication,
			isApplied,
			getApplication,
		}),
		[applications, recentApplications, loading, applyToJob, withdrawApplication, isApplied, getApplication]
	);

	return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
}

export function useApplications() {
	const context = useContext(ApplicationContext);
	if (!context) {
		throw new Error('useApplications must be used within an ApplicationProvider');
	}
	return context;
}
