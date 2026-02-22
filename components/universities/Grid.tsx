import { University } from "@/types/types";
import Card from "./Card";
import { getUniversities } from "@/lib/queries/universities";

const Grid = async () => {
	const universities = (await getUniversities()) as University[];
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{universities.map((uni) => (
				<Card key={uni.id} university={uni} />
			))}
		</div>
	);
};

export default Grid;
