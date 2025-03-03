import EventCenterServiceAPI from "@/services/event-center.service";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../use-axios";

export const useGetEventCenters = () => {
	const { publicRequest } = useAxios();
	return useQuery({
		queryKey: ["event-centers"],
		queryFn: async () =>
			await EventCenterServiceAPI.getEventCenters(publicRequest),
	});
};

export const useGetEventCenter = (id: string) => {
	const { publicRequest } = useAxios();
	return useQuery({
		queryKey: ["event-center", id],
		queryFn: async () =>
			await EventCenterServiceAPI.getEventCenter(publicRequest, id),
	});
};
