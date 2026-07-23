import { Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";

import type { Attribute } from "../../../types/attribute";

interface AttributeEditorProps {
  attribute: Attribute;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AttributeEditor({
  attribute,
  value,
  onChange,
  disabled = false,
}: AttributeEditorProps) {
  switch (attribute.type) {
    case "TEXT":
      return (
        <TextField
          fullWidth
          multiline
          rows={4}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "NUMERIC":
      return (
        <TextField
          fullWidth
          type="number"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "DATE":
      return (
        <TextField
          fullWidth
          type="date"
          value={value}
          disabled={disabled}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "BOOLEAN":
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value === "true"}
              disabled={disabled}
              onChange={(e) => onChange(String(e.target.checked))}
            />
          }
          label={attribute.name}
        />
      );

    case "DROPDOWN":
      return (
        <TextField
          select
          fullWidth
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        >
          {attribute.options?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      );

    case "PERIOD":
      return (
        <TextField
          fullWidth
          value={value}
          disabled={disabled}
          placeholder="YYYY-MM-DD - YYYY-MM-DD"
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "IMAGE":
      return (
        <TextField
          fullWidth
          type="url"
          value={value}
          disabled={disabled}
          placeholder="Image URL"
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "STRING":
    default:
      return (
        <TextField
          fullWidth
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
