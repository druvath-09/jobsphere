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
import { useState } from 'react';

function ResetPasswordPage() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: ResetPasswordFormData) => {
		setIsLoading(true);
		console.log('Password reset for:', data);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsLoading(false);
		navigate(ROUTES.login);
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
