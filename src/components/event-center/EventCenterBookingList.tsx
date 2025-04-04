import { useGetEventCenterBookings } from "@/hooks/service-hooks/event-center.hooks";
import { LoadingDialog } from "../LoadingDialog";
import EventCenterBooking from "./EventCenterBooking";

export default function EventCenterBookingList({}) {
  const { data, isLoading } = useGetEventCenterBookings();
  if (isLoading) return <LoadingDialog open={isLoading} />;
  if (!data) return <p>No bookings found</p>;
  if (data.data.length === 0) return <p>No bookings found</p>;
  return (
    <div className="flex flex-col gap-4 w-full">
      {data.data.map((booking) => (
        <EventCenterBooking {...booking} key={booking._id} />
      ))}
    </div>
  );
}
