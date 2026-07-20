import { useState, type SubmitEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useLoginMutation } from "../../store/slice/api/authApi";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "login.errors.email_required")
    .email("login.errors.email_invalid"),
  password: z
    .string()
    .nonempty("login.errors.password_required")
    .min(6, "login.errors.password_min_length"),
});

type LoginErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>;

export function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const [errors, setErrors] = useState<LoginErrors>({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];

        if (
          (path === "email" || path === "password") &&
          !formattedErrors[path]
        ) {
          formattedErrors[path] = issue.message;
        }
      });
      setErrors(formattedErrors);
      console.log(result);
      return;
    }

    console.log(result);

    login(result.data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        px: 2,
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
            {t("login.title")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("login.subtitle")}
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            label={t("login.fields.email")}
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            disabled={isLoading}
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email && t(errors.email)}
          />

          <TextField
            fullWidth
            label={t("login.fields.password")}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            disabled={isLoading}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password && t(errors.password)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            endIcon={!isLoading && <LoginIcon />}
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("login.submit_button")
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
