'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData, useAuth } from '@/features/auth';
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
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
	const navigate = useNavigate();
	const { register: registerUser, isLoading } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			acceptTerms: false,
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		await registerUser(data.fullName, data.email, data.password);
		navigate(ROUTES.home);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold tracking-tight">
						Create an Account
					</CardTitle>
					<CardDescription>
						Join JobSphere to find your dream job today.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
						<div className="grid gap-1.5">
							<label htmlFor="reg-fullName" className="text-sm font-medium text-text-primary">
								Full Name
							</label>
							<Input
								id="reg-fullName"
								type="text"
								placeholder="John Doe"
								autoComplete="name"
								{...register('fullName')}
								aria-invalid={!!errors.fullName}
								aria-describedby={errors.fullName ? 'reg-fullName-error' : undefined}
							/>
							{errors.fullName && (
								<p id="reg-fullName-error" className="text-sm text-error" role="alert">
									{errors.fullName.message}
								</p>
							)}
						</div>
						<div className="grid gap-1.5">
							<label htmlFor="reg-email" className="text-sm font-medium text-text-primary">
								Email
							</label>
							<Input
								id="reg-email"
								type="email"
								placeholder="name@example.com"
								autoComplete="email"
								{...register('email')}
								aria-invalid={!!errors.email}
								aria-describedby={errors.email ? 'reg-email-error' : undefined}
							/>
							{errors.email && (
								<p id="reg-email-error" className="text-sm text-error" role="alert">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="grid gap-1.5">
							<label htmlFor="reg-password" className="text-sm font-medium text-text-primary">
								Password
							</label>
							<Input
								id="reg-password"
								type="password"
								placeholder="••••••••"
								autoComplete="new-password"
								{...register('password')}
								aria-invalid={!!errors.password}
								aria-describedby={errors.password ? 'reg-password-error' : undefined}
							/>
							{errors.password && (
								<p id="reg-password-error" className="text-sm text-error" role="alert">
									{errors.password.message}
								</p>
							)}
						</div>
						<div className="grid gap-1.5">
							<label htmlFor="reg-confirmPassword" className="text-sm font-medium text-text-primary">
								Confirm Password
							</label>
							<Input
								id="reg-confirmPassword"
								type="password"
								placeholder="••••••••"
								autoComplete="new-password"
								{...register('confirmPassword')}
								aria-invalid={!!errors.confirmPassword}
								aria-describedby={errors.confirmPassword ? 'reg-confirmPassword-error' : undefined}
							/>
							{errors.confirmPassword && (
								<p id="reg-confirmPassword-error" className="text-sm text-error" role="alert">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						{/* Accept Terms */}
						<div className="grid gap-1.5">
							<div className="flex items-start gap-2">
								<input
									id="reg-acceptTerms"
									type="checkbox"
									{...register('acceptTerms')}
									className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
									aria-invalid={!!errors.acceptTerms}
									aria-describedby={errors.acceptTerms ? 'reg-acceptTerms-error' : undefined}
								/>
								<label htmlFor="reg-acceptTerms" className="text-sm text-text-secondary leading-snug">
									I agree to the{' '}
									<a href="/terms" className="font-medium text-primary hover:underline">
										Terms of Service
									</a>{' '}
									and{' '}
									<a href="/privacy" className="font-medium text-primary hover:underline">
										Privacy Policy
									</a>
								</label>
							</div>
							{errors.acceptTerms && (
								<p id="reg-acceptTerms-error" className="text-sm text-error" role="alert">
									{errors.acceptTerms.message}
								</p>
							)}
						</div>

						<Button type="submit" className="w-full" loading={isLoading}>
							{isLoading ? 'Creating Account...' : 'Create Account'}
						</Button>
						<div className="text-center text-sm text-text-secondary">
							Already have an account?{' '}
							<Link
								to={ROUTES.login}
								className="font-medium text-primary hover:underline"
							>
								Login
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export { RegisterPage };
