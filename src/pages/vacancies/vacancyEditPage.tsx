import { Link, useParams } from "react-router-dom";
import { useGetVacancyByIdQuery } from "../../store/slice/vacancySlice";
import { VacancyForm } from "../../components/vacancy/vacancyForm";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

export function VacancyEditPage() {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: vacancy, isLoading } = useGetVacancyByIdQuery(id!);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!vacancy) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {t("vacancies.error_fetching")}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to={"/vacancies"}
          sx={{ mt: 2 }}
        >
          {t("vacancies.back_to_list")}
        </Button>
      </Box>
    );
  }

  return (
    <VacancyForm mode="edit" initialData={vacancy} availableAttributes={[]} />
  );
}
