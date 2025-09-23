import BeverageServiceAPI from "@/services/beverage.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAxios } from "../use-axios";

export const useCreateBeverage = ({ catererId }: { catererId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BeverageServiceAPI.createBeverage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beverages", catererId] });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to create beverage");
      console.log(error);
    },
  });
};

// service hook for updating fetching Beverage by id
export const useUpdateBeverage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BeverageServiceAPI.updateBeverage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["beverages", "beverage"],
      });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to update beverage");
      console.log(error);
    },
  });
};

// service hook for deleting a Beverage by id
export const useDeleteBeverage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BeverageServiceAPI.deleteBeverage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["beverages"] });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to delete beverage");
      console.log(error);
    },
  });
};

// Service hook for fetching all Beveragees with a filter
export const useGetBeverages = ({ filter }: { filter: { available: boolean } }) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () => await BeverageServiceAPI.getBeverages({ publicRequest, filter }),
    queryKey: ["beverages", filter],
  });
};

// Service hook for fetching Beveragees by catererid
export const useGetBeveragesByCaterer = ({ catererId }: { catererId: string }) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () =>
      await BeverageServiceAPI.getBeveragesByCaterer({ publicRequest, catererId }),
    queryKey: ["beverages", catererId],
  });
};

// Service hook for fetching a single Beverage by id
export const useGetBeverage = (id: string) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () =>
      await BeverageServiceAPI.getBeverage({
        publicRequest,
        beverageId: id,
      }),
    queryKey: ["beverage", id],
  });
};
