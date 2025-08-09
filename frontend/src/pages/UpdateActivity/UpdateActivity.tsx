import { useEffect, useState } from "react";
import type { Activity } from "@/types/activity";
import { useActivityStore } from "@/store/activityStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ActivityForm from "../../components/ActivityForm/ActivityForm";
import { ActivitiesAPI } from "@/utils/api";

export default function UpdateActivity() {
  const navigate = useNavigate();
  const params = useParams();
  const activityId = params.id as string;
  const cachedActivity = useActivityStore((state) =>
    state.activities.find((a) => a.id === activityId)
  );

  const [activity, setActivity] = useState<Activity | null>(
    cachedActivity || null
  );

  const [loading, setLoading] = useState<boolean>(!cachedActivity);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setLoading(true);
        const activity = await ActivitiesAPI.get(activityId);

        if (activity) {
          setActivity(activity);
          setError(null);
        } else {
          setError("Activity not found");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load activity");
      } finally {
        setLoading(false);
      }
    };

    if (!activity) {
      loadActivity();
    }
  }, [activityId, activity]);

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
