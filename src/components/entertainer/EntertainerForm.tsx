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
import { Textarea } from "../ui/textarea";
import {
  availabilityOptions,
  currencyOptions,
  entertainmentOptions,
  supportedEvents,
  supportedLanguagesOptions,
} from "@/constants/form.data";
import MultipleSelect from "../MultipleSelect";
import {
  entertainerValidationSchema,
  EntertainerValidationSchemaType,
} from "@/schemas/entertainer.schema";
import FormSelect from "../form-fields/FormSelect";
import { useCreateEntertainer } from "@/hooks/service-hooks/entertainer.hooks";

export default function EntertainerForm({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateEntertainer();
  const { protectedRequest } = useAxios();

  const form = useForm({
    resolver: zodResolver(entertainerValidationSchema),

    defaultValues: {
      images: [
        "https://res.cloudinary.com/sightek/image/upload/v1741620903/entertainment_d9dryo.jpg",
        "https://res.cloudinary.com/sightek/image/upload/v1639945302/samples/people/jazz.jpg",
      ],
    },
  });

  const onSubmit = async (data: EntertainerValidationSchemaType) => {
    mutateAsync({ protectedRequest, payload: data }).then(() => {
      form.reset();
      onClose();
    });
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
                <Input placeholder="Name of entertainer" {...field} />
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entertainment type</FormLabel>
              <FormControl>
                <FormSelect
                  options={entertainmentOptions}
                  {...field}
                  placeholder="Entertainment"
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
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <FormSelect options={currencyOptions} placeholder="Currency" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="available_for"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Available for</FormLabel>
              <FormControl>
                <MultipleSelect
                  data={supportedEvents}
                  placeholder="Select supported event"
                  {...field}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="availability"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Availability Status</FormLabel>
              <FormControl>
                <FormSelect
                  placeholder="Select status"
                  {...field}
                  options={availabilityOptions}
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

        <FormField
          control={control}
          name="performance_duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Duration</FormLabel>
              <FormControl>
                <Input placeholder="Performance duration" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="performance_languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supported Languages</FormLabel>
              <FormControl>
                <MultipleSelect
                  data={supportedLanguagesOptions}
                  placeholder="Select supported languages"
                  {...field}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
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
