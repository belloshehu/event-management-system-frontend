import { ResponseType } from "./response.types";

export interface UserType {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    varified: boolean;
    role: "admin" | "user";
  };
}

export interface RefreshTokenType {
  refreshToken: string;
  expiresIn: number;
  token: string;
}

export type LoginResponseType = ResponseType<UserType & RefreshTokenType>;

export type RegisterResponseType = ResponseType<UserType>;
export type LogoutResponseType = ResponseType<UserType>;
