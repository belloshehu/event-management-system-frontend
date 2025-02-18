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
				"flex items-center justify-center rounded-md border border-gray-300",
				className
			)}
		>
			<Input
				type="text"
				className="outline-none border-none active:outline-none active:border-none"
				placeholder={placeholder || "Search"}
			/>
			<Button variant={"ghost"} className="outline-none" size={"icon"}>
				<Search />
				<span className="sr-only">Search Button</span>
			</Button>
		</div>
	);
}
