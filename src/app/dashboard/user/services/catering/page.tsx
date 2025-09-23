"use client";
import { robotoMono } from "@/app/fonts";
import DishAndBeverageTabs from "@/components/caterer/DishAndBeverageTabs";
import NoContent from "@/components/NoContent";
import Item from "@/components/ui/items";
import { useGetUserCaterer } from "@/hooks/service-hooks/caterer.hook";
import { cn } from "@/lib/utils";
import { CheckCircle, MapPin, StopCircleIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const renderItems = (items: string[]) => (
  <ul className="flex items-start flex-wrap gap-1">
    {items.map((item) => (
      <Item key={item} className="text-xs w-fit bg-black text-white" item={item} />
    ))}
  </ul>
);

export default function UserCateringServiceDetailPage() {
  const [imageIndex, setImageIndex] = useState(0);

  const { data, isLoading } = useGetUserCaterer();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (data) {
      timer = setTimeout(() => {
        setImageIndex((prev) => (prev + 1) % data.data.images.length);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [data, imageIndex]);

  if (isLoading)
    return (
      <div className="min-h-screen flex bg-slate-50 justify-center items-center">
        <h1 className="text-2xl">Loading ...</h1>
      </div>
    );
  if (!data) return <NoContent message="No entertainer data" />;
  const {
    name,
    address,
    availability,
    available_for,
    city,
    country,
    description,
    images,
    state,
    userId: { firstName, lastName },
  } = data.data;

  return (
    <div className="flex flex-col items-start w-full gap-5">
      <div className="w-full max-h-[400px] relative">
        {/* availability of the entertainer */}
        <div
          className={`flex items-center gap-2 rounded-md p-2 capitalize absolute top-1 right-3 bg-black bg-opacity-90 text-white`}
        >
          {availability ? (
            <CheckCircle size={20} className="text-green-500" />
          ) : (
            <StopCircleIcon size={20} className="text-red-500" />
          )}
          <p>{availability}</p>
        </div>

        <Image
          src={images[imageIndex]}
          alt={name}
          width={300}
          height={300}
          className={cn(
            "rounded-md w-full max-h-[400px]  object-cover transition-all duration-500"
          )}
        />
        <div className="flex flex-col md:flex-row-reverse flex-wrap justify-between items-center gap-5 absolute bottom-5 md:bottom-10 right-3">
          {/* address */}
          <div className="flex items-center justify-start gap-1 text-white p-2 rounded-md bg-black opacity-90">
            <MapPin size={24} className="text-green-500" />
            <p className="text-sm" aria-label="address">
              {city}, {country}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={name}
                width={80}
                height={80}
                className={cn(`rounded-full object-cover`, {
                  "w-20 h-20 ": index === 0,
                  "w-16 h-16": index === 1,
                  "w-12 h-12": index === 2,
                  "border-white border-2 animate-pulse": index === imageIndex,
                })}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-2 md:items-center justify-between w-full">
        <h1
          className={`${robotoMono.className} font-bold text-2xl md:text-4xl text-black`}
        >
          {name}
        </h1>
        {/* user */}
        <div className="flex items-center gap-2">
          <UserCircle className="text-green-500" size={20} />
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </div>

      <div>
        <span className="p-1 capitalize bg-gray-100 rounded-md text-xs text-green-600 shadow-sm">
          Description
        </span>
        <p>{description}</p>
      </div>

      {/* address */}
      <div className="flex flex-col justify-start gap-1">
        <span className="p-1 capitalize bg-gray-100 rounded-md text-xs text-green-600 shadow-sm">
          Address
        </span>
        <div className="flex items-center justify-start gap-1">
          <MapPin size={24} className="text-green-500" />
          <p className="text-sm" aria-label="address">
            {address}, {city}, {state}, {country}
          </p>
        </div>
      </div>

      {/* available for */}

      <div className="flex flex-col items-start gap-2">
        <span className="p-1 capitalize bg-gray-100 rounded-md text-xs text-green-600 shadow-sm">
          Available for
        </span>
        <div className="flex items-start gap-2">{renderItems(available_for)}</div>
      </div>
      {/* Tabs for beeverages and dishes  */}
      <DishAndBeverageTabs catererId={data?.data._id as string} />

      {/* Reviews */}
      <h3 className="font-semibold ">Reviews</h3>
      <NoContent message="No reviews yet" />
    </div>
  );
}
