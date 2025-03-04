import {
	AddEventCenterResponseType,
	EventCenterType,
	GetEventCenterResponseType,
	GetEventCentersResponseType,
} from "@/types/event-center.types";
import { AxiosInstance } from "axios";

class EventCenterServiceAPI {
	public static async getEventCenters(publicRequest: AxiosInstance) {
		const { data } = await publicRequest.get<GetEventCentersResponseType>(
			"/event-centers"
		);
		return data;
	}

	public static async getEventCenter(publicRequest: AxiosInstance, id: string) {
		const { data } = await publicRequest.get<GetEventCenterResponseType>(
			`/event-centers/${id}`
		);
		return data;
	}

	public static async addEventCenter(
		privateRequest: AxiosInstance,
		eventCenter: EventCenterType
	) {
		const { data } = await privateRequest.post<AddEventCenterResponseType>(
			"/event-centers",
			eventCenter
		);
		return data;
	}
}

export default EventCenterServiceAPI;
