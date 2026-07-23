import { Box, Typography } from "@mui/material";
import type { TFunction } from "i18next";

import type { UserAttribute } from "../../../types/userAttribute";
import { AttributeRow } from "./attributeRow";

interface UserAttributesProps {
  attributes?: UserAttribute[];
  t: TFunction;
}

export function UserAttributes({ attributes = [], t }: UserAttributesProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t("profile.attributes.title")}
      </Typography>

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
