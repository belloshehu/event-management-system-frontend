import { ResponseType } from "./response.types";

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

export interface GetEventCentersResponseType
	extends ResponseType<EventCenterType[]> {}

export interface GetEventCenterResponseType
	extends ResponseType<EventCenterType> {}
