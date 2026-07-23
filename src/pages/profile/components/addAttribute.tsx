import { useState } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import type { TFunction } from "i18next";

import type { Attribute } from "../../../types/attribute";
import { useCreateUserAttributeMutation } from "../../../store/slice/api/userAttributeApi";
import { AttributeEditor } from "./attributeEditor";

interface AddUserAttributeProps {
  attributes: Attribute[];
  t: TFunction;
}

export function AddUserAttribute({ attributes, t }: AddUserAttributeProps) {
  const [selectedAttributeId, setSelectedAttributeId] = useState("");
  const [value, setValue] = useState("");

  const [createAttribute, { isLoading }] = useCreateUserAttributeMutation();

  const selectedAttribute = attributes.find(
    (a) => a.id === selectedAttributeId
  );

  const handleSubmit = async () => {
    if (!selectedAttributeId || !value) {
      return;
    }

    try {
      await createAttribute({
        attributeId: selectedAttributeId,
        value,
      }).unwrap();

      setSelectedAttributeId("");
      setValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 3,
      }}
    >
      <TextField
        select
        label={t("profile.attributes.select")}
        value={selectedAttributeId}
        disabled={isLoading}
        onChange={(e) => {
          setSelectedAttributeId(e.target.value);
          setValue("");
        }}
      >
        {attributes.map((attribute) => (
          <MenuItem key={attribute.id} value={attribute.id}>
            {attribute.name}
          </MenuItem>
        ))}
      </TextField>

      {selectedAttribute && (
        <AttributeEditor
          attribute={selectedAttribute}
          value={value}
          disabled={isLoading}
          onChange={setValue}
        />
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!selectedAttributeId || !value || isLoading}
      >
        {t("profile.attributes.add")}
      </Button>
    </Box>
  );
}
