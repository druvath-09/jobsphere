import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useAuth } from '@/features/auth';
import type { AppNotification, NotificationContextState } from './notification';
import { getNotifications, saveNotifications } from './notification-storage';

const NotificationContext = createContext<NotificationContextState | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
	const { currentUser, isAuthenticated } = useAuth();
	const [notifications, setNotifications] = useState<AppNotification[]>([]);

	// Hydrate on mount or user change
	useEffect(() => {
		if (isAuthenticated && currentUser) {
			const allNotifs = getNotifications();
			const userNotifs = allNotifs.filter((n) => n.userId === currentUser.id);
			// Sort newest first
			setNotifications(userNotifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
		} else {
			setNotifications([]);
		}
	}, [currentUser, isAuthenticated]);

	const addNotification = useCallback(
		(notif: Omit<AppNotification, 'id' | 'read' | 'createdAt' | 'userId'>) => {
			if (!currentUser) return;
			const newNotif: AppNotification = {
				...notif,
				id: crypto.randomUUID(),
				userId: currentUser.id,
				read: false,
				createdAt: new Date().toISOString(),
			};

			const allNotifs = getNotifications();
			saveNotifications([...allNotifs, newNotif]);

			setNotifications((prev) => [newNotif, ...prev]);
		},
		[currentUser]
	);

	const markAsRead = useCallback((id: string) => {
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
		const allNotifs = getNotifications();
		saveNotifications(
			allNotifs.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	}, []);

	const markAllAsRead = useCallback(() => {
		if (!currentUser) return;
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
		
		const allNotifs = getNotifications();
		saveNotifications(
			allNotifs.map((n) => (n.userId === currentUser.id ? { ...n, read: true } : n))
		);
	}, [currentUser]);

	const unreadCount = notifications.filter((n) => !n.read).length;

	return (
		<NotificationContext.Provider
			value={{
				notifications,
				unreadCount,
				addNotification,
				markAsRead,
				markAllAsRead,
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
