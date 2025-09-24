"use client";
import EventForm from "@/components/event/EventForm";
import { LoadingDialog } from "@/components/LoadingDialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBeverages } from "@/hooks/service-hooks/beverage.hook";
import { useGetDishes } from "@/hooks/service-hooks/dish.hooks";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import { useGetEventCenter } from "@/hooks/service-hooks/event-center.hooks";
import { useLoading } from "@/hooks/use-loading";
import { DishType } from "@/types/dish.types";
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((entertainer) => (
          // <Dish data={dish} key={index} simple={true} />
          <TableRow key={entertainer._id}>
            <TableCell>{entertainer.name}</TableCell>
            <TableCell>
              <Image
                src={entertainer.images[0]}
                alt={entertainer.name}
                width={50}
                height={50}
                className="rounded-md h-[50px] w-[50px] object-cover"
              />
            </TableCell>
            <TableCell>{entertainer.price} NGN</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const renderSelectedDishes = (
  dishes: { id: string; quantity: number }[],
  data: DishType[]
) => {
  // filter out the selected dishes
  const dishIds = dishes.map((dish) => dish.id);
  const filtered = data.filter((dish: DishType) => dishIds.includes(dish._id));
  if (!filtered.length) return <p>No dish selected</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((dish) => (
          // <Dish data={dish} key={index} simple={true} />
          <TableRow key={dish._id}>
            <TableCell>{dish.name}</TableCell>
            <TableCell>
              <Image
                src={dish.image}
                alt={dish.name}
                width={50}
                height={50}
                className="rounded-md h-[50px] w-[50px] object-cover"
              />
            </TableCell>
            <TableCell>{dishes.find((d) => d.id === dish._id)?.quantity || 0}</TableCell>
            <TableCell>{dish.price} NGN</TableCell>
            <TableCell>
              {(dishes.find((d) => d.id === dish._id)?.quantity || 0) * dish.price} NGN
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const renderSelectedBeverages = (
  beverages: { id: string; quantity: number }[],
  data: DishType[]
) => {
  // filter out the selected beverages
  const dishIds = beverages.map((beverage) => beverage.id);
  const filtered = data.filter((beverage: DishType) => dishIds.includes(beverage._id));
  if (!filtered.length) return <p>No beverage selected</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((beverage) => (
          // <Dish data={dish} key={index} simple={true} />
          <TableRow key={beverage._id}>
            <TableCell>{beverage.name}</TableCell>
            <TableCell>
              <Image
                src={beverage.image}
                alt={beverage.name}
                width={50}
                height={50}
                className="rounded-md h-[50px] w-[50px] object-cover"
              />
            </TableCell>
            <TableCell>
              {beverages.find((b) => b.id === beverage._id)?.quantity || 0}
            </TableCell>
            <TableCell>{beverage.price} NGN</TableCell>
            <TableCell>
              {(beverages.find((b) => b.id === beverage._id)?.quantity || 0) *
                beverage.price}{" "}
              NGN
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function EventCenterBookingPage() {
  const [activeImage, setActiveImage] = useState("");
  const { id } = useParams();
  const { data, isLoading } = useGetEventCenter(id as string);
  const { data: entertainers } = useGetEntertainers({
    filter: { availability: "available" },
  });
  const { isLoading: loadingDishes, data: dishesData } = useGetDishes({
    filter: { available: true },
  });
  const { isLoading: loadingBeverages, data: beveragesData } = useGetBeverages({
    filter: { available: true },
  });

  const [selectedEntertertainers, setSelectedEntertainers] = useState<string[] | null>(
    null
  );
  // state to hold the selected beverages and dishes in the event center booking form
  const [selectedBeverages, setSelectedBeverages] = useState<
    { id: string; quantity: number }[] | null
  >(null);
  const [selectedDishes, setSelectedDishes] = useState<
    { id: string; quantity: number }[] | null
  >(null);
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

  // total cost of selected dishes
  const dishesPrice = useMemo(() => {
    if (selectedDishes && selectedDishes.length && dishesData?.data) {
      const total = selectedDishes
        .map((dish) => {
          const dishData = dishesData.data.find((d) => d._id === dish.id);
          if (dishData) {
            return dishData.price * dish.quantity;
          }
          return 0;
        })
        .reduce((total, price) => total + price, 0);
      return total;
    }
    return 0;
  }, [selectedDishes, dishesData]);
  // total cost of selected beverages
  const beveragePrice = useMemo(() => {
    if (selectedBeverages && selectedBeverages.length && beveragesData?.data) {
      const total = selectedBeverages
        .map((beverage) => {
          const beverageData = beveragesData.data.find((b) => b._id === beverage.id);
          if (beverageData) {
            return beverageData.price * beverage.quantity;
          }
          return 0;
        })
        .reduce((total, price) => total + price, 0);
      return total;
    }
    return 0;
  }, [selectedBeverages, beveragesData]);
  // add the dishesPrice and beveragePrice to the entertainerPrice
  const totalExtraPrice = useMemo(() => {
    return dishesPrice + beveragePrice + entertainerPrice;
  }, [dishesPrice, beveragePrice, entertainerPrice]);

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
    <>
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
            setSelectedBeverages={setSelectedBeverages}
            setSelectedDishes={setSelectedDishes}
            supportedEvtentsTypes={supported_events_types}
            eventCenter={{ _id: id as string }}
            totalCost={price + entertainerPrice + totalExtraPrice}
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
          {selectedEntertertainers &&
            selectedEntertertainers?.length > 0 &&
            entertainers?.data && (
              <div className="flex flex-col items-start justify-start gap-5 w-full my-3">
                <h1 className="font-medium text-xl md:text-2xl text-black ">
                  Selected Entertainers ({selectedEntertertainers.length})
                </h1>
                {renderSelectedEntertainers(selectedEntertertainers, entertainers?.data)}
              </div>
            )}

          {/* List of seelected dishes */}
          {selectedDishes && selectedDishes?.length > 0 && dishesData?.data && (
            <div className="flex flex-col items-start justify-start gap-5 w-full my-3">
              <Separator className="" />
              <h1 className="font-medium text-xl md:text-2xl text-black ">
                Selected Dishes ({selectedDishes.length})
              </h1>
              {renderSelectedDishes(selectedDishes, dishesData?.data)}
            </div>
          )}

          {/* List of seelected beverages */}
          {selectedBeverages && selectedBeverages?.length > 0 && beveragesData?.data && (
            <div className="flex flex-col items-start justify-start gap-5 w-full my-3">
              <Separator className="" />
              <h1 className="font-medium text-xl md:text-2xl text-black ">
                Selected Beverages ({selectedBeverages.length})
              </h1>
              {renderSelectedBeverages(selectedBeverages, beveragesData?.data)}
            </div>
          )}

          <Separator className="" />
          <div className="flex gap-5 items-center justify-between bg-green-100 p-5 rounded-md w-full">
            <h1 className="font-bold text-2xl md:text-4xl">Total</h1>
            <h3>{price + entertainerPrice + totalExtraPrice} NGN</h3>
          </div>
        </div>
      </div>
    </>
  );
}
