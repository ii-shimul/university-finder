"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface PaginationProps {
	page: number;
	totalPages: number;
	cleanParams: Record<string, string>;
}

const Pagination = ({ page, totalPages, cleanParams }: PaginationProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const goToPage = (p: number) => {
		const params = new URLSearchParams(cleanParams);
		if (p > 1) {
			params.set("page", String(p));
		} else {
			params.delete("page");
		}
		startTransition(() => {
			router.replace(`/?${params.toString()}`, { scroll: false });
		});
	};

	return (
		<div
			className={`mt-10 flex justify-center transition-opacity ${isPending ? "opacity-60 pointer-events-none" : ""}`}
		>
			<nav className="flex items-center space-x-2">
				{page > 1 && (
					<button
						className="p-2 rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-center"
						onClick={() => goToPage(page - 1)}
					>
						<span className="material-icons text-sm">chevron_left</span>
					</button>
				)}
				{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
					(p) => (
						<button
							key={p}
							className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
								p === page ?
									"bg-secondary text-white"
								:	"border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
							}`}
							onClick={() => goToPage(p)}
						>
							{p}
						</button>
					),
				)}
				{page < totalPages && (
					<button
						className="p-2 rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-center"
						onClick={() => goToPage(page + 1)}
					>
						<span className="material-icons text-sm">chevron_right</span>
					</button>
				)}
			</nav>
		</div>
	);
};

export default Pagination;
