import { useEffect, useState } from "react";
import type { Activity } from "@/types/activity";
import { useActivityStore } from "@/store/activityStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ActivityForm from "../../components/ActivityForm/ActivityForm";

export default function UpdateActivity() {
  const params = useParams();
  const navigate = useNavigate();
  const { activities, loading, fetchActivities } = useActivityStore();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activityId = params.id as string;

  useEffect(() => {
    const loadActivity = async () => {
      try {
        // If activities are not loaded, fetch them first
        if (activities.length === 0) {
          await fetchActivities();
        }
        console.log(activities, activityId);
        const foundActivity = activities.find((a) => a.id === activityId);
        console.log(foundActivity);
        if (foundActivity) {
          setActivity(foundActivity);
          setError(null);
        } else {
          setError("Activity not found");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load activity");
      }
    };

    loadActivity();
  }, [activityId, activities]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error || "Activity not found"}</span>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Go Back
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ActivityForm activity={activity} mode="edit" />
    </div>
  );
}
