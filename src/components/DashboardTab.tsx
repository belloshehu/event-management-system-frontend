import { UserRole } from "@/types/user.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { tabs } from "@/constants/tabs";
import { cn } from "@/lib/utils";

export default function DashboardTab({
  role,
  className,
}: {
  role: UserRole;
  className?: string;
}) {
  const renderTabs = () => {
    const tabTriggers = (
      <TabsList>
        {tabs[role].map((tab, index) => {
          return (
            <TabsTrigger key={index} value={tab}>
              {tab}
            </TabsTrigger>
          );
        })}
      </TabsList>
    );

    const tabContents = tabs[role].map((tab, index) => {
      return (
        <TabsContent key={index} value={tab}>
          {tab}
        </TabsContent>
      );
    });

    return (
      <>
        {tabTriggers} {tabContents}
      </>
    );
  };

  return (
    <Tabs
      defaultValue="events"
      className={cn(
        "flex flex-col justify-start items-start gap-3 w-fit h-fit",
        className
      )}
    >
      {renderTabs()}
    </Tabs>
  );
}
