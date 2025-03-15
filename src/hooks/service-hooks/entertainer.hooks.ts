import EntertainerServiceAPI from "@/services/entertainer.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../use-axios";

// hook for fetching all entertainers
export const useGetEntertainers = () => {
	const { publicRequest } = useAxios();
	return useQuery({
		queryFn: async () =>
			await EntertainerServiceAPI.getEntertainers({ publicRequest }),
		queryKey: ["entertainers"],
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
export const useAddEntertainer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: EntertainerServiceAPI.createEntertainer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["entertainers"] });
		},
		onError: (error) => {
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
