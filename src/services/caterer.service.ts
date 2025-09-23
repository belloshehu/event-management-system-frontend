import { CatererValidationSchemaType } from "@/schemas/caterer.schema";
import {
  CatererType,
  GetCaterersResponseType,
  SingleCatererResponseType,
} from "@/types/caterer.types";
import { AxiosInstance } from "axios";

class CatererServiceAPI {
  static async createCaterer({
    protectedRequest,
    payload,
  }: {
    protectedRequest: AxiosInstance;
    payload: CatererValidationSchemaType;
  }) {
    const { data } = await protectedRequest.post<SingleCatererResponseType>(
      "/caterers",
      payload
    );
    return data;
  }

  static async getCaterers({
    publicRequest,
    filter,
  }: {
    publicRequest: AxiosInstance;
    filter: { availability: "available" | "booked" | "all" };
  }) {
    const { data } = await publicRequest.get<GetCaterersResponseType>("/caterers", {
      params: {
        ...filter,
      },
    });
    return data;
  }

  static async getCaterer({
    publicRequest,
    catererId,
  }: {
    publicRequest: AxiosInstance;
    catererId: string;
  }) {
    const { data } = await publicRequest.get<SingleCatererResponseType>(
      `/caterers/${catererId}`
    );
    return data;
  }

  // get user's catering service
  static async getUserCaterer({ protectedRequest }: { protectedRequest: AxiosInstance }) {
    const { data } = await protectedRequest.get<SingleCatererResponseType>(
      `/caterers/user/service`
    );
    return data;
  }

  static async updateCaterer({
    protectedRequest,
    caterer,
    catererId,
  }: {
    protectedRequest: AxiosInstance;
    catererId: string;
    caterer: CatererType;
  }) {
    const { data } = await protectedRequest.put<SingleCatererResponseType>(
      `/caterers/${catererId}`,
      caterer
    );
    return data;
  }

  static async deleteCaterer({
    protectedRequest,
    catererId,
  }: {
    protectedRequest: AxiosInstance;
    catererId: string;
  }) {
    const { data } = await protectedRequest.delete<SingleCatererResponseType>(
      `/caterers/${catererId}`
    );
    return data;
  }
}

export default CatererServiceAPI;
