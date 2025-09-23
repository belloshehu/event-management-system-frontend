import { CatererType } from "./caterer.types";
import { ResponseType } from "./response.types";

export interface BeverageType {
  _id: string;
  name: string;
  image: string;
  size: number; // size in grams or ml
  price: number; // price in USD or relevant currency
  description: string;
  caterer: string | CatererType; // caterer id associated with the dish
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export type GetBeveragesResponseType = ResponseType<BeverageType[]>;
export type SingleBeverageResponseType = ResponseType<BeverageType>;
