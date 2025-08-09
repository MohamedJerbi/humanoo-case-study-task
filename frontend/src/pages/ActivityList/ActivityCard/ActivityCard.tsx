import type { Activity } from "@/types/activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Dumbbell, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import Equipments from "./Equipments";
import {
  formatDate,
  getDifficultyColor,
  getDifficultyText,
} from "../functions";

interface ActivityCardProps {
  activity: Activity;
  onDelete: (id: string) => void;
}

export const ActivityCard = ({ activity, onDelete }: ActivityCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">
            {activity.title}
          </CardTitle>
          <div className="flex gap-1 ml-2">
            <Button
              onClick={() => navigate(`/update/${activity.id}`)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              aria-label="Delete activity"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(activity.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit">
          {activity.category}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{activity.durationMinutes} min</span>
          </div>

          <Badge className={getDifficultyColor(activity.difficulty)}>
            <Dumbbell className="h-3 w-3 mr-1" />
            {getDifficultyText(activity.difficulty)}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(activity.scheduleDate)}</span>
        </div>

        <Equipments equipments={activity.equipments} />
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
