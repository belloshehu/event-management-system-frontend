import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import EventServiceAPI from "@/services/event.service";

export const useGetEvents = () => {
	const { publicRequest } = useAxios();
	return useQuery({
		queryKey: ["events"],
		queryFn: async () => await EventServiceAPI.getEvents(publicRequest),
	});
};

export const useSingleEvent = (id: string) => {
	const { publicRequest } = useAxios();
	return useQuery({
		queryKey: ["events", id],
		queryFn: async () => await EventServiceAPI.getEvent(publicRequest, id),
	});
};
