import { Suspense } from "react";
import {
	getCountries,
	getLocations,
	getFilteredUniversities,
} from "@/lib/queries/filters";
import Sidebar from "../filters/Sidebar";
import Grid from "../universities/Grid";
import { FilterParams } from "@/types/types";

interface FilterAreaProps {
	searchParams: { [key: string]: string | undefined };
}

const FilterArea = async ({ searchParams }: FilterAreaProps) => {
	const countries = await getCountries();
	const locations = await getLocations(searchParams.country);

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
						<div className="flex items-center gap-3">
							<span className="text-sm text-gray-500 dark:text-gray-400">
								Sort by:
							</span>
							<select className="text-sm border-none bg-transparent font-semibold text-secondary dark:text-white focus:ring-0 cursor-pointer p-0 pr-6">
								<option>Relevance</option>
								<option>Ranking High to Low</option>
								<option>Tuition Low to High</option>
							</select>
						</div>
					</div>

					<Grid universities={universities} />

					{totalPages > 1 && (
						<div className="mt-10 flex justify-center">
							<nav className="flex items-center space-x-2">
								{page > 1 && (
									<a
										className="p-2 rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
										href={`?${new URLSearchParams({ ...(searchParams as Record<string, string>), page: String(page - 1) })}`}
									>
										<span className="material-icons text-sm">chevron_left</span>
									</a>
								)}
								{Array.from(
									{ length: Math.min(totalPages, 5) },
									(_, i) => i + 1,
								).map((p) => (
									<a
										key={p}
										className={`px-4 py-2 rounded-full text-sm font-medium ${
											p === page ?
												"bg-secondary text-white"
											:	"border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
										}`}
										href={`?${new URLSearchParams({ ...(searchParams as Record<string, string>), page: String(p) })}`}
									>
										{p}
									</a>
								))}
								{page < totalPages && (
									<a
										className="p-2 rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
										href={`?${new URLSearchParams({ ...(searchParams as Record<string, string>), page: String(page + 1) })}`}
									>
										<span className="material-icons text-sm">
											chevron_right
										</span>
									</a>
								)}
							</nav>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default FilterArea;
