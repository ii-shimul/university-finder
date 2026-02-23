"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

interface SidebarProps {
	countries: string[];
	locations: string[];
}

const Sidebar = ({ countries, locations }: SidebarProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	// initialize state from URL params
	const [search, setSearch] = useState(searchParams.get("search") ?? "");
	const [country, setCountry] = useState(searchParams.get("country") ?? "All");
	const [location, setLocation] = useState(
		searchParams.get("location") ?? "Any Location",
	);
	const [tuitionMax, setTuitionMax] = useState(
		Number(searchParams.get("tuitionMax")) || 100000,
	);
	const [postStudyWorkVisa, setPostStudyWorkVisa] = useState(
		searchParams.get("visa") === "true",
	);
	const [scholarshipAvailable, setScholarshipAvailable] = useState(
		searchParams.get("scholarship") === "true",
	);
	const [acceptanceRateMax, setAcceptanceRateMax] = useState(
		Number(searchParams.get("acceptanceMax")) || 100,
	);
	const [climate, setClimate] = useState(
		searchParams.get("climate") ?? "No Preference",
	);

	const applyFilters = useCallback(() => {
		const params = new URLSearchParams();

		if (search) params.set("search", search);
		if (country && country !== "All") params.set("country", country);
		if (location && location !== "Any Location")
			params.set("location", location);
		if (tuitionMax < 100000) params.set("tuitionMax", String(tuitionMax));
		if (postStudyWorkVisa) params.set("visa", "true");
		if (scholarshipAvailable) params.set("scholarship", "true");
		if (acceptanceRateMax < 100)
			params.set("acceptanceMax", String(acceptanceRateMax));
		if (climate && climate !== "No Preference") params.set("climate", climate);

		const query = params.toString();
		startTransition(() => {
			router.replace(query ? `/?${query}` : "/", { scroll: false });
		});
	}, [
		search,
		country,
		location,
		tuitionMax,
		postStudyWorkVisa,
		scholarshipAvailable,
		acceptanceRateMax,
		climate,
		router,
	]);

	const resetFilters = () => {
		setSearch("");
		setCountry("All");
		setLocation("Any Location");
		setTuitionMax(100000);
		setPostStudyWorkVisa(false);
		setScholarshipAvailable(false);
		setAcceptanceRateMax(100);
		setClimate("No Preference");
		startTransition(() => {
			router.replace("/", { scroll: false });
		});
	};

	// auto-apply on search
	const isFirstRender = useRef(true);
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		const timeout = setTimeout(() => {
			applyFilters();
		}, 400);
		return () => clearTimeout(timeout);
	}, [search, applyFilters]);

	return (
		<aside className="w-full lg:w-1/4 shrink-0">
			<div
				className={`bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark sticky top-24 p-6 space-y-6 transition-opacity duration-200 ${isPending ? "opacity-60 pointer-events-none" : ""}`}
			>
				<div className="flex justify-between items-center mb-2">
					<h3 className="font-bold text-lg text-secondary dark:text-white flex items-center">
						<span className="material-icons mr-2 text-primary">tune</span>{" "}
						Filters
					</h3>
					<button
						className="text-xs text-primary hover:underline font-medium"
						onClick={resetFilters}
					>
						Reset All
					</button>
				</div>

				{/* search */}
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
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

				{/* country & location */}
				<div className="grid grid-cols-1 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Country
						</label>
						<select
							className="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-primary focus:border-primary dark:text-white"
							value={country}
							onChange={(e) => {
								setCountry(e.target.value);
								setLocation("Any Location");
							}}
						>
							<option value="All">All Countries</option>
							{countries.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Location
						</label>
						<select
							className="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-primary focus:border-primary dark:text-white"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						>
							<option value="Any Location">Any Location</option>
							{locations.map((l) => (
								<option key={l} value={l}>
									{l}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* tuition fee range */}
				<div>
					<div className="flex justify-between text-sm mb-1">
						<label className="font-medium text-gray-700 dark:text-gray-300">
							Tuition Fee
						</label>
						<span className="text-primary font-bold">
							Up to ${(tuitionMax / 1000).toFixed(0)}k
						</span>
					</div>
					<input
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
						max={100000}
						min={0}
						step={5000}
						type="range"
						value={tuitionMax}
						onChange={(e) => setTuitionMax(Number(e.target.value))}
					/>
					<div className="flex justify-between text-xs text-gray-400 mt-1">
						<span>$0</span>
						<span>$100k</span>
					</div>
				</div>

				{/* boolean toggles */}
				<div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
					<label className="flex items-center space-x-3 cursor-pointer group">
						<input
							className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary dark:bg-gray-800 dark:border-gray-600"
							type="checkbox"
							checked={postStudyWorkVisa}
							onChange={(e) => setPostStudyWorkVisa(e.target.checked)}
						/>
						<span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
							Post-Study Work Visa
						</span>
					</label>
					<label className="flex items-center space-x-3 cursor-pointer group">
						<input
							className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary dark:bg-gray-800 dark:border-gray-600"
							type="checkbox"
							checked={scholarshipAvailable}
							onChange={(e) => setScholarshipAvailable(e.target.checked)}
						/>
						<span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
							Scholarship Available
						</span>
					</label>
				</div>

				{/* acceptance rate */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Acceptance Rate
					</label>
					<div className="flex justify-between text-xs text-gray-500 mb-1">
						<span>Selective</span>
						<span className="text-primary font-bold">
							Up to {acceptanceRateMax}%
						</span>
						<span>Open</span>
					</div>
					<input
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
						max={100}
						min={0}
						step={5}
						type="range"
						value={acceptanceRateMax}
						onChange={(e) => setAcceptanceRateMax(Number(e.target.value))}
					/>
				</div>

				{/* climate */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
						Climate Preference
					</label>
					<select
						className="w-full py-2 pl-3 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-primary focus:border-primary dark:text-white"
						value={climate}
						onChange={(e) => setClimate(e.target.value)}
					>
						<option>No Preference</option>
						<option>Temperate</option>
						<option>Warm</option>
						<option>Cold</option>
						<option>Mild</option>
					</select>
				</div>

				{/* apply button */}
				<button
					className="w-full bg-secondary text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition shadow cursor-pointer disabled:opacity-50"
					onClick={applyFilters}
					disabled={isPending}
				>
					{isPending ? "Filtering..." : "Apply Filters"}
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
