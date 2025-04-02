import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface FormInputProps {
  id: string;
  label?: string;
  description?: string;
  placeholder: string;
  accept?: string;
  errorMessage: string | undefined;
  register?: any;
  disabled?: boolean;
  type: Exclude<React.HTMLInputTypeAttribute, "password">;
  className?: string;
  value?: string;
  //   onChange?: (value: string) => void;
  control: Control<any>;
}

export default function FormTextarea({
  placeholder,
  control,
  label,
  register,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={register.name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              // {...field}
              {...register}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
