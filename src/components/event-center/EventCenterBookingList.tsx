import EventCenterBooking from "./EventCenterBooking";
import { EventCenterBookingType } from "@/types/event-center.types";
import { cn } from "@/lib/utils";
import { LoadingDialog } from "../LoadingDialog";

interface EventCenterBookingListProps {
  bookings: EventCenterBookingType[];
  className?: string;
  loadingState: boolean;
}

export default function EventCenterBookingList({
  bookings,
  className,
  loadingState,
}: EventCenterBookingListProps) {
  if (loadingState)
    return <LoadingDialog loadingText="Loading bookings" open={loadingState} />;

  if (!bookings || bookings.length === 0)
    return (
      <div>
        <h1>No bookings </h1>
      </div>
    );
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {bookings.map((booking) => (
        <EventCenterBooking bookingData={booking} key={booking._id} />
      ))}
    </div>
  );
}
