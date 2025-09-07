import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface NotFoundProps {
  children?: React.ReactNode;
  title?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ children, title }) => {
  return (
    <div className="flex items-center justify-center py-12 w-full">
      <Card className="w-full text-center shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <AlertCircle className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{children}</p>
        </CardContent>
      </Card>
    </div>
  );
};
