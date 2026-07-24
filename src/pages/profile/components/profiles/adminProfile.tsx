import { Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProfileForm } from "../profileForm";
import { useProfileForm } from "../../../../hooks/useProfileForm";

export function AdminProfile() {
  const { t } = useTranslation();
  const {
    user,
    formData,
    errors,
    isEditing,
    isUpdating,
    handleChange,
    handleSubmit,
    handleEdit,
    handleCancel,
    handleLogout,
  } = useProfileForm();

  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", px: 2, py: 4 }}>
      <ProfileForm
        formData={isEditing ? formData : user}
        role={user.role}
        errors={errors}
        isLoading={isUpdating}
        isEditing={isEditing}
        t={t}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onLogout={handleLogout}
      />
    </Box>
  );
}
