import { AttributeForm } from "./components/AttributeForm";
import { AttributeTable } from "./components/AttributeTable";
import { useGetAttributesQuery } from "../../store/slice/attributeSlice";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";

export const AttributesPage: React.FC = () => {
  const { data: attributes = [], isLoading, isError } = useGetAttributesQuery();

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Библиотека атрибутов
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Не удалось загрузить атрибуты
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Левая колонка — Форма */}
        <Grid size={{ xs: 12, md: 4 }}>
          <AttributeForm />
        </Grid>

        {/* Правая колонка — Таблица со списком */}
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
};
