import type { SubmitEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { PersonAdd as RegisterIcon } from "@mui/icons-material";
import type { TFunction } from "i18next";

import { RegisterFields } from "./registerFields.tsx";
import type { RegisterFormData } from "../registerPage.tsx";

interface RegisterFormProps {
  formData: RegisterFormData;
  errors: Partial<Record<keyof RegisterFormData, string>>;
  isLoading: boolean;
  t: TFunction;
  onChange: (field: keyof RegisterFormData, value: string) => void;
  onSubmit: (e: SubmitEvent) => void;
}

export function RegisterForm({
  formData,
  errors,
  isLoading,
  t,
  onChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {t("register.title")}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t("register.subtitle")}
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <RegisterFields
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            t={t}
            onChange={onChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            endIcon={!isLoading && <RegisterIcon />}
            sx={{
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("register.submit_button")
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
