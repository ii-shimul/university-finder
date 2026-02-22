
const Sidebar = () => {
  return (
		<aside className="w-full lg:w-1/4 shrink-0">
			<div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark sticky top-24 p-6 space-y-6">
				<div className="flex justify-between items-center mb-2">
					<h3 className="font-bold text-lg text-secondary dark:text-white flex items-center">
						<span className="material-icons mr-2 text-primary">tune</span>{" "}
						Filters
					</h3>
					<button className="text-xs text-primary hover:underline font-medium">
						Reset All
					</button>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Search University
					</label>
					<div className="relative">
						<span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
							<span className="material-icons text-lg">search</span>
						</span>
						<input
							className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white placeholder-gray-400"
							placeholder="e.g. Oxford, Harvard..."
							type="text"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Country
						</label>
						<select className="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-primary focus:border-primary dark:text-white">
							<option>United Kingdom</option>
							<option>USA</option>
							<option>Canada</option>
							<option>Australia</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Location
						</label>
						<select className="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-primary focus:border-primary dark:text-white">
							<option>Any Location</option>
							<option>London</option>
							<option>Manchester</option>
						</select>
					</div>
				</div>
				<div>
					<div className="flex justify-between text-sm mb-1">
						<label className="font-medium text-gray-700 dark:text-gray-300">
							Tuition Fee
						</label>
						<span className="text-primary font-bold">$10k - $50k</span>
					</div>
					<input
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
						max={100}
						min={0}
						type="range"
					/>
				</div>
				<div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
					<label className="flex items-center space-x-3 cursor-pointer group">
						<input
							className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary dark:bg-gray-800 dark:border-gray-600"
							type="checkbox"
						/>
						<span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
							Post-Study Work Visa
						</span>
					</label>
					<label className="flex items-center space-x-3 cursor-pointer group">
						<input
							defaultChecked
							className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary dark:bg-gray-800 dark:border-gray-600"
							type="checkbox"
						/>
						<span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
							Scholarship Available
						</span>
					</label>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Acceptance Rate
					</label>
					<div className="flex justify-between text-xs text-gray-500 mb-1">
						<span>Selective</span>
						<span>Open</span>
					</div>
					<input
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
						type="range"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Climate Preference
					</label>
					<select className="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-primary focus:border-primary dark:text-white">
						<option>No Preference</option>
						<option>Temperate</option>
						<option>Warm</option>
						<option>Cold</option>
					</select>
				</div>
				<button className="w-full bg-secondary text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition shadow">
					Apply Filters
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;