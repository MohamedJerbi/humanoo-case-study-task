import { Button } from "@/components/ui/button";
import { Activity, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export const Navigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log("Current Pathname:", pathname);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Wellness Activities</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/")}
              variant={pathname === "/" ? "default" : "ghost"}
              size="sm"
            >
              Activities
            </Button>

            <Button
              onClick={() => navigate("/create")}
              variant={pathname === "/create" ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Activity
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
