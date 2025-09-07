import { Issue } from "@/app/generated/prisma";
import { IssueStatus } from "./IssueStatus";
import { useRouter } from "next/navigation";

interface IssueItemProps {
  issue: Issue;
}

export const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  const router = useRouter();
  const routeToIssue = () => router.push(`/issues/${issue.id}`);

  const isClosed = issue.status === "CLOSED";

  return (
    <div
      onClick={routeToIssue}
      className={`cursor-pointer w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow
        ${isClosed ? "bg-gray-100 text-gray-400" : "bg-white text-gray-900"}
      `}
    >
      <div className="flex justify-between items-center mb-2">
        <h2
          className={`text-lg font-semibold flex-1 min-w-0 mr-3 line-clamp-1 
            ${isClosed ? "text-gray-500" : ""}`}
        >
          {issue.title}
        </h2>
        <IssueStatus id={issue.id} status={issue.status} />
      </div>

      <p
        className={`line-clamp-3 break-words ${
          isClosed ? "text-gray-500" : ""
        }`}
      >
        {issue.description}
      </p>

      <p className="text-xs mt-2 text-gray-400">
        Created: {new Date(issue.createdAt).toLocaleString()}
      </p>
    </div>
  );
};
