import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FC } from "react";

type SelectDifficultyProps = {
  value: string;
  handleInputChange: (value: "1" | "2" | "3") => void;
  error?: string;
};

const SelectDifficulty: FC<SelectDifficultyProps> = ({
  value,
  handleInputChange,
  error,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="difficulty">Difficulty *</Label>
      <Select value={value} onValueChange={handleInputChange}>
        <SelectTrigger className={error ? "border-destructive" : ""}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 - Easy</SelectItem>
          <SelectItem value="2">2 - Medium</SelectItem>
          <SelectItem value="3">3 - Hard</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default SelectDifficulty;
