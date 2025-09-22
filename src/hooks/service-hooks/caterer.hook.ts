import CatererServiceAPI from "@/services/caterer.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

// hook for fetching all Caterers
export const useGetCaterers = ({
  filter,
}: {
  filter: { availability: "available" | "booked" | "all" };
}) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () => await CatererServiceAPI.getCaterers({ publicRequest, filter }),
    queryKey: ["caterers", filter],
  });
};

// hook for fetching a single Caterer
export const useGetCaterer = (id: string) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () =>
      await CatererServiceAPI.getCaterer({
        publicRequest,
        catererId: id,
      }),
    queryKey: ["caterer", id],
  });
};

// hook for adding an Caterer
export const useCreateCaterer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CatererServiceAPI.createCaterer,
    onSuccess: () => {
      toast.success("Caterer created successfully");
      queryClient.invalidateQueries({ queryKey: ["caterers"] });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to create Caterer");
      console.log(error);
    },
  });
};

// hook for updating an Caterer
export const useUpdateCaterer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CatererServiceAPI.updateCaterer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["caterers", "caterer"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// hook for deleting an Caterer
export const useDeleteCaterer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CatererServiceAPI.deleteCaterer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["caterers", "caterer"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
