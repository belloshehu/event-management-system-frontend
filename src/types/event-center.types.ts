import { EventType } from "react-hook-form";
import { ResponseType } from "./response.types";
import { UserType } from "./user.types";

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

// booking
export interface EventCenterBookingType {
  event_center: EventCenterType;
  user: UserType;
  event: EventType;
  booking_status: "pending" | "booked" | "cancelled";
  payment_status: "pending" | "paid" | "failed";
  payment_reference: string;
  payment_date: string;
  payment_amount: number;
  payment_currency: "NGN" | "USD";
  payment_method: "card" | "bank" | "cash";
  payment_description: string;
}

export type EventCenterBookingSingleResponseType = ResponseType<EventCenterBookingType>;
export type EventCenterBookingListResponseType = ResponseType<EventCenterBookingType[]>;
