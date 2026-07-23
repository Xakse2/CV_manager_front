import { Grid, IconButton, MenuItem, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import type { Attribute } from "../../../types/attribute";

interface RequirementRowProps {
  attributeId: string;
  operator: string;
  value: string;
  allAttributes: Attribute[];
  onChange: (key: "attributeId" | "operator" | "value", value: string) => void;
  onRemove: () => void;
}

export function RequirementRow({
  attributeId,
  operator,
  value,
  allAttributes,
  onChange,
  onRemove,
}: RequirementRowProps) {
  const { t } = useTranslation();

  const currentAttribute = allAttributes.find(
    (attr) => attr.id === attributeId
  );

  const getOperators = () => {
    switch (currentAttribute?.type) {
      case "NUMERIC":
      case "DATE":
        return ["=", "!=", ">", "<", ">=", "<="];

      case "BOOLEAN":
      case "DROPDOWN":
        return ["=", "!="];

      default:
        return ["=", "CONTAINS"];
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        alignItems: "center",
        borderRadius: 1,
        p: 0.5,
        transition: "background-color 0.2s ease",
        "& .delete-btn": {
          opacity: 0,
          transition: "opacity 0.2s ease",
        },
        "&:hover": {
          backgroundColor: "action.hover",
        },
        "&:hover .delete-btn, & .delete-btn:focus-visible": {
          opacity: 1,
        },
      }}
    >
      <Grid size={3}>
        <TextField
          select
          fullWidth
          size="small"
          label={t("vacancies.form.labels.attribute")}
          value={attributeId}
          onChange={(e) => onChange("attributeId", e.target.value)}
        >
          {allAttributes.map((attribute) => (
            <MenuItem key={attribute.id} value={attribute.id}>
              {attribute.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={2}>
        <TextField
          select
          fullWidth
          size="small"
          label={t("vacancies.form.labels.operator")}
          value={operator}
          disabled={!attributeId}
          onChange={(e) => onChange("operator", e.target.value)}
        >
          {getOperators().map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={6}>
        {!currentAttribute && (
          <TextField
            fullWidth
            size="small"
            disabled
            label={t("vacancies.form.labels.value_text")}
            placeholder={t("vacancies.form.labels.select_placeholder")}
          />
        )}

        {currentAttribute?.type === "STRING" && (
          <TextField
            fullWidth
            size="small"
            label={t("vacancies.form.labels.value_text")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
          />
        )}

        {currentAttribute?.type === "TEXT" && (
          <TextField
            fullWidth
            multiline
            rows={3}
            size="small"
            label={t("vacancies.form.labels.value_text")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
          />
        )}

        {currentAttribute?.type === "NUMERIC" && (
          <TextField
            fullWidth
            type="number"
            size="small"
            label={t("vacancies.form.labels.value_number")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
          />
        )}

        {currentAttribute?.type === "DATE" && (
          <TextField
            fullWidth
            type="date"
            size="small"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            label={t("vacancies.form.labels.value_date")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
          />
        )}

        {currentAttribute?.type === "BOOLEAN" && (
          <TextField
            select
            fullWidth
            size="small"
            label={t("vacancies.form.labels.value_boolean")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
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
            fullWidth
            size="small"
            label={t("vacancies.form.labels.value_dropdown")}
            value={value}
            onChange={(e) => onChange("value", e.target.value)}
          >
            {currentAttribute.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>

      <Grid size={1} sx={{ textAlign: "right" }}>
        <IconButton
          className="delete-btn"
          color="error"
          onClick={onRemove}
          aria-label={t("vacancies.form.labels.delete_requirement")}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
