import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from '@/features/auth';
import type { AppNotification, NotificationContextState } from './notification';
import { mockApi } from '@/shared/api/mockApi';

const NotificationContext = createContext<NotificationContextState | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
	const { currentUser, isAuthenticated } = useAuth();
	const [notifications, setNotifications] = useState<AppNotification[]>([]);

	const fetchNotifications = useCallback(async () => {
		if (isAuthenticated && currentUser) {
			try {
				const notifs = await mockApi.getNotifications(currentUser.id);
				setNotifications(notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
			} catch (e) {
				console.error(e);
			}
		} else {
			setNotifications([]);
		}
	}, [currentUser, isAuthenticated]);

	useEffect(() => {
		fetchNotifications();
		
		const handleSync = () => fetchNotifications();
		window.addEventListener('mock_db_updated', handleSync);
		return () => window.removeEventListener('mock_db_updated', handleSync);
	}, [fetchNotifications]);

	const addNotification = useCallback(
		async (notif: Omit<AppNotification, 'id' | 'read' | 'createdAt' | 'userId'>) => {
			if (!currentUser) return;
			await mockApi.addNotification(currentUser.id, notif.title, notif.message, notif.type);
			await fetchNotifications();
		},
		[currentUser, fetchNotifications]
	);

	const markAsRead = useCallback(async (id: string) => {
		await mockApi.markNotificationRead(id);
		await fetchNotifications();
	}, [fetchNotifications]);

	const markAllAsRead = useCallback(async () => {
		if (!currentUser) return;
		for (const n of notifications) {
			if (!n.read) {
				await mockApi.markNotificationRead(n.id);
			}
		}
		await fetchNotifications();
	}, [currentUser, notifications, fetchNotifications]);

	const clearAll = useCallback(async () => {
		if (!currentUser) return;
		await mockApi.clearAllNotifications(currentUser.id);
		await fetchNotifications();
	}, [currentUser, fetchNotifications]);

	const unreadCount = notifications.filter((n) => !n.read).length;

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				unreadCount,
				addNotification,
				markAsRead,
				markAllAsRead,
				clearAll,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
}

export function useNotifications() {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error('useNotifications must be used within a NotificationProvider');
	}
	return context;
}
