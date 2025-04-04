import { Calendar, Clock, MapIcon, Users } from "lucide-react";
import Image from "next/image";
import EventItems from "../event/event-items";
import { EventType } from "@/types/event.types";
import { formatDate } from "@/lib/timedate";

type EventProps = EventType;

export default function EventCenter({
  name,
  startDate,
  endDate,
  endTime,
  startTime,
  eventCenter,
  eventType,
  images,
}: EventProps) {
  return (
    <div className="flex flex-col gap-3 p-3 rounded-md border-[0px] w-full bg-white shadow-sm hover:shadow-md hover:scale-95 transition-all duration-300">
      <Image
        src={images[0]}
        alt={name}
        width={400}
        height={200}
        className="object-cover h-[300px] rounded-md w-full"
      />

      <h1 className="font-medium text-xl text-green-700">{name}</h1>
      {/* <h3 className="text-gray-700">{eventCenter.price} Naira</h3> */}

      {/* supported events */}
      <EventItems items={[eventType]} />
      <div className="flex items-start justify-start flex-col gap-0">
        <div className="flex items-center justify-start gap-1">
          <Users size={16} className="text-green-500" />
          <p className="text-sm" aria-label="capacity">
            {eventCenter.capacity} capacity
          </p>
        </div>
        <div className="flex items-center justify-start gap-1">
          <MapIcon size={16} className="text-green-500" />
          <p className="text-sm" aria-label="address">
            {eventCenter.address}, {eventCenter.city}, {eventCenter.state}
          </p>
        </div>

        {/* date and time */}
        <div className="flex flex-col items-start justify-start mt-2">
          <div className="flex gap-1 items-center justify-center">
            <Calendar size={16} className="text-green-500" />
            <small className="text-sm" aria-label="start date">
              {formatDate(startDate)}
            </small>
            -
            <small className="text-sm" aria-label="start date">
              {formatDate(endDate)}
            </small>
          </div>

          <div className="flex gap-1 items-center justify-center">
            <Clock size={16} className="text-green-500" />
            <p className="text-sm" aria-label="start time">
              {startTime}
            </p>
            -
            <p className="text-sm" aria-label="stop time">
              {endTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
