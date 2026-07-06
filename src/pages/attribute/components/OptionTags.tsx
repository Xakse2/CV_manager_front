import { Box, TextField, Button, Chip } from "@mui/material";
import { useState } from "react";
import type { OptionTagsProps } from "../../../types/attribute";

export function OptionTags({ options, onChange }: OptionTagsProps) {
  const [currentOption, setCurrentOption] = useState("");

  const handleAdd = () => {
    if (currentOption.trim() && !options.includes(currentOption.trim())) {
      onChange([...options, currentOption.trim()]);
      setCurrentOption("");
    }
  };

  const handleDelete = (indexToDelete: number) => {
    onChange(options.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="Answer variant"
          size="small"
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), handleAdd())
          }
        />
        <Button variant="outlined" onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {options.map((opt, idx) => (
          <Chip
            key={idx}
            label={opt}
            onDelete={() => handleDelete(idx)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
}
