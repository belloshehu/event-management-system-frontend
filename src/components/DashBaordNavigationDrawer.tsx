"use client";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ChevronLeft, MenuIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavButton } from "./NavButton";
import { useEffect } from "react";
import useSession from "@/lib/session/use-session";
import { UserRole } from "@/types/user.types";
import { adminNavItems, partnerNavItems, userNavItems } from "@/constants/navigation";
import { NavigationItemType } from "@/types/navigation.types";

const renderNavItems = (userRole: UserRole, currentPathname: string) => {
  // render the navigation items based on the user role
  const makeNavList = (navItems: NavigationItemType[]) => {
    return navItems.map((item, index) => {
      return (
        <NavButton
          className="w-full text-left flex justify-start items-center"
          key={index}
          pathname={item.path}
          currentPathname={currentPathname}
        >
          <Link className="text-left" href={item.path}>
            {item.name}
          </Link>
        </NavButton>
      );
    });
  };

  if (userRole === "admin") {
    return makeNavList(adminNavItems);
  } else if (userRole === "user") {
    return makeNavList(userNavItems);
  } else if (userRole === "partner") {
    return makeNavList(partnerNavItems);
  } else {
    return null;
  }
};

export default function DashBoardNavigationDrawer({
  closeDrawer,
  open,
}: {
  closeDrawer: () => void;
  open: boolean;
}) {
  const {
    session: { user },
  } = useSession();

  useEffect(() => {}, [user.role]);

  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <Drawer direction="left" defaultOpen={open}>
      {
        /* Drawer Trigger */

        !open && (
          <DrawerTrigger>
            <Button variant={"ghost"} size={"icon"} className="" onClick={closeDrawer}>
              <MenuIcon size={34} className="text-green-600" />
              <span className="sr-only">nav drawer</span>
            </Button>
          </DrawerTrigger>
        )
      }
      <DrawerContent>
        <DrawerHeader className="shadow-sm py-3 flex items-center gap-2">
          {/* button to close the drawer*/}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            onClick={closeDrawer}
          >
            <ChevronLeft className="text-gray-500 " size={24} />
          </Button>
          <span>Menu</span>
        </DrawerHeader>
        <motion.nav
          initial={{ scale: 0.6 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start items-start flex-col px-1 py-6 gap-1"
        >
          {renderNavItems(user.role, pathname)}
        </motion.nav>
        <DrawerFooter className="w-full">
          <NavButton pathname="/partnership" currentPathname={pathname}>
            <Link href="/partnership">Partnership</Link>
          </NavButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
