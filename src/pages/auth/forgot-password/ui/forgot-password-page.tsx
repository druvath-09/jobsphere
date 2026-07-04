'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/features/auth';
import { ROUTES } from '@/shared/constants/routes';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
} from '@/shared/components/ui';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { findUserByEmail } from '@/features/auth/model/store/mock-user-store';
import { AUTH_RESET_EMAIL_KEY } from '@/features/auth/model/constants/auth-constants';

function ForgotPasswordPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (data: ForgotPasswordFormData) => {
		setIsLoading(true);
		
		await new Promise((resolve) => setTimeout(resolve, 800));
		
		const user = findUserByEmail(data.email);
		
		setIsLoading(false);
		
		if (!user) {
			setError('root', { message: 'We could not find an account with that email.' });
			return;
		}

		sessionStorage.setItem(AUTH_RESET_EMAIL_KEY, data.email);
		navigate(ROUTES.resetPassword);
	};



	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold tracking-tight">
						Forgot Your Password?
					</CardTitle>
					<CardDescription>
						Enter your email and we&apos;ll send you a reset link.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
						{errors.root && (
							<div className="rounded-md bg-error/10 p-3">
								<p className="text-sm font-medium text-error">{errors.root.message}</p>
							</div>
						)}
						<div className="grid gap-1.5">
							<label htmlFor="forgot-email" className="text-sm font-medium text-text-primary">
								Email
							</label>
							<Input
								id="forgot-email"
								type="email"
								placeholder="name@example.com"
								autoComplete="email"
								{...register('email')}
								aria-invalid={!!errors.email}
								aria-describedby={errors.email ? 'forgot-email-error' : undefined}
							/>
							{errors.email && (
								<p id="forgot-email-error" className="text-sm text-error" role="alert">
									{errors.email.message}
								</p>
							)}
						</div>
						<Button type="submit" className="w-full" loading={isLoading}>
							{isLoading ? 'Sending...' : 'Send Reset Link'}
						</Button>
						<div className="text-center">
							<Link
								to={ROUTES.login}
								className="text-sm font-medium text-primary hover:underline"
							>
								Back to Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export { ForgotPasswordPage };
