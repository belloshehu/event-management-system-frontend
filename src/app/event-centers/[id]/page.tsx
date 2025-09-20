"use client";

import { anton } from "@/app/fonts";
import EventCenterBookingList from "@/components/event-center/EventCenterBookingList";
import EventItems from "@/components/event/event-items";
import PageWrapper from "@/components/page/PageWrapper";
import { EventCenterDetailSkeleton } from "@/components/skeletons/event-center/EventCenterDetailSkeleton";
import Title from "@/components/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useGetEventCenter,
  useGetEventCenterBookings,
} from "@/hooks/service-hooks/event-center.hooks";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventCenterDetailPage() {
  const [activeImage, setActiveImage] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useGetEventCenter(id as string);
  const { isLoading: loadingBookings, data: bookings } = useGetEventCenterBookings({
    filter: {},
  });

  useEffect(() => {
    if (data) {
      setActiveImage(data.data.images[0]);
    }
  }, [data]);

  if (isLoading) return <EventCenterDetailSkeleton />;
  if (!data)
    return (
      <div className="min-h-screen flex bg-slate-50 justify-center items-center">
        <h1 className="text-2xl">No data </h1>
      </div>
    );

  const {
    _id,
    name,
    images,
    supported_events_types,
    description,
    price,
    address,
    city,
    state,
    country,
    status,
  } = data.data;
  return (
    <PageWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <div className="flex flex-col items-start justify-start gap-5">
          <Image
            src={activeImage}
            alt={name}
            width={800}
            height={400}
            className="rounded-md"
          />
          <div className="flex items-center justify-start gap-5">
            {images.map((image, index) => (
              <button key={index} onClick={() => setActiveImage(image)}>
                <span className="sr-only">thumbnail</span>
                <Image
                  key={index}
                  src={image}
                  alt={name}
                  width={80}
                  height={80}
                  className={cn("w-20 h-20 rounded-md", {
                    "border-2 border-green-500": activeImage === image,
                  })}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-5">
          <h1 className="font-bold text-2xl md:text-4xl text-black ">{name}</h1>
          <h3 className={`${anton.className} text-xl relative`}>
            {price}
            <span
              className="text-sm absolute top-[-4] text-green-500 font-normal left-[110%]"
              aria-label="price"
            >
              Naira
            </span>
          </h3>
          <EventItems items={supported_events_types} />
          <p>{description}</p>
          <div className="flex items-center justify-start gap-1 bg-slate-100 p-2 rounded-md">
            <MapPin size={30} className="text-black" />
            <p className="text-sm" aria-label="address">
              {address}, {city}, {state}, {country}
            </p>
          </div>
          {status === "available" ? (
            <Link href={`/booking/event-center/${_id}`}>
              <Button className="w-full mt-2 bg-green-500 font-semibold">
                Proceed to booking
              </Button>
            </Link>
          ) : (
            <Badge className="flex justify-center">{status}</Badge>
          )}
        </div>
      </div>

      {/* Bookings */}
      <section className="w-full mt-5">
        <Title title="Bookings" className="mb-5 bg-green-100 p-2" />
        <EventCenterBookingList
          loadingState={loadingBookings}
          bookings={bookings?.data!}
        />
      </section>
    </PageWrapper>
  );
}
