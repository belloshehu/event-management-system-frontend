import { ResponseType } from "./response.types";
import { UserType } from "./user.types";

export interface CatererType {
  _id: string;
  name: string;
  userId: UserType;
  images: string[];
  description: string;
  contact_number: string;
  contact_email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  available_for: string[];
  availability: "available" | "booked";
  createdAt: string;
  updatedAt: string;
}

export type GetCaterersResponseType = ResponseType<CatererType[]>;
export type SingleCatererResponseType = ResponseType<CatererType>;
