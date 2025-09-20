"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  eventCenterValidationSchema,
  EventCenterValidationSchemaType,
} from "@/schemas/event-center.schema";
import { supportedEvents } from "@/constants/form.data";
import { useCreateEventCenter } from "@/hooks/service-hooks/event-center.hooks";
import FormInputField from "../form-fields/FormInput";
import FormTextarea from "../form-fields/FormTextarea";
import FormMultiSelect from "../form-fields/FormMultiSelect";
import FormImagesUploader from "../form-fields/FormImagesUploader";
import useFileUpload from "@/hooks/use-file-upload";
import { toast } from "sonner";
import { LoadingDialog } from "../LoadingDialog";

export default function EventCenterForm({ onClose }: { onClose?: () => void }) {
  const { mutateAsync, isPending } = useCreateEventCenter();
  const { protectedRequest } = useAxios();
  const { uploadToCloudinary, isProgressing } = useFileUpload();

  const form = useForm({
    resolver: zodResolver(eventCenterValidationSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: EventCenterValidationSchemaType) => {
    // upload the images to cloudinary
    const images = [];
    for (let i = 0; i < data.images.length; i++) {
      const image = data.images[i];
      const { data_url } = image;
      const { secure_url } = await uploadToCloudinary(data_url);
      images.push(secure_url);
    }

    if (images.length == 0) {
      toast.error("Failed to upload images");
      return;
    }
    const transformedData = {
      ...data,
      images,
    };
    await mutateAsync({
      protectedRequest,
      payload: transformedData,
    });
    // reset after submit
    form.reset();
    // close modal
    onClose && onClose();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <LoadingDialog
        loadingText="Creating event center"
        open={isProgressing || isPending}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md p-5 border-[1px] flex flex-col justify-start text-left max-h-[80vh] space-y-5 overflow-y-auto w-full"
      >
        <FormInputField
          control={control}
          name="name"
          label="Event center name"
          type="text"
          id="name"
          placeholder="Enter event center name"
          errorMessage={errors.name?.message}
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
          name="address"
          label="Event center address"
          type="text"
          id="address"
          placeholder="Enter event center address"
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
          name="capacity"
          label="Capacity"
          type="number"
          id="capacity"
          placeholder="Capacity of the event center"
          errorMessage={errors.capacity?.message}
        />

        <FormMultiSelect
          label="Matching events"
          name="supported_events_types"
          control={control}
          options={supportedEvents}
          placeholder={"Select events"}
          emptyMessage="No events found"
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
          label="Event center Images"
          maxImageSize={1000000}
          maxNumber={10}
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
