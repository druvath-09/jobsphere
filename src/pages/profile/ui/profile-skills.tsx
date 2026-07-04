import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/shared/components/ui';
import type { ProfileFormValues } from '@/features/profile';

export function ProfileSkills() {
	const { watch, setValue } = useFormContext<ProfileFormValues>();
	const skills = watch('skills') || [];
	const [newSkill, setNewSkill] = useState('');

	const handleAddSkill = () => {
		const trimmed = newSkill.trim();
		if (trimmed && !skills.includes(trimmed)) {
			setValue('skills', [...skills, trimmed], { shouldDirty: true });
			setNewSkill('');
		}
	};

	const handleRemoveSkill = (skillToRemove: string) => {
		setValue(
			'skills',
			skills.filter((s) => s !== skillToRemove),
			{ shouldDirty: true }
		);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Skills</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 mb-4">
					<Input
						placeholder="Add a skill (e.g. React, TypeScript)"
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								handleAddSkill();
							}
						}}
						className="max-w-xs"
					/>
					<Button type="button" variant="secondary" onClick={handleAddSkill}>
						Add
					</Button>
				</div>
				<div className="flex flex-wrap gap-2">
					{skills.length === 0 && <p className="text-sm text-text-secondary">No skills added yet.</p>}
					{skills.map((skill) => (
						<div
							key={skill}
							className="flex items-center gap-2 rounded-full bg-surface-hover px-3 py-1 text-sm font-medium text-text-primary"
						>
							{skill}
							<button
								type="button"
								onClick={() => handleRemoveSkill(skill)}
								className="text-text-secondary hover:text-error focus:outline-none"
								aria-label={`Remove ${skill}`}
							>
								&times;
							</button>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
