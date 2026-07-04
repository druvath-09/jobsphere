import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '@/features/notifications';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/constants/routes';

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  function formatTimeAgo(dateString: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function getIcon(type: string) {
    switch (type) {
      case 'success':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
        );
      case 'warning':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10 text-warning">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
        );
      case 'error':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error/10 text-error">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        );
    }
  }

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-text-secondary hover:text-text-primary"
        aria-label="Notifications"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white shadow-sm ring-2 ring-surface">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 origin-top-right rounded-xl border border-border bg-surface shadow-xl ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4 bg-surface-hover/30">
            <h3 className="text-base font-semibold text-text-primary">Notifications</h3>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs font-medium text-primary hover:text-primary-hover">
                    Mark all read
                  </button>
                )}
                <button onClick={clearAll} className="text-xs font-medium text-text-secondary hover:text-error transition-colors">
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 p-2">
            {notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-surface-hover flex items-center justify-center mb-3 text-text-secondary/50">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <p className="text-sm font-medium text-text-primary">All caught up!</p>
                <p className="text-xs text-text-secondary mt-1">Check back later for updates on your applications.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-1">
                {notifications.map((n) => (
                  <li 
                    key={n.id} 
                    className={cn(
                      "flex gap-3 rounded-lg p-3 transition-colors hover:bg-surface-hover cursor-pointer group",
                      !n.read ? "bg-primary/5" : ""
                    )}
                    onClick={() => {
                      if (!n.read) markAsRead(n.id);
                    }}
                  >
                    <div className="shrink-0 pt-0.5">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2 items-start mb-0.5">
                        <p className={cn("text-sm truncate", !n.read ? "font-semibold text-text-primary" : "font-medium text-text-primary")}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-text-secondary whitespace-nowrap pt-1 shrink-0">
                          {formatTimeAgo(n.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                    {!n.read && (
                      <div className="shrink-0 flex items-center pt-2">
                        <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer */}
          <div className="border-t border-border p-3 bg-surface-hover/30 text-center">
            <Link to={ROUTES.notifications} onClick={() => setIsOpen(false)} className="text-xs font-semibold text-primary hover:text-primary-hover inline-flex items-center gap-1">
              View all activity
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
