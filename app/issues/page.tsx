"use client";

import { Error } from "@/components/ui/Error";
import { useIssues } from "../hooks/useIssues";
import { IssueItem } from "./components/IssueItem";
import { IssueListItemSkeleton } from "./components/IssueListItemSkeleton";

export default function Home() {
  const { data, isLoading, error } = useIssues();

  if (error) return <Error>{error.message}</Error>;

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {data?.length === 0 && (
          <p className="text-gray-500 mt-10">No issues found</p>
        )}
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <IssueListItemSkeleton key={i} />
            ))
          : data?.map((issue) => <IssueItem key={issue.id} issue={issue} />)}
      </div>
    </div>
  );
}
