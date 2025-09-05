"use client";

import { Error } from "../components/Error";
import { SingleIssue } from "../components/issues/SingleIssue";
import { useIssues } from "../hooks/useIssues";

export default function Home() {
  const { data, isLoading, error } = useIssues();

  if (isLoading) return <p className="text-gray-500 mt-10">Loading issues…</p>;
  if (error) return <Error message={error.message} />;

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        {data?.map((issue) => (
          <SingleIssue key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
