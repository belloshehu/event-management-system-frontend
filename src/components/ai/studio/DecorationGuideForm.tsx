"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import FormTextarea from "@/components/form-fields/FormTextarea";
import { toast } from "sonner";
import { LoadingDialog } from "@/components/LoadingDialog";
import {
  DecorationGuideSchemaType,
  decorationGuideSchema,
} from "@/schemas/ai/decoration-guide.schema";
import { useState } from "react";
import FormInputField from "@/components/form-fields/FormInput";
import { GenerateContentResponse } from "@google/genai";
import FormMultiSelect from "@/components/form-fields/FormMultiSelect";
import { NEXT_PUBLIC_PROD_BASE_URL } from "@/config";

export default function EventCenterDecorationForm({
  onClose,
  setContents,
  className,
  setShowForm,
}: {
  onClose?: () => void;
  setContents: (contents: GenerateContentResponse) => void;
  className?: string;
  setShowForm?: (showForm: boolean) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const { publicRequest } = useAxios();

  const form = useForm({
    resolver: zodResolver(decorationGuideSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: DecorationGuideSchemaType) => {
    // upload the images to cloudinary
    setIsPending(true);
    try {
      const colors = data.colors ? data.colors.join(", ") : "any color";
      const uploadedImage = await publicRequest.post(
        `${NEXT_PUBLIC_PROD_BASE_URL}/api/ai`,
        {
          prompt: `Generate decoration for the ${data.eventType} event hall. Suggested colors: ${colors}`,
        }
      );
      setContents(uploadedImage.data.data);
      setShowForm && setShowForm(false); // hide the form
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error generating image");
      console.error("Error generating image", error);
    } finally {
      setIsPending(false);
    }

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
      <LoadingDialog loadingText="Generating decoration ..." open={isPending} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "bg-white rounded-md p-5 border-[1px] flex flex-col justify-start text-left max-h-[80vh] space-y-5 overflow-y-auto w-full md:w-1/3 fixed bottom-3 md:bottom-10 right-0",
          className
        )}
      >
        {/* images */}
        <div className="flex flex-col md:flex-row w-full gap-2">
          <FormInputField
            control={control}
            name="eventType"
            type="text"
            id="eventType"
            placeholder="Event type"
            errorMessage={errors.eventType?.message}
          />

          <FormMultiSelect
            label=""
            name="colors"
            control={control}
            options={[
              { label: "red", value: "red" },
              { label: "blue", value: "blue" },
              { label: "green", value: "green" },
            ]}
            placeholder={"Select colors"}
            emptyMessage="No events found"
          />
        </div>
        <FormTextarea
          control={control}
          name="description"
          id="description"
          placeholder="Optional prompt for the event center decoration"
          errorMessage={errors.description?.message}
        />
        <Button
          disabled={isPending}
          className={cn("btn btn-primary", { "animate-pulse": isPending })}
          type="submit"
        >
          {isPending ? "Generating decorations... " : "Generate Decoration"}
        </Button>
      </form>
    </Form>
  );
}
