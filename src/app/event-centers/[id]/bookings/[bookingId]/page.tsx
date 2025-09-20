"use client";
import DateDisplay from "@/components/DateDisplay";
import EntertainerList from "@/components/entertainer/EntertainerList";
import { LoadingDialog } from "@/components/LoadingDialog";
import PageWrapper from "@/components/page/PageWrapper";
import TimeDisplay from "@/components/TimeDisplay";
import Title from "@/components/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetEventCenterBookingById } from "@/hooks/service-hooks/event-center.hooks";
import { useLoading } from "@/hooks/use-loading";
import useSession from "@/lib/session/use-session";
import { cn } from "@/lib/utils";
import { Drum, House, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventCenterBookingDetailPage() {
  const [activeImage, setActiveImage] = useState("");
  const [activeImageEventCenter, setActiveImageEventCenter] = useState("");

  const { id, bookingId } = useParams();
  const { data, isLoading } = useGetEventCenterBookingById({
    bookingId: bookingId as string,
    eventCenterId: id as string,
  });

  const { getLoadingText } = useLoading();
  const {
    session: {
      user: { role, _id: userId },
    },
  } = useSession();

  useEffect(() => {
    if (data) {
      setActiveImage(data.data.event.images[0]);
      setActiveImageEventCenter(data.data.event_center.images[0]);
    }
  }, [data]);

  if (isLoading)
    return (
      <LoadingDialog
        open={isLoading}
        loadingText={getLoadingText([{ message: "Loading booking", state: isLoading }])}
      />
    );
  if (!data)
    return (
      <div className="min-h-screen flex bg-slate-50 justify-center items-center">
        <h1 className="text-2xl">No data </h1>
      </div>
    );

  const {
    _id,
    event_center: {
      address,
      state,
      city,
      country,
      name: eventCenterName,
      images: eventCenterImages,
    },
    event: {
      name,
      images,
      endDate,
      startDate,
      startTime,
      endTime,
      eventType,
      description,
    },
    payment_amount,
    payment_currency,
    entertainers,
    user,
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
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="font-bold text-2xl md:text-4xl text-black ">
            {name} <Badge>{eventType}</Badge>
          </h1>
          <h3 className={`text-xl relative`}>
            {payment_amount}
            <span
              className="text-sm absolute top-[-4] text-green-500 font-normal left-[110%]"
              aria-label="price"
            >
              {payment_currency}
            </span>
          </h3>
          <div className="flex gap-1 items-center">
            <Drum size={16} className="text-green-500" />
            <p className="text-sm">{entertainers?.length} entertainers</p>
          </div>

          <DateDisplay startDate={startDate} endDate={endDate} />
          <TimeDisplay startTime={startTime} endTime={endTime} />

          <p>{description}</p>
          <div className="flex items-center justify-start gap-1 bg-slate-100 p-2 rounded-md">
            <MapPin size={16} className="text-green-400" />
            <p className="text-sm" aria-label="address">
              {address}, {city}, {state}, {country}
            </p>
          </div>
          {(role === "admin" || user?._id === userId) && (
            <Link href={`/booking/event-center/${_id}`}>
              <Button className="w-full mt-2 bg-green-500 font-semibold">
                Cancel Booking
              </Button>
            </Link>
          )}
        </div>
      </div>

      <section className="w-full flex flex-col gap-2">
        <Title title="Event center" className="mt-5 mb-2 bg-green-100 p-2" />
        {/* event center info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div className="flex flex-col items-start justify-start gap-5">
            <Image
              src={activeImageEventCenter}
              alt={name}
              width={400}
              height={200}
              className="rounded-md w-full h-[200px]"
            />
            <div className="flex items-center justify-start gap-5">
              {eventCenterImages.map((image, index) => (
                <button key={index} onClick={() => setActiveImageEventCenter(image)}>
                  <span className="sr-only">thumbnail</span>
                  <Image
                    key={index}
                    src={image}
                    alt={name}
                    width={80}
                    height={80}
                    className={cn("w-20 h-20 rounded-md", {
                      "border-2 border-green-500": activeImageEventCenter === image,
                    })}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-3">
            <h1 className="font-bold text-2xl md:text-4xl text-black ">
              {eventCenterName}
            </h1>
            <h3 className={`text-xl relative`}>
              {payment_amount}
              <span
                className="text-sm absolute top-[-4] text-green-500 font-normal left-[110%]"
                aria-label="price"
              >
                {payment_currency}
              </span>
            </h3>

            <div className="flex gap-1 items-center">
              <House size={16} className="text-green-500" />
              <p className="text-sm">{eventCenterName}</p>
            </div>
            <div className="flex items-center justify-start gap-1 bg-slate-100 p-2 rounded-md">
              <MapPin size={16} className="text-green-400" />
              <p className="text-sm" aria-label="address">
                {address}, {city}, {state}, {country}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col gap-2">
        <Title title="Event's Entertainers" className="mt-5 mb-2 bg-green-100 p-2" />
        {/* list of entertainers */}
        <EntertainerList
          data={entertainers!}
          noDataOptions={{ title: "No entertainers", message: "" }}
        />
      </section>
    </PageWrapper>
  );
}
