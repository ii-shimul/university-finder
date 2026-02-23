"use client";

import { University } from "@/types/types";
import { CompareProvider } from "@/context/CompareContext";
import CompareBar from "./CompareBar";
import Card from "./Card";

interface GridProps {
	universities: University[];
}

const Grid = ({ universities }: GridProps) => {
	return (
		<CompareProvider>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{universities.length > 0 ?
					universities.map((uni) => <Card key={uni.id} university={uni} />)
				:	<div className="col-span-full text-center py-16">
						<span className="material-icons text-6xl text-gray-300 dark:text-gray-600 mb-4 block">
							search_off
						</span>
						<p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
							No universities found
						</p>
						<p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
							Try adjusting your filters
						</p>
					</div>
				}
			</div>
			<CompareBar />
		</CompareProvider>
	);
};

export default Grid;
