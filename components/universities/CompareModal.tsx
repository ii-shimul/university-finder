"use client";

import Image from "next/image";
import { University } from "@/types/types";

interface CompareModalProps {
	universities: [University, University];
	onClose: () => void;
}

const CompareModal = ({ universities, onClose }: CompareModalProps) => {
	const [uni1, uni2] = universities;

	return (
		<>
			{/* Modal Backdrop */}
			<div
				className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-40 transition-opacity"
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div className="relative w-full max-w-5xl bg-white dark:bg-[#1a120e] rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
					{/* Header */}
					<div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a120e] sticky top-0 z-10">
						<h2 className="text-2xl font-bold text-secondary dark:text-white tracking-tight">
							Compare Universities
						</h2>
						<button
							className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 cursor-pointer"
							onClick={onClose}
						>
							<span className="material-icons">close</span>
						</button>
					</div>

					{/* Scrollable Content */}
					<div className="overflow-y-auto flex-1">
						<div className="min-w-200">
							{/* University Headers */}
							<div className="grid grid-cols-[200px_1fr_1fr] bg-slate-50 dark:bg-[#23150f] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
								<div className="p-6 flex items-end pb-4">
									<span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
										Metric
									</span>
								</div>

								{/* University 1 Header */}
								<div className="p-6 flex flex-col items-center gap-3 border-l border-slate-200 dark:border-slate-800">
									<div className="w-20 h-20 rounded-full bg-white shadow-sm p-1 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700 relative">
										<Image
											src={uni1.image}
											alt={`${uni1.name} Logo`}
											fill
											sizes="80px"
											className="object-contain p-1"
										/>
									</div>
									<div className="text-center">
										<h3 className="text-xl font-bold text-secondary dark:text-white leading-tight mb-1">
											{uni1.name}
										</h3>
										<div className="flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
											<span className="material-icons text-[16px]">
												location_on
											</span>
											<span>
												{uni1.location}, {uni1.country}
											</span>
										</div>
									</div>
								</div>

								{/* University 2 Header */}
								<div className="p-6 flex flex-col items-center gap-3 border-l border-slate-200 dark:border-slate-800">
									<div className="w-20 h-20 rounded-full bg-white shadow-sm p-1 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700 relative">
										<Image
											src={uni2.image}
											alt={`${uni2.name} Logo`}
											fill
											sizes="80px"
											className="object-contain p-1"
										/>
									</div>
									<div className="text-center">
										<h3 className="text-xl font-bold text-secondary dark:text-white leading-tight mb-1">
											{uni2.name}
										</h3>
										<div className="flex items-center justify-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
											<span className="material-icons text-[16px]">
												location_on
											</span>
											<span>
												{uni2.location}, {uni2.country}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Comparison Rows */}
							<div className="divide-y divide-slate-100 dark:divide-slate-800">
								{/* World Ranking */}
								<CompareRow label="World Ranking">
									<RankBadge rank={uni1.ranking} highlight />
									<RankBadge
										rank={uni2.ranking}
										highlight={uni2.ranking < uni1.ranking}
									/>
								</CompareRow>

								{/* Established Year */}
								<CompareRow label="Established" striped>
									<span className="text-slate-800 dark:text-slate-200">
										{uni1.established_year}
									</span>
									<span className="text-slate-800 dark:text-slate-200">
										{uni2.established_year}
									</span>
								</CompareRow>

								{/* Tuition Fee */}
								<CompareRow label="Annual Tuition">
									<span className="text-slate-800 dark:text-slate-200 font-medium">
										${uni1.tuition_fee.toLocaleString()}
									</span>
									<span className="text-slate-800 dark:text-slate-200 font-medium">
										${uni2.tuition_fee.toLocaleString()}
									</span>
								</CompareRow>

								{/* Acceptance Rate */}
								<CompareRow label="Acceptance Rate" striped>
									<AcceptanceBar rate={uni1.acceptance_rate} />
									<AcceptanceBar rate={uni2.acceptance_rate} />
								</CompareRow>

								{/* Post-Study Work Visa */}
								<CompareRow label="Post-Study Visa">
									<BooleanIndicator value={uni1.post_study_work_visa} />
									<BooleanIndicator value={uni2.post_study_work_visa} />
								</CompareRow>

								{/* Scholarship */}
								<CompareRow label="Scholarships" striped>
									<BooleanIndicator value={uni1.scholarship_available} />
									<BooleanIndicator value={uni2.scholarship_available} />
								</CompareRow>

								{/* Climate */}
								<CompareRow label="Climate">
									<span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
										<span className="material-icons text-blue-400">
											thermostat
										</span>
										<span className="text-sm">{uni1.climate}</span>
									</span>
									<span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
										<span className="material-icons text-blue-400">
											thermostat
										</span>
										<span className="text-sm">{uni2.climate}</span>
									</span>
								</CompareRow>
							</div>
						</div>
					</div>

					{/* Footer Actions */}
					<div className="grid grid-cols-[200px_1fr_1fr] p-4 bg-white dark:bg-[#1a120e] border-t border-slate-200 dark:border-slate-800">
						<div className="hidden md:block" />
						<div className="px-4 border-l border-transparent md:border-slate-200 md:dark:border-slate-800">
							<button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group cursor-pointer">
								<span>Apply Now</span>
								<span className="material-icons group-hover:translate-x-1 transition-transform text-lg">
									arrow_forward
								</span>
							</button>
						</div>
						<div className="px-4 border-l border-transparent md:border-slate-200 md:dark:border-slate-800 mt-3 md:mt-0">
							<button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group cursor-pointer">
								<span>Apply Now</span>
								<span className="material-icons group-hover:translate-x-1 transition-transform text-lg">
									arrow_forward
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// Reusable row wrapper
function CompareRow({
	label,
	striped,
	children,
}: {
	label: string;
	striped?: boolean;
	children: [React.ReactNode, React.ReactNode];
}) {
	return (
		<div
			className={`grid grid-cols-[200px_1fr_1fr] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${
				striped ? "bg-slate-50/50 dark:bg-white/5" : ""
			}`}
		>
			<div className="px-6 py-4 flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
				{label}
			</div>
			<div className="px-6 py-4 flex items-center justify-center border-l border-slate-100 dark:border-slate-800">
				{children[0]}
			</div>
			<div className="px-6 py-4 flex items-center justify-center border-l border-slate-100 dark:border-slate-800">
				{children[1]}
			</div>
		</div>
	);
}

// Rank badge
function RankBadge({ rank, highlight }: { rank: number; highlight?: boolean }) {
	return (
		<span
			className={`inline-flex items-center px-3 py-1 rounded-full font-bold text-sm ${
				highlight ?
					"bg-secondary/10 text-secondary dark:text-primary dark:bg-primary/10"
				:	"bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
			}`}
		>
			#{rank}
		</span>
	);
}

// Acceptance rate bar
function AcceptanceBar({ rate }: { rate: number }) {
	const label =
		rate < 20 ? "Competitive"
		: rate < 50 ? "Moderate"
		: "Open";
	return (
		<div className="flex flex-col justify-center w-full max-w-50">
			<div className="flex justify-between text-xs mb-1.5 font-semibold">
				<span className="text-secondary dark:text-white">{label}</span>
				<span className="text-slate-500">{rate}%</span>
			</div>
			<div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
				<div
					className="h-full bg-primary rounded-full transition-all"
					style={{ width: `${rate}%` }}
				/>
			</div>
		</div>
	);
}

// Boolean check/cross indicator
function BooleanIndicator({ value }: { value: boolean }) {
	return (
		<span className="flex items-center gap-2">
			<span
				className={`material-icons ${
					value ?
						"text-green-600 dark:text-green-400"
					:	"text-red-500 dark:text-red-400"
				}`}
			>
				{value ? "check_circle" : "cancel"}
			</span>
			<span className="text-sm text-slate-800 dark:text-slate-200">
				{value ? "Yes" : "No"}
			</span>
		</span>
	);
}

export default CompareModal;
