import type { SubmitEvent } from "react";
import { Box, Button, CircularProgress, Divider, Paper } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
import type { TFunction } from "i18next";
import type { ProfileFormData } from "../profile";
import { ProfileFields } from "./profileFields";
import { ProfileHeader } from "./profileHeader";
import { TechStack } from "./techStack";

interface ProfileFormProps {
  formData: ProfileFormData;
  role: string;
  techStack: string[];
  errors: Partial<Record<keyof ProfileFormData, string>>;
  isLoading: boolean;
  isEditing: boolean;
  t: TFunction;

  onChange: (field: keyof ProfileFormData, value: string) => void;

  onSubmit: (e: SubmitEvent) => void;
  onEdit: () => void;
  onCancel: () => void;
}

export function ProfileForm({
  formData,
  role,
  techStack,
  errors,
  isLoading,
  isEditing,
  t,
  onChange,
  onSubmit,
  onEdit,
  onCancel,
}: ProfileFormProps) {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <ProfileHeader
          firstName={formData.firstName}
          lastName={formData.lastName}
          role={role}
        />

        <TechStack techStack={techStack} t={t} />

        <Divider sx={{ my: 3 }} />

        <Box component="form" onSubmit={onSubmit} noValidate>
          <ProfileFields
            formData={formData}
            errors={errors}
            isEditing={isEditing}
            isLoading={isLoading}
            t={t}
            onChange={onChange}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={onEdit}
                disabled={isLoading}
              >
                {t("profile.buttons.edit")}
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  {t("profile.buttons.cancel")}
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  startIcon={!isLoading && <SaveIcon />}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t("profile.buttons.save")
                  )}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
