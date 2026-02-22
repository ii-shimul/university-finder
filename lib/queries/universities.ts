import { supabase } from "@/lib/supabase";

export async function getUniversities() {
	const { data, error } = await supabase.from("universities").select("*");
	if (error) throw error;
	return data;
}

export async function getUniversityById(id: number) {
	const { data, error } = await supabase
		.from("universities")
		.select("*")
		.eq("id", id)
		.single();
	if (error) throw error;
	return data;
}

export async function getUniversitiesByCountry(country: string) {
	const { data, error } = await supabase
		.from("universities")
		.select("*")
		.eq("country", country);
	if (error) throw error;
	return data;
}
