import { useFormContext, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@/shared/components/ui';
import type { ProfileFormValues } from '@/features/profile';

export function ProfileExperience() {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext<ProfileFormValues>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'experience',
	});

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Experience</CardTitle>
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={() =>
						append({
							id: crypto.randomUUID(),
							title: '',
							company: '',
							startDate: '',
							current: false,
						})
					}
				>
					Add Experience
				</Button>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				{fields.length === 0 && <p className="text-sm text-text-secondary">No experience added yet.</p>}
				{fields.map((field, index) => {
					const errorForField = errors.experience?.[index];
					return (
						<div key={field.id} className="relative rounded-lg border border-border p-4 sm:p-6 bg-surface-hover/30">
							<div className="absolute right-4 top-4">
								<button
									type="button"
									onClick={() => remove(index)}
									className="text-text-secondary hover:text-error focus:outline-none"
									aria-label="Remove experience"
								>
									&times; Remove
								</button>
							</div>
							<div className="grid gap-4 sm:grid-cols-2 mt-4 sm:mt-0">
								<Input
									label="Job Title"
									{...register(`experience.${index}.title`)}
									error={errorForField?.title?.message || undefined}
								/>
								<Input
									label="Company"
									{...register(`experience.${index}.company`)}
									error={errorForField?.company?.message || undefined}
								/>
								<Input
									label="Start Date"
									type="month"
									{...register(`experience.${index}.startDate`)}
									error={errorForField?.startDate?.message || undefined}
								/>
								<Input
									label="End Date"
									type="month"
									{...register(`experience.${index}.endDate`)}
									error={errorForField?.endDate?.message || undefined}
								/>
								<div className="sm:col-span-2 flex items-center gap-2">
									<input
										type="checkbox"
										id={`current-${field.id}`}
										{...register(`experience.${index}.current`)}
										className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
									/>
									<label htmlFor={`current-${field.id}`} className="text-sm font-medium text-text-primary">
										I currently work here
									</label>
								</div>
								<Textarea
									label="Description"
									className="sm:col-span-2"
									rows={3}
									{...register(`experience.${index}.description`)}
									error={errorForField?.description?.message || undefined}
								/>
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
