"use client";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Drum, Handshake, Home, MenuIcon, Table, Users } from "lucide-react";
import Brand from "./Brand";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavButton } from "./NavButton";

export default function NavigationDrawer() {
	const pathname = usePathname();
	if (pathname === "/login" || pathname === "/signup") return null;

	return (
		<Drawer direction="left">
			<DrawerTrigger>
				<Button variant={"ghost"} size={"icon"} className="">
					<MenuIcon size={34} className="text-green-600" />
					<span className="sr-only">nav drawer</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="shadow-sm py-3">
					<Brand />
				</DrawerHeader>
				<motion.nav
					initial={{ scale: 0.6 }}
					whileInView={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className="flex justify-start items-start flex-col p-0 py-8 gap-1"
				>
					<NavButton pathname="/" currentPathname={pathname}>
						<Home className="text-inherit text-3xl" size={30} />
						<Link href="/">Home</Link>
					</NavButton>
					<NavButton pathname="/event-centers" currentPathname={pathname}>
						<Table className="text-inherit text-3xl" size={24} />
						<Link href="/event-centers">Event centers</Link>
					</NavButton>
					<NavButton pathname="/entertainers" currentPathname={pathname}>
						<Drum className="text-inherit text-3xl" size={24} />
						<Link href="/entertainers">Entertainers</Link>
					</NavButton>
					<NavButton pathname="/events" currentPathname={pathname}>
						<Users className="text-inherit text-3xl" size={24} />
						<Link href="/events">Events</Link>
					</NavButton>
					<NavButton pathname="/partnership" currentPathname={pathname}>
						<Handshake className="text-inherit text-3xl" size={24} />
						<Link href="/partnership">Partnership</Link>
					</NavButton>
				</motion.nav>
				<DrawerFooter className="w-full">
					<div className="flex flex-col gap-3 w-full">
						<Link href="/login">
							<Button variant={"default"} className="w-full">
								Login
							</Button>
						</Link>
						<Link href="/signup">
							<Button variant={"outline"} className="w-full">
								Signup
							</Button>
						</Link>
					</div>
					sightek
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
