import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface Toast {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info';
}

interface ToastContextType {
	toast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const toast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
		const id = Math.random().toString(36).substring(2, 9);
		setToasts((prev) => [...prev, { id, message, type }]);

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 3000);
	}, []);

	return (
		<ToastContext.Provider value={{ toast }}>
			{children}
			<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
				{toasts.map((t) => (
					<div
						key={t.id}
						className={cn(
							'flex items-center rounded-lg px-4 py-3 shadow-lg transition-all animate-in slide-in-from-bottom-5',
							t.type === 'success' && 'bg-success/10 text-success border border-success/20',
							t.type === 'error' && 'bg-error/10 text-error border border-error/20',
							t.type === 'info' && 'bg-surface text-text-primary border border-border'
						)}
					>
						{t.type === 'success' && (
							<svg className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
							</svg>
						)}
						<span className="text-sm font-medium">{t.message}</span>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
}
