import { z } from 'zod';

/* ------------------------------------------------------------------ */
/*         Reusable Fields                                            */
/* ------------------------------------------------------------------ */

const email = z
	.string({ error: 'Email is required' })
	.trim()
	.min(1, 'Email is required')
	.email('Please enter a valid email address');

const password = z
	.string({ error: 'Password is required' })
	.trim()
	.min(8, 'Password must be at least 8 characters long');

/* ------------------------------------------------------------------ */
/*         Validation Schemas                                         */
/* ------------------------------------------------------------------ */

/**
 * Schema for the Login form.
 */
export const loginSchema = z.object({
	email,
	password,
	rememberMe: z.boolean().optional(),
});

/**
 * Schema for the Register form.
 */
export const registerSchema = z
	.object({
		fullName: z
			.string({ error: 'Full name is required' })
			.trim()
			.min(1, 'Full name is required'),
		email,
		password,
		confirmPassword: password,
		acceptTerms: z.boolean().refine((val) => val === true, {
			message: 'You must accept the terms and conditions',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

/**
 * Schema for the Forgot Password form.
 */
export const forgotPasswordSchema = z.object({
	email,
});

/**
 * Schema for the Reset Password form.
 */
export const resetPasswordSchema = z
	.object({
		newPassword: password,
		confirmPassword: password,
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

/* ------------------------------------------------------------------ */
/*         TypeScript Types from Schemas                              */
/* ------------------------------------------------------------------ */

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
