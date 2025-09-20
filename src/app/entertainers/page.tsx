"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import EntertainerList from "@/components/entertainer/EntertainerList";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import PageWrapper from "@/components/page/PageWrapper";
import Title from "@/components/Title";
import AddEntertainerDialog from "@/components/entertainer/AddEntertainerDialog";

export default function EntertainerPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isLoading, data } = useGetEntertainers({ filter: { availability: "all" } });
  return (
    <PageWrapper>
      {isMobile && <SearchInput placeholder="Search for entertainers" />}
      <Title
        title="Entertainers"
        description="Register with us an entertainer"
        className="mb-5 bg-green-100 p-6"
      >
        <AddEntertainerDialog triggerText="Register your service" />
      </Title>
      <EntertainerList isLoading={isLoading} data={data?.data!} />
    </PageWrapper>
  );
}
