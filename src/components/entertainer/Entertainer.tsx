import { EntertainerType } from "@/types/entertainer.types";
import { Banknote, CheckCircle, Drum, StopCircleIcon, User } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Item from "../ui/items";
import Link from "next/link";

type EntertainerProps = EntertainerType;

const renderSupportedLanguages = (languages: string[]) => (
  <ul className="flex items-start flex-wrap gap-1">
    {languages.map((language) => (
      <Item key={language} className="text-xs w-fit bg-black" item={language} />
    ))}
  </ul>
);

export default function Entertainer({
  name,
  images,
  type,
  availability,
  performance_languages,
  userId: { firstName, lastName },
  price,
  currency,
  _id,
}: EntertainerProps) {
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
          <Banknote size={20} />
          <p className="text-xs">
            {price} {currency}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Drum size={20} />
          <p className="text-xs">{type}</p>
        </div>
        <div className="flex items-center gap-2">
          <User size={20} />
          <p>
            {firstName} {lastName}
          </p>
        </div>
        {renderSupportedLanguages(performance_languages)}

        <Link href={`/entertainers/${_id}`}>
          <Button className="w-fit mt-2 bg-white group-hover:bg-green-500 group-hover:text-white text-black">
            Book
          </Button>
        </Link>
      </div>
    </div>
  );
}
