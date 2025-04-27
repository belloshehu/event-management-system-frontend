"use client";
import { useGetEventCenters } from "@/hooks/service-hooks/event-center.hooks";
import EventCenter from "./EventCenter";
import NoEventCenterDataCard from "./NoEventCenterDataCard";
import { NoDataOptions } from "@/types/data.types";
import { EventCenterSkeletonList } from "../skeletons/event-center/EventCenterSkeleton";

export default function EventCenterList({
  NoDataOptions,
}: {
  NoDataOptions?: NoDataOptions;
}) {
  const { data, isLoading } = useGetEventCenters();

  if (isLoading) return <EventCenterSkeletonList />;
  if (!data || data.data.length === 0)
    return <NoEventCenterDataCard className="mx-auto my-20" {...NoDataOptions} />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5">
      {data.data?.map((eventCenter) => (
        <EventCenter {...eventCenter} key={eventCenter._id} />
      ))}
    </section>
  );
}
