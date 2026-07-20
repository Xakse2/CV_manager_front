import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { TFunction } from "i18next";

type Role = "CANDIDATE" | "RECRUITER";

interface RoleSelectorProps {
  value: Role;
  disabled: boolean;
  t: TFunction;
  onChange: (value: Role) => void;
}

export function RoleSelector({
  value,
  disabled,
  t,
  onChange,
}: RoleSelectorProps) {
  return (
    <FormControl>
      <FormLabel>{t("register.fields.role")}</FormLabel>

      <RadioGroup
        row
        value={value}
        onChange={(e) => onChange(e.target.value as Role)}
      >
        <FormControlLabel
          value="CANDIDATE"
          control={<Radio />}
          label={t("register.roles.candidate")}
          disabled={disabled}
        />

        <FormControlLabel
          value="RECRUITER"
          control={<Radio />}
          label={t("register.roles.recruiter")}
          disabled={disabled}
        />
      </RadioGroup>
    </FormControl>
  );
}
