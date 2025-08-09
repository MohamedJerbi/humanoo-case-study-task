import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FC } from "react";

type DurationProps = {
  durationMinutes: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const Duration: FC<DurationProps> = ({
  durationMinutes,
  handleInputChange,
  error,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="duration">Duration (minutes) *</Label>
      <Input
        id="duration"
        type="number"
        min="1"
        max="480"
        value={durationMinutes}
        onChange={handleInputChange}
        className={error ? "border-destructive" : ""}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default Duration;
