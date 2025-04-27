"use client";
import useSession from "@/lib/session/use-session";
import AuthServiceAPI from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const { login } = useSession();
  const router = useRouter();
  return useMutation({
    mutationFn: AuthServiceAPI.loginUser,
    onSuccess: async (data) => {
      await login(data.data);
      toast(data.message || "Logged in successfully");
      if (data.data.user.role === "admin") router.push("/dashboard/admin");
      else if (data.data.user.role === "partner") router.push("/dashboard/partner");
      else router.push("/dashboard/user");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; status: string }>;
      toast.error(err.response?.data.message || "Login  Failed!");
    },
  });
};

export const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthServiceAPI.registerUser,
    onSuccess: () => {
      toast.success("Signup successfullys");
      router.push("/login");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; status: string }>;
      toast.error(err.response?.data.message || "Failed to signups");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useSession();
  return useMutation({
    mutationFn: AuthServiceAPI.logoutUser,
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully");
      router.push("/");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string; status: string }>;
      toast.error(err.response?.data.message || "Failed to logout");
      console.error(err.response?.data.message);
    },
  });
};
