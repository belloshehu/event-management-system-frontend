import { navItems } from "@/constants/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isActivePath(path: string, currentPath: string) {
	return path.toLowerCase() === currentPath.toLowerCase();
}

// dynmically sets the search input placeholder according to the current page
export function resolveSearchPlaceholder(path: string) {
	const pathname =
		navItems.find((item) => item.path === path)?.name || "centers";

	return "Search for " + pathname || " event centers";
}
