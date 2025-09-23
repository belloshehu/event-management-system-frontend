"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import useFileUpload from "@/hooks/use-file-upload";
import FormInputField from "@/components/form-fields/FormInput";
import FormTextarea from "@/components/form-fields/FormTextarea";
import FormImagesUploader from "@/components/form-fields/FormImagesUploader";
import { toast } from "sonner";
import {
  beverageValidationSchema,
  BeverageValidationSchemaType,
} from "@/schemas/beverage.schema";
import { useCreateBeverage } from "@/hooks/service-hooks/beverage.hook";

export default function BeverageForm({
  onClose,
  catererId,
}: {
  onClose: () => void;
  catererId: string;
}) {
  const { mutateAsync, isPending } = useCreateBeverage({ catererId });
  const { protectedRequest } = useAxios();
  const { uploadToCloudinary, deleteFromCloudinary, isProgressing } = useFileUpload();
  const form = useForm({
    resolver: zodResolver(beverageValidationSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: BeverageValidationSchemaType) => {
    console.log("Submitting ... ", data);
    // Handle form submission logic here
    // upload the image and thumbnails to cloudinary
    const image = data.image as any;
    const data_url = image[0].data_url as string;

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
          image: secure_url,
        },
        catererId,
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
          placeholder="Name of beverage"
          errorMessage={errors.name?.message}
        />

        <FormTextarea
          control={control}
          label="Description"
          name="description"
          id="description"
          placeholder="Description of beverage"
          errorMessage={errors.description?.message}
        />

        <FormInputField
          control={control}
          name="price"
          label="Price"
          type="number"
          id="price"
          placeholder="Price of beverage"
          errorMessage={errors.price?.message}
        />

        <FormInputField
          control={control}
          name="quantity"
          label="Quantity"
          type="number"
          id="quantity"
          placeholder="Quantity of beverage"
          errorMessage={errors.quantity?.message}
        />
        <FormInputField
          control={control}
          name="size"
          label="Size (cl)"
          type="number"
          id="size"
          placeholder="Size in centi-liter(cl)"
          errorMessage={errors.size?.message}
        />

        {/* images */}
        <FormImagesUploader
          control={control}
          name="image"
          label="Dish image"
          maxImageSize={1000000}
          maxNumber={1}
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
