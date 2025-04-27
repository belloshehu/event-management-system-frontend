// get all users

import UserServiceAPI from "@/services/user.service.";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import { UserFetchFilterType } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useGetUsers = ({ filter }: { filter: UserFetchFilterType }) => {
  const { protectedRequest } = useAxios();
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UserServiceAPI.getAllUsers({ protectedRequest, filter }),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetUser = (id: string) => {
  const { protectedRequest } = useAxios();

  return useQuery({
    queryKey: ["user", id],
    queryFn: () => UserServiceAPI.getUser({ protectedRequest, id }),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

// update user status
export const useUpdateUserStatus = () => {
  return useMutation({
    mutationFn: UserServiceAPI.updateUserStatus,
    onSuccess: () => {
      toast.success("User status updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Failed to update user status");
    },
  });
};
