"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
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
    <>
      {isMobile && <SearchInput placeholder="Search for event centers" />}
      <div className="flex items-center justify-between w-full">
        <h1 className={`font-bold text-xl md:text-4xl text-black text-left self-start`}>
          Event centers
        </h1>
        <AddEventCenterDialog />
      </div>
      <EventCenterTabs />
    </>
  );
}
