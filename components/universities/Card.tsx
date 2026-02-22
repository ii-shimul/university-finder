import Image from "next/image";
import { University } from "@/types/types";

const Card = ({ university }: { university: University }) => {
	return (
		<div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-xl border border-border-light dark:border-border-dark transition-all duration-300 group flex flex-col relative">
			<div className="absolute top-3 right-3 z-10">
				<label className="flex items-center space-x-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm">
					<input
						className="rounded text-primary focus:ring-0 w-3 h-3"
						type="checkbox"
					/>
					<span className="text-gray-600 dark:text-gray-300 font-medium">
						Compare
					</span>
				</label>
			</div>
			<div className="h-32 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-t-xl border-b border-gray-100 dark:border-gray-700 relative">
				<Image
					src={university.image}
					alt={`${university.name} logo`}
					unoptimized
					fill
					className="object-contain p-4"
				/>
			</div>
			<div className="p-5 grow flex flex-col">
				<div className="flex items-start justify-between mb-2">
					<div>
						<h3 className="font-bold text-lg text-secondary dark:text-white group-hover:text-primary transition-colors">
							{university.name}
						</h3>
						<div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
							<span className="material-icons text-sm mr-1">location_on</span>{" "}
							{university.location}, {university.country}
						</div>
					</div>
				</div>
				<div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
					<div className="flex justify-between">
						<span>World Rank:</span>
						<span className="font-semibold text-gray-800 dark:text-white">
							#{university.ranking}
						</span>
					</div>
					<div className="flex justify-between">
						<span>Tuition:</span>
						<span className="font-semibold text-gray-800 dark:text-white">
							${university.tuition_fee.toLocaleString()}/yr
						</span>
					</div>
					<div className="flex justify-between">
						<span>Acceptance:</span>
						<span className="font-semibold text-gray-800 dark:text-white">
							{university.acceptance_rate}%
						</span>
					</div>
				</div>
				<div className="mt-4 flex flex-wrap gap-2">
					{university.tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded font-medium"
						>
							{tag}
						</span>
					))}
					{university.scholarship_available && (
						<span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded font-medium">
							Scholarship
						</span>
					)}
				</div>
				<div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
					<button className="w-full py-2 rounded-lg border border-secondary text-secondary dark:border-white dark:text-white hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-secondary text-sm font-semibold transition-colors">
						View Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
