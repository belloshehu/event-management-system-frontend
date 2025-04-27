import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudioDecorationGuide from "./StudioDecorationGuide";
import StudioGenerateDecoration from "./StudioGenerateDecoration";

// EventTabs component
export default function StudionPageTabs() {
  return (
    <Tabs className="w-full" defaultValue="guide">
      <TabsList className="flex justify-center bg-green-100">
        <TabsTrigger value="guide">Decoration guide</TabsTrigger>
        <TabsTrigger value="generation">Generate decoration</TabsTrigger>
      </TabsList>
      <TabsContent value="guide">
        <StudioDecorationGuide />
      </TabsContent>
      <TabsContent value="generation">
        <StudioGenerateDecoration />
      </TabsContent>
    </Tabs>
  );
}
