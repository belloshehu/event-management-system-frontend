import { IGetEventCenterBookingQueryType } from "@/schemas/event-center-booking.schema";
import { EventCenterValidationSchemaType } from "@/schemas/event-center.schema";
import {
  AddEventCenterResponseType,
  EventCenterBookingListResponseType,
  EventCenterBookingSingleResponseType,
  GetEventCenterResponseType,
  GetEventCentersResponseType,
  EventCenterBookingPayloadType,
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
  static async getEventCenterBookings({
    protectedRequest,
    filter,
  }: {
    protectedRequest: AxiosInstance;
    filter: IGetEventCenterBookingQueryType;
  }) {
    const { data } = await protectedRequest.get<EventCenterBookingListResponseType>(
      `/event-center-bookings`,
      {
        params: {
          ...filter,
        },
      }
    );
    return data;
  }

  // get all event center bookings
  static async getEventCenterBookingsByEventCenter({
    protectedRequest,
    eventCenterId,
  }: {
    protectedRequest: AxiosInstance;
    eventCenterId: string;
  }) {
    const { data } = await protectedRequest.get<EventCenterBookingListResponseType>(
      `/event-center-bookings/${eventCenterId}`
    );
    return data;
  }

  // get single event booking
  static async getEventCenterBooking({
    protectedRequest,
    bookingId,
    eventCenterId,
  }: {
    protectedRequest: AxiosInstance;
    bookingId: string;
    eventCenterId: string;
  }) {
    const { data } = await protectedRequest.get<EventCenterBookingSingleResponseType>(
      `/event-center-bookings/${eventCenterId}/${bookingId}`
    );
    return data;
  }
}

export default EventCenterServiceAPI;
