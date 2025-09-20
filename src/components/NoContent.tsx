import { cn } from "@/lib/utils";

export default function NoContent({
	message,
	className,
}: {
	message: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-md bg-white shadow-md w-fit p-3",
				className
			)}
		>
			<h3 className="text-red-500 font-semibold">{message}</h3>
		</div>
	);
}
