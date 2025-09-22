"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import useFileUpload from "@/hooks/use-file-upload";
import { availabilityOptions, supportedEvents } from "@/constants/form.data";
import FormSelect from "../form-fields/FormSelect";
import FormInputField from "../form-fields/FormInput";
import FormTextarea from "../form-fields/FormTextarea";
import FormMultiSelect from "../form-fields/FormMultiSelect";
import FormImagesUploader from "../form-fields/FormImagesUploader";
import { toast } from "sonner";
import { useCreateCaterer } from "@/hooks/service-hooks/caterer.hook";
import {
  catererValidationSchema,
  CatererValidationSchemaType,
} from "@/schemas/caterer.schema";

export default function EntertainerForm({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateCaterer();
  const { protectedRequest } = useAxios();
  const { uploadToCloudinary, deleteFromCloudinary, isProgressing } = useFileUpload();
  const form = useForm({
    resolver: zodResolver(catererValidationSchema),

    defaultValues: {},
  });

  const onSubmit = async (data: CatererValidationSchemaType) => {
    console.log("Submitting ... ", data);
    // Handle form submission logic here
    // upload the image and thumbnails to cloudinary
    const image = data.images[0] as any;
    const data_url = image.data_url as string;

    try {
      const { secure_url } = await uploadToCloudinary(data_url);
      if (!secure_url) {
        toast.error("Failed to upload images");
        return;
      }
      // upload the images to cloudinary

      console.log("Uploading main image");
      mutateAsync({
        protectedRequest,
        payload: {
          ...data,
          images: [secure_url],
        },
      })
        .then(() => {
          form.reset();
          onClose();
        })
        .catch((error) => {
          // if there is an error delete the uploaded image from cloudinary
          deleteFromCloudinary(secure_url);
        });
    } catch (error) {
      toast.error("Failed to register caterer");
    }
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isLoading },
  } = form;
  console.log(errors);
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="entertainer-form"
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

        <FormTextarea
          control={control}
          label="Description"
          name="description"
          id="description"
          placeholder="Description of entertainer"
          errorMessage={errors.description?.message}
        />

        <FormMultiSelect
          label="Matching events"
          name="available_for"
          control={control}
          options={supportedEvents}
          placeholder={"Select events"}
          emptyMessage="No events found"
        />

        <FormSelect
          options={availabilityOptions}
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

        {/* images */}
        <FormImagesUploader
          control={control}
          name="images"
          label="Caterer Images"
          maxImageSize={1000000}
          maxNumber={3}
          multiple={true}
        />
        <Button
          disabled={isPending || isLoading || isProgressing}
          className={cn("btn btn-primary", {
            "animate-pulse": isPending || isLoading || isProgressing,
          })}
          type="submit"
        >
          {isPending || isLoading || isProgressing ? "Submitting..." : "Submit"}
        </Button>
        {errors.root?.message}
        {errors.root?.message && (
          <p className="text-sm text-red-600">{errors.root?.message}</p>
        )}
      </form>
    </Form>
  );
}
