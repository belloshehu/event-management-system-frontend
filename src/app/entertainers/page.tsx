"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import EntertainerList from "@/components/entertainer/EntertainerList";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import PageWrapper from "@/components/page/PageWrapper";

export default function EntertainerPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isLoading, data } = useGetEntertainers({ filter: { availability: "all" } });
  return (
    <PageWrapper>
      {isMobile && <SearchInput placeholder="Search for entertainers" />}
      <EntertainerList isLoading={isLoading} data={data?.data!} />
    </PageWrapper>
  );
}
