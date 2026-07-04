import { MainLayout, Container } from '@/shared/components/layout';
import { NavbarAuth } from '@/widgets/navbar-auth';
import { Card, CardContent, Button } from '@/shared/components/ui';
import { useNotifications } from '@/features/notifications';

export function NotificationsPage() {
	const { notifications, markAsRead, markAllAsRead } = useNotifications();

	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<section className="py-12 sm:py-16 bg-surface-hover/30 min-h-screen">
				<Container padding="md" className="max-w-3xl">
					<div className="mb-8 flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight text-text-primary">Notifications</h1>
							<p className="mt-2 text-text-secondary">Stay updated on your job applications and profile activity.</p>
						</div>
						{notifications.some((n) => !n.read) && (
							<Button variant="outline" size="sm" onClick={markAllAsRead}>
								Mark all as read
							</Button>
						)}
					</div>

					<div className="flex flex-col gap-4">
						{notifications.length === 0 ? (
							<Card>
								<CardContent className="flex flex-col items-center justify-center py-16 text-center">
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-hover mb-4 text-text-secondary">
										<svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
										</svg>
									</div>
									<h3 className="text-lg font-medium text-text-primary">No notifications yet</h3>
									<p className="mt-1 text-sm text-text-secondary">We'll notify you when something important happens.</p>
								</CardContent>
							</Card>
						) : (
							notifications.map((notification) => (
								<Card 
									key={notification.id} 
									className={`transition-colors ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}
								>
									<CardContent className="flex items-start justify-between p-5">
										<div className="flex gap-4 items-start">
											<div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
											<div>
												<h3 className="text-base font-semibold text-text-primary">{notification.title}</h3>
												<p className="mt-1 text-sm text-text-secondary">{notification.message}</p>
												<p className="mt-2 text-xs text-text-secondary opacity-70">
													{new Date(notification.createdAt).toLocaleString()}
												</p>
											</div>
										</div>
										{!notification.read && (
											<Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
												Mark as read
											</Button>
										)}
									</CardContent>
								</Card>
							))
						)}
					</div>
				</Container>
			</section>
		</MainLayout>
	);
}
