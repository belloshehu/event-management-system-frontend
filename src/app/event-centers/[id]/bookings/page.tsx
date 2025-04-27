import EventCenterBookingList from "@/components/event-center/EventCenterBookingList";
import PageWrapper from "@/components/page/PageWrapper";
import Title from "@/components/Title";
import { useGetEventCenterBookings } from "@/hooks/service-hooks/event-center.hooks";

export default function EventCenterBookingsPage() {
  const { isLoading, data } = useGetEventCenterBookings({ filter: {} });

  return (
    <PageWrapper>
      <Title title="Bookings" />
      <EventCenterBookingList loadingState={isLoading} bookings={data?.data!} />
    </PageWrapper>
  );
}
