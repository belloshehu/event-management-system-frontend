import { cn } from "@/lib/utils";
import { LoadingDialog } from "../LoadingDialog";
import User from "./User";
import { UserType } from "@/types/user.types";

interface EventCenterBookingListProps {
  users: UserType[];
  className?: string;
  loadingState: boolean;
  noDataMessage?: string;
}

export default function UserList({
  users,
  className,
  loadingState,
  noDataMessage,
}: EventCenterBookingListProps) {
  if (loadingState)
    return <LoadingDialog loadingText="Loading users" open={loadingState} />;

  if (!users || users.length === 0)
    return (
      <div>
        <h1>{noDataMessage || "No users"}</h1>
      </div>
    );
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {users.map((user) => (
        <User data={user} />
      ))}
    </div>
  );
}
