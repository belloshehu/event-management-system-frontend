"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import {
  entertainmentOptions,
  supportedEvents,
  supportedLanguagesOptions,
} from "@/constants/form.data";
import {
  entertainerValidationSchema,
  EntertainerValidationSchemaType,
} from "@/schemas/entertainer.schema";
import FormSelect from "../form-fields/FormSelect";
import { useCreateEntertainer } from "@/hooks/service-hooks/entertainer.hooks";
import FormInputField from "../form-fields/FormInput";
import FormTextarea from "../form-fields/FormTextarea";
import FormMultiSelect from "../form-fields/FormMultiSelect";
import FormImagesUploader from "../form-fields/FormImagesUploader";

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
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = form;
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md space-y-8 py-5 p-5 md:p-10 border-[1px] text-left max-h-[80vh] overflow-y-auto w-full"
      >
        <FormInputField
          control={control}
          name="name"
          label="Name"
          type="text"
          id="name"
          placeholder="Name of entertainer"
          errorMessage={errors.name?.message}
        />

        <FormInputField
          control={control}
          name="address"
          label="Address"
          type="text"
          id="address"
          placeholder="Enter address"
          errorMessage={errors.address?.message}
        />

        <FormInputField
          control={control}
          name="country"
          label="Country"
          type="text"
          id="country"
          placeholder="Enter country"
          errorMessage={errors.country?.message}
        />

        <FormInputField
          control={control}
          name="state"
          label="State"
          type="text"
          id="state"
          placeholder="Enter state"
          errorMessage={errors.state?.message}
        />
        <FormInputField
          control={control}
          name="city"
          label="City"
          type="text"
          id="city"
          placeholder="Enter city"
          errorMessage={errors.city?.message}
        />

        <FormSelect
          options={entertainmentOptions}
          placeholder="Select entertainer type"
          register={register("type")}
          control={control}
        />

        <FormTextarea
          control={control}
          label="Description"
          name="description"
          id="description"
          placeholder="Description of entertainer"
          errorMessage={errors.description?.message}
        />

        <FormInputField
          control={control}
          name="price"
          label="Price"
          type="number"
          id="price"
          placeholder="Price of entertainer"
          errorMessage={errors.price?.message}
        />

        <FormInputField
          control={control}
          name="currency"
          label="Currency"
          type="text"
          id="currency"
          placeholder="Enter currency"
          errorMessage={errors.currency?.message}
        />

        <FormMultiSelect
          label="Matching events"
          name="supported_events_types"
          control={control}
          options={supportedEvents}
          placeholder={"Select events"}
          emptyMessage="No events found"
        />

        <FormSelect
          options={entertainmentOptions}
          placeholder="Select status"
          register={register("availability")}
          control={control}
        />

        {/* contact */}
        <FormInputField
          control={control}
          name="contact_number"
          label="Phone number"
          type="tel"
          id="contact_number"
          placeholder="Phone number"
          errorMessage={errors.contact_number?.message}
        />

        <FormInputField
          control={control}
          name="contact_email"
          label="Email"
          type="email"
          id="contact_email"
          placeholder="Contact email"
          errorMessage={errors.contact_email?.message}
        />

        <FormInputField
          control={control}
          name="performance_duration"
          label="Performance duration"
          type="number"
          id="performance_duration"
          placeholder="Duration in minutes"
          errorMessage={errors.performance_duration?.message}
        />

        <FormMultiSelect
          label="Performance languages"
          name="performance_languages"
          control={control}
          options={supportedLanguagesOptions}
          placeholder={"Select languages"}
          emptyMessage="No languages found"
        />

        {/* images */}
        <FormImagesUploader
          control={control}
          name="images"
          label="Entertainer Images"
          maxImageSize={1000000}
          maxNumber={5}
          multiple={true}
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
