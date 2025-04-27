"use client";
import EventCenterList from "@/components/event-center/EventCenterList";
import PageWrapper from "@/components/page/PageWrapper";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function EventCentersPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <PageWrapper>
      {isMobile && <SearchInput placeholder="Search for event center" />}
      <EventCenterList />
    </PageWrapper>
  );
}
