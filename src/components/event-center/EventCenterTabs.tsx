import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EventCenterList from "./EventCenterList";

// EventTabs component
export default function EventCenterTabs() {
  return (
    <Tabs className="w-full" defaultValue="All">
      <TabsList className="flex justify-center bg-green-50">
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Owned">Owned</TabsTrigger>
        <TabsTrigger value="Booked">Booked</TabsTrigger>
        <TabsTrigger value="Partner's">Partner&lsquo;s</TabsTrigger>
      </TabsList>
      <TabsContent value="All">
        <EventCenterList />
      </TabsContent>
      <TabsContent value="Owned">
        <EventCenterList
          NoDataOptions={{
            title: "No owned event centers",
            message: "There are no owned event centers to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Booked">
        <EventCenterList
          NoDataOptions={{
            title: "No booked event centers",
            message: "There are no booked event centers to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Partner's">
        <EventCenterList
          NoDataOptions={{
            title: "No partner's event centers",
            message: "There are no partner's event centers to display",
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
