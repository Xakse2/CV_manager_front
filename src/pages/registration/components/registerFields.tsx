import { TextField } from "@mui/material";
import type { TFunction } from "i18next";
import type { RegisterFormData } from "../registerPage";
import { PasswordField } from "./passwordField";
import { RoleSelector } from "./roleSelector";

interface RegisterFieldsProps {
  formData: RegisterFormData;
  errors: Partial<Record<keyof RegisterFormData, string>>;
  isLoading: boolean;
  t: TFunction;
  onChange: (field: keyof RegisterFormData, value: string) => void;
}

export function RegisterFields({
  formData,
  errors,
  isLoading,
  t,
  onChange,
}: RegisterFieldsProps) {
  return (
    <>
      <TextField
        fullWidth
        label={t("register.fields.first_name")}
        value={formData.firstName}
        disabled={isLoading}
        autoComplete="given-name"
        error={!!errors.firstName}
        helperText={errors.firstName && t(errors.firstName)}
        onChange={(e) => onChange("firstName", e.target.value)}
      />

      <TextField
        fullWidth
        label={t("register.fields.last_name")}
        value={formData.lastName}
        disabled={isLoading}
        autoComplete="family-name"
        error={!!errors.lastName}
        helperText={errors.lastName && t(errors.lastName)}
        onChange={(e) => onChange("lastName", e.target.value)}
      />

      <TextField
        fullWidth
        label={t("register.fields.email")}
        type="email"
        value={formData.email}
        disabled={isLoading}
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email && t(errors.email)}
        onChange={(e) => onChange("email", e.target.value)}
      />

      <PasswordField
        label={t("register.fields.password")}
        value={formData.password}
        error={errors.password}
        disabled={isLoading}
        onChange={(value) => onChange("password", value)}
        t={t}
      />

      <PasswordField
        label={t("register.fields.confirm_password")}
        value={formData.confirmPassword}
        error={errors.confirmPassword}
        disabled={isLoading}
        onChange={(value) => onChange("confirmPassword", value)}
        t={t}
      />

      <RoleSelector
        value={formData.role}
        disabled={isLoading}
        onChange={(value) => onChange("role", value)}
        t={t}
      />
    </>
  );
}
