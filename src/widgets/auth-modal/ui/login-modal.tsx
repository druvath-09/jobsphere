import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData, useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';
import {
	Button,
	Input,
} from '@/shared/components/ui';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
	const { login, isLoading } = useAuth();
	const [isDemoLoading, setIsDemoLoading] = useState(false);
	
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	});

	// Reset form when opened
	useEffect(() => {
		if (isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	if (!isOpen) return null;

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login(data.email, data.password, data.rememberMe);
			onSuccess?.();
			onClose();
		} catch (error: any) {
			setError('root', { message: error.message || 'Failed to login' });
		}
	};

	const onDemoLogin = async () => {
		try {
			setIsDemoLoading(true);
			await login('demo@jobsphere.dev', 'password123', true);
			onSuccess?.();
			onClose();
		} catch (error: any) {
			setError('root', { message: error.message || 'Demo login failed' });
		} finally {
			setIsDemoLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
			<div 
				className="absolute inset-0" 
				onClick={onClose}
				aria-hidden="true"
			/>
			<div className="relative w-full max-w-md bg-surface border border-border shadow-xl rounded-xl p-6 animate-in zoom-in-95 duration-200">
				<button 
					onClick={onClose}
					className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
					aria-label="Close"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
				</button>
				
				<div className="text-center mb-6">
					<h2 className="text-2xl font-bold tracking-tight text-text-primary">Sign In</h2>
					<p className="text-sm text-text-secondary mt-1">Please sign in to continue.</p>
				</div>
				
				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
					{errors.root && (
						<div className="rounded-md bg-error/10 p-3">
							<p className="text-sm font-medium text-error">{errors.root.message}</p>
						</div>
					)}
					<div className="grid gap-1.5">
						<label htmlFor="modal-login-email" className="text-sm font-medium text-text-primary">
							Email
						</label>
						<Input
							id="modal-login-email"
							type="email"
							placeholder="name@example.com"
							autoComplete="email"
							{...register('email')}
							aria-invalid={!!errors.email}
						/>
						{errors.email && (
							<p className="text-sm text-error" role="alert">
								{errors.email.message}
							</p>
						)}
					</div>
					<div className="grid gap-1.5">
						<div className="flex items-center justify-between">
							<label htmlFor="modal-login-password" className="text-sm font-medium text-text-primary">
								Password
							</label>
						</div>
						<Input
							id="modal-login-password"
							type="password"
							placeholder="••••••••"
							autoComplete="current-password"
							{...register('password')}
							aria-invalid={!!errors.password}
						/>
						{errors.password && (
							<p className="text-sm text-error" role="alert">
								{errors.password.message}
							</p>
						)}
					</div>

					<Button type="submit" className="w-full mt-2" loading={isLoading && !isDemoLoading}>
						{isLoading && !isDemoLoading ? 'Signing In...' : 'Sign In'}
					</Button>
					
					<div className="relative my-4">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t border-border"></span>
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-surface px-2 text-text-tertiary">Or</span>
						</div>
					</div>

					<Button 
						type="button" 
						variant="outline" 
						className="w-full" 
						onClick={onDemoLogin}
						loading={isDemoLoading}
					>
						Continue as Demo User
					</Button>
					
					<div className="text-center text-sm text-text-secondary mt-2">
						Don&apos;t have an account?{' '}
						<Link
							to={ROUTES.register}
							onClick={onClose}
							className="font-medium text-primary hover:underline"
						>
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
