export interface University {
	id: number;
	name: string;
	country: string;
	location: string;
	image: string;
	tuitionFee: number;
	ranking: number;
	establishedYear: number;
	postStudyWorkVisa: boolean;
	scholarshipAvailable: boolean;
	acceptanceRate: number;
	climate: "Cold" | "Mild" | "Warm" | "Temperate";
	tags: string[];
}
