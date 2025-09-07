import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface ErrorProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Error: React.FC<ErrorProps> = ({
  title = "Something went wrong",
  description,
  children,
}) => {
  return (
    <Alert variant="destructive" className="flex items-start gap-3">
      <AlertCircle className="h-5 w-5 mt-0.5" />
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {description && <p>{description}</p>}
          {children}
        </AlertDescription>
      </div>
    </Alert>
  );
};
