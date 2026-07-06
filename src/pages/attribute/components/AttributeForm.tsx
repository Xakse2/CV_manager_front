import { useState, type SubmitEvent } from "react";
import { TextField, Button, MenuItem, Typography, Paper } from "@mui/material";
import { OptionTags } from "./OptionTags";
import { ATTRIBUTE_TYPES } from "../../../consts/attribute";
import { useCreateAttributeMutation } from "../../../store/slice/attributeSlice";
import type { AttributeType } from "../../../types/attribute";

export function AttributeForm() {
  const [createAttribute, { isLoading }] = useCreateAttributeMutation();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<AttributeType>("STRING");
  const [options, setOptions] = useState<string[]>([]);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!name.trim() || !category.trim()) return;

    try {
      await createAttribute({
        name,
        type,
        category,
        options: type === "DROPDOWN" ? options : [],
      }).unwrap();

      setName("");
      setCategory("");
      setType("STRING");
      setOptions([]);
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
      <Typography variant="h6">New attribute</Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        size="small"
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        fullWidth
        size="small"
      />

      <TextField
        select
        label="Data type"
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

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 1 }}
      >
        add attribute
      </Button>
    </Paper>
  );
}
