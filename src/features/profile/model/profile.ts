export interface Experience {
	id: string;
	title: string;
	company: string;
	startDate: string;
	endDate?: string;
	current: boolean;
	description?: string;
}

export interface Education {
	id: string;
	school: string;
	degree: string;
	fieldOfStudy: string;
	startDate: string;
	endDate?: string;
}

export interface Resume {
	filename: string;
	uploadedAt: string; // ISO date string
}

export interface UserProfile {
	userId: string;
	fullName: string;
	email: string;
	phone?: string;
	location?: string;
	headline?: string;
	aboutMe?: string;
	skills: string[];
	experience: Experience[];
	education: Education[];
	portfolio?: string;
	github?: string;
	linkedin?: string;
	resume?: Resume;
}
