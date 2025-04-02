import { IEventPayloadType } from "@/schemas/event.schema";
import {
  AddEventResponseType,
  GetEventsResponseType,
  GetSingleEventResponseType,
} from "@/types/event.types";
import { AxiosInstance } from "axios";

class EventServiceAPI {
  public static async getEvents(publicRequest: AxiosInstance) {
    const { data } = await publicRequest.get<GetEventsResponseType>("/events");
    return data;
  }

  public static async getEvent(publicRequest: AxiosInstance, id: string) {
    const { data } = await publicRequest.get<GetSingleEventResponseType>(`/events/${id}`);
    return data;
  }

  public static async createEvent({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance;
    payload: IEventPayloadType;
  }) {
    const { data } = await protectedRequest.post<AddEventResponseType>(
      "/events",
      payload
    );
    return data;
  }
}

export default EventServiceAPI;
