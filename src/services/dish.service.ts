import { DishValidationSchemaType } from "@/schemas/dish.schema";
import { GetDishesResponseType, SingleDishResponseType } from "@/types/dish.types";
import { AxiosInstance } from "axios";

class DishServiceAPI {
  static async createDish({
    protectedRequest,
    payload,
    catererId,
  }: {
    protectedRequest: AxiosInstance;
    payload: DishValidationSchemaType;
    catererId?: string;
  }) {
    const { data } = await protectedRequest.post<SingleDishResponseType>(
      `/dishes/caterer/${catererId}`,
      payload
    );
    return data;
  }
  static async getDishes({
    publicRequest,
    filter,
  }: {
    publicRequest: AxiosInstance;
    filter: { available: boolean };
  }) {
    const { data } = await publicRequest.get<GetDishesResponseType>("/dishes");
    return data;
  }

  static async getDish({
    publicRequest,
    dishId,
  }: {
    publicRequest: AxiosInstance;
    dishId: string;
  }) {
    const { data } = await publicRequest.get<SingleDishResponseType>(`/dishes/${dishId}`);
    return data;
  }

  // fetch dishes by caterer
  static async getDishesByCaterer({
    publicRequest,
    catererId,
  }: {
    publicRequest: AxiosInstance;
    catererId: string;
  }) {
    const { data } = await publicRequest.get<GetDishesResponseType>(
      `/dishes/caterer/${catererId}`
    );
    return data;
  }

  static async updateDish({
    protectedRequest,
    payload,
    dishId,
  }: {
    protectedRequest: AxiosInstance;
    dishId: string;
    payload: DishValidationSchemaType;
  }) {
    const { data } = await protectedRequest.put<SingleDishResponseType>(
      `/dishes/${dishId}`,
      payload
    );
    return data;
  }

  static async deleteDish({
    protectedRequest,
    dishId,
  }: {
    protectedRequest: AxiosInstance;
    dishId: string;
  }) {
    const { data } = await protectedRequest.delete<SingleDishResponseType>(
      `/dishes/${dishId}`
    );
    return data;
  }
}

export default DishServiceAPI;
