import { AddEventCenterResponseType } from "@/types/event-center.types";
import {
	EventType,
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
		const { data } = await publicRequest.get<GetSingleEventResponseType>(
			`/events/${id}`
		);
		return data;
	}

	public static async addEvent(
		privateRequest: AxiosInstance,
		event: EventType
	) {
		const { data } = await privateRequest.post<AddEventCenterResponseType>(
			"/events",
			event
		);
		return data;
	}
}

export default EventServiceAPI;
