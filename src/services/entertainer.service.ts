import {
	EntertainerType,
	GetEntertainersResponseType,
	SingleEntertainerResponseType,
} from "@/types/entertainer.types";
import { AxiosInstance } from "axios";

class EntertainerServiceAPI {
	public static async createEntertainer({
		privateRequest,
		entertainer,
	}: {
		privateRequest: AxiosInstance;
		entertainer: EntertainerType;
	}) {
		const { data } = await privateRequest.post<SingleEntertainerResponseType>(
			"/entertainers",
			entertainer
		);
		return data;
	}

	public static async getEntertainers({
		publicRequest,
	}: {
		publicRequest: AxiosInstance;
	}) {
		const { data } = await publicRequest.get<GetEntertainersResponseType>(
			"/entertainers"
		);
		return data;
	}

	public static async getEntertainer({
		publicRequest,
		entertainerId,
	}: {
		publicRequest: AxiosInstance;
		entertainerId: string;
	}) {
		const { data } = await publicRequest.get<SingleEntertainerResponseType>(
			`/entertainers/${entertainerId}`
		);
		return data;
	}

	public static async updateEntertainer({
		privateRequest,
		entertainer,
		entertainerId,
	}: {
		privateRequest: AxiosInstance;
		entertainerId: string;
		entertainer: EntertainerType;
	}) {
		const { data } = await privateRequest.put<SingleEntertainerResponseType>(
			`/entertainers/${entertainerId}`,
			entertainer
		);
		return data;
	}

	public static async deleteEntertainer({
		privateRequest,
		entertainerId,
	}: {
		privateRequest: AxiosInstance;
		entertainerId: string;
	}) {
		const { data } = await privateRequest.delete<SingleEntertainerResponseType>(
			`/entertainers/${entertainerId}`
		);
		return data;
	}
}

export default EntertainerServiceAPI;
