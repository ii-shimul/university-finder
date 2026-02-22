import { University } from "@/lib/types";
import Card from "./Card";
import universities from "@/uni.json";

const Grid = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{(universities as University[]).map((uni) => (
				<Card key={uni.id} university={uni} />
			))}
		</div>
	);
};

export default Grid;
