import { useState, type SubmitEvent } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { OptionTags } from "./OptionTags";
import { ATTRIBUTE_CATEGORIES, ATTRIBUTE_TYPES } from "../../../consts/consts";
import { useCreateAttributeMutation } from "../../../store/slice/api/attributeApi";
import type { AttributeType } from "../../../types/attribute";
import { useTranslation } from "react-i18next";

export function AttributeForm() {
  const { t } = useTranslation();
  const [createAttribute, { isLoading }] = useCreateAttributeMutation();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<AttributeType>("STRING");
  const [options, setOptions] = useState<string[]>([]);
  const [isSystem, setIsSystem] = useState(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!name.trim() || !category.trim()) return;

    try {
      await createAttribute({
        name,
        type,
        category,
        options: type === "DROPDOWN" ? options : [],
        isSystem,
      }).unwrap();

      setName("");
      setCategory("");
      setType("STRING");
      setOptions([]);
      setIsSystem(false);
    } catch (err) {
      console.error("create error:", err);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
      }}
    >
      <Typography variant="h6">{t("attributes.form.title")}</Typography>

      <TextField
        label={t("attributes.form.name")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        size="small"
      />
      <TextField
        select
        label={t("attributes.form.category")}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        fullWidth
        size="small"
      >
        {ATTRIBUTE_CATEGORIES.map((categoryItem) => (
          <MenuItem key={categoryItem} value={categoryItem}>
            {t(`attributes.categories.${categoryItem}`, categoryItem)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label={t("attributes.form.data_type")}
        value={type}
        onChange={(e) => setType(e.target.value as AttributeType)}
        fullWidth
        size="small"
      >
        {ATTRIBUTE_TYPES.map((typeItem) => (
          <MenuItem key={typeItem} value={typeItem}>
            {typeItem}
          </MenuItem>
        ))}
      </TextField>

      {type === "DROPDOWN" && (
        <OptionTags options={options} onChange={setOptions} />
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={isSystem}
            onChange={(e) => setIsSystem(e.target.checked)}
            color="primary"
          />
        }
        label={t("attributes.form.is_system")}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 1 }}
      >
        {t("attributes.form.submit_button")}
      </Button>
    </Paper>
  );
}
