export interface AppNotification {
	id: string;
	userId: string;
	title: string;
	message: string;
	type: 'success' | 'info' | 'warning';
	read: boolean;
	createdAt: string;
}

export interface NotificationContextState {
	notifications: AppNotification[];
	unreadCount: number;
	addNotification: (notification: Omit<AppNotification, 'id' | 'read' | 'createdAt' | 'userId'>) => void;
	markAsRead: (id: string) => void;
	markAllAsRead: () => void;
}
