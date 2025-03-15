import { ResponseType } from "./response.types";
import { UserType } from "./user.types";

export interface EntertainerType {
	_id: string;
	name: string;
	userId: UserType;
	images: string[];
	description: string;
	contact_number: string;
	contact_email: string;
	address: string;
	city: string;
	state: string;
	country: string;
	type: "music" | "comedy" | "dance" | "dj" | "mc" | "hypeman" | "others";
	available_for: string[];
	performance_duration: string;
	performance_languages: string[];
	availability: "available" | "booked";
	price: number;
	rating: number;
	currency:
		| "NGN"
		| "USD"
		| "EUR"
		| "GBP"
		| "CAD"
		| "AUD"
		| "ZAR"
		| "GHS"
		| "KES"
		| "SAR";
	createdAt: string;
	updatedAt: string;
}

export type GetEntertainersResponseType = ResponseType<EntertainerType[]>;
export type SingleEntertainerResponseType = ResponseType<EntertainerType>;
