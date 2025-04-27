import { UserFetchFilterType } from "@/schemas/auth.schema";
import { GetUserResponseType, GetUsersResponseType } from "@/types/user.types";
import { AxiosInstance } from "axios";

class UserServiceAPI {
  static getAllUsers = async ({
    protectedRequest,
    filter,
  }: {
    protectedRequest: AxiosInstance;
    filter: UserFetchFilterType;
  }) => {
    const { data } = await protectedRequest.get<GetUsersResponseType>("/users", {
      params: filter,
    });
    return data;
  };

  static getUser = async ({
    protectedRequest,
    id,
  }: {
    protectedRequest: AxiosInstance;
    id: string;
  }) => {
    const { data } = await protectedRequest.get<GetUserResponseType>(`/users/${id}`);
    return data;
  };

  // update user status
  static updateUserStatus = async ({
    protectedRequest,
    id,
    payload,
  }: {
    protectedRequest: AxiosInstance;
    id: string;
    payload: { status: string };
  }) => {
    const { data } = await protectedRequest.put<GetUserResponseType>(
      `/users/${id}`,
      payload
    );
    return data;
  };
}

export default UserServiceAPI;
