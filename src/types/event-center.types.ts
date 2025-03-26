import { ResponseType } from "./response.types";

export type EventCenterSupportedEventsTypes =
  | "wedding"
  | "birthday"
  | "conference"
  | "concert"
  | "party"
  | "others"
  | "training";

export interface EventCenterType {
  _id: string;
  name: string;
  address: string;
  capacity: number;
  price: number;
  images: string[];
  description: string;
  state: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  supported_events_types: string[];
}

export type GetEventCentersResponseType = ResponseType<EventCenterType[]>;

export type GetEventCenterResponseType = ResponseType<EventCenterType>;

export type AddEventCenterResponseType = ResponseType<EventCenterType>;
