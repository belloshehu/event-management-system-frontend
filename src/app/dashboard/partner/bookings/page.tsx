"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";
import Title from "@/components/Title";

export default function PartnerBookingsPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { session } = useSession();
  const router = useRouter();

  if (!session) router.push("/login");
  return (
    <>
      {isMobile && <SearchInput placeholder="Search for events" />}
      <Title
        title="Bookings"
        className={`font-medium md:font-extrabold text-xl md:text-2xl text-green-500 text-left self-start`}
      />
    </>
  );
}
