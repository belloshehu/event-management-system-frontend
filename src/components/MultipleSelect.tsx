import { SelectDataType } from "@/types/data.types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { Button } from "./ui/button";
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

interface MultipleSelectProps {
  data: SelectDataType[];
  placeholder: string;
  emptyMessage?: string;
  name?: string;
  onChange?: (e: { target: { name: string; value: string[] } }) => void;
}

export default function MultipleSelect({
  data,
  placeholder,
  emptyMessage,
  onChange,
  name,
}: MultipleSelectProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      if (onChange) {
        onChange({ target: { name: name!, value: [...selectedItems, item] } });
      }
    } else {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        onClick={(e) => e.stopPropagation()}
        className="w-full justify-between"
        role="combobox"
        aria-expanded={isOpen}
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-between"
        >
          <div className="flex gap-2 justify-start">
            {selectedItems?.length
              ? selectedItems.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                  >
                    {data.find((item) => item.value === val)?.label}
                  </div>
                ))
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search" />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    handleSelect(framework.value);
                  }}
                  className="w-full"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItems.includes(framework.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
