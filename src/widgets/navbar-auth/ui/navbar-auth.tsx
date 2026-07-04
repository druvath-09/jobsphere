'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/features/auth';
import { useProfile } from '@/features/profile';
import { useNotifications } from '@/features/notifications';
import { ROUTES } from '@/shared/constants/routes';
import { Button } from '@/shared/components/ui';
import { Link, useNavigate } from 'react-router-dom';

function NavbarAuth() {
	const { currentUser, isAuthenticated, logout } = useAuth();
	const { completion } = useProfile();
	const { unreadCount } = useNotifications();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleLogout = async () => {
		setIsOpen(false);
		await logout();
		navigate(ROUTES.home);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		function handleEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, []);

	if (isAuthenticated && currentUser) {
		const initials = currentUser.fullName.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
		
		const MenuItem = ({ icon, label, to, onClick, badge }: { icon: React.ReactNode, label: string, to?: string, onClick?: () => void, badge?: React.ReactNode }) => {
			const content = (
				<>
					<div className="flex items-center gap-3">
						<div className="text-text-secondary">{icon}</div>
						<span className="text-sm font-medium text-text-primary">{label}</span>
					</div>
					{badge && <div>{badge}</div>}
				</>
			);
			
			const className = "flex items-center justify-between w-full px-4 py-2.5 transition-colors hover:bg-surface-hover rounded-md focus:outline-none focus:bg-surface-hover";
			
			if (to) {
				return (
					<Link to={to} className={className} onClick={() => { setIsOpen(false); onClick?.(); }}>
						{content}
					</Link>
				);
			}
			
			return (
				<button type="button" onClick={() => { setIsOpen(false); onClick?.(); }} className={className}>
					{content}
				</button>
			);
		};

		return (
			<div className="relative flex items-center" ref={dropdownRef}>
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center gap-2 rounded-full p-1 pl-1 pr-3 hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					aria-haspopup="true"
					aria-expanded={isOpen}
				>
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-sm">
						{initials}
					</div>
					<svg className={`h-4 w-4 text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
					</svg>
				</button>

				{isOpen && (
					<div 
						className="absolute right-0 top-full mt-2 w-[340px] origin-top-right rounded-xl border border-border bg-surface p-2 shadow-xl ring-1 ring-black/5 focus:outline-none z-50 animate-in fade-in slide-in-from-top-2 duration-200"
					>
						{/* Header */}
						<div className="p-4 flex gap-4 items-center">
							<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white shadow-sm">
								{initials}
							</div>
							<div className="flex flex-col min-w-0">
								<h3 className="truncate text-base font-semibold text-text-primary">{currentUser.fullName}</h3>
								<p className="truncate text-sm text-text-secondary">{currentUser.email}</p>
								<div className="mt-2 flex flex-wrap gap-2">
									<span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
										Candidate
									</span>
									<span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
										🟢 Ready
									</span>
								</div>
							</div>
						</div>

						{/* Profile Completion CTA */}
						{completion < 100 && (
							<div className="mx-2 mb-2 p-3 bg-surface-hover rounded-lg border border-border">
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm font-semibold text-text-primary">Complete your profile</span>
									<span className="text-xs font-medium text-primary">{completion}%</span>
								</div>
								<div className="h-1.5 w-full rounded-full bg-border overflow-hidden mb-3">
									<div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${completion}%` }} />
								</div>
								<Link to={ROUTES.profile} onClick={() => setIsOpen(false)} className="block w-full text-center text-xs font-medium text-white bg-primary py-1.5 rounded-md hover:bg-primary-hover transition-colors">
									Complete Profile
								</Link>
							</div>
						)}

						<div className="my-1 border-t border-border mx-2"></div>

						{/* Quick Actions */}
						<div className="p-1 flex flex-col gap-0.5">
							<MenuItem 
								to={ROUTES.dashboard} 
								icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>} 
								label="Dashboard" 
							/>
							<MenuItem 
								to={ROUTES.profile} 
								icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} 
								label="My Profile" 
							/>
							<MenuItem 
								to={ROUTES.savedJobs} 
								icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>} 
								label="Saved Jobs" 
							/>
							<MenuItem 
								to={ROUTES.applications} 
								icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>} 
								label="Applications" 
							/>
							<MenuItem 
								to={ROUTES.notifications}
								icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>} 
								label="Notifications" 
								badge={unreadCount > 0 ? <span className="flex h-5 w-5 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white">{unreadCount}</span> : undefined}
							/>
							<MenuItem 
								icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>} 
								label="Settings" 
							/>
						</div>

						<div className="my-1 border-t border-border mx-2"></div>

						{/* Support */}
						<div className="p-1 flex flex-col gap-0.5">
							<MenuItem 
								icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>} 
								label="Help Center" 
							/>
							<MenuItem 
								icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>} 
								label="Contact Support" 
							/>
						</div>

						<div className="my-1 border-t border-border mx-2"></div>

						{/* Danger Zone */}
						<div className="p-1 flex flex-col gap-0.5">
							<button
								type="button"
								onClick={handleLogout}
								className="flex items-center gap-3 w-full px-4 py-2.5 transition-colors hover:bg-error/10 rounded-md focus:outline-none focus:bg-error/10 text-error group"
							>
								<svg className="h-5 w-5 text-error/80 group-hover:text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
								</svg>
								<span className="text-sm font-medium">Logout</span>
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<>
			<Link to={ROUTES.login}>
				<Button variant="ghost" size="sm" className="text-text-secondary font-medium">
					Login
				</Button>
			</Link>
			<Link to={ROUTES.register}>
				<Button variant="primary" size="sm">
					Register
				</Button>
			</Link>
		</>
	);
}

export { NavbarAuth };
