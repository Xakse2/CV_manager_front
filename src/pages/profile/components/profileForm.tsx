import { Box, Button, CircularProgress, Paper } from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import type { SubmitEvent } from "react";
import type { TFunction } from "i18next";

import { ProfileFields } from "./profileFields";
import { ProfileHeader } from "./profileHeader";
import type { ProfileFormData } from "../../../hooks/useProfileForm";

interface ProfileFormProps {
  formData: ProfileFormData;
  role: string;

  errors: Partial<Record<keyof ProfileFormData, string>>;

  isLoading: boolean;
  isEditing: boolean;

  t: TFunction;

  onChange: (field: keyof ProfileFormData, value: string) => void;

  onSubmit: (e: SubmitEvent) => void;
  onEdit: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

export function ProfileForm({
  formData,
  role,
  errors,
  isLoading,
  isEditing,
  t,
  onChange,
  onSubmit,
  onEdit,
  onCancel,
  onLogout,
}: ProfileFormProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 3,
      }}
    >
      <ProfileHeader
        firstName={formData.firstName}
        lastName={formData.lastName}
        role={role}
        email={formData.email}
      />

      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{
          mt: 4,
        }}
      >
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
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            disabled={isLoading}
          >
            {t("profile.buttons.logout")}
          </Button>

          <Box
            sx={{
              display: "flex",
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
                    <CircularProgress size={24} />
                  ) : (
                    t("profile.buttons.save")
                  )}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
