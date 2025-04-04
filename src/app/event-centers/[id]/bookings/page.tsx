import EventCenterBookingList from "@/components/event-center/EventCenterBookingList";
import Title from "@/components/Title";
import { useGetEventCenterBookings } from "@/hooks/service-hooks/event-center.hooks";

export default function EventCenterBookingsPage() {
  const { isLoading, data } = useGetEventCenterBookings();

  return (
    <div className="flex items-center justify-start min-h-screen flex-col gap-10 p-5 py-10 md:py-20 md:px-20 bg-slate-50">
      <Title title="Bookings" />
      <EventCenterBookingList loadingState={isLoading} bookings={data?.data!} />
    </div>
  );
}
