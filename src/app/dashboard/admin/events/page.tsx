"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "@/app/fonts";
import EventList from "@/components/event/EventList";

export default function AdminEventPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="flex items-center justify-start min-h-screen flex-col gap-10 p-5 py-10 md:py-20 md:px-10 bg-slate-50">
      <h1 className={`${robotoMono.className} font-bold text-2xl md:text-4xl text-black`}>Events</h1>
      {isMobile && <SearchInput placeholder="Search for events" />}
      <EventList />
    </div>
  );
}
