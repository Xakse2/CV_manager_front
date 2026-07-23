import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import type { Attribute, SelectedAttribute } from "../../../types/attribute";

interface AttributesSectionProps {
  selectedAttributes: SelectedAttribute[];
  availableAttributes: Attribute[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    key: "attributeId" | "required",
    value: string | boolean
  ) => void;
}

export function AttributesSection({
  selectedAttributes,
  availableAttributes,
  onAdd,
  onRemove,
  onChange,
}: AttributesSectionProps) {
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
          {t("vacancies.template_attributes_title")}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          {t("vacancies.form.labels.add_attribute")}
        </Button>
      </Box>

      {selectedAttributes.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ py: 2 }}
        >
          {t("vacancies.no_attributes")}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {selectedAttributes.map((attribute, index) => {
            const itemKey = attribute.attributeId || `attr-${index}`;

            return (
              <Grid
                container
                spacing={2}
                key={itemKey}
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
                <Grid size={7}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label={t("vacancies.form.labels.attribute")}
                    value={attribute.attributeId}
                    onChange={(e) =>
                      onChange(index, "attributeId", e.target.value)
                    }
                  >
                    {availableAttributes.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={attribute.required}
                        onChange={(e) =>
                          onChange(index, "required", e.target.checked)
                        }
                      />
                    }
                    label={t("vacancies.form.labels.required")}
                  />
                </Grid>

                <Grid size={1} sx={{ textAlign: "right" }}>
                  <IconButton
                    className="delete-btn"
                    color="error"
                    onClick={() => onRemove(index)}
                    aria-label={t("vacancies.form.labels.delete_attribute")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
