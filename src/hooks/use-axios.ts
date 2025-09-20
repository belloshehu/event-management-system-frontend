"use client";

import useSession from "@/lib/session/use-session";
import axios from "axios";
import { useRouter } from "next/navigation";

const BACKEND_BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    : "https://event-centers-management-system-backend.onrender.com";

export const useAxios = () => {
  const { session, logout } = useSession();
  const router = useRouter();
  const token = session.token || "";
  const protectedRequest = axios.create({
    baseURL: BACKEND_BASE_URL,
  });
  const publicRequest = axios.create({ baseURL: BACKEND_BASE_URL });

  protectedRequest.interceptors.request.use(
    (request) => {
      request.headers["Authorization"] = `Bearer ${token}`;
      // request.headers['Content-Type'] = 'Application/json'
      return request;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  protectedRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        // logout when unauthenitcated error occurs
        logout();
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );

  return { protectedRequest, publicRequest };
};
