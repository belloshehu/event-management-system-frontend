import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function EventCenterBookingSkeleton() {
  return (
    <div className="flex items-start justify-start space-x-3 bg-white p-3 rounded-md w-full">
      <Skeleton className="h-28 w-28 rounded-md" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[110px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
    </div>
  );
}

export function EventCenterBookingSkeletonList({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 w-full ", className)}>
      <EventCenterBookingSkeleton />
      <EventCenterBookingSkeleton />
      <EventCenterBookingSkeleton />
    </div>
  );
}
