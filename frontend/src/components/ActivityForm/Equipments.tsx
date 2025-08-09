import { Badge } from "@/components/ui/badge";
import type { Activity } from "@/types/activity";
import { X } from "lucide-react";
import { type FC } from "react";

const Equipments: FC<{
  equipments: Activity["equipments"];
  handleRemoveEquipment: (equipment: string) => void;
}> = ({ equipments, handleRemoveEquipment }) => {
  if (!equipments || equipments.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {equipments.map((equipment, index) => (
        <Badge key={index} variant="secondary" className="gap-1">
          {equipment}
          <button
            type="button"
            onClick={() => handleRemoveEquipment(equipment)}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
};

export default Equipments;
