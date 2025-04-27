import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EventList from "./EventList";

// EventTabs component
export default function EventTabs() {
  return (
    <Tabs className="w-full" defaultValue="All">
      <TabsList className="flex justify-center bg-green-50">
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="Past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="All">
        <EventList />
      </TabsContent>
      <TabsContent value="Upcoming">
        <EventList
          NoDataOptions={{
            title: "No Upcoming events",
            message: "There are no upcoming events to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Past">
        <EventList
          NoDataOptions={{
            title: "No Past Event",
            message: "There are no past events to display",
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
