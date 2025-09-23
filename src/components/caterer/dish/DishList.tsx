"use client";
import { NoDataOptions } from "@/types/data.types";
import { DishType } from "@/types/dish.types";
import { EntertainerSkeletonList } from "@/components/skeletons/entertainer/EntertainerSkeleton";
import Dish from "./Dish";
import NoDishDataCard from "./NoDishDataCard";

interface DishListProps {
  noDataOptions?: NoDataOptions;
  data: DishType[];
  isLoading?: boolean;
}
export default function DishList({ noDataOptions, data, isLoading }: DishListProps) {
  if (isLoading) return <EntertainerSkeletonList />;

  if (!data || data.length === 0)
    return <NoDishDataCard className="mx-auto my-20" {...noDataOptions} />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5">
      {data?.map((dish) => (
        <Dish data={dish} key={dish._id} />
      ))}
    </section>
  );
}
