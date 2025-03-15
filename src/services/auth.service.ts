import {
  LoginResponseType,
  LogoutResponseType,
  RegisterResponseType,
} from "@/types/user.types";
import { AxiosInstance } from "axios";

class AuthServiceAPI {
  static loginUser = async ({
    publicRequest,
    payload,
  }: {
    publicRequest: AxiosInstance;
    payload: { password: string; email: string };
  }) => {
    const { data } = await publicRequest.post<LoginResponseType>("/auth/login", payload);
    return data;
  };

  static registerUser = async ({
    publicRequest,
    payload,
  }: {
    publicRequest: AxiosInstance;
    payload: { password: string; email: string };
  }) => {
    const { data } = await publicRequest.post<RegisterResponseType>(
      "/auth/signup",
      payload
    );
    return data;
  };

  static logoutUser = async ({
    protectedRequest,
  }: {
    protectedRequest: AxiosInstance;
  }) => {
    const { data } = await protectedRequest.post<LogoutResponseType>("/auth/logout");
    return data;
  };
}

export default AuthServiceAPI;
