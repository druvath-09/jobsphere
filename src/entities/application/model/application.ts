import { getJobById, type JobListing } from '@/entities/job';

export type ApplicationStatus = 'Applied' | 'Reviewing' | 'Interviewing' | 'Offered' | 'Rejected';

export interface ApplicationMock {
	id: string;
	userId: string;
	jobId: string;
	status: ApplicationStatus;
	appliedDate: string; // ISO format
}

export interface Application extends ApplicationMock {
	job: JobListing;
}

export const APPLICATION_MOCKS: ApplicationMock[] = [
	{
		id: 'app-001',
		userId: '1',
		jobId: 'job-001', // Frontend Engineer at Google
		status: 'Interviewing',
		appliedDate: '2026-06-15T10:30:00Z',
	},
	{
		id: 'app-002',
		userId: '1',
		jobId: 'job-022', // Android Engineer at Uber
		status: 'Reviewing',
		appliedDate: '2026-06-20T14:15:00Z',
	},
	{
		id: 'app-003',
		userId: '1',
		jobId: 'job-019', // Product Designer at Atlassian
		status: 'Applied',
		appliedDate: '2026-06-25T09:45:00Z',
	},
	{
		id: 'app-004',
		userId: '1',
		jobId: 'job-034', // Network Automation Engineer at Cisco
		status: 'Rejected',
		appliedDate: '2026-05-10T11:20:00Z',
	},
];

export function resolveApplication(app: ApplicationMock): Application | null {
	const job = getJobById(app.jobId);
	if (!job) {
		console.warn(`Job "${app.jobId}" not found for application "${app.id}". This application will be ignored.`);
		return null;
	}
	return {
		...app,
		job,
	};
}

