"use client";

import { Error } from "@/components/ui/Error";
import { useIssues } from "../hooks/useIssues";
import { IssueItem } from "./components/IssueItem";
import { IssueListItemSkeleton } from "./components/IssueListItemSkeleton";
import { NotFound } from "@/components/ui/NotFound";
import { CreateIssueDialog } from "./components/CreateIssueDialog";

const Home = () => {
  const { data, isLoading, error } = useIssues();

  if (error) return <Error> {error.message}</Error>;

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <div className="flex justify-end mb-4">
        <CreateIssueDialog />
      </div>
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {data?.length === 0 && (
          <NotFound>There are no issues to display</NotFound>
        )}
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <IssueListItemSkeleton key={i} />
            ))
          : data?.map((issue) => <IssueItem key={issue.id} issue={issue} />)}
      </div>
    </div>
  );
};
export default Home;
