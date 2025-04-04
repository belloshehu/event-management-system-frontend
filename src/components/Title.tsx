import { cn } from "@/lib/utils";

export default function Title({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col gap-2 justify-start items-start w-full", className)}
    >
      <h1 className="text-2xl font-bold text-gray-800 text-left">{title}</h1>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
}
