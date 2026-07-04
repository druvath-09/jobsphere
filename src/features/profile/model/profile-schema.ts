import { z } from 'zod';

export const experienceSchema = z.object({
	id: z.string(),
	title: z.string().min(2, 'Title is required'),
	company: z.string().min(2, 'Company is required'),
	startDate: z.string().min(1, 'Start date is required'),
	endDate: z.string().optional(),
	current: z.boolean(),
	description: z.string().optional(),
});

export const educationSchema = z.object({
	id: z.string(),
	school: z.string().min(2, 'School is required'),
	degree: z.string().min(2, 'Degree is required'),
	fieldOfStudy: z.string().min(2, 'Field of study is required'),
	startDate: z.string().min(1, 'Start date is required'),
	endDate: z.string().optional(),
});

export const resumeSchema = z.object({
	filename: z.string(),
	uploadedAt: z.string(),
});

export const profileSchema = z.object({
	userId: z.string(),
	fullName: z.string().min(2, 'Full name is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().optional(),
	location: z.string().optional(),
	headline: z.string().optional(),
	aboutMe: z.string().optional(),
	skills: z.array(z.string()),
	experience: z.array(experienceSchema),
	education: z.array(educationSchema),
	portfolio: z.string().url('Invalid URL').optional().or(z.literal('')),
	github: z.string().url('Invalid URL').optional().or(z.literal('')),
	linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
	resume: resumeSchema.optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
