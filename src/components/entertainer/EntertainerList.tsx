"use client";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import Entertainer from "./Entertainer";

export default function EntertainerList() {
  const { data, isLoading } = useGetEntertainers();

  if (isLoading) return <div>Loading...</div>;
  if (!data)
    return (
      <div className="w-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">No data</h1>
      </div>
    );
  if (data && data.data.length === 0)
    return (
      <div className="w-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">No Entertainers</h1>
      </div>
    );
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full md:w-4/5">
      {data.data?.map((entertainer) => (
        <Entertainer {...entertainer} key={entertainer._id} />
      ))}
    </section>
  );
}
