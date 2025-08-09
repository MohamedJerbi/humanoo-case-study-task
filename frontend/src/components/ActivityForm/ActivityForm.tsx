import type React from "react";
import { useState, useEffect } from "react";
import type { Activity, ActivityFormData } from "@/types/activity";
import { useActivityStore } from "@/store/activityStore";
import {
  validateActivity,
  hasValidationErrors,
  type ValidationErrors,
} from "@/utils/validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Categories } from "@/types/enums";
import SelectDifficulty from "./SelectDifficulty";
import Equipments from "./Equipments";

interface ActivityFormProps {
  activity?: Activity;
  mode: "create" | "edit";
}

const ActivityForm = ({ activity, mode }: ActivityFormProps) => {
  const navigate = useNavigate();
  const { createActivity, updateActivity, loading, error, clearError } =
    useActivityStore();

  const [formData, setFormData] = useState<ActivityFormData>({
    title: activity?.title || "",
    category: activity?.category as Categories,
    durationMinutes: activity?.durationMinutes || 30,
    difficulty: activity?.difficulty || 1,
    scheduleDate: activity?.scheduleDate || "",
    equipments: activity?.equipments || [],
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [newEquipment, setNewEquipment] = useState("");

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleInputChange = (
    field: keyof ActivityFormData,
    value: ActivityFormData[keyof ActivityFormData]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field in validationErrors) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof ValidationErrors];
        return newErrors;
      });
    }
  };

  const addEquipment = () => {
    if (
      newEquipment.trim() &&
      !formData.equipments.includes(newEquipment.trim())
    ) {
      handleInputChange("equipments", [
        ...formData.equipments,
        newEquipment.trim(),
      ]);
      setNewEquipment("");
    }
  };

  const removeEquipment = (equipment: string) => {
    handleInputChange(
      "equipments",
      formData.equipments.filter((e) => e !== equipment)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateActivity(formData);
    setValidationErrors(errors);

    if (hasValidationErrors(errors)) {
      return;
    }

    try {
      if (mode === "create") {
        await createActivity(formData);
      } else if (activity) {
        await updateActivity(activity.id, formData);
      }
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {}
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "Create New Activity" : "Edit Activity"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert className="mb-6" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter activity title"
                className={validationErrors.title ? "border-destructive" : ""}
              />
              {validationErrors.title && (
                <p className="text-sm text-destructive">
                  {validationErrors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger
                  className={
                    validationErrors.category ? "border-destructive" : ""
                  }
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(Categories).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.category && (
                <p className="text-sm text-destructive">
                  {validationErrors.category}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="480"
                  value={formData.durationMinutes}
                  onChange={(e) =>
                    handleInputChange(
                      "durationMinutes",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                  className={
                    validationErrors.durationMinutes ? "border-destructive" : ""
                  }
                />
                {validationErrors.durationMinutes && (
                  <p className="text-sm text-destructive">
                    {validationErrors.durationMinutes}
                  </p>
                )}
              </div>

              <SelectDifficulty
                value={formData.difficulty.toString()}
                handleInputChange={(value: "1" | "2" | "3") =>
                  handleInputChange(
                    "difficulty",
                    Number.parseInt(value) as 1 | 2 | 3
                  )
                }
                error={validationErrors.difficulty}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduleDate">Schedule Date *</Label>
              <Input
                id="scheduleDate"
                type="date"
                value={formData.scheduleDate}
                onChange={(e) =>
                  handleInputChange("scheduleDate", e.target.value)
                }
                className={
                  validationErrors.scheduleDate ? "border-destructive" : ""
                }
              />
              {validationErrors.scheduleDate && (
                <p className="text-sm text-destructive">
                  {validationErrors.scheduleDate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Equipment</Label>
              <div className="flex gap-2">
                <Input
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  placeholder="Add equipment"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addEquipment())
                  }
                />
                <Button
                  type="button"
                  onClick={addEquipment}
                  variant="outline"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Equipments
                equipments={formData.equipments}
                handleRemoveEquipment={removeEquipment}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {mode === "create" ? "Create Activity" : "Update Activity"}
                  </>
                )}
              </Button>

              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityForm;
