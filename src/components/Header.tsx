"use client";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useIsMobile } from "@/hooks/use-mobile";
import Brand from "./Brand";
import { cn, isActivePath, resolveSearchPlaceholder } from "@/lib/utils";
import NavigationDrawer from "./NavigationDrawer";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/navigation";
import { useEffect, useState } from "react";
import useSession from "@/lib/session/use-session";
import ProfileDropdownMenu from "./ProfileDropdownMenu";

export default function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [placeholder, setPlaceholder] = useState("Search for event centers");
  const { session } = useSession();

  useEffect(() => {
    setPlaceholder(resolveSearchPlaceholder(pathname));
  }, [pathname]);

  if (pathname === "/login" || pathname === "/signup") return null;
  return (
    <header
      className={cn(
        "flex items-center justify-between p-3 px-5 gap-10 shadow-none md:px-10 fixed left-0 z-50 bg-slate-100 w-screen",
        { "shadow-none": isMobile }
      )}
    >
      <Brand />

      {!isMobile && (
        <SearchInput placeholder={placeholder} className="md:w-[20%] w-[80%] m-auto" />
      )}

      <nav className="items-center gap-5 hidden md:flex flex-1">
        {navItems.map(({ name, path }) => (
          <Link
            key={path}
            className={cn("hover:bg-white p-2 rounded-md", {
              "bg-green-100 rounded-sm py-2 px-5": isActivePath(path, pathname),
            })}
            href={path}
          >
            {name}
          </Link>
        ))}
      </nav>
      {!isMobile &&
        (session?.isLoggedIn ? (
          <ProfileDropdownMenu />
        ) : (
          <Link href="/login">
            <Button variant={"default"} className="bg-green-400">
              Login
            </Button>
          </Link>
        ))}
      {isMobile && (
        // if the user is on mobile, show the main drawer
        // user can open the user drawer from the main drawer
        <NavigationDrawer />
      )}
    </header>
  );
}
