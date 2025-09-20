"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";

import Title from "@/components/Title";

export default function PartnerNotificationsPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { session } = useSession();
  const router = useRouter();

  if (!session) router.push("/login");
  return (
    <>
      {isMobile && <SearchInput placeholder="Search for events" />}
      <Title title="Notifications" className="mb-5 bg-green-100 p-2" />
    </>
  );
}
