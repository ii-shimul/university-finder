"use client";

import { useState } from "react";
import { useCompare } from "@/context/CompareContext";
import CompareModal from "./CompareModal";
import { University } from "@/types/types";

const CompareBar = () => {
	const { selected, clearAll } = useCompare();
	const [showModal, setShowModal] = useState(false);

	// don't show the bar if nothing is selected
	if (selected.length === 0) return null;

	return (
		<>
			{/* Floating bottom bar */}
			<div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-secondary dark:bg-gray-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-2xl flex items-center gap-3 sm:gap-6 border border-white/20 max-w-[95vw]">
				<div className="flex items-center gap-2">
					<span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
						{selected.length}
					</span>
					<span className="font-medium text-sm">
						{selected.length === 1 ?
							"University selected"
						:	"Universities selected"}
					</span>
				</div>

				<div className="h-4 w-px bg-white/20" />

				{/* Compare Now button — only enabled when 2 are selected */}
				<button
					className={`font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer ${
						selected.length === 2 ?
							"text-primary hover:text-white"
						:	"text-white/40 cursor-not-allowed"
					}`}
					onClick={() => {
						if (selected.length === 2) setShowModal(true);
					}}
					disabled={selected.length < 2}
				>
					Compare Now
				</button>

				{/* Close button — clears selection */}
				<button
					className="text-white/60 hover:text-white transition-colors cursor-pointer"
					onClick={clearAll}
				>
					<span className="material-icons text-base">close</span>
				</button>
			</div>

			{/* Compare Modal */}
			{showModal && selected.length === 2 && (
				<CompareModal
					universities={selected as [University, University]}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default CompareBar;
