// service api for beverages offered by caterer
import { BeverageValidationSchemaType } from "@/schemas/beverage.schema";
import {
  GetBeveragesResponseType,
  SingleBeverageResponseType,
} from "@/types/beverage.types";
import { AxiosInstance } from "axios";

class BeverageServiceAPI {
  static async createBeverage({
    protectedRequest,
    payload,
    catererId,
  }: {
    protectedRequest: AxiosInstance;
    payload: BeverageValidationSchemaType;
    catererId: string;
  }) {
    const { data } = await protectedRequest.post<SingleBeverageResponseType>(
      `/beverages/caterer/${catererId}`,
      payload
    );
    return data;
  }
  static async getBeverages({
    publicRequest,
    filter,
  }: {
    publicRequest: AxiosInstance;
    filter: { available: boolean };
  }) {
    const { data } = await publicRequest.get<GetBeveragesResponseType>("/beverages");
    return data;
  }

  static async getBeverage({
    publicRequest,
    beverageId,
  }: {
    publicRequest: AxiosInstance;
    beverageId: string;
  }) {
    const { data } = await publicRequest.get<SingleBeverageResponseType>(
      `/beverages/${beverageId}`
    );
    return data;
  }

  // fetch Beveragees by caterer
  static async getBeveragesByCaterer({
    publicRequest,
    catererId,
  }: {
    publicRequest: AxiosInstance;
    catererId: string;
  }) {
    const { data } = await publicRequest.get<GetBeveragesResponseType>(
      `/beverages/caterer/${catererId}`
    );
    return data;
  }

  static async updateBeverage({
    protectedRequest,
    payload,
    beverageId,
  }: {
    protectedRequest: AxiosInstance;
    beverageId: string;
    payload: BeverageValidationSchemaType;
  }) {
    const { data } = await protectedRequest.put<SingleBeverageResponseType>(
      `/beverages/${beverageId}`,
      payload
    );
    return data;
  }

  static async deleteBeverage({
    protectedRequest,
    beverageId,
  }: {
    protectedRequest: AxiosInstance;
    beverageId: string;
  }) {
    const { data } = await protectedRequest.delete<SingleBeverageResponseType>(
      `/beverages/${beverageId}`
    );
    return data;
  }
}

export default BeverageServiceAPI;
