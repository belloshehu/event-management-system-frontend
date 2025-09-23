"use client";
import { useGetUserEntertainer } from "@/hooks/service-hooks/entertainer.hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { useGetUserCaterer } from "@/hooks/service-hooks/caterer.hook";
import Entertainer from "../entertainer/Entertainer";
import Link from "next/link";
import Caterer from "../caterer/Caterer";

// EventTabs component
export default function OfferedServicesTabs() {
  const { isLoading: loadingCatering, data: cateringData } = useGetUserCaterer();
  const { isLoading: loadingEntertainment, data: entertainmentData } =
    useGetUserEntertainer();

  return (
    <Tabs className="w-full" defaultValue="Catering">
      <TabsList className="flex justify-center bg-green-100">
        <TabsTrigger value="Catering">Catering</TabsTrigger>
        <TabsTrigger value="Entertainment">Entertainment</TabsTrigger>
      </TabsList>
      <TabsContent value="Entertainment">
        {loadingEntertainment ? (
          <div>Loading entertainment service...</div>
        ) : entertainmentData?.data ? (
          <div>
            <Link href={`/dashboard/user/services/entertainment`}>
              <Entertainer simple data={entertainmentData.data} />
            </Link>
          </div>
        ) : (
          <div className="my-5 flex justify-center">
            <Button>Add Entertainment Service </Button>
          </div>
        )}
      </TabsContent>
      <TabsContent value="Catering">
        {loadingCatering ? (
          <div>Loading catering service...</div>
        ) : cateringData?.data ? (
          <div>
            <Link href={`/dashboard/user/services/catering`}>
              <Caterer simple data={cateringData.data} />
            </Link>
          </div>
        ) : (
          <div className="my-5 flex justify-center">
            <Button>Add Catering Service </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
