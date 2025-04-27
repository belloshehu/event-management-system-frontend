"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavButton } from "./NavButton";
import { useEffect } from "react";
import useSession from "@/lib/session/use-session";
import { UserRole } from "@/types/user.types";
import { adminNavItems, partnerNavItems, userNavItems } from "@/constants/navigation";
import { NavigationItemType } from "@/types/navigation.types";

const renderNavItems = (
  userRole: UserRole,
  currentPathname: string,
  toggleDrawer: (state: boolean) => void
) => {
  // render the navigation items based on the user role
  const makeNavList = (navItems: NavigationItemType[]) => {
    return navItems
      .filter((item) => item.active)
      .map((item, index) => {
        return (
          <NavButton
            className="w-full text-left flex justify-start items-center"
            key={index}
            pathname={item.path}
            currentPathname={currentPathname}
            onClick={() => toggleDrawer(false)}
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

export default function NavigationDrawerDashboardItems({
  toggleDrawer,
}: {
  toggleDrawer: (val: boolean) => void;
}) {
  const {
    session: { user },
  } = useSession();

  useEffect(() => {}, [user.role]);

  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <div>
      {renderNavItems(user.role, pathname, toggleDrawer)}

      {user.role === "user" && (
        <NavButton
          pathname="/partnership"
          currentPathname={pathname}
          onClick={() => toggleDrawer(false)}
        >
          <Link href="/partnership">Partnership</Link>
        </NavButton>
      )}
    </div>
  );
}
