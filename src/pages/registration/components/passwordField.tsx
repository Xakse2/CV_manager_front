import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { TFunction } from "i18next";

interface PasswordFieldProps {
  label: string;
  value: string;
  error?: string;
  disabled: boolean;
  t: TFunction;
  onChange: (value: string) => void;
}

export function PasswordField({
  label,
  value,
  error,
  disabled,
  t,
  onChange,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      fullWidth
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      disabled={disabled}
      autoComplete="new-password"
      error={!!error}
      helperText={error && t(error)}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
