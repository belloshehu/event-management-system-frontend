import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectDataType } from "@/types/data.types";
import React from "react";

interface SelectProps {
  placeholder: string;
  emptyMessage?: string;
  options: SelectDataType[];
  value: string | number | string[];
  onChange?: (value: string) => void;
  className?: string;
}

export default function FormSelect({
  className,
  placeholder,
  options,
  value,
  onChange,
  ...props
}: SelectProps) {
  return (
    <Select {...props} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder || ""} />
      </SelectTrigger>
      <SelectContent className={cn("w-full", className)}>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
