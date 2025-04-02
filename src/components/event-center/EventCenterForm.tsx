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
import { useCreateEventCenter } from "@/hooks/service-hooks/event-center.hooks";
import MultipleSelect from "../MultipleSelect";

export default function EventCenterForm() {
  const { mutate, isPending } = useCreateEventCenter();
  const { protectedRequest } = useAxios();

  const form = useForm({
    resolver: zodResolver(eventCenterValidationSchema),

    defaultValues: {
      images: [
        "https://res.cloudinary.com/sightek/image/upload/v1740954431/event4_mmmo3m.jpg",
        "https://res.cloudinary.com/sightek/image/upload/v1740954394/event3_yhumim.jpg",
      ],
    },
  });

  const onSubmit = async (data: EventCenterValidationSchemaType) => {
    mutate({ protectedRequest, payload: data });
  };
  const { handleSubmit, control } = form;
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md space-y-8 py-5 p-5 md:p-10 border-[1px] max-h-[80vh] overflow-y-auto w-full"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of event center" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Enter country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="Enter state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Capacity of the event center"
                  {...field}
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description of event center" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price of rent" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="supported_events_types"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Supported Events</FormLabel>
              <FormControl>
                <MultipleSelect
                  data={supportedEvents}
                  placeholder="Select supported event"
                  {...field}
                  // onChange={(value) => {
                  //   field.onChange(value);
                  // }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* contact */}
        <FormField
          control={control}
          name="contact_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="contact_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Contact email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* images */}

        {/* <FormField
          control={control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Upload event center image"
                  {...field}
                  type="file"
                  onChange={(e) => {
                    form.setValue("images", [
                      ...(form.getValues("images") || []),
                      e.target.value,
                    ]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
