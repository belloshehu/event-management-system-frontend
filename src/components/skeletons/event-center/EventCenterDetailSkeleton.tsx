import { Skeleton } from "@/components/ui/skeleton";

export function EventCenterDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-content-start md:place-content-center   space-x-5 bg-white p-3 rounded-md w-full h-screen md:p-20">
      <div className="w-full">
        <Skeleton className="h-[350px] rounded-md w-full" />
        <div className="flex flex-wrap gap-1 mt-2">
          <Skeleton className="h-20 w-20 rounded-md" />
          <Skeleton className="h-20 w-20 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full p-5 items-start justify-start">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-44" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}
