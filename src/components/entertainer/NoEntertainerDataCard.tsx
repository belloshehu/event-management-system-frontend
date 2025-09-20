import { cn } from "@/lib/utils";
import NoDataCard from "../NoDataCard";
import useSession from "@/lib/session/use-session";

// NoEventDataCard component
// with optional title, message, and className props
export default function NoEntertainerDataCard({
  title,
  message,
  className,
}: {
  title?: string;
  message?: string;
  className?: string;
}) {
  const {
    session: { user },
  } = useSession();
  return (
    <NoDataCard
      title={title || "No entertainers"}
      message={message || "There are no entertainers to display"}
      className={cn("w-full md:w-1/3", className)}
      action={
        user.role === "admin" ? { button: true, buttonText: "Add Entertainer" } : null
      }
    />
  );
}
