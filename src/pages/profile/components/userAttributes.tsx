import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import type { TFunction } from "i18next";

import type { UserAttribute } from "../../../types/userAttribute";
import { AttributeRow } from "./attributeRow";

interface UserAttributesProps {
  attributes?: UserAttribute[];
  t: TFunction;
  onAdd?: () => void; // Добавили обработчик для клика
}

export function UserAttributes({
  attributes = [],
  t,
  onAdd,
}: UserAttributesProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">{t("profile.attributes.title")}</Typography>

        {onAdd && (
          <Button variant="outlined" startIcon={<AddIcon />} onClick={onAdd}>
            {t("profile.attributes.add")}
          </Button>
        )}
      </Box>

      {attributes.length === 0 ? (
        <Typography color="text.secondary">
          {t("profile.attributes.empty")}
        </Typography>
      ) : (
        attributes.map((attribute) => (
          <AttributeRow
            key={attribute.id || attribute.attributeId}
            attribute={attribute}
            t={t}
          />
        ))
      )}
    </Box>
  );
}
