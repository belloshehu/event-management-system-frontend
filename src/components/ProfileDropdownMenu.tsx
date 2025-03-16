import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { UserCircle } from "lucide-react";
import useSession from "@/lib/session/use-session";
import { useLogout } from "@/hooks/service-hooks/auth.hook";
import { useAxios } from "@/hooks/use-axios";

export default function ProfileDropdownMenu() {
  const {
    session: {
      user: { firstName, lastName, email, role },
    },
  } = useSession();
  const { mutateAsync } = useLogout();
  const { protectedRequest } = useAxios();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserCircle size={34} className=" hover:scale-105 duration-300 transition-all" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-2 p-2">
          <UserCircle size={30} className="text-gray-500" />
          <div className="flex flex-col">
            <span className=" text-gray-900">
              {firstName} {lastName} <small>({role})</small>
            </span>
            <span className="text-xs text-gray-500">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Events</DropdownMenuItem>
        <DropdownMenuItem>Event Centers</DropdownMenuItem>
        <DropdownMenuItem>Entertainers</DropdownMenuItem>
        <DropdownMenuItem>Partners</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            mutateAsync({ protectedRequest: protectedRequest });
          }}
        >
          Log out
        </DropdownMenuItem>
        {role !== "user" && <DropdownMenuItem>Become partner</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
