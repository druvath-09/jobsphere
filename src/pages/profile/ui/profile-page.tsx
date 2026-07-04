import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavbarAuth } from '@/widgets/navbar-auth';
import { MainLayout, Container } from '@/shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea, useToast } from '@/shared/components/ui';
import { useProfile, profileSchema, type ProfileFormValues, type UserProfile } from '@/features/profile';
import { ProfileSkills } from './profile-skills';
import { ProfileExperience } from './profile-experience';
import { ProfileEducation } from './profile-education';

function ProfilePage() {
	const { profile, updateProfile, uploadResume, removeResume } = useProfile();
	const { toast } = useToast();
	const [lastUpdated, setLastUpdated] = useState<string | null>(null);

	const methods = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: profile || {
			userId: '',
			fullName: '',
			email: '',
			skills: [],
			experience: [],
			education: [],
		},
	});

	const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = methods;

	useEffect(() => {
		if (profile) {
			reset(profile);
		}
	}, [profile, reset]);

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (isDirty) {
				e.preventDefault();
				e.returnValue = '';
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [isDirty]);

	const onSubmit = async (data: ProfileFormValues) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		updateProfile(data as unknown as Partial<UserProfile>);
		setLastUpdated(new Date().toLocaleTimeString());
		toast('Profile saved successfully!', 'success');
		reset(data); // reset form with new values so isDirty becomes false
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleCancel = () => {
		if (isDirty) {
			if (window.confirm('You have unsaved changes. Are you sure you want to discard them?')) {
				reset(profile || undefined);
			}
		} else {
			reset(profile || undefined);
		}
	};

	const handleResumeUpload = async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		uploadResume('resume.pdf');
		toast('Resume uploaded successfully!', 'success');
	};

	const handleRemoveResume = async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		removeResume();
		toast('Resume removed.', 'info');
	};

	if (!profile) return null;

	return (
		<MainLayout navbarProps={{ authSlot: <NavbarAuth /> }}>
			<section className="py-12 sm:py-16">
				<Container padding="md">
					<div className="mb-8 flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight text-text-primary">My Profile</h1>
							<p className="mt-2 text-text-secondary">Manage your personal information and resume.</p>
						</div>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Personal Details</CardTitle>
								</CardHeader>
								<CardContent className="grid gap-6 sm:grid-cols-2">
									<div className="sm:col-span-2">
										<p className="text-sm font-medium text-text-primary mb-2">Profile Photo</p>
										<div className="flex items-center gap-4">
											<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
												{profile.fullName.charAt(0)}
											</div>
											<Button type="button" variant="outline" size="sm">
												Upload New Photo
											</Button>
										</div>
									</div>

									<Input label="Full Name" {...register('fullName')} error={errors.fullName?.message || undefined} />
									<Input label="Email" type="email" {...register('email')} error={errors.email?.message || undefined} disabled />
									<Input label="Phone" {...register('phone')} error={errors.phone?.message || undefined} />
									<Input label="Location" {...register('location')} error={errors.location?.message || undefined} />
									<Input label="Headline" className="sm:col-span-2" {...register('headline')} error={errors.headline?.message || undefined} placeholder="e.g. Senior Frontend Engineer" />
									<Textarea label="About Me" className="sm:col-span-2" {...register('aboutMe')} error={errors.aboutMe?.message || undefined} rows={4} />
								</CardContent>
							</Card>

							<ProfileSkills />
							<ProfileExperience />
							<ProfileEducation />

							<Card>
								<CardHeader>
									<CardTitle>Social & Portfolio</CardTitle>
								</CardHeader>
								<CardContent className="grid gap-6 sm:grid-cols-2">
									<Input label="LinkedIn" type="url" {...register('linkedin')} error={errors.linkedin?.message || undefined} placeholder="https://linkedin.com/in/..." />
									<Input label="GitHub" type="url" {...register('github')} error={errors.github?.message || undefined} placeholder="https://github.com/..." />
									<Input label="Portfolio Website" type="url" className="sm:col-span-2" {...register('portfolio')} error={errors.portfolio?.message || undefined} placeholder="https://..." />
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Resume</CardTitle>
								</CardHeader>
								<CardContent>
									{profile.resume ? (
										<div className="flex items-center justify-between rounded-lg border border-border p-4">
											<div className="flex items-center gap-3">
												<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
													📄
												</div>
												<div>
													<p className="text-sm font-medium text-text-primary">{profile.resume.filename}</p>
													<p className="text-xs text-text-secondary">
														Uploaded on {new Date(profile.resume.uploadedAt).toLocaleDateString()}
													</p>
												</div>
											</div>
											<Button type="button" variant="outline" size="sm" onClick={handleRemoveResume}>
												Remove
											</Button>
										</div>
									) : (
										<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-10">
											<p className="text-sm text-text-secondary mb-4">No resume uploaded</p>
											<Button type="button" variant="secondary" onClick={handleResumeUpload}>
												Upload Resume (Mock)
											</Button>
										</div>
									)}
								</CardContent>
							</Card>

							<div className="flex flex-col items-end gap-2 mt-8">
								<div className="flex items-center gap-4">
									{isDirty && (
										<Button type="button" variant="ghost" onClick={handleCancel} disabled={isSubmitting}>
											Cancel
										</Button>
									)}
									<Button type="submit" variant="primary" size="lg" disabled={!isDirty || isSubmitting}>
										{isSubmitting ? (
											<>
												<svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
													<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
													<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
												</svg>
												Saving...
											</>
										) : (
											'Save Profile'
										)}
									</Button>
								</div>
								{lastUpdated && (
									<p className="text-xs text-text-secondary">Last updated: {lastUpdated}</p>
								)}
							</div>
						</form>
					</FormProvider>
				</Container>
			</section>
		</MainLayout>
	);
}

export { ProfilePage };
