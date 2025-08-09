import { Badge } from "@/components/ui/badge";
import type { Activity } from "@/types/activity";
import type { FC } from "react";

const Equipments: FC<{ equipments: Activity["equipments"] }> = ({
  equipments,
}) => {
  if (equipments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1 text-left">
      <p className="text-sm font-medium">Equipment:</p>
      <div className="flex flex-wrap gap-1">
        {equipments.map((equipment, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {equipment}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Equipments;
