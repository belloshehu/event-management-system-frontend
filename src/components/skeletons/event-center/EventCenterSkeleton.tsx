import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function EventCenterSkeleton() {
  return (
    <div className="flex flex-col items-start justify-start space-y-3 bg-white p-3 rounded-md w-full">
      <Skeleton className="h-44 rounded-md w-full" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[230px]" />

      <div className="flex flex-wrap gap-1">
        <Skeleton className="h-4 w-[40px]" />
        <Skeleton className="h-4 w-[60px]" />
        <Skeleton className="h-4 w-[30px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-6 w-full" />
    </div>
  );
}

export function EventCenterSkeletonList({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full ",
        className
      )}
    >
      <EventCenterSkeleton />
      <EventCenterSkeleton />
      <EventCenterSkeleton />
    </div>
  );
}
