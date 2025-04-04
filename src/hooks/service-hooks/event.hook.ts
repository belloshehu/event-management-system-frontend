import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import EventServiceAPI from "@/services/event.service";
import { toast } from "sonner";
import { AxiosError } from "axios";

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
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to create event");
    },
  });
};

// delete event hook
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EventServiceAPI.deleteEvent,
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message || "Failed to delete event");
      console.error(error);
    },
  });
};
