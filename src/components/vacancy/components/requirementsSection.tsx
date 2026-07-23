import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import type { RequirementsSectionProps } from "../../../types/attribute";
import { RequirementRow } from "./requirementRow";

export function RequirementsSection({
  requirements,
  availableAttributes,
  onAdd,
  onRemove,
  onChange,
}: RequirementsSectionProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {t("vacancies.requirements_title")}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          {t("vacancies.form.labels.add_requirement")}
        </Button>
      </Box>

      {requirements.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ py: 2 }}
        >
          {t("vacancies.no_requirements")}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {requirements.map((requirement, index) => {
            const itemKey = requirement.attributeId
              ? `${requirement.attributeId}-${index}`
              : `req-${index}`;

            return (
              <RequirementRow
                key={itemKey}
                attributeId={requirement.attributeId}
                operator={requirement.operator}
                value={requirement.value}
                allAttributes={availableAttributes}
                onChange={(key, value) => onChange(index, key, value)}
                onRemove={() => onRemove(index)}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
