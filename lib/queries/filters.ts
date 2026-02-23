import { supabase } from "@/lib/supabase";
import { FilterParams } from "@/types/types";

export async function getFilteredUniversities(filters: FilterParams = {}) {
	const {
		search,
		country,
		location,
		tuitionMin,
		tuitionMax,
		postStudyWorkVisa,
		scholarshipAvailable,
		acceptanceRateMax,
		climate,
		sortBy = "relevance",
		page = 1,
		pageSize = 6,
	} = filters;

	let query = supabase.from("universities").select("*", { count: "exact" });

	// text search
	if (search) {
		query = query.or(`name.ilike.%${search}%,location.ilike.%${search}%`);
	}

	// country filter
	if (country && country !== "All") {
		query = query.eq("country", country);
	}

	// location filter
	if (location && location !== "Any Location") {
		query = query.ilike("location", `%${location}%`);
	}

	// tuition fee range
	if (tuitionMin !== undefined) {
		query = query.gte("tuition_fee", tuitionMin);
	}
	if (tuitionMax !== undefined) {
		query = query.lte("tuition_fee", tuitionMax);
	}

	// boolean filters
	if (postStudyWorkVisa) {
		query = query.eq("post_study_work_visa", true);
	}
	if (scholarshipAvailable) {
		query = query.eq("scholarship_available", true);
	}

	// acceptance rate
	if (acceptanceRateMax !== undefined) {
		query = query.lte("acceptance_rate", acceptanceRateMax);
	}

	// climate preference
	if (climate && climate !== "No Preference") {
		query = query.eq("climate", climate);
	}

	// sorting
	switch (sortBy) {
		case "ranking_asc":
			query = query.order("ranking", { ascending: true });
			break;
		case "ranking_desc":
			query = query.order("ranking", { ascending: false });
			break;
		case "tuition_asc":
			query = query.order("tuition_fee", { ascending: true });
			break;
		case "tuition_desc":
			query = query.order("tuition_fee", { ascending: false });
			break;
		default:
			query = query.order("ranking", { ascending: true });
			break;
	}

	// pagination
	const from = (page - 1) * pageSize;
	const to = from + pageSize - 1;
	query = query.range(from, to);

	const { data, error, count } = await query;

	if (error) throw error;

	return {
		universities: data,
		total: count ?? 0,
		page,
		pageSize,
		totalPages: Math.ceil((count ?? 0) / pageSize),
	};
}

// helper: get all distinct countries for the country dropdown
export async function getCountries() {
	const { data, error } = await supabase
		.from("universities")
		.select("country")
		.order("country", { ascending: true });

	if (error) throw error;

	const unique = [...new Set(data.map((d) => d.country))];
	return unique;
}

// helper: get all distinct locations for the location dropdown
export async function getLocations(country?: string) {
	let query = supabase
		.from("universities")
		.select("location")
		.order("location", { ascending: true });

	if (country && country !== "All") {
		query = query.eq("country", country);
	}

	const { data, error } = await query;

	if (error) throw error;

	const unique = [...new Set(data.map((d) => d.location))];
	return unique;
}
