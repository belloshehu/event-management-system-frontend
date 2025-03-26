"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "@/app/fonts";
import EventList from "@/components/event/EventList";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";

export default function UserDashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { session } = useSession();

  if (!session) {
    router.push("/login");
  }
  const {
    user: { firstName, lastName },
  } = session;
  return (
    <div className="flex items-center justify-start min-h-screen flex-col gap-10 p-5 py-10 md:py-20 md:px-10 bg-slate-50">
      <h1 className={`${robotoMono.className} font-bold text-xl md:text-4xl text-black`}>
        User Dashboard ({firstName} {lastName})
      </h1>
      {isMobile && <SearchInput placeholder="Search for events" />}
      <EventList />
    </div>
  );
}
