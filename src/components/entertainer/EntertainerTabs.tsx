"use client";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EntertainerList from "./EntertainerList";
import { useState } from "react";

// EventTabs component
export default function EntertainerTabs() {
  const [filter, setFilter] = useState<{
    availability: "available" | "booked" | "all";
  }>({
    availability: "available",
  });

  const { isLoading, data } = useGetEntertainers({ filter });

  return (
    <Tabs className="w-full" defaultValue="All">
      <TabsList className="flex justify-center bg-green-50">
        <TabsTrigger value="All" onClick={() => setFilter({ availability: "all" })}>
          All
        </TabsTrigger>
        <TabsTrigger
          value="Available"
          onClick={() => setFilter({ availability: "available" })}
        >
          Available
        </TabsTrigger>
        <TabsTrigger value="Booked" onClick={() => setFilter({ availability: "booked" })}>
          Booked
        </TabsTrigger>
        <TabsTrigger value="Suspended">Suspended</TabsTrigger>
      </TabsList>
      <TabsContent value="All">
        <EntertainerList
          isLoading={isLoading}
          data={data?.data!}
          noDataOptions={{
            title: "No Entertainers",
            message: "There are no entertainers to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Available">
        <EntertainerList
          isLoading={isLoading}
          data={data?.data!}
          noDataOptions={{
            title: "No Available Entertainer",
            message: "There are no available entertainers to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Booked">
        <EntertainerList
          isLoading={isLoading}
          data={data?.data!}
          noDataOptions={{
            title: "No Booked Entertainer",
            message: "There are no booked entertainers to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Suspended"></TabsContent>
    </Tabs>
  );
}
