import DishServiceAPI from "@/services/dish.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAxios } from "../use-axios";

export const useCreateDish = ({ catererId }: { catererId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DishServiceAPI.createDish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes", catererId] });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to create dish");
      console.log(error);
    },
  });
};

// service hook for updating fetching dish by id
export const useUpdateDish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DishServiceAPI.updateDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishes", "dish"],
      });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to update dish");
      console.log(error);
    },
  });
};

// service hook for deleting a dish by id
export const useDeleteDish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DishServiceAPI.deleteDish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dishes"] });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to delete dish");
      console.log(error);
    },
  });
};

// Service hook for fetching all dishes with a filter
export const useGetDishes = ({ filter }: { filter: { available: boolean } }) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () => await DishServiceAPI.getDishes({ publicRequest, filter }),
    queryKey: ["dishes", filter],
  });
};

// Service hook for fetching dishes by catererid
export const useGetDishesByCaterer = ({ catererId }: { catererId: string }) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () =>
      await DishServiceAPI.getDishesByCaterer({ publicRequest, catererId }),
    queryKey: ["dishes", catererId],
  });
};

// Service hook for fetching a single dish by id
export const useGetDish = (id: string) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () =>
      await DishServiceAPI.getDish({
        publicRequest,
        dishId: id,
      }),
    queryKey: ["dish", id],
  });
};
