import { cn } from "@/lib/utils";
import CustomAvatar from "../CustomAvatar";
import { UserType } from "@/types/user.types";
import { Badge } from "../ui/badge";

interface UserProps {
  data: UserType;
  className?: string;
}

export default function User({ data, className }: UserProps) {
  const { firstName, lastName, image, role } = data;
  return (
    <div
      className={cn(
        "w-full p-5 flex items-center justify-start border-[1px] ",
        className
      )}
    >
      <CustomAvatar
        fallback={`${firstName.slice(0, 1)} ${lastName.slice(0, 1)}`}
        src={image!}
      />
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-green-500">{`${firstName} ${lastName}`}</h1>
        <small className="text-sm text-gray-500">{data.email}</small>
        <Badge
          className={cn("bg-black", {
            "bg-green-500": role === "admin",
            "bg-gray-500": role === "partner",
          })}
        >
          {role}
        </Badge>
      </div>
    </div>
  );
}
