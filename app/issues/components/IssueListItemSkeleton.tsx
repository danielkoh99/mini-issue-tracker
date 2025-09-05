import { Skeleton } from "@/components/ui/skeleton";

export const IssueListItemSkeleton = () => {
  return (
    <div className="w-full border rounded-lg p-4 shadow-sm animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-5 w-1/3 rounded" />
        <Skeleton className="h-6 w-16 rounded" />
      </div>
      <Skeleton className="h-4 w-full mb-2 rounded" />
      <Skeleton className="h-4 w-5/6 mb-2 rounded" />
      <Skeleton className="h-3 w-1/4 mt-2 rounded" />
    </div>
  );
};
