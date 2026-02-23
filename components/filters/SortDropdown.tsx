"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface SortDropdownProps {
	currentSort: string;
	cleanParams: Record<string, string>;
}

const sortOptions = [
	{ value: "relevance", label: "Relevance" },
	{ value: "ranking_asc", label: "Ranking: Best First" },
	{ value: "ranking_desc", label: "Ranking: Last First" },
	{ value: "tuition_asc", label: "Tuition: Low to High" },
	{ value: "tuition_desc", label: "Tuition: High to Low" },
];

const SortDropdown = ({ currentSort, cleanParams }: SortDropdownProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<div
			className={`flex items-center gap-3 transition-opacity ${isPending ? "opacity-60" : ""}`}
		>
			<span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
			<select
				className="text-sm border-none bg-transparent font-semibold text-secondary dark:text-white focus:ring-0 cursor-pointer p-0 pr-6"
				defaultValue={currentSort}
				disabled={isPending}
				onChange={(e) => {
					const params = new URLSearchParams(cleanParams);
					if (e.target.value !== "relevance") {
						params.set("sort", e.target.value);
					} else {
						params.delete("sort");
					}
					params.delete("page");
					startTransition(() => {
						router.replace(`/?${params.toString()}`, { scroll: false });
					});
				}}
			>
				{sortOptions.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SortDropdown;
