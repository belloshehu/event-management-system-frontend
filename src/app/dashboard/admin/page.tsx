"use client";
import Title from "@/components/Title";
import EventCenterBookingList from "@/components/event-center/EventCenterBookingList";
import { useGetEventCenterBookings } from "@/hooks/service-hooks/event-center.hooks";

export default function AdminDashboardPage() {
  // Get all bookings for admin dashboard
  const { isLoading, data } = useGetEventCenterBookings({ filter: {} });
  return (
    <>
      <section className="w-full flex flex-col gap-2">
        <Title title="Bookings" />
        <div className="w-full shadow-sm p-2 md:p-5  rounded-md">
          <EventCenterBookingList loadingState={isLoading} bookings={data?.data!} />
        </div>
      </section>
    </>
  );
}
