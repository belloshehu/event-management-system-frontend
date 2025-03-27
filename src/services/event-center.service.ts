import { EventCenterValidationSchemaType } from "@/schemas/event-center.schema";
import {
  AddEventCenterResponseType,
  GetEventCenterResponseType,
  GetEventCentersResponseType,
} from "@/types/event-center.types";
import { AxiosInstance } from "axios";

class EventCenterServiceAPI {
  static async getEventCenters(publicRequest: AxiosInstance) {
    const { data } = await publicRequest.get<GetEventCentersResponseType>(
      "/event-centers"
    );
    return data;
  }

  static async getEventCenter(publicRequest: AxiosInstance, id: string) {
    const { data } = await publicRequest.get<GetEventCenterResponseType>(
      `/event-centers/${id}`
    );
    return data;
  }

  static async addEventCenter({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance;
    payload: EventCenterValidationSchemaType;
  }) {
    console.log(payload, protectedRequest.get("Authorization"));
    const { data } = await protectedRequest.post<AddEventCenterResponseType>(
      "/event-centers",
      payload
    );
    return data;
  }
}

export default EventCenterServiceAPI;
