import { cn } from "@/lib/utils";

export default function Item({
	item,
	className,
}: {
	item: string;
	className?: string;
}) {
	return (
		<li className={cn("text-sm px-2 py-1 bg-green-100 rounded-sm ", className)}>
			{item}
		</li>
	);
}
