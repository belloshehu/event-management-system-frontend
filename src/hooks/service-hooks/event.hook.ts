import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import EventServiceAPI from "@/services/event.service";
import { toast } from "sonner";

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

// create event hook
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EventServiceAPI.createEvent,
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error("Failed to create event");
      console.error(error);
    },
  });
};
