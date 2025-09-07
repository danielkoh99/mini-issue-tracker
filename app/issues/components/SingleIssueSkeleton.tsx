import { Skeleton } from "@/components/ui/skeleton";

export const IssueSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 animate-pulse">
      <Skeleton className="h-8 w-1/3 mb-4 rounded" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-full rounded" />
        <Skeleton className="h-24 w-full rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-10 w-32 rounded" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-10 w-24 rounded" />
        </div>
      </div>
      <Skeleton className="h-4 w-1/2 mt-4 rounded" />
    </div>
  );
};
