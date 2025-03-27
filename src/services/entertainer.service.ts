import { EntertainerValidationSchemaType } from "@/schemas/entertainer.schema";
import {
  EntertainerType,
  GetEntertainersResponseType,
  SingleEntertainerResponseType,
} from "@/types/entertainer.types";
import { AxiosInstance } from "axios";

class EntertainerServiceAPI {
  static async createEntertainer({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance;
    payload: EntertainerValidationSchemaType;
  }) {
    const { data } = await protectedRequest.post<SingleEntertainerResponseType>(
      "/entertainers",
      payload
    );
    return data;
  }

  static async getEntertainers({ publicRequest }: { publicRequest: AxiosInstance }) {
    const { data } = await publicRequest.get<GetEntertainersResponseType>(
      "/entertainers"
    );
    return data;
  }

  static async getEntertainer({
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

  static async updateEntertainer({
    protectedRequest,
    entertainer,
    entertainerId,
  }: {
    protectedRequest: AxiosInstance;
    entertainerId: string;
    entertainer: EntertainerType;
  }) {
    const { data } = await protectedRequest.put<SingleEntertainerResponseType>(
      `/entertainers/${entertainerId}`,
      entertainer
    );
    return data;
  }

  static async deleteEntertainer({
    protectedRequest,
    entertainerId,
  }: {
    protectedRequest: AxiosInstance;
    entertainerId: string;
  }) {
    const { data } = await protectedRequest.delete<SingleEntertainerResponseType>(
      `/entertainers/${entertainerId}`
    );
    return data;
  }
}

export default EntertainerServiceAPI;
