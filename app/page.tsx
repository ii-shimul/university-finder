import FilterArea from "@/components/sections/FilterArea";
import Hero from "@/components/sections/Hero";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const params = await searchParams;
	return (
		<>
			<Hero />
			<FilterArea searchParams={params} />
		</>
	);
}
