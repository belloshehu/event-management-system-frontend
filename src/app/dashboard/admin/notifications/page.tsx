"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "@/app/fonts";
import EventList from "@/components/event/EventList";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { session } = useSession();
  const router = useRouter();

  if (!session) router.push("/login");

  return (
    <>
      <h1 className={`${robotoMono.className} font-bold text-xl md:text-4xl text-black`}>
        Notifications
      </h1>
      <EventList />
    </>
  );
}
