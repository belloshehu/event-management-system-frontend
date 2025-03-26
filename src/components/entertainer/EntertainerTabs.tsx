import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EntertainerList from "./EntertainerList";

// EventTabs component
export default function EntertainerTabs() {
  return (
    <Tabs className="w-full" defaultValue="All">
      <TabsList className="flex justify-center bg-black">
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Available">Available</TabsTrigger>
        <TabsTrigger value="Booked">Booked</TabsTrigger>
        <TabsTrigger value="Suspended">Suspended</TabsTrigger>
      </TabsList>
      <TabsContent value="All">
        <EntertainerList />
      </TabsContent>
      <TabsContent value="Available">
        <EntertainerList
          noDataOptions={{
            title: "No Available Entertainer",
            message: "There are no available entertainers to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Booked">
        <EntertainerList
          noDataOptions={{
            title: "No Booked Entertainer",
            message: "There are no booked entertainers to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Suspended">
        <EntertainerList
          noDataOptions={{
            title: "No Suspended Entertainer",
            message: "There are no suspended entertainers to display",
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
