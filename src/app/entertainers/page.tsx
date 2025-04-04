"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "../fonts";
import EntertainerList from "@/components/entertainer/EntertainerList";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";

export default function EntertainerPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isLoading, data } = useGetEntertainers();
  return (
    <div className="flex items-center justify-start min-h-screen flex-col gap-10 p-5 py-10 md:py-20 md:px-10 bg-slate-50">
      <h1 className={`${robotoMono.className} font-bold text-2xl md:text-4xl text-black`}>
        Entertainers
      </h1>
      {isMobile && <SearchInput placeholder="Search for entertainers" />}
      <EntertainerList isLoading={isLoading} data={data?.data!} />
    </div>
  );
}
