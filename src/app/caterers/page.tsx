"use client";
import SearchInput from "@/components/SearchInput";
import { useMediaQuery } from "@/hooks/use-media-query";
import PageWrapper from "@/components/page/PageWrapper";
import Title from "@/components/Title";
import AddCatererDialog from "@/components/caterer/AddCatererDialog";
import CatererList from "@/components/caterer/CatererList";
import { useGetCaterers } from "@/hooks/service-hooks/caterer.hook";

export default function CatererListPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isLoading, data } = useGetCaterers({ filter: { availability: "all" } });
  return (
    <PageWrapper>
      {isMobile && <SearchInput placeholder="Search for Caterer" />}
      <Title
        title="Caterers"
        description="Register with us an caterer"
        className="mb-5 bg-green-100 p-6"
      >
        <AddCatererDialog triggerText="Register your service" />
      </Title>
      <CatererList isLoading={isLoading} data={data?.data!} />
    </PageWrapper>
  );
}
