"use client";
import NoEntertainerDataCard from "./NoCatererDataCard";
import { NoDataOptions } from "@/types/data.types";
import { EntertainerType } from "@/types/entertainer.types";
import { EntertainerSkeletonList } from "../skeletons/entertainer/EntertainerSkeleton";
import Caterer from "./Caterer";

interface EntertainerListProps {
  noDataOptions?: NoDataOptions;
  data: EntertainerType[];
  isLoading?: boolean;
}
export default function CatererList({
  noDataOptions,
  data,
  isLoading,
}: EntertainerListProps) {
  if (isLoading) return <EntertainerSkeletonList />;

  if (!data || data.length === 0)
    return <NoEntertainerDataCard className="mx-auto my-20" {...noDataOptions} />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5">
      {data?.map((entertainer) => (
        <Caterer data={entertainer} key={entertainer._id} />
      ))}
    </section>
  );
}
