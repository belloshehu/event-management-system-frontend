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
import { useLogout } from "@/hooks/service-hooks/auth.hook";
import { useAxios } from "@/hooks/use-axios";

export default function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [placeholder, setPlaceholder] = useState("Search for event centers");
  const { session } = useSession();
  const { mutateAsync } = useLogout();
  const { protectedRequest } = useAxios();

  useEffect(() => {
    setPlaceholder(resolveSearchPlaceholder(pathname));
  }, [pathname]);

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
        <SearchInput placeholder={placeholder} className="md:w-[30%] w-[80%] m-auto" />
      )}

      <nav className="items-center gap-5 hidden md:flex">
        {navItems.map(({ name, path }) => (
          <Link
            key={path}
            className={cn("", {
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
          <Button
            onClick={async () => {
              mutateAsync({ protectedRequest: protectedRequest });
            }}
          >
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button variant={"default"}>Login</Button>
          </Link>
        ))}
      {isMobile && <NavigationDrawer />}
    </header>
  );
}
