import EventCenterBooking from "./EventCenterBooking";
import { EventCenterBookingType } from "@/types/event-center.types";
import { cn } from "@/lib/utils";

import { EventCenterBookingSkeletonList } from "../skeletons/event-center/BookingSkeleton";

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
  if (loadingState) return <EventCenterBookingSkeletonList />;

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
