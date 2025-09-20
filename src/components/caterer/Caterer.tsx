import { EntertainerType } from "@/types/entertainer.types";
import { CheckCircle, StopCircleIcon, User } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface CatererProps {
  data: EntertainerType;
  simple?: boolean;
}

export default function Caterer({ data, simple }: CatererProps) {
  const {
    name,
    images,
    availability,
    userId: { firstName, lastName },
    price,
    currency,
    _id,
  } = data;

  // if simple, render a simple card
  // Simple card is used in the event center booking page

  if (simple) {
    return (
      <div className="w-full flex gap-4">
        <Image
          src={images[0]}
          alt={name}
          width={100}
          height={100}
          className="object-cover rounded-md"
        />
        <div>
          <Link href={`/entertainers/${_id}`}>
            <h3>{name}</h3>
          </Link>
          <h3 className="font-bold text-xl md:text-3xl">
            {price} <span className="text-sm font-normal">{currency}</span>
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex-1 hover:scale-105 transition-all duration-300 rounded-md relative flex flex-col group items-start justify-start shadow-md">
      <Image
        src={images[0]}
        alt={name}
        width={200}
        height={400}
        className="w-full full object-cover rounded-md"
      />
      <div className="absolute top-0 right-0 p-2 z-20">
        {availability ? (
          <CheckCircle size={20} className="text-white" />
        ) : (
          <StopCircleIcon size={20} className="text-white" />
        )}
      </div>
      <div className="rounded-md flex flex-col gap-1 justify-end p-3 bottom-0 left-0 top-0 h-full w-full bg-black bg-opacity-50 text-white group-hover:h-[90%] absolute group-hover:bg-white group-hover:text-gray-200 group-hover:bg-opacity-0 transition-all duration-300">
        <h3 className="font-bold text-lg text-green-500 bg-black p-1 px-2 rounded-md w-fit capitalize group-hover:text-white group-hover:bg-green-500 group-hover:bg-opacity-70">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <User size={20} />
          <p>
            {firstName} {lastName}
          </p>
        </div>

        <Link href={`/entertainers/${_id}`}>
          <Button className="w-fit mt-2 bg-white group-hover:bg-green-500 group-hover:text-white text-black">
            Book
          </Button>
        </Link>
      </div>
    </div>
  );
}
