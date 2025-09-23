"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import useSession from "@/lib/session/use-session";
import Title from "@/components/Title";
import EventCenterBookingList from "@/components/event-center/EventCenterBookingList";
import { useGetEventCenterBookings } from "@/hooks/service-hooks/event-center.hooks";
import OfferedServicesTabs from "@/components/offered-service/OfferedServicesTabs";
import Link from "next/link";

export default function UserDashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { session } = useSession();
  const { isLoading, data } = useGetEventCenterBookings({
    filter: { user: session.user._id },
  });
  return (
    <>
      {isMobile && <SearchInput placeholder="Search for events" className="w-full" />}

      {session.user.offersServices ? (
        <section className="w-full flex flex-col gap-2">
          <Title title="Services" />
          <OfferedServicesTabs />
        </section>
      ) : (
        <div className="my-10 border-[1px] w-full p-10 flex items-center justify-center flex-col md:flex-row md:justify-between">
          <p>Have a catering or entertainment services to offer?</p>
          <Link href="/partnership" className="flex items-center justify-center">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition">
              Join our partnership program
            </button>
          </Link>
        </div>
      )}

      <section className="w-full flex flex-col gap-2">
        <Title title="Bookings" />
        <div className="w-full shadow-sm p-2 md:p-5 bg-white rounded-md">
          <EventCenterBookingList loadingState={isLoading} bookings={data?.data!} />
        </div>
      </section>
    </>
  );
}
