import { SelectWithInputDataType } from "@/types/data.types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
interface ValueType {
  quantity: number;
  id: string;
}

interface MultipleSelectProps {
  data: SelectWithInputDataType[];
  placeholder: string;
  emptyMessage?: string;
  name?: string;
  onChange?: (e: { target: { name: string; value: ValueType[] } }) => void;
}

export default function MultipleSelectWithInput({
  data,
  placeholder,
  emptyMessage,
  onChange,
  name,
}: MultipleSelectProps) {
  const [selectedItems, setSelectedItems] = useState<ValueType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const handleSelect = (item: ValueType) => {
    if (!selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
      /*
        if using in react-hook-form, call the onChange function to add
        the selected item to the form state
        */
      if (onChange) {
        onChange({ target: { name: name!, value: [...selectedItems, item] } });
      }
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
      /*
        if using in react-hook-form, call the onChange function to remove the selected 
        item from the list of selected items in the form state
      */
      if (onChange) {
        onChange({
          target: {
            name: name!,
            value: selectedItems.filter((selectedItem) => selectedItem.id !== item.id),
          },
        });
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        onClick={(e) => e.stopPropagation()}
        className="flex w-full justify-between items-center h-auto border-[1px] rounded-md py-1 p-2"
        role="combobox"
        aria-expanded={isOpen}
      >
        <div className="flex gap-2 justify-start flex-wrap">
          {selectedItems?.length
            ? selectedItems.map((val, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                >
                  {data.find((item) => item.value.id === val.id)?.label}
                </div>
              ))
            : placeholder}
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 left-12">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {/* list of options tobe displayed when trigger button is clicked */}
              {data.map((option) => (
                <div className="flex items-center justify-between w-full gap-3">
                  <CommandItem
                    key={option.value.id}
                    value={option.value.id}
                    onSelect={() => {
                      handleSelect({ ...option.value, quantity: inputValue });
                    }}
                    className="w-full"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedItems.includes(option.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                  <Input
                    name="quantity"
                    value={inputValue}
                    type="number"
                    defaultValue={0}
                    placeholder="quantity"
                    className="w-1/4"
                    onChange={(e) => setInputValue(parseInt(e.target.value))}
                  />
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
