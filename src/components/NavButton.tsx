import { cn, isActivePath } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";

interface NavButtonProps extends ButtonProps {
	children: React.ReactNode;
	pathname: string;
	currentPathname: string;
}

export function NavButton({
	children,
	pathname,
	currentPathname,
	className,
	...props
}: NavButtonProps) {
	return (
		<Button
			{...props}
			variant={"ghost"}
			className={cn(className, {
				"bg-green-100 rounded-sm py-2 px-5": isActivePath(
					currentPathname,
					pathname
				),
			})}
		>
			{children}
		</Button>
	);
}
