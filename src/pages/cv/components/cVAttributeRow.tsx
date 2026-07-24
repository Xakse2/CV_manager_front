import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CancelIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import type { CVVirtualAttribute } from "../../../types/cv";
import { useUpdateCVAttributeMutation } from "../../../store/slice/api/cvApi";

interface Props {
  attribute: CVVirtualAttribute;
  cvId: string;
}

export function CVAttributeRow({ attribute, cvId }: Props) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(attribute.value ?? "");
  const [error, setError] = useState<string | null>(null);

  const [updateAttribute, { isLoading }] = useUpdateCVAttributeMutation();

  useEffect(() => {
    setValue(attribute.value ?? "");
  }, [attribute.value]);

  const handleCancel = () => {
    setValue(attribute.value ?? "");
    setError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setError(null);

    if (attribute.required) {
      const schema = z.string().trim().min(1, "cv.attribute.errors.required");
      const result = schema.safeParse(value);

      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }
    }

    try {
      await updateAttribute({
        cvId,
        attributeId: attribute.id,
        value,
      }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>
        {attribute.name}
        {attribute.required && " *"}
      </Typography>

      {!isEditing ? (
        <>
          <Typography
            color={attribute.required && !value ? "error" : "text.secondary"}
          >
            {value || t("cv.attribute.empty")}
          </Typography>

          <Button
            sx={{ mt: 1 }}
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
          >
            {t("cv.attribute.actions.edit")}
          </Button>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            disabled={isLoading}
            sx={{ mt: 1 }}
            error={!!error}
            helperText={error && t(error)}
          />

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SaveIcon />
                )
              }
              onClick={handleSave}
              disabled={isLoading}
            >
              {t("cv.attribute.actions.save")}
            </Button>

            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              disabled={isLoading}
            >
              {t("cv.attribute.actions.cancel")}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
