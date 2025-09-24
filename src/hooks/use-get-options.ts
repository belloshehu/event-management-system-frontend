import { BeverageType } from "@/types/beverage.types";
import { DishType } from "@/types/dish.types";
import { EntertainerType } from "@/types/entertainer.types";
import { useCallback } from "react";

export const useGetEntertainerOptionsData = (data: any) =>
  useCallback(
    (entertainers: EntertainerType[]) => {
      return entertainers
        .filter((entertainer) => entertainer.availability === "available")
        .map(({ _id, name }) => {
          return {
            value: _id,
            label: name,
          };
        });
    },
    [data]
  );

export const useGetDishOptionsData = (data: any) =>
  useCallback(
    (dishes: DishType[]) => {
      return dishes
        .filter((dish) => dish.available === true)
        .map(({ _id, name, quantity }) => {
          return {
            value: { id: _id, quantity },
            label: name + `(${quantity})`,
          };
        });
    },
    [data]
  );

export const useGetBeverageOptionsData = (data: any) =>
  useCallback(
    (beverages: BeverageType[]) => {
      return beverages
        .filter((beverage) => beverage.available === true)
        .map(({ _id, name, quantity }) => {
          return {
            value: { id: _id, quantity },
            label: name + ` (${quantity})`,
          };
        });
    },
    [data]
  );
