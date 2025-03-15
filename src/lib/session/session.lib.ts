import { UserType } from "@/types/user.types";
import { SessionOptions } from "iron-session";

export interface SessionData extends UserType {
  token: string;
  refreshToken: string;
  expiresIn: number;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  user: {
    email: "",
    firstName: "",
    lastName: "",
    role: "user",
    varified: false,
  },
  isLoggedIn: false,
  token: "",
  refreshToken: "",
  expiresIn: 0,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "EVENT_MAN",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
    // httpOnly: true,
    httpOnly: process.env.NODE_ENV === "production",
    // sameSite: "lax",
    sameSite: "lax",
  },
};
