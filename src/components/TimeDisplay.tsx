import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export default function TimeDisplay({
  startTime,
  endTime,
  className,
}: {
  startTime: string;
  endTime?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 items-center justify-center", className)}>
      <Clock size={16} className="text-green-500" />
      <p className="text-sm" aria-label="start time">
        {startTime.slice(0, 5)}
      </p>
      {endTime && (
        <>
          <span>-</span>
          <p className="text-sm" aria-label="stop time">
            {endTime.slice(0, 5)}
          </p>
        </>
      )}
    </div>
  );
}
