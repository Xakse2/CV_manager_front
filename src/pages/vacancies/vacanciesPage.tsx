import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetVacanciesQuery } from "../../store/slice/vacancySlice";
import { VacanciesList } from "./components/VacanciesList";

export function VacanciesPage() {
  const { t } = useTranslation();
  const { data: vacancies = [], isLoading, isError } = useGetVacanciesQuery();

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">{t("vacancies.title")}</Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            component={Link}
            to="/vacancies/create"
            variant="contained"
            color="primary"
          >
            {t("vacancies.create_button")}
          </Button>
        </Box>
      </Box>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography
          color="error"
          variant="body1"
          sx={{ textAlign: "center", mt: 2 }}
        >
          {t("vacancies.loading_error")}
        </Typography>
      ) : (
        <VacanciesList vacancies={vacancies} />
      )}
    </Box>
  );
}
