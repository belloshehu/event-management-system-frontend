"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "@/app/fonts";
import EventTabs from "@/components/event/EventTabs";
import { Button } from "@/components/ui/button";

export default function AdminEventPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {isMobile && <SearchInput placeholder="Search for events" />}
      <div className="flex items-center justify-between w-full">
        <h1
          className={`${robotoMono.className} font-bold text-xl md:text-4xl text-black text-left self-start`}
        >
          Events
        </h1>
        <Button className="bg-green-500">Add Event</Button>
      </div>
      <EventTabs />
    </>
  );
}
