"use client";
import { useGetEventCenters } from "@/hooks/service-hooks/event-center.hooks";
import EventCenter from "./EventCenter";

export default function EventCenterList() {
	const { data, isLoading } = useGetEventCenters();

	if (isLoading) return <div>Loading...</div>;
	if (!data) return <div>No data</div>;
	return (
		<section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
			{data.data?.map((eventCenter) => (
				<EventCenter {...eventCenter} key={eventCenter._id} />
			))}
		</section>
	);
}
