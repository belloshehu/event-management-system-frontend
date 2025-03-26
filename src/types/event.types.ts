import { EventCenterSupportedEventsTypes, EventCenterType } from "./event-center.types";
import { ResponseType } from "./response.types";

export interface EventType {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  images: [string];
  endTime: string;
  cost?: number;
  createdAt: string;
  updatedAt: string;
  eventCenter: EventCenterType;
  eventType: EventCenterSupportedEventsTypes;
  user: string;
}
export type GetEventsResponseType = ResponseType<EventType[]>;
export type GetSingleEventResponseType = ResponseType<EventType>;
