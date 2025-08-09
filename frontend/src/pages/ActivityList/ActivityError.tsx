import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import type { FC } from "react";

const ActivityError: FC<{ error: string; handleRetry: () => void }> = ({
  error,
  handleRetry,
}) => {
  return (
    <Alert className="max-w-md mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{error}</span>
        <Button variant="outline" size="sm" onClick={handleRetry}>
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ActivityError;
