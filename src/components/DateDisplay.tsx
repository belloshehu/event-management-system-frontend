import { formatDate } from "@/lib/timedate";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

export default function DateDisplay({
  startDate,
  endDate,
  className,
}: {
  startDate: string;
  endDate?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 items-center justify-center", className)}>
      <Calendar size={16} className="text-green-500" />
      <p className="text-sm" aria-label="start time">
        {formatDate(startDate)}
      </p>
      {endDate && endDate !== startDate && (
        <>
          <span>-</span>
          <p className="text-sm" aria-label="stop time">
            {formatDate(endDate)}
          </p>
        </>
      )}
    </div>
  );
}
