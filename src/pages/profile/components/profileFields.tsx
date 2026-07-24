import { Box, TextField } from "@mui/material";
import type { TFunction } from "i18next";
import type { ProfileFormData } from "../../../hooks/useProfileForm";

interface ProfileFieldsProps {
  formData: ProfileFormData;
  errors: Partial<Record<keyof ProfileFormData, string>>;
  isEditing: boolean;
  isLoading: boolean;
  t: TFunction;
  onChange: (field: keyof ProfileFormData, value: string) => void;
}

export function ProfileFields({
  formData,
  errors,
  isEditing,
  isLoading,
  t,
  onChange,
}: ProfileFieldsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mb: 4,
      }}
    >
      <TextField
        fullWidth
        label={t("profile.fields.first_name")}
        value={formData.firstName}
        disabled={!isEditing || isLoading}
        error={!!errors.firstName}
        helperText={errors.firstName && t(errors.firstName)}
        onChange={(e) => onChange("firstName", e.target.value)}
      />

      <TextField
        fullWidth
        label={t("profile.fields.last_name")}
        value={formData.lastName}
        disabled={!isEditing || isLoading}
        error={!!errors.lastName}
        helperText={errors.lastName && t(errors.lastName)}
        onChange={(e) => onChange("lastName", e.target.value)}
      />

      <TextField
        fullWidth
        label={t("profile.fields.email")}
        type="email"
        value={formData.email}
        disabled={!isEditing || isLoading}
        error={!!errors.email}
        helperText={errors.email && t(errors.email)}
        onChange={(e) => onChange("email", e.target.value)}
      />
    </Box>
  );
}
