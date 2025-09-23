import { cn } from "@/lib/utils";
import NoDataCard from "@/components/NoDataCard";
import useSession from "@/lib/session/use-session";

// NoEventDataCard component
// with optional title, message, and className props
export default function NoDishDataCard({
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
      title={title || "No dish"}
      message={message || "There are no dishes to display"}
      className={cn("w-full md:w-1/3", className)}
      action={user.role === "admin" ? { button: true, buttonText: "Add dish" } : null}
    />
  );
}
