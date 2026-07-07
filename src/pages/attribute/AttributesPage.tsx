import { AttributeForm } from "./components/AttributeForm";
import { AttributeTable } from "./components/AttributeTable";
import { useGetAttributesQuery } from "../../store/slice/attributeSlice";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export function AttributesPage() {
  const { t } = useTranslation();
  const { data: attributes = [], isLoading, isError } = useGetAttributesQuery();

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        {t("attributes.title")}
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {t("attributes.error")}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <AttributeForm />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <AttributeTable attributes={attributes} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
