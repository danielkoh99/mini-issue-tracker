import { Status } from "@/app/generated/prisma";
import { useUpdateIssueStatus } from "@/app/hooks/useIssues";
import { statusColors, statusOptions } from "@/app/types/issue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatusProps {
  status: Status;
  id: string;
}

export const IssueStatus: React.FC<StatusProps> = ({ status, id }) => {
  const { mutate } = useUpdateIssueStatus();

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const getStatusColor = (s: Status) =>
    statusColors[s] ?? "bg-gray-100 text-gray-800";
  const handleSelectStatus = (option: Status) => () => {
    mutate({ id, status: option });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={stopPropagation}
          variant="outline"
          className={`select-none ${getStatusColor(status)}`}
        >
          {status.replaceAll("_", " ")}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={8}
        align="start"
        className="mb-2"
        onClick={stopPropagation}
      >
        <DropdownMenuLabel>Change status</DropdownMenuLabel>
        {statusOptions.map((option) => (
          <DropdownMenuItem key={option} onSelect={handleSelectStatus(option)}>
            {option.replaceAll("_", " ")}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
