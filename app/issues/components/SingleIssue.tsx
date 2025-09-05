import { Issue, Status } from "@/app/generated/prisma";
import { Badge } from "@/components/ui/badge";
interface SingleIssueProps {
  issue: Issue;
}
export const SingleIssue = ({ issue }: SingleIssueProps) => {
  const statusColors: Record<string, string> = {
    OPEN: "bg-green-100 text-green-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    CLOSED: "bg-gray-100 text-gray-800",
  };

  const getStatusColor = (status: string) =>
    statusColors[status] ?? "bg-gray-100 text-gray-800";
  return (
    <div
      key={issue.id}
      className="w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{issue.title}</h2>
        <Badge
          className={`px-2 py-1 text-xs font-medium rounded ${
            issue.status === "OPEN"
              ? "bg-green-100 text-green-800"
              : issue.status === "IN_PROGRESS"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {issue.status.replace("_", " ")}
        </Badge>
      </div>
      <p className="text-gray-700">{issue.description}</p>
      <p className="text-gray-400 text-xs mt-2">
        Created: {new Date(issue.createdAt).toLocaleString()}
      </p>
    </div>
  );
};
