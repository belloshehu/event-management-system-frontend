"use client";
import Event from "@/components/event/Event";
import { useGetEvents } from "@/hooks/service-hooks/event.hook";
import NoEventDataCard from "./NoEventDataCard";
import { NoDataOptions } from "@/types/data.types";

export default function EventList({ NoDataOptions }: { NoDataOptions?: NoDataOptions }) {
  const { data, isLoading } = useGetEvents();

  if (isLoading) return <div>Loading...</div>;
  if (!data || data.data.length === 0)
    return <NoEventDataCard {...NoDataOptions} className="mx-auto my-20" />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5">
      {data.data?.map((event) => (
        <Event {...event} key={event._id} />
      ))}
    </section>
  );
}
