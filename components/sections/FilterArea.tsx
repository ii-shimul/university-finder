import { Suspense } from "react";
import {
	getCountries,
	getLocations,
	getFilteredUniversities,
} from "@/lib/queries/filters";
import Sidebar from "../filters/Sidebar";
import SortDropdown from "../filters/SortDropdown";
import Pagination from "../filters/Pagination";
import Grid from "../universities/Grid";
import { FilterParams } from "@/types/types";

interface FilterAreaProps {
	searchParams: { [key: string]: string | undefined };
}

const FilterArea = async ({ searchParams }: FilterAreaProps) => {
	// run independent queries in parallel
	const [countries, locations] = await Promise.all([
		getCountries(),
		getLocations(searchParams.country),
	]);

	const filters: FilterParams = {
		search: searchParams.search,
		country: searchParams.country,
		location: searchParams.location,
		tuitionMax:
			searchParams.tuitionMax ? Number(searchParams.tuitionMax) : undefined,
		postStudyWorkVisa: searchParams.visa === "true",
		scholarshipAvailable: searchParams.scholarship === "true",
		acceptanceRateMax:
			searchParams.acceptanceMax ?
				Number(searchParams.acceptanceMax)
			:	undefined,
		climate: searchParams.climate,
		sortBy: (searchParams.sort as FilterParams["sortBy"]) ?? "relevance",
		page: searchParams.page ? Number(searchParams.page) : 1,
	};

	const { universities, total, page, totalPages } =
		await getFilteredUniversities(filters);

	// build clean pagination params
	const cleanParams: Record<string, string> = {};
	for (const [key, value] of Object.entries(searchParams)) {
		if (value !== undefined) cleanParams[key] = value;
	}

	return (
		<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-8 relative z-20">
			<div className="flex flex-col lg:flex-row gap-8">
				<Suspense fallback={null}>
					<Sidebar countries={countries} locations={locations} />
				</Suspense>

				<div className="w-full lg:w-3/4">
					<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-4 py-3 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
						<p className="text-sm text-secondary dark:text-blue-100 font-medium">
							Showing <span className="font-bold">{total}</span> university
							results
						</p>
						<SortDropdown
							currentSort={filters.sortBy ?? "relevance"}
							cleanParams={cleanParams}
						/>
					</div>

					<Grid universities={universities} />

					{totalPages > 1 && (
						<Pagination
							page={page}
							totalPages={totalPages}
							cleanParams={cleanParams}
						/>
					)}
				</div>
			</div>
		</main>
	);
};

export default FilterArea;
