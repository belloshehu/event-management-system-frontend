"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  eventCenterValidationSchema,
  EventCenterValidationSchemaType,
} from "@/schemas/event-center.schema";
import { Textarea } from "../ui/textarea";
import { supportedEvents } from "@/constants/form.data";
import {
  useBookEventCenter,
  useCreateEventCenter,
} from "@/hooks/service-hooks/event-center.hooks";
import MultipleSelect from "../MultipleSelect";
import {
  EventCenterBookingPayloadType,
  eventCenterBookingSchema,
} from "@/schemas/event-center-booking.schema";
import FormInputField from "../form-fields/FormInput";

/*
    This form is used to book an event center
    it will collect inform about the event to be hosted
    before going ahead to book the event center after making creating the event and making payment. 

    Hence the form will have three steps
    1. Collect event information
    2. Collect payment information
    3. Book event center
*/
export default function EventCenterBookingForm() {
  const { mutate, isPending } = useBookEventCenter();
  const { protectedRequest } = useAxios();

  const form = useForm({
    resolver: zodResolver(eventCenterBookingSchema),

    defaultValues: {},
  });

  const onSubmit = async (data: EventCenterBookingPayloadType) => {
    mutate({ protectedRequest, payload: data });
  };
  const { handleSubmit, control, register } = form;
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md space-y-8 py-5 p-5 md:p-10 border-[1px] max-h-[80vh] overflow-y-auto w-full"
      >
        <FormInputField
          control={control}
          register={register("event")}
          label="Event"
          type="text"
          id="event"
          placeholder="Enter event name"
          errorMessage="Event name is required"
        />

        <Button
          disabled={isPending}
          className={cn("btn btn-primary", { "animate-pulse": isPending })}
          type="submit"
        >
          {isPending ? "Adding event center..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
