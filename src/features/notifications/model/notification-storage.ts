import type { AppNotification } from './notification';

const STORAGE_KEY = 'jobsphere.notifications';

export function getNotifications(): AppNotification[] {
	try {
		const data = localStorage.getItem(STORAGE_KEY);
		if (!data) return [];
		return JSON.parse(data);
	} catch (error) {
		console.error('Failed to parse notifications from localStorage:', error);
		return [];
	}
}

export function saveNotifications(notifications: AppNotification[]): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
	} catch (error) {
		console.error('Failed to save notifications to localStorage:', error);
	}
}
