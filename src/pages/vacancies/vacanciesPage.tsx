import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetVacanciesQuery } from "../../store/slice/api/vacancyApi";
import { VacanciesList } from "./components/VacanciesList";

import type { RootState } from "../../store/store";

export function VacanciesPage() {
  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: vacancies = [], isLoading, isError } = useGetVacanciesQuery();

  const canCreateVacancy = user?.role === "RECRUITER";

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">{t("vacancies.title")}</Typography>

        {canCreateVacancy && (
          <Button
            component={Link}

            to="/vacancies/create"

            variant="contained"
          >
            {t("vacancies.create_button")}
          </Button>
        )}
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography
          color="error"
          sx={{
            textAlign: "center",
            mt: 2,
          }}
        >
          {t("vacancies.loading_error")}
        </Typography>
      ) : (
        <VacanciesList vacancies={vacancies} />
      )}
    </Box>
  );
}
