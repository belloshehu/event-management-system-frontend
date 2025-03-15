import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = {
	// Props type definition
	placeholder: string;
	className?: string;
};

export default function SearchInput({
	placeholder,
	className,
}: SearchInputProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-full border border-green-600",
				className
			)}
		>
			<Input
				type="text"
				className="outline-none border-none active:outline-none active:border-none rounded-full "
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
