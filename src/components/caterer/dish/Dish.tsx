import { CheckCircle, StopCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DishType } from "@/types/dish.types";
import Item from "@/components/ui/items";

interface DishProps {
  data: DishType;
  simple?: boolean;
}

export default function Dish({ data, simple }: DishProps) {
  const { name, image, available, size, price, _id } = data;

  // if simple, render a simple card
  // Simple card is used in the event center booking page

  if (simple) {
    return (
      <div className="w-full flex gap-4">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="object-cover rounded-md"
        />
        <div>
          <Link href={`/entertainers/${_id}`}>
            <h3>{name}</h3>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex-1 hover:scale-105 transition-all duration-300 rounded-md relative flex flex-col group items-start justify-start shadow-md">
      <Image
        src={image}
        alt={name}
        width={150}
        height={200}
        className="w-full full h-[150px] object-cover rounded-md"
      />
      <div className="absolute top-0 right-0 p-2 z-20">
        {available ? (
          <CheckCircle size={20} className="text-white" />
        ) : (
          <StopCircleIcon size={20} className="text-white" />
        )}
      </div>
      <div className="rounded-md flex flex-col gap-1 justify-end p-3 bottom-0 left-0 top-0 h-full w-full bg-black bg-opacity-50 text-white group-hover:h-[90%] absolute group-hover:bg-white group-hover:text-gray-200 group-hover:bg-opacity-0 transition-all duration-300">
        <h3 className="font-bold text-lg text-green-500 bg-black p-1 px-2 rounded-md w-fit capitalize group-hover:text-white group-hover:bg-green-500 group-hover:bg-opacity-70">
          {name}
        </h3>
        <Item
          key={"price"}
          className="text-xs w-fit bg-black"
          item={price?.toString() + " Naira"}
        />
        <Item
          key={"size"}
          className="text-xs w-fit bg-black"
          item={size?.toString() + " grams"}
        />
        {/* <Link href={`/caterers/${_id}`}>
          <Button className="w-fit mt-2 bg-white group-hover:bg-green-500 group-hover:text-white text-black">
            Order
          </Button>
        </Link> */}
      </div>
    </div>
  );
}
