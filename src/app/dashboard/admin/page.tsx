"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";
import Title from "@/components/Title";
import CustomAvatar from "@/components/CustomAvatar";
import EventCenterBookingList from "@/components/event-center/EventCenterBookingList";
import { useGetEventCenterBookings } from "@/hooks/service-hooks/event-center.hooks";

export default function AdminDashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { session } = useSession();
  const router = useRouter();
  // Get all bookings for admin dashboard
  const { isLoading, data } = useGetEventCenterBookings({ filter: {} });

  if (!session) router.push("/login");
  const {
    user: { firstName, lastName, email, image },
  } = session;
  return (
    <>
      <div className="flex  gap-5 items-start justify-between w-full bg-green-200 shadow-md rounded-md p-5">
        <div className="flex items-center justify-start gap-5">
          {image && (
            <CustomAvatar
              fallback={`${firstName.slice(0, 1) + lastName.slice(0, 1)}`}
              src={image}
            />
          )}
          <Title
            title={`${firstName} ${lastName}`}
            className={`font-medium md:font-extrabold text-xl md:text-2xl text-green-500 text-left self-start`}
          />
        </div>
        <small>{email}</small>
      </div>
      {isMobile && data?.data?.length && (
        <SearchInput placeholder="Search for events" className="w-full" />
      )}

      <section className="w-full flex flex-col gap-2">
        <Title title="Bookings" />
        <div className="w-full shadow-sm p-2 md:p-5  rounded-md">
          <EventCenterBookingList loadingState={isLoading} bookings={data?.data!} />
        </div>
      </section>
    </>
  );
}
