import { Status } from "@/app/generated/prisma";
import { useUpdateIssueStatus } from "@/app/hooks/useIssues";
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
  const statusColors: Record<Status, string> = {
    OPEN: "bg-green-100 text-green-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    CLOSED: "bg-gray-100 text-gray-800",
  };
  const options = Object.keys(Status) as Status[];

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
        onClick={stopPropagation}
      >
        <DropdownMenuLabel>Change status</DropdownMenuLabel>
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={handleSelectStatus(option)}
            className={getStatusColor(option)}
          >
            {option.replaceAll("_", " ")}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
