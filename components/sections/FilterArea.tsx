import Sidebar from "../filters/Sidebar";
import Grid from "../universities/Grid";

const FilterArea = () => {
	return (
		<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-8 relative z-20">
			<div className="flex flex-col lg:flex-row gap-8">
				{/* sidebar for filter options */}
				<Sidebar />

				<div className="w-full lg:w-3/4">
					<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg px-4 py-3 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
						<p className="text-sm text-secondary dark:text-blue-100 font-medium">
							Showing <span className="font-bold">127</span> university results
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
          {/* university cards grid */}
					<Grid />

					<div className="mt-10 flex justify-center">
						<nav className="flex items-center space-x-2">
							<a
								className="p-2 rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
								href="#"
							>
								<span className="material-icons text-sm">chevron_left</span>
							</a>
							<a
								className="px-4 py-2 rounded-full bg-secondary text-white text-sm font-medium"
								href="#"
							>
								1
							</a>
							<a
								className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 text-sm font-medium"
								href="#"
							>
								2
							</a>
							<a
								className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 text-sm font-medium"
								href="#"
							>
								3
							</a>
							<span className="px-2 text-gray-400">...</span>
							<a
								className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 text-sm font-medium"
								href="#"
							>
								12
							</a>
							<a
								className="p-2 rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
								href="#"
							>
								<span className="material-icons text-sm">chevron_right</span>
							</a>
						</nav>
					</div>
				</div>
			</div>
		</main>
	);
};

export default FilterArea;
