import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type SearchInputProps = {
  // Props type definition
  placeholder: string;
  className?: string;
};

export default function SearchInput({ placeholder, className }: SearchInputProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-green-600 hover:shadow-xl hover:shadow-slate-400 hover:drop-shadow-2xl",
        { "w-full": isMobile },
        className
      )}
    >
      <Input
        type="text"
        className="outline-none border-none active:outline-none active:border-none rounded-full focus-visible:ring-[0px] focus-visible:ring-offset-[0px]"
        placeholder={placeholder || "Search"}
      />
      <Button
        variant={"ghost"}
        className="outline-none bg-green-500 rounded-full m-[1px] p-1 px-3"
        size={"icon"}
      >
        <Search className="text-white" />
        <span className="sr-only">Search Button</span>
      </Button>
    </div>
  );
}
