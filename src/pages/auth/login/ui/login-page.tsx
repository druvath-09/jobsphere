'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData, useAuth } from '@/features/auth';
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
import { Link, useNavigate, useLocation } from 'react-router-dom';

function LoginPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { login, isLoading } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		await login(data.email, data.password);
		// Redirect to the page they were trying to visit, or home
		const from = (location.state as { from?: Location })?.from?.pathname || ROUTES.home;
		navigate(from, { replace: true });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold tracking-tight">
						Login to JobSphere
					</CardTitle>
					<CardDescription>
						Enter your credentials to access your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
						<div className="grid gap-1.5">
							<label htmlFor="login-email" className="text-sm font-medium text-text-primary">
								Email
							</label>
							<Input
								id="login-email"
								type="email"
								placeholder="name@example.com"
								autoComplete="email"
								{...register('email')}
								aria-invalid={!!errors.email}
								aria-describedby={errors.email ? 'login-email-error' : undefined}
							/>
							{errors.email && (
								<p id="login-email-error" className="text-sm text-error" role="alert">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="grid gap-1.5">
							<div className="flex items-center justify-between">
								<label htmlFor="login-password" className="text-sm font-medium text-text-primary">
									Password
								</label>
								<Link
									to={ROUTES.forgotPassword}
									className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
								>
									Forgot Password?
								</Link>
							</div>
							<Input
								id="login-password"
								type="password"
								placeholder="••••••••"
								autoComplete="current-password"
								{...register('password')}
								aria-invalid={!!errors.password}
								aria-describedby={errors.password ? 'login-password-error' : undefined}
							/>
							{errors.password && (
								<p id="login-password-error" className="text-sm text-error" role="alert">
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Remember me */}
						<div className="flex items-center gap-2">
							<input
								id="login-remember"
								type="checkbox"
								{...register('rememberMe')}
								className="h-4 w-4 rounded border-border text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
							/>
							<label htmlFor="login-remember" className="text-sm text-text-secondary">
								Remember me
							</label>
						</div>

						<Button type="submit" className="w-full" loading={isLoading}>
							{isLoading ? 'Signing In...' : 'Sign In'}
						</Button>
						<div className="text-center text-sm text-text-secondary">
							Don&apos;t have an account?{' '}
							<Link
								to={ROUTES.register}
								className="font-medium text-primary hover:underline"
							>
								Register
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export { LoginPage };
