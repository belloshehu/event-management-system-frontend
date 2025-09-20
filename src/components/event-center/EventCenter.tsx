'use client";';
import { MapIcon, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { EventCenterType } from "@/types/event-center.types";
import Link from "next/link";
import EventItems from "../event/event-items";
import { Badge } from "../ui/badge";

type EventCenterProps = EventCenterType;

export default function EventCenter({
  name,
  address,
  capacity,
  price,
  images,
  city,
  state,
  supported_events_types,
  _id,
  status,
}: EventCenterProps) {
  return (
    <Link href={`/event-centers/${_id}`}>
      <div className="h-full flex flex-col gap-3 p-3 rounded-md border-[0px] w-full bg-white shadow-sm hover:shadow-md hover:scale-95 transition-all duration-300">
        <Image
          src={images[0]}
          alt={name}
          width={400}
          height={200}
          className="object-cover rounded-md w-full"
        />

        <h1 className="font-medium text-xl text-green-700">{name}</h1>
        <h3 className="text-gray-700">{price} Naira</h3>

        {/* supported events */}
        <EventItems items={supported_events_types} />
        <div className="flex items-start justify-start flex-col gap-0 flex-1">
          <div className="flex items-center justify-start gap-1">
            <Users size={16} className="text-green-500" />
            <p className="text-sm" aria-label="capacity">
              {capacity} capacity
            </p>
          </div>
          <div className="flex items-center justify-start gap-1">
            <MapIcon size={16} className="text-green-500" />
            <p className="text-sm" aria-label="address">
              {address}, {city}, {state}
            </p>
          </div>
        </div>
        {status == "available" ? (
          <Link href={`/event-centers/${_id}`}>
            <Button className="w-full mt-2 bg-green-500">Book</Button>
          </Link>
        ) : (
          <Badge className="flex justify-center">{status}</Badge>
        )}
      </div>
    </Link>
  );
}
