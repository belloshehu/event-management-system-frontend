"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";
import Title from "@/components/Title";
import EventCenterBookingList from "@/components/event-center/EventCenterBookingList";
import { useGetEventCenterBookings } from "@/hooks/service-hooks/event-center.hooks";

export default function UserBookingsPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { session } = useSession();
  const router = useRouter();
  const { isLoading, data } = useGetEventCenterBookings({
    filter: { user: session.user._id },
  });

  if (!session) router.push("/login");
  return (
    <>
      {isMobile && <SearchInput placeholder="Search for events" />}
      <Title title="Bookings" className="mb-5 bg-green-100 p-2" />
      <EventCenterBookingList loadingState={isLoading} bookings={data?.data!} />
    </>
  );
}
