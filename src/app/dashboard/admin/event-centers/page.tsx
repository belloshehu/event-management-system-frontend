"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "@/app/fonts";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";
import EventCenterTabs from "@/components/event-center/EventCenterTabs";
import AddEventCenterDialog from "@/components/event-center/AddEventCenterDialog";

export default function AdminDashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { session } = useSession();
  const router = useRouter();

  if (!session) router.push("/login");
  return (
    <div className="flex items-center justify-start min-h-screen flex-col gap-3 p-5 py-10 md:py-20 md:px-10 bg-slate-50">
      {isMobile && <SearchInput placeholder="Search for events" />}
      <div className="flex items-center justify-between w-full">
        <h1
          className={`${robotoMono.className} font-bold text-xl md:text-4xl text-black text-left self-start`}
        >
          Event centers
        </h1>
        <AddEventCenterDialog />
      </div>
      <EventCenterTabs />
    </div>
  );
}
