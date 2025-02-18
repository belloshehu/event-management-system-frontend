"use client";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useIsMobile } from "@/hooks/use-mobile";
import Brand from "./Brand";
import { cn } from "@/lib/utils";
import NavigationDrawer from "./NavigationDrawer";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
	const isMobile = useIsMobile();
	const pathname = usePathname();

	if (pathname === "/login" || pathname === "/signup") return null;
	return (
		<header
			className={cn(
				"flex items-center justify-between p-3 px-5 gap-10 shadow-none md:px-10",
				{ "shadow-sm": isMobile }
			)}
		>
			<Brand />

			{!isMobile && (
				<SearchInput
					placeholder="Search for event centers"
					className="md:w-[30%] w-[80%] m-auto"
				/>
			)}

			<nav className="items-center gap-5 hidden md:flex">
				<Link href="/about">Event centers</Link>
				<Link href="/contact">Entertainers</Link>
				<Link href="/contact">Events</Link>
				<Link href="/contact">Partnership</Link>
			</nav>
			{!isMobile && (
				<Link href="/login">
					<Button variant={"default"}>Login</Button>
				</Link>
			)}
			{isMobile && <NavigationDrawer />}
		</header>
	);
}
