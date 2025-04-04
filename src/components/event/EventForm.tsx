"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import FormInputField from "../form-fields/FormInput";
import { useCreateEvent, useDeleteEvent } from "@/hooks/service-hooks/event.hook";
import { eventValidationSchema, IEventPayloadType } from "@/schemas/event.schema";
import FormTextarea from "../form-fields/FormTextarea";
import FormSelect from "../form-fields/FormSelect";
import FormSwitch from "../form-fields/FormSwitch";
import { useCallback, useState } from "react";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import { EntertainerType } from "@/types/entertainer.types";
import FormImagesUploader from "../form-fields/FormImagesUploader";
import FormMultiSelect from "../form-fields/FormMultiSelect";
import useSession from "@/lib/session/use-session";
import usePayment from "@/hooks/use-payment";
import { makeFlutterwareConfig } from "@/config/flutterwave.config";
import { useBookEventCenter } from "@/hooks/service-hooks/event-center.hooks";
import { FlutterwaveResponseType } from "@/types/payment.types";
import { LoadingDialog } from "../LoadingDialog";
import { useRouter } from "next/navigation";
import { useLoading } from "@/hooks/use-loading";
import useFileUpload from "@/hooks/use-file-upload";
import { toast } from "sonner";

/*
    This form is used to book an event center
    it will collect inform about the event to be hosted
    before going ahead to book the event center after making creating the event and making payment. 

    Hence the form will have three steps
    1. Collect event information
    2. Collect payment information
    3. Book event center
*/
interface EventFormProps {
  className?: string;
  setSelectedEntertainers: (entertainers: string[]) => void;
  supportedEvtentsTypes: string[];
  eventCenter: { _id: string };
  totalCost: number; // total cost of the event center and entertainers
}

export default function EventForm({
  className,
  setSelectedEntertainers,
  supportedEvtentsTypes,
  eventCenter,
  totalCost,
}: EventFormProps) {
  const { mutateAsync, isPending: isCreatingEvent } = useCreateEvent();
  const { mutate: deleteEvent, isPending: isDeletingEvent } = useDeleteEvent();
  const { mutateAsync: bookEventCenter, isPending: isBookingEventCenter } =
    useBookEventCenter();
  const { data, isLoading } = useGetEntertainers();
  const { protectedRequest } = useAxios();
  const [withEntertainers, setWithEntertainers] = useState(false);
  const router = useRouter();
  const { getLoadingText } = useLoading();
  const { uploadToCloudinary } = useFileUpload();
  const se = supportedEvtentsTypes.map((item) => ({ label: item, value: item }));

  const {
    session: {
      user: { email, firstName, lastName },
    },
  } = useSession();
  const { useCustomFlutterwave } = usePayment();

  const { handleFlutterPayment, closePaymentModal } = useCustomFlutterwave(
    makeFlutterwareConfig({
      amount: totalCost, // sum of the event center price plus entertainers
      currency: "NGN",
      customer: {
        email: email,
        name: `${firstName} ${lastName}`,
        phone_number: "08012345678",
      },
      customizations: {
        title: "Booking payment",
        description: "Payment for event booking",
      },
    })
  );

  const getEntetainerOptions = useCallback(
    (entertainers: EntertainerType[]) => {
      return entertainers
        .filter((entertainer) => entertainer.availability === "available")
        .map(({ _id, name }) => {
          return {
            value: _id,
            label: name,
          };
        });
    },
    [data]
  );

  const toggleEntertainers = () => {
    setWithEntertainers(!withEntertainers);
  };

  const form = useForm({
    resolver: zodResolver(eventValidationSchema),
    defaultValues: {
      eventCenter: eventCenter._id,
    },
  });

  const onSubmit = async (data: IEventPayloadType) => {
    // step 1: create event instance
    // step 2: process payment first
    // step 3: finally create booking instance (if entertainers are selected, they will be booked
    //  in the backend before creating the event center booking instance)

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

    // call the create event function here
    mutateAsync({
      protectedRequest,
      payload: transformedData,
    }).then(({ data: eventData }) => {
      if (eventData) {
        handleFlutterPayment({
          callback: async (payment) => {
            closePaymentModal();
            const paymentData = payment as FlutterwaveResponseType;
            if (paymentData.status === "successful") {
              // create booking instance here
              bookEventCenter({
                protectedRequest,
                payload: {
                  event: eventData._id,
                  entertainers: data.entertainers,
                  booking_status: "successful",
                  payment_status: paymentData.status,
                  payment_reference: paymentData.tx_ref,
                  payment_date: paymentData.created_at!,
                  event_center: eventCenter._id,
                  payment_amount: paymentData.amount,
                  payment_currency: paymentData.currency,
                },
              })
                .catch((err) => {
                  console.log(err);
                  // delete event if booking fails
                  deleteEvent({
                    protectedRequest,
                    id: eventData._id,
                  });
                })
                .then((res) => {
                  // navigate to the dashboard page after successful booking
                  if (res) {
                    form.reset();
                    router.push("/dashboard/user");
                  }
                });
            }
          },
          onClose: closePaymentModal,
        });
      }
      // close the payment modal
    });
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = form;
  const val = watch("entertainers");
  if (val) {
    setSelectedEntertainers(val);
  }

  return (
    <Form {...form}>
      {/* Display loader with messages for creating event and booking */}
      <LoadingDialog
        loadingText={getLoadingText([
          { message: "Creating event ...", state: isCreatingEvent },
          { message: "Booking event center...", state: isBookingEventCenter },
          { message: "Deleting event ...", state: isDeletingEvent },
        ])}
        open={isBookingEventCenter || isCreatingEvent || isDeletingEvent}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "rounded-md space-y-8 py-5 p-5 md:p-10 border-[1px] max-h-[80vh] overflow-y-auto w-full",
          className
        )}
      >
        <FormInputField
          control={control}
          name="name"
          label="Event title"
          type="text"
          id="name"
          placeholder="Enter event name"
          errorMessage={errors.name?.message}
        />

        <FormSelect
          options={se}
          placeholder="Event type"
          register={register("eventType")}
          control={control}
        />

        <FormTextarea
          control={control}
          label="Description"
          name="description"
          id="description"
          placeholder="Enter event description"
          errorMessage={errors.description?.message}
        />

        <div className="grid grid-cols-2 w-full gap-1">
          <FormInputField
            control={control}
            name="startDate"
            label="Start Date"
            type="date"
            id="startDate"
            placeholder="Enter event start date"
            errorMessage={errors.startDate?.message}
          />

          <FormInputField
            control={control}
            name="endDate"
            label="End Date"
            type="date"
            id="endDate"
            placeholder="Enter event end date"
            errorMessage={errors.endDate?.message}
          />
        </div>

        <div className="grid grid-cols-2 w-full gap-1">
          <FormInputField
            control={control}
            name="startTime"
            label="Start Time"
            type="time"
            id="startTime"
            step={1}
            placeholder="Enter event start time"
            errorMessage={errors.startTime?.message}
          />

          <FormInputField
            control={control}
            name="endTime"
            label="End Time"
            type="time"
            id="endTime"
            step={1}
            placeholder="Enter event end time"
            errorMessage={errors.endTime?.message}
          />
        </div>

        <FormImagesUploader
          control={control}
          name="images"
          label="Event Images"
          maxImageSize={1000000}
          maxNumber={5}
          multiple={true}
        />

        <FormSwitch
          control={control}
          onChange={toggleEntertainers}
          value={withEntertainers}
          description="Add an entertainer to your event"
          label="Need entertainer"
          id="entertainers"
        />

        {withEntertainers && (
          <div className="space-y-2">
            <FormMultiSelect
              label="Entertainers"
              name="entertainers"
              control={control}
              options={getEntetainerOptions(data?.data || [])}
              placeholder={isLoading ? "loading ..." : "Select entertainers"}
              emptyMessage="No entertainers available"
            />
          </div>
        )}
        <Button
          disabled={isSubmitting}
          className={cn("btn btn-primary w-full", { "animate-pulse": isSubmitting })}
          type="submit"
        >
          {isSubmitting ? "processing ..." : "Proceed to payment"}
        </Button>
      </form>
    </Form>
  );
}
