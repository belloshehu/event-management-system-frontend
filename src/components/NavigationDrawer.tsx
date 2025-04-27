"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import {
  ChevronRight,
  Drum,
  Flower,
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import NavigationDrawerDashboardItems from "./NavigationDrawerDashboardItems";

export default function NavigationDrawer() {
  const pathname = usePathname();
  const { session } = useSession();
  const {
    user: { firstName, lastName, email, role },
  } = session;
  const { mutateAsync } = useLogout();
  const { protectedRequest } = useAxios();
  const [toggle, setToggle] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <Drawer direction="left" open={toggleDrawer} onOpenChange={setToggleDrawer}>
      <DrawerTrigger>
        <MenuIcon size={34} className="text-green-600" />
        <span className="sr-only">nav drawer</span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="shadow-sm py-3">
          <DrawerTitle className="hidden">Nvigation</DrawerTitle>
          <DrawerDescription className="hidden">Navigation drawer</DrawerDescription>
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
                    setToggle(!toggle);
                  }}
                >
                  <ChevronRight
                    className={cn("text-gray-500 rotate-0 ", { "rotate-180": toggle })}
                    size={24}
                  />
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
          {!toggle ? (
            <>
              <NavButton
                pathname="/"
                currentPathname={pathname}
                onClick={() => setToggleDrawer(false)}
              >
                <Home className="text-inherit text-3xl" size={30} />
                <Link href="/">Home</Link>
              </NavButton>
              <NavButton
                onClick={() => setToggleDrawer(false)}
                pathname="/event-centers"
                currentPathname={pathname}
              >
                <Table className="text-inherit text-3xl" size={24} />
                <Link href="/event-centers">Event centers</Link>
              </NavButton>
              <NavButton
                pathname="/entertainers"
                currentPathname={pathname}
                onClick={() => setToggleDrawer(false)}
              >
                <Drum className="text-inherit text-3xl" size={24} />
                <Link href="/entertainers">Entertainers</Link>
              </NavButton>
              <NavButton
                pathname="/events"
                currentPathname={pathname}
                onClick={() => setToggleDrawer(false)}
              >
                <Users className="text-inherit text-3xl" size={24} />
                <Link href="/events">Events</Link>
              </NavButton>
              <NavButton
                pathname="/partnership"
                currentPathname={pathname}
                onClick={() => setToggleDrawer(false)}
              >
                <Handshake className="text-inherit text-3xl" size={24} />
                <Link href="/partnership">Partnership</Link>
              </NavButton>
              <NavButton
                pathname="/studio"
                currentPathname={pathname}
                onClick={() => setToggleDrawer(false)}
              >
                <Flower className="text-inherit text-3xl" size={24} />
                <Link href="/studio">AI Decoration Studio</Link>
              </NavButton>
            </>
          ) : (
            <NavigationDrawerDashboardItems toggleDrawer={setToggleDrawer} />
          )}
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
