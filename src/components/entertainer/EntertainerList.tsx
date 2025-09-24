"use client";
import Entertainer from "./Entertainer";
import NoEntertainerDataCard from "./NoEntertainerDataCard";
import { NoDataOptions } from "@/types/data.types";
import { EntertainerType } from "@/types/entertainer.types";
import { EntertainerSkeletonList } from "../skeletons/entertainer/EntertainerSkeleton";

interface EntertainerListProps {
  noDataOptions?: NoDataOptions;
  data: EntertainerType[];
  isLoading?: boolean;
}
export default function EntertainerList({
  noDataOptions,
  data,
  isLoading,
}: EntertainerListProps) {
  if (isLoading) return <EntertainerSkeletonList />;

  if (!data || data.length === 0)
    return <NoEntertainerDataCard className="mx-auto my-20" {...noDataOptions} />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
      {data?.map((entertainer) => (
        <Entertainer data={entertainer} key={entertainer._id} />
      ))}
    </section>
  );
}
