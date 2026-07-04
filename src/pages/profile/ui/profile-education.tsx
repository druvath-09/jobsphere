import { useFormContext, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/shared/components/ui';
import type { ProfileFormValues } from '@/features/profile';

export function ProfileEducation() {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<ProfileFormValues>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'education',
	});

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Education</CardTitle>
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={() =>
						append({
							id: crypto.randomUUID(),
							school: '',
							degree: '',
							fieldOfStudy: '',
							startDate: '',
						})
					}
				>
					Add Education
				</Button>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				{fields.length === 0 && <p className="text-sm text-text-secondary">No education added yet.</p>}
				{fields.map((field, index) => {
					const errorForField = errors.education?.[index];
					return (
						<div key={field.id} className="relative rounded-lg border border-border p-4 sm:p-6 bg-surface-hover/30">
							<div className="absolute right-4 top-4">
								<button
									type="button"
									onClick={() => remove(index)}
									className="text-text-secondary hover:text-error focus:outline-none"
									aria-label="Remove education"
								>
									&times; Remove
								</button>
							</div>
							<div className="grid gap-4 sm:grid-cols-2 mt-4 sm:mt-0">
								<Input
									label="Institution"
									{...register(`education.${index}.school`)}
									error={errorForField?.school?.message || undefined}
								/>
								<Input
									label="Degree"
									{...register(`education.${index}.degree`)}
									error={errorForField?.degree?.message || undefined}
								/>
								<Input
									label="Field of Study"
									{...register(`education.${index}.fieldOfStudy`)}
									error={errorForField?.fieldOfStudy?.message || undefined}
								/>
								<div className="hidden sm:block"></div>
								<Input
									label="Start Year"
									type="month"
									{...register(`education.${index}.startDate`)}
									error={errorForField?.startDate?.message || undefined}
								/>
								<Input
									label="End Year (or expected)"
									type="month"
									{...register(`education.${index}.endDate`)}
									error={errorForField?.endDate?.message || undefined}
								/>
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
