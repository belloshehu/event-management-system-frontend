import { CatererType } from "./caterer.types";
import { ResponseType } from "./response.types";

export interface DishType {
  _id: string;
  name: string;
  image: string;
  size: number; // size in grams or ml
  price: number; // price in USD or relevant currency
  quantity: number; // total number that can be supplied per event
  description: string;
  caterer: string | CatererType; // caterer id associated with the dish
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DishFilterType {
  _id: string;
  name: string;
  size: number; // size in grams or ml
  price: number; // price in USD or relevant currency
  description: string;
  caterer: string | CatererType; // caterer id associated with the dish
  available: boolean;
}

export type GetDishesResponseType = ResponseType<DishType[]>;
export type SingleDishResponseType = ResponseType<DishType>;
