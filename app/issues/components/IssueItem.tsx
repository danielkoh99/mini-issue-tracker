import { Issue } from "@/app/generated/prisma";
import { IssueStatus } from "./IssueState";
import { useRouter } from "next/navigation";
interface IssueItemProps {
  issue: Issue;
}
export const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  const router = useRouter();
  const routeToIssue = () => router.push(`/issues/${issue.id}`);

  return (
    <div
      onClick={routeToIssue}
      className="cursor-pointer w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold flex-1 min-w-0 mr-3 line-clamp-1">
          {issue.title}
        </h2>
        <IssueStatus id={issue.id} status={issue.status} />
      </div>

      <p className="text-gray-700 line-clamp-3 break-words">
        {issue.description}
      </p>

      <p className="text-gray-400 text-xs mt-2">
        Created: {new Date(issue.createdAt).toLocaleString()}
      </p>
    </div>
  );
};
