import { EntertainerType } from "./entertainer.types";
import { EventType } from "./event.types";
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
  status: "active" | "inactive" | "booked" | "pending" | "available";
}

export type GetEventCentersResponseType = ResponseType<EventCenterType[]>;

export type GetEventCenterResponseType = ResponseType<EventCenterType>;

export type AddEventCenterResponseType = ResponseType<EventCenterType>;

// booking
interface BaseEventCenterBookingType {
  booking_status: "pending" | "successful" | "cancelled";
  payment_status: "pending" | "successful" | "failed";
  payment_reference: string;
  payment_date: string;
  payment_amount: number;
  payment_currency: "NGN" | "USD";
  payment_method?: "card" | "bank" | "cash";
  payment_description?: string;
}
export interface EventCenterBookingType extends BaseEventCenterBookingType {
  _id: string;
  event_center: EventCenterType;
  user?: UserType;
  event: EventType;
  entertainers?: EntertainerType;
}

export interface EventCenterBookingPayloadType extends BaseEventCenterBookingType {
  event_center: string;
  event: string;
  entertainers?: string[];
}

export type EventCenterBookingSingleResponseType = ResponseType<EventCenterBookingType>;
export type EventCenterBookingListResponseType = ResponseType<EventCenterBookingType[]>;
