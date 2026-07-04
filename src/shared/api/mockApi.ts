import type { ApplicationStatus } from '@/entities/application/model/application';

// Types for Mock API Data Structure
export interface MockApplication {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  appliedDate: string;
}

export interface MockNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

import { getJobById } from '@/entities/job';

export interface MockDatabase {
  version: number;
  applications: MockApplication[];
  savedJobs: string[]; // job IDs
  notifications: MockNotification[];
}

const STORAGE_KEY = 'jobsphere_mock_db';
const STORAGE_VERSION = 1;

function getInitialDB(): MockDatabase {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as MockDatabase;
      if (parsed.version === STORAGE_VERSION) {
        // Validate against current jobs to prevent orphaned references
        const validApplications = parsed.applications.filter(app => !!getJobById(app.jobId));
        const validSavedJobs = parsed.savedJobs.filter(jobId => !!getJobById(jobId));
        
        return {
          ...parsed,
          applications: validApplications,
          savedJobs: validSavedJobs,
        };
      }
    } catch (e) {
      console.error('Failed to parse mock DB', e);
    }
  }
  
  // Realistic initial statuses distribution
  const initialApplications: MockApplication[] = [
    { id: 'app-1', userId: '1', jobId: 'job-001', status: 'Applied', appliedDate: '2026-06-15T10:30:00Z' },
    { id: 'app-2', userId: '1', jobId: 'job-022', status: 'Reviewing', appliedDate: '2026-06-20T14:15:00Z' },
    { id: 'app-3', userId: '1', jobId: 'job-019', status: 'Interviewing', appliedDate: '2026-06-25T09:45:00Z' },
    { id: 'app-4', userId: '1', jobId: 'job-034', status: 'Rejected', appliedDate: '2026-05-10T11:20:00Z' },
    { id: 'app-5', userId: '1', jobId: 'job-042', status: 'Offered', appliedDate: '2026-05-15T11:20:00Z' },
  ];

  const initialDB: MockDatabase = {
    version: STORAGE_VERSION,
    applications: initialApplications.filter(app => !!getJobById(app.jobId)),
    savedJobs: ['job-010', 'job-015'].filter(id => !!getJobById(id)),
    notifications: [
      { id: 'notif-1', userId: '1', title: 'Google viewed your application.', message: 'Your application for Frontend Engineer was viewed.', type: 'info', read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: 'notif-2', userId: '1', title: 'Stripe posted a similar role.', message: 'A new role matching your profile was posted.', type: 'info', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() }
    ]
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDB));
  return initialDB;
}

// In-memory cache to sync with localStorage
let db: MockDatabase = getInitialDB();

function saveDB() {
  console.log('[DEBUG mockApi] Saving DB and dispatching mock_db_updated event');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  // Dispatch custom event so other providers can sync if they mount simultaneously
  window.dispatchEvent(new Event('mock_db_updated'));
  console.log('[DEBUG mockApi] Dispatch complete');
}

// Fake latency simulator
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Applications
  async getApplications(userId: string): Promise<MockApplication[]> {
    await delay(300);
    return db.applications.filter(a => a.userId === userId);
  },
  
  async applyJob(userId: string, jobId: string): Promise<MockApplication> {
    await delay(700);
    const existing = db.applications.find(a => a.userId === userId && a.jobId === jobId);
    if (existing) throw new Error('Already applied');
    
    const newApp: MockApplication = {
      id: `app-${Date.now()}`,
      userId,
      jobId,
      status: 'Applied',
      appliedDate: new Date().toISOString()
    };
    db.applications = [newApp, ...db.applications];
    saveDB();
    return newApp;
  },

  async withdrawApplication(userId: string, jobId: string): Promise<void> {
    await delay(400);
    db.applications = db.applications.filter(a => !(a.userId === userId && a.jobId === jobId));
    saveDB();
  },

  // Saved Jobs
  async getSavedJobs(_userId: string): Promise<string[]> {
    await delay(200);
    return [...db.savedJobs];
  },

  async saveJob(_userId: string, jobId: string): Promise<void> {
    await delay(400);
    if (!db.savedJobs.includes(jobId)) {
      db.savedJobs = [jobId, ...db.savedJobs];
      saveDB();
    }
  },

  async unsaveJob(_userId: string, jobId: string): Promise<void> {
    await delay(300);
    db.savedJobs = db.savedJobs.filter(id => id !== jobId);
    saveDB();
  },

  // Notifications
  async getNotifications(userId: string): Promise<MockNotification[]> {
    await delay(200);
    return db.notifications.filter(n => n.userId === userId);
  },

  async addNotification(userId: string, title: string, message: string, type: MockNotification['type'] = 'info'): Promise<void> {
    const notif: MockNotification = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    db.notifications = [notif, ...db.notifications];
    saveDB();
  },

  async markNotificationRead(id: string): Promise<void> {
    db.notifications = db.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    saveDB();
  },

  async clearAllNotifications(userId: string): Promise<void> {
    db.notifications = db.notifications.filter(n => n.userId !== userId);
    saveDB();
  }
};
