"use client";
import { NoDataOptions } from "@/types/data.types";
import { BeverageType } from "@/types/beverage.types";
import { EntertainerSkeletonList } from "@/components/skeletons/entertainer/EntertainerSkeleton";
import Beverage from "@/components/caterer/beverage/Beverage";
import NoBeverageDataCard from "./NoBeverageDataCard";

interface BeverageListProps {
  noDataOptions?: NoDataOptions;
  data: BeverageType[];
  isLoading?: boolean;
}
export default function BeverageList({
  noDataOptions,
  data,
  isLoading,
}: BeverageListProps) {
  if (isLoading) return <EntertainerSkeletonList />;

  if (!data || data.length === 0)
    return <NoBeverageDataCard className="mx-auto my-20" {...noDataOptions} />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5">
      {data?.map((beverage) => (
        <Beverage data={beverage} key={beverage._id} />
      ))}
    </section>
  );
}
