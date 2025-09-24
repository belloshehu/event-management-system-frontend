import { cn } from "@/lib/utils";
import { SelectWithInputDataType } from "@/types/data.types";
import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import MultipleSelectWithInput from "../MultipleSelectWithInput";

interface FormMultiSelectProps {
  placeholder: string;
  options: SelectWithInputDataType[];
  className?: string;
  control: Control<any>;
  label: string;
  name: string;
  emptyMessage?: string;
}

export default function FormMultiSelectWithInput({
  className,
  placeholder,
  options,
  control,
  label,
  name,
  emptyMessage,
}: FormMultiSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <MultipleSelectWithInput
              data={options}
              emptyMessage={emptyMessage}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
