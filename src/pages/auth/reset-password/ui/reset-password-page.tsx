'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/features/auth';
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
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { updateUserPassword } from '@/features/auth/model/store/mock-user-store';
import { AUTH_RESET_EMAIL_KEY } from '@/features/auth/model/constants/auth-constants';

function ResetPasswordPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
	});

	useEffect(() => {
		const email = sessionStorage.getItem(AUTH_RESET_EMAIL_KEY);
		if (!email) {
			navigate(ROUTES.forgotPassword, { replace: true });
		}
	}, [navigate]);

	const onSubmit = async (data: ResetPasswordFormData) => {
		setIsLoading(true);
		
		const email = sessionStorage.getItem(AUTH_RESET_EMAIL_KEY);
		if (!email) {
			setIsLoading(false);
			navigate(ROUTES.forgotPassword, { replace: true });
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 800));

		try {
			updateUserPassword(email, data.newPassword);
			sessionStorage.removeItem(AUTH_RESET_EMAIL_KEY);
			setIsLoading(false);
			navigate(ROUTES.login, { state: { message: 'Password reset successfully. Please log in.' } });
		} catch (error: any) {
			setIsLoading(false);
			setError('root', { message: error.message || 'Failed to reset password.' });
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold tracking-tight">
						Reset Your Password
					</CardTitle>
					<CardDescription>
						Choose a new password for your account.
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
							<label htmlFor="reset-newPassword" className="text-sm font-medium text-text-primary">
								New Password
							</label>
							<Input
								id="reset-newPassword"
								type="password"
								placeholder="••••••••"
								autoComplete="new-password"
								{...register('newPassword')}
								aria-invalid={!!errors.newPassword}
								aria-describedby={errors.newPassword ? 'reset-newPassword-error' : undefined}
							/>
							{errors.newPassword && (
								<p id="reset-newPassword-error" className="text-sm text-error" role="alert">
									{errors.newPassword.message}
								</p>
							)}
						</div>
						<div className="grid gap-1.5">
							<label htmlFor="reset-confirmPassword" className="text-sm font-medium text-text-primary">
								Confirm New Password
							</label>
							<Input
								id="reset-confirmPassword"
								type="password"
								placeholder="••••••••"
								autoComplete="new-password"
								{...register('confirmPassword')}
								aria-invalid={!!errors.confirmPassword}
								aria-describedby={errors.confirmPassword ? 'reset-confirmPassword-error' : undefined}
							/>
							{errors.confirmPassword && (
								<p id="reset-confirmPassword-error" className="text-sm text-error" role="alert">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
						<Button type="submit" className="w-full" loading={isLoading}>
							{isLoading ? 'Resetting...' : 'Reset Password'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export { ResetPasswordPage };
