"use client";

import Entertainer from "@/components/entertainer/Entertainer";
import EventForm from "@/components/event/EventForm";
import { LoadingDialog } from "@/components/LoadingDialog";
import { Separator } from "@/components/ui/separator";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import { useGetEventCenter } from "@/hooks/service-hooks/event-center.hooks";
import { useLoading } from "@/hooks/use-loading";
import { EntertainerType } from "@/types/entertainer.types";
import Image from "next/image";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const renderSelectedEntertainers = (
  entertainerIds: string[],
  data: EntertainerType[]
) => {
  // filter out the selected entertainers
  const filtered = data.filter((entertainer: EntertainerType) =>
    entertainerIds.includes(entertainer._id)
  );
  if (!filtered.length) return <p>No entertainer selected</p>;
  return (
    <div className="flex gap-5 flex-col items-start justify-start p-3 rounded-md border-[0px]">
      {filtered.map((entertainer, index) => (
        <Entertainer data={entertainer} key={index} simple={true} />
      ))}
    </div>
  );
};

export default function EventCenterBookingPage() {
  const [activeImage, setActiveImage] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useGetEventCenter(id as string);
  const { data: entertainers } = useGetEntertainers();
  const [selectedEntertertainers, setSelectedEntertainers] = useState<string[] | null>(
    null
  );
  const { getLoadingText } = useLoading();

  // filter out the selected entertainers
  const filtered = entertainers?.data.filter((entertainer: EntertainerType) =>
    selectedEntertertainers?.includes(entertainer._id)
  );

  const entertainerPrice = useMemo(() => {
    if (filtered && filtered.length) {
      return filtered
        .map((entertainer) => entertainer.price)
        .reduce((total, price) => {
          return total + price;
        });
    }
    return 0;
  }, [filtered]);

  useEffect(() => {
    if (data) {
      setActiveImage(data.data.images[0]);
    }
  }, [data]);

  if (isLoading)
    return (
      <LoadingDialog
        loadingText={getLoadingText([
          { state: isLoading, message: "Fetching event centers" },
        ])}
        open={isLoading}
      />
    );
  if (!data)
    return (
      <div className="min-h-screen flex bg-slate-50 justify-center items-center">
        <h1 className="text-2xl">No data </h1>
      </div>
    );

  const { name, supported_events_types, price } = data.data;
  return (
    <div className="flex items-center justify-start min-h-screen flex-col gap-10 p-5 py-10 md:py-20 md:px-20 bg-slate-50">
      <h1 className="font-bold text-xl md:text-2xl text-black text-left self-start ">
        Booking {name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <div className="flex flex-col items-start justify-start gap-5">
          {/* booking form here */}
          <p>Fill your booking information below.</p>
          <EventForm
            className="w-full md:w-3/5 max-h-full overflow-y-visible"
            setSelectedEntertainers={setSelectedEntertainers}
            supportedEvtentsTypes={supported_events_types}
            eventCenter={{ _id: id as string }}
            totalCost={price + entertainerPrice}
          />
        </div>

        {/* event center and entertainers */}
        <div className="flex flex-col items-start justify-start gap-5">
          <Image
            src={activeImage}
            alt={name}
            width={400}
            height={300}
            className="rounded-md h-[100px] md:h-[200px] "
          />

          {/* Other details */}
          <div className="flex flex-col items-start justify-start gap-5">
            <h1 className="font-bold text-xl md:text-2xl text-black ">{name}</h1>
            <h3 className={`text-xl relative`}>
              {price}
              <span
                className="text-sm absolute top-[-4] text-green-500 font-normal left-[110%]"
                aria-label="price"
              >
                Naira
              </span>
            </h3>
            {/* <EventItems items={supported_events_types} /> */}
          </div>

          {/* List of seletected entertainers */}
          {selectedEntertertainers && entertainers?.data && (
            <div className="flex flex-col items-start justify-start gap-5 w-full my-10">
              <h1 className="font-medium text-xl md:text-2xl text-black ">
                Selected Entertainers ({selectedEntertertainers.length})
              </h1>
              {renderSelectedEntertainers(selectedEntertertainers, entertainers?.data)}
            </div>
          )}

          <Separator className="" />
          <div className="flex gap-5 items-center justify-between bg-green-100 p-5 rounded-md w-full">
            <h1 className="font-bold text-2xl md:text-4xl">Total</h1>
            <h3>{price + entertainerPrice} NGN</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
