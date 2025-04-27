import EventCenterServiceAPI from "@/services/event-center.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../use-axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { IGetEventCenterBookingQueryType } from "@/schemas/event-center-booking.schema";

export const useGetEventCenters = () => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryKey: ["event-centers"],
    queryFn: async () => await EventCenterServiceAPI.getEventCenters(publicRequest),
  });
};

export const useGetEventCenter = (id: string) => {
  const { publicRequest } = useAxios();
  return useQuery({
    queryKey: ["event-center", id],
    queryFn: async () => await EventCenterServiceAPI.getEventCenter(publicRequest, id),
  });
};

// create event center
export const useCreateEventCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EventCenterServiceAPI.addEventCenter,
    onSuccess: () => {
      toast.success("Event center created successfully");
      queryClient.invalidateQueries({ queryKey: ["event-centers"] });
    },
    onError: (error) => {
      toast.error("Failed to create event center");
      console.error(error);
    },
  });
};

/*
EVENT CENTER BOOKING HOOKS
Specific hooks for booking an event center
*/

// book an event center
export const useBookEventCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EventCenterServiceAPI.bookEventCenter,
    onSuccess: () => {
      toast.success("Event center booked successfully");
      queryClient.invalidateQueries({ queryKey: ["event-centers", "events"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Failed to create entertainer");
      console.error(error);
    },
  });
};

// get all event center bookings
export const useGetEventCenterBookings = ({
  filter,
}: {
  filter: IGetEventCenterBookingQueryType;
}) => {
  const { protectedRequest } = useAxios();
  return useQuery({
    queryKey: ["event-center-bookings"],
    queryFn: async () =>
      await EventCenterServiceAPI.getEventCenterBookings({
        protectedRequest,
        filter,
      }),
  });
};

// get all event center bookings
export const useGetEventCenterBookingsByEventCenter = (eventCenterId: string) => {
  const { protectedRequest } = useAxios();
  return useQuery({
    queryKey: ["event-center-bookings"],
    queryFn: async () =>
      await EventCenterServiceAPI.getEventCenterBookingsByEventCenter({
        protectedRequest,
        eventCenterId,
      }),
  });
};

// get single event center by Id
export const useGetEventCenterBookingById = ({
  bookingId,
  eventCenterId,
}: {
  bookingId: string;
  eventCenterId: string;
}) => {
  const { protectedRequest } = useAxios();
  return useQuery({
    queryKey: ["event-center-booking", bookingId, eventCenterId],
    queryFn: async () =>
      await EventCenterServiceAPI.getEventCenterBooking({
        protectedRequest,
        bookingId,
        eventCenterId,
      }),
  });
};
