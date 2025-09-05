import { Issue } from "@/app/generated/prisma";
import { IssueStatus } from "./IssueState";
import { useRouter } from "next/navigation";
interface SingleIssueProps {
  issue: Issue;
}
export const SingleIssue: React.FC<SingleIssueProps> = ({ issue }) => {
  const router = useRouter();
  const routeToIssue = () => {
    router.push(`/issues/${issue.id}`);
  };
  return (
    <div
      key={issue.id}
      onClick={routeToIssue}
      className="cursor-pointer w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{issue.title}</h2>
        <IssueStatus id={issue.id} status={issue.status} />
      </div>
      <p className="text-gray-700">{issue.description}</p>
      <p className="text-gray-400 text-xs mt-2">
        Created: {new Date(issue.createdAt).toLocaleString()}
      </p>
    </div>
  );
};
