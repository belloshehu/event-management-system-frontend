"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import useSession from "@/lib/session/use-session";
import { useRouter } from "next/navigation";
import { useGetUsers } from "@/hooks/service-hooks/user.hooks";
import Title from "@/components/Title";
import UserList from "@/components/user/UserList";

export default function AdminDashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { session } = useSession();
  const router = useRouter();
  const { isLoading, data } = useGetUsers({ filter: {} });

  if (!session) router.push("/login");

  return (
    <>
      {isMobile && data?.length && <SearchInput placeholder="Search for events" />}
      <Title title="Users" className="mb-5 bg-green-100 p-2" />
      <UserList
        users={data?.filter((user) => user._id !== session.user._id)!} // exclude the current user
        loadingState={isLoading}
        className="grid grid-cols-1 md:grid-cols-2 "
      />
    </>
  );
}
