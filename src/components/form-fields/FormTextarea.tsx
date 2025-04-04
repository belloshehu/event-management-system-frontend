import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Control } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface FormTextareaProps {
  id: string;
  label?: string;
  description?: string;
  placeholder: string;
  accept?: string;
  errorMessage: string | undefined;
  disabled?: boolean;
  className?: string;
  value?: string;
  control: Control<any>;
  name: string;
}

export default function FormTextarea({
  placeholder,
  control,
  label,
  name,
}: FormTextareaProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
