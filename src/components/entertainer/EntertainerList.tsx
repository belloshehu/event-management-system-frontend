"use client";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import Entertainer from "./Entertainer";
import NoEntertainerDataCard from "./NoEntertainerDataCard";
import { NoDataOptions } from "@/types/data.types";

export default function EntertainerList({
  noDataOptions,
}: {
  noDataOptions?: NoDataOptions;
}) {
  const { data, isLoading } = useGetEntertainers();

  if (isLoading) return <div>Loading...</div>;
  if (!data)
    return <NoEntertainerDataCard className="mx-auto my-20" {...noDataOptions} />;
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5">
      {data.data?.map((entertainer) => (
        <Entertainer {...entertainer} key={entertainer._id} />
      ))}
    </section>
  );
}
