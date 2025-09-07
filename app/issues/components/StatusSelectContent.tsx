import { Status } from "@/app/generated/prisma";
import { statusOptions } from "@/app/types/issue";
import { SelectContent, SelectItem } from "@/components/ui/select";
interface StatusSelectContentProps {
  filterFn?: (status: Status) => boolean;
}
export const StatusSelectContent: React.FC<StatusSelectContentProps> = ({
  filterFn,
}) => {
  const options = filterFn ? statusOptions.filter(filterFn) : statusOptions;

  return (
    <SelectContent>
      {options.map((status) => (
        <SelectItem key={status} value={status}>
          {status.replaceAll("_", " ")}
        </SelectItem>
      ))}
    </SelectContent>
  );
};
