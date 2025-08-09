import { useEffect } from "react";
import ActivityCard from "./ActivityCard/ActivityCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useActivityStore } from "@/store/activityStore";
import NoActivity from "./NoActivity";
import ActivityError from "./ActivityError";

export const ActivityList = () => {
  const {
    activities,
    loading,
    error,
    fetchActivities,
    deleteActivity,
    clearError,
  } = useActivityStore();

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleRetry = () => {
    clearError();
    fetchActivities();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await deleteActivity(id);
      } catch (error) {
        // Error is handled by the store
      }
    }
  };

  const noActivities = activities.length === 0;

  if (loading && noActivities) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ActivityError error={error} handleRetry={handleRetry} />;
  }

  if (noActivities) {
    return <NoActivity />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Activities</h2>
        <p className="text-muted-foreground">
          {`${activities.length} ${activities.length === 1 ? "activity" : "activities"}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
};
