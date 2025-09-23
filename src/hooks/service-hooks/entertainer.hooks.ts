import EntertainerServiceAPI from "@/services/entertainer.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

// hook for fetching all entertainers
export const useGetEntertainers = ({
  filter,
}: {
  filter: { availability: "available" | "booked" | "all" };
}) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () =>
      await EntertainerServiceAPI.getEntertainers({ publicRequest, filter }),
    queryKey: ["entertainers", filter],
  });
};

// hook for fetching a single entertainer
export const useGetEntertainer = (id: string) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryFn: async () =>
      await EntertainerServiceAPI.getEntertainer({
        publicRequest,
        entertainerId: id,
      }),
    queryKey: ["entertainer", id],
  });
};

// hook for adding an entertainer
export const useCreateEntertainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EntertainerServiceAPI.createEntertainer,
    onSuccess: () => {
      toast.success("Entertainer created successfully");
      queryClient.invalidateQueries({ queryKey: ["entertainers"] });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to create entertainer");
      console.log(error);
    },
  });
};

// hook for updating an entertainer
export const useUpdateEntertainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EntertainerServiceAPI.updateEntertainer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["entertainers", "entertainer"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// hook for fetching user's entertainer service
export const useGetUserEntertainer = () => {
  const { protectedRequest } = useAxios();
  return useQuery({
    queryFn: async () =>
      await EntertainerServiceAPI.getUserEntertainer({ protectedRequest }),
    queryKey: ["user-entertainer"],
  });
};

// hook for deleting an entertainer
export const useDeleteEntertainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EntertainerServiceAPI.deleteEntertainer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["entertainers", "entertainer"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

// hook for booking an entertainer
// export const useBookEntertainer = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: EntertainerServiceAPI.bookEntertainer,
//     onSuccess: () => {
//       toast.success("Entertainer booked successfully");
//       queryClient.invalidateQueries({ queryKey: ["entertainers"] });
//     },
//     onError: (error) => {
//       const err = error as AxiosError<{ message: string }>;
//       toast.error(err.response?.data?.message || "Failed to book entertainer");
//       console.log(error);
//     },
//   });
// };

// // hook for unbooking an entertainer
// export const useUnbookEntertainer = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: EntertainerServiceAPI.unbookEntertainer,
//     onSuccess: () => {
//       toast.success("Entertainer unbooked successfully");
//       queryClient.invalidateQueries({ queryKey: ["entertainers"] });
//     },
//     onError: (error) => {
//       const err = error as AxiosError<{ message: string }>;
//       toast.error(err.response?.data?.message || "Failed to unbook entertainer");
//       console.log(error);
//     },
//   });
// };

// // hook for getting entertainer bookings
// export const useGetEntertainerBookings = (entertainerId: string) => {
//   const { publicRequest } = useAxios();
//   return useQuery({
//     queryFn: async () =>
//       await EntertainerServiceAPI.getEntertainerBookings({
//         publicRequest,
//         entertainerId,
//       }),
//     queryKey: ["entertainer", "bookings", entertainerId],
//   });
// };
