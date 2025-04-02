import { EventCenterBookingPayloadType } from "@/schemas/event-center-booking.schema";
import { EventCenterValidationSchemaType } from "@/schemas/event-center.schema";
import {
  AddEventCenterResponseType,
  EventCenterBookingListResponseType,
  EventCenterBookingSingleResponseType,
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
    const { data } = await protectedRequest.post<AddEventCenterResponseType>(
      "/event-centers",
      payload
    );
    return data;
  }

  // book an event center
  static async bookEventCenter({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance;
    payload: EventCenterBookingPayloadType;
  }) {
    const { data } = await protectedRequest.post<EventCenterBookingSingleResponseType>(
      "/event-center-bookings",
      payload
    );
    return data;
  }

  // update an event center booking
  static async updateEventCenterBooking({
    protectedRequest,
    payload,
    id,
  }: {
    protectedRequest: AxiosInstance;
    payload: EventCenterBookingPayloadType;
    id: string;
  }) {
    const { data } = await protectedRequest.put<EventCenterBookingSingleResponseType>(
      `/event-center-bookings/${id}`,
      payload
    );
    return data;
  }

  // get all event center bookings
  static async getEventCenterBookings(protectedRequest: AxiosInstance) {
    const { data } = await protectedRequest.get<EventCenterBookingListResponseType>(
      "/event-center-bookings"
    );
    return data;
  }
}

export default EventCenterServiceAPI;
