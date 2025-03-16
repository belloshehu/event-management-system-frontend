"use client";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import {
  ChevronRight,
  Drum,
  Handshake,
  Home,
  MenuIcon,
  Table,
  UserCircle,
  Users,
} from "lucide-react";
import Brand from "./Brand";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavButton } from "./NavButton";
import useSession from "@/lib/session/use-session";
import { useLogout } from "@/hooks/service-hooks/auth.hook";
import { useAxios } from "@/hooks/use-axios";
import { Separator } from "./ui/separator";

export default function NavigationDrawer({
  setOpenUserNavDrawer,
  openDrawer,
}: {
  setOpenUserNavDrawer: (open: boolean) => void;
  openDrawer: boolean;
}) {
  const pathname = usePathname();
  const { session } = useSession();
  const {
    user: { firstName, lastName, email, role },
  } = session;
  const { mutateAsync } = useLogout();
  const { protectedRequest } = useAxios();
  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <Drawer direction="left" defaultOpen={openDrawer}>
      <DrawerTrigger>
        <Button variant={"ghost"} size={"icon"} className="">
          <MenuIcon size={34} className="text-green-600" />
          <span className="sr-only">nav drawer</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="shadow-sm py-3">
          <Brand />
          {session.isLoggedIn && (
            <>
              <Separator className="mx-2" />
              <div className="flex items-center gap-2 space-y-1">
                <UserCircle size={30} className="text-gray-500" />
                <div className="flex flex-col">
                  <span className=" text-gray-900">
                    {firstName} {lastName} <small>({role})</small>
                  </span>
                  <span className="text-xs text-gray-500">{email}</span>
                </div>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="ml-auto rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenUserNavDrawer(true);
                  }}
                >
                  <ChevronRight className="text-gray-500 " size={24} />
                  <span className="sr-only">menu button</span>
                </Button>
              </div>
            </>
          )}
        </DrawerHeader>
        <motion.nav
          initial={{ scale: 0.6 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start items-start flex-col p-0 py-6 gap-1"
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
          {session?.isLoggedIn ? (
            <Button
              onClick={async () => {
                mutateAsync({ protectedRequest: protectedRequest });
              }}
            >
              Logout
            </Button>
          ) : (
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
          )}
          sightek
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
