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

function ForgotPasswordPage() {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (data: ForgotPasswordFormData) => {
		setIsLoading(true);
		console.log('Password reset requested for:', data.email);
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsLoading(false);
		setIsSuccess(true);
	};

	if (isSuccess) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-background p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-bold tracking-tight">
							Check Your Email
						</CardTitle>
						<CardDescription>
							We&apos;ve sent a password reset link to your email address.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link to={ROUTES.login} className="block">
							<Button className="w-full">Back to Login</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

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
