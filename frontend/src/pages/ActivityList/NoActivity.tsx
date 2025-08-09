import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

const NoActivity = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12">
      <div className="mx-auto max-w-md">
        <div className="mx-auto h-12 w-12 text-muted-foreground mb-4">
          <Plus className="h-full w-full" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No activities yet</h3>
        <p className="text-muted-foreground mb-6">
          Get started by creating your first wellness activity.
        </p>
        <Button onClick={() => navigate("/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Activity
        </Button>
      </div>
    </div>
  );
};

export default NoActivity;
