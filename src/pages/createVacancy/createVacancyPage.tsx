import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { VacancyForm } from "../../components/vacancy/vacancyForm";
import { useGetAttributesQuery } from "../../store/slice/api/attributeApi";

export function CreateVacancyPage() {
  const { t } = useTranslation();

  const { data: attributes = [], isLoading, error } = useGetAttributesQuery();

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Button
          component={Link}
          to="/vacancies"
          variant="outlined"
          sx={{ mb: 2 }}
        >
          {t("common.buttons.back")}
        </Button>
        <Typography variant="h4">{t("vacancies.create_title")}</Typography>
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      <Box
        sx={{
          p: 3,
          border: "1px dashed grey",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {error && (
          <Typography color="error" align="center">
            {t("vacancies.loading_error")}
          </Typography>
        )}

        {!isLoading && !error && (
          <VacancyForm mode="create" availableAttributes={attributes} />
        )}
      </Box>
    </Box>
  );
}
