import { ResponseType } from "./response.types";

export interface UserType {
  email: string;
  firstName: string;
  lastName: string;
  varified: boolean;
  role: UserRole;
  _id?: string;
}

export interface UserAuthType {
  user: UserType;
}

export interface RefreshTokenType {
  refreshToken: string;
  expiresIn: number;
  token: string;
}

export type LoginResponseType = ResponseType<UserAuthType & RefreshTokenType>;

export type RegisterResponseType = ResponseType<UserAuthType>;
export type LogoutResponseType = ResponseType<UserAuthType>;

export type UserRole = "admin" | "user" | "partner";
