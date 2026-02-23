import { Tables } from "./types_db";

export type University = Tables<"universities">;

export interface FilterParams {
	search?: string;
	country?: string;
	location?: string;
	tuitionMin?: number;
	tuitionMax?: number;
	postStudyWorkVisa?: boolean;
	scholarshipAvailable?: boolean;
	acceptanceRateMax?: number;
	climate?: string;
	sortBy?:
		| "relevance"
		| "ranking_asc"
		| "ranking_desc"
		| "tuition_asc"
		| "tuition_desc";
	page?: number;
	pageSize?: number;
}