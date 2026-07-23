import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import type { TFunction } from "i18next";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../../../store/slice/api/projectApi";
import { useEffect, useState } from "react";
import type { Project } from "../../../../types/project";

interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
  t: TFunction;
  project?: Project | null;
}

const initialFormState = {
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  tags: "",
};

export function AddProjectDialog({
  open,
  onClose,
  t,
  project,
}: AddProjectDialogProps) {
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const isLoading = isCreating || isUpdating;
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (project && open) {
      setFormData({
        title: project.title ?? "",
        description: project.description ?? "",
        startDate: project.startDate
          ? new Date(project.startDate).toISOString().slice(0, 10)
          : "",
        endDate: project.endDate
          ? new Date(project.endDate).toISOString().slice(0, 10)
          : "",
        tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      });
    } else if (open) {
      setFormData(initialFormState);
    }
  }, [project, open]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setSubmitError(null);
    onClose();
  };

  const handleSubmit = async () => {
    setSubmitError(null);

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (project) {
        await updateProject({
          id: project.id,
          body: payload,
        }).unwrap();
      } else {
        await createProject(payload).unwrap();
      }

      handleClose();
    } catch (error) {
      console.error(error);
      setSubmitError(t("common.errors.save_failed"));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {project ? t("profile.projects.edit") : t("profile.projects.add")}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 2,
        }}
      >
        {submitError && (
          <Alert severity="error" onClose={() => setSubmitError(null)}>
            {submitError}
          </Alert>
        )}

        <TextField
          label={t("profile.projects.name")}
          value={formData.title}
          disabled={isLoading}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <TextField
          type="date"
          label={t("profile.projects.start")}
          value={formData.startDate}
          disabled={isLoading}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />

        <TextField
          type="date"
          label={t("profile.projects.end")}
          value={formData.endDate}
          disabled={isLoading}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          onChange={(e) => handleChange("endDate", e.target.value)}
        />

        <TextField
          multiline
          rows={4}
          label={t("profile.projects.description")}
          value={formData.description}
          disabled={isLoading}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <TextField
          label={t("profile.projects.tags")}
          helperText="React, TypeScript, Prisma"
          value={formData.tags}
          disabled={isLoading}
          onChange={(e) => handleChange("tags", e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          {t("common.cancel")}
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t("common.save")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
