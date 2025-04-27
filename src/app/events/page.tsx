"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import EventList from "@/components/event/EventList";
import PageWrapper from "@/components/page/PageWrapper";

export default function EventPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <PageWrapper>
      {isMobile && <SearchInput placeholder="Search for events" />}
      <EventList />
    </PageWrapper>
  );
}
