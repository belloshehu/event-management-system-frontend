"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAxios } from "@/hooks/use-axios";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import MultipleSelect from "../MultipleSelect";

import FormInputField from "../form-fields/FormInput";
import { useCreateEvent } from "@/hooks/service-hooks/event.hook";
import { eventValidationSchema, IEventPayloadType } from "@/schemas/event.schema";
import FormTextarea from "../form-fields/FormTextarea";
import FormSelect from "../form-fields/FormSelect";
import FormSwitch from "../form-fields/FormSwitch";
import { useCallback, useMemo, useState } from "react";
import { useGetEntertainers } from "@/hooks/service-hooks/entertainer.hooks";
import { Label } from "../ui/label";
import { EntertainerType } from "@/types/entertainer.types";
import FormMultiSelect from "../form-fields/FormMultiSelect";

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
  eventCenterId: string;
}

export default function EventForm({
  className,
  setSelectedEntertainers,
  supportedEvtentsTypes,
  eventCenterId,
}: EventFormProps) {
  const { mutate, isPending } = useCreateEvent();
  const { data, isLoading } = useGetEntertainers();
  const { protectedRequest } = useAxios();
  const [withEntertainers, setWithEntertainers] = useState(false);
  const se = supportedEvtentsTypes.map((item) => ({ label: item, value: item }));

  const getEntetainerOptions = useCallback(
    (entertainers: EntertainerType[]) => {
      return entertainers.map(({ _id, name }) => {
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
      eventCenter: eventCenterId,
      images: ["image1", "image2"],
    },
  });

  const onSubmit = async (data: IEventPayloadType) => {
    console.log(data.eventCenter);
    // mutate({
    //   protectedRequest,
    //   payload: { ...data, images: ["images12"] },
    // });
  };

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = form;

  const val = watch("entertainers");
  if (val) {
    setSelectedEntertainers(val);
  }

  console.log(isValid);

  return (
    <Form {...form}>
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
          register={register("description")}
          label="Description"
          type="text"
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

        {/* <FormInputField
          control={control}
          label="Images"
          type="file"
          name="images"
          id="images"
          placeholder="Upload event images"
          errorMessage={errors.images?.message}
        /> */}
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
