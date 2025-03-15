"use client";
import Event from "@/components/event/Event";
import { useGetEvents } from "@/hooks/service-hooks/event.hook";

export default function EventList() {
  const { data, isLoading } = useGetEvents();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5">
      {data.data?.map((event) => (
        <Event {...event} key={event._id} />
      ))}
    </section>
  );
}
