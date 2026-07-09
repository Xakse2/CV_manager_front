import { TextField, MenuItem, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import type { RequirementRowProps } from "../../../types/attribute";

export function RequirementRow({
  attributeId,
  value,
  allAttributes,
  onChange,
  onRemove,
}: RequirementRowProps) {
  const { t } = useTranslation();

  const currentAttribute = allAttributes.find(
    (attribute) => attribute.id === attributeId
  );

  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
      <Grid size={5}>
        <TextField
          select
          label={t("vacancies.form.labels.attribute")}
          value={attributeId}
          onChange={(e) => onChange("attributeId", e.target.value)}
          fullWidth
          size="small"
        >
          {allAttributes.map((attribute) => (
            <MenuItem key={attribute.id} value={attribute.id}>
              {attribute.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={5}>
        {!currentAttribute && (
          <TextField
            label={t("vacancies.form.labels.value_text")}
            disabled
            fullWidth
            size="small"
            placeholder={t("vacancies.form.labels.select_placeholder")}
          />
        )}

        {currentAttribute?.type === "NUMERIC" && (
          <TextField
            label={t("vacancies.form.labels.value_number")}
            type="number"
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
            fullWidth
            size="small"
          />
        )}

        {(currentAttribute?.type === "STRING" ||
          currentAttribute?.type === "TEXT") && (
          <TextField
            label={t("vacancies.form.labels.value_text")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
            fullWidth
            size="small"
          />
        )}

        {currentAttribute?.type === "BOOLEAN" && (
          <TextField
            select
            label={t("vacancies.form.labels.value_boolean")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="true">
              {t("vacancies.form.labels.boolean_yes")}
            </MenuItem>
            <MenuItem value="false">
              {t("vacancies.form.labels.boolean_no")}
            </MenuItem>
          </TextField>
        )}

        {currentAttribute?.type === "DROPDOWN" && (
          <TextField
            select
            label={t("vacancies.form.labels.value_dropdown")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
            fullWidth
            size="small"
          >
            {currentAttribute.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>

      <Grid size={2} sx={{ textAlign: "right" }}>
        <IconButton color="error" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
