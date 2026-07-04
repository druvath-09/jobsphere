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
							<Card className="overflow-hidden border-border/60">
								<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none opacity-50"></div>
								<CardContent className="flex flex-col items-center justify-center py-16 text-center relative z-10">
									<div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-sm border border-border text-primary mb-5">
										<svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
											<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-text-primary mb-2">You're all caught up!</h3>
									<p className="mt-1 text-sm text-text-secondary max-w-sm">We'll notify you when employers review your applications, send interview requests, or when similar jobs are posted.</p>
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
