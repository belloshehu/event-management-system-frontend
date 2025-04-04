import { cn } from "@/lib/utils";
import { EventCenterBookingType } from "@/types/event-center.types";
import Image from "next/image";
import TimeDisplay from "../TimeDisplay";
import DateDisplay from "../DateDisplay";
import { House } from "lucide-react";
import Link from "next/link";

interface EventCenterBookingProps {
  className?: string;
  bookingData: EventCenterBookingType;
}

export default function EventCenterBooking({
  bookingData: { _id, event, event_center, payment_currency, payment_amount },
  className,
}: EventCenterBookingProps) {
  return (
    <Link href={`/event-centers/${event_center._id}/bookings/${_id}`}>
      <div
        className={cn(
          "flex gap-4 w-fit hover:scale-105 duration-200 transition-all",
          className
        )}
      >
        <Image
          src={event.images[0]}
          alt={event.name}
          width={200}
          height={200}
          className="object-cover h-[120px] w-[120px] md:h-[150px] md:w-[150px] rounded-md"
        />
        <div className="flex flex-col items-start justify-start gap-0">
          <h3 className="font-medium ">{event.name}</h3>
          <div className="flex gap-1">
            <House size={16} className="text-green-500" />
            <p className="text-sm">{event_center.name}</p>
          </div>
          <TimeDisplay startTime={event.startTime} endTime={event.endTime} />
          <DateDisplay startDate={event.startDate} endDate={event.endDate} />
          <div>
            <h2>
              {payment_amount} <span>{payment_currency}</span>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
