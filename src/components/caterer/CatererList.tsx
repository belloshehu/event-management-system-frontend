"use client";
import NoCatererDataCard from "./NoCatererDataCard";
import { NoDataOptions } from "@/types/data.types";
import { CatererType } from "@/types/caterer.types";
import { EntertainerSkeletonList } from "@/components/skeletons/entertainer/EntertainerSkeleton";
import Caterer from "./Caterer";

interface CatererListProps {
  noDataOptions?: NoDataOptions;
  data: CatererType[];
  isLoading?: boolean;
}
export default function CatererList({
  noDataOptions,
  data,
  isLoading,
}: CatererListProps) {
  if (isLoading) return <EntertainerSkeletonList />;

  if (!data || data.length === 0)
    return <NoCatererDataCard className="mx-auto my-20" {...noDataOptions} />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-full">
      {data?.map((caterer) => (
        <Caterer data={caterer} key={caterer._id} />
      ))}
    </section>
  );
}
