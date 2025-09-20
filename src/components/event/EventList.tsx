"use client";
import Event from "@/components/event/Event";
import { useGetEvents } from "@/hooks/service-hooks/event.hook";
import NoEventDataCard from "./NoEventDataCard";
import { NoDataOptions } from "@/types/data.types";
import { cn } from "@/lib/utils";
import { EventSkeletonList } from "../skeletons/events/EventSkeleton";

export default function EventList({
  NoDataOptions,
  className,
}: {
  NoDataOptions?: NoDataOptions;
  className?: string;
}) {
  const { data, isLoading } = useGetEvents();

  if (isLoading) return <EventSkeletonList />;
  if (!data || data.data.length === 0)
    return <NoEventDataCard {...NoDataOptions} className="mx-auto my-20" />;
  return (
    <section
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5", className)}
    >
      {data.data?.map((event) => (
        <Event {...event} key={event._id} />
      ))}
    </section>
  );
}
