"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import DishList from "./dish/DishList";
import BeverageList from "./beverage/BeverageList";
import { DishType } from "@/types/dish.types";
import useSession from "@/lib/session/use-session";
import { useGetDishesByCaterer } from "@/hooks/service-hooks/dish.hooks";
import { useGetBeveragesByCaterer } from "@/hooks/service-hooks/beverage.hook";
import { BeverageType } from "@/types/beverage.types";
import AddBeverageDialog from "./beverage/AddBeverageDialog";
import AddDishDialog from "./dish/AddDishDialog";

// EventTabs component
export default function DishAndBeverageTabs({ catererId }: { catererId: string }) {
  const {
    session: { user },
  } = useSession();
  const { isLoading: loadingBeverages, data: beveragesData } = useGetBeveragesByCaterer({
    catererId,
  });
  const { isLoading: loadingDishes, data: dishesData } = useGetDishesByCaterer({
    catererId,
  });

  return (
    <Tabs className="w-full" defaultValue="Dishes">
      <TabsList className="flex justify-center bg-green-100">
        <TabsTrigger value="Dishes">Dishes ({dishesData?.data.length})</TabsTrigger>
        <TabsTrigger value="Beverages">
          Beverages ({beveragesData?.data.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Dishes" className="space-y-5">
        <AddDishDialog catererId={catererId} />
        <DishList
          isLoading={loadingDishes}
          data={dishesData?.data as DishType[]}
          noDataOptions={{
            title: "No Dishes",
            message: "There are no dishes to display",
          }}
        />
      </TabsContent>
      <TabsContent value="Beverages" className="space-y-5">
        <AddBeverageDialog catererId={catererId} />
        <BeverageList
          isLoading={loadingBeverages}
          data={beveragesData?.data as BeverageType[]}
          noDataOptions={{
            title: "No beverages",
            message: "There are no available beverages to display",
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
