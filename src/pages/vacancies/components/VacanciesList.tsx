import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { VacancyCard } from "./VacancyCard";
import type { VacancyResponse } from "../../../types/vacancy";

interface VacanciesListProps {
  vacancies: VacancyResponse[];
}

export function VacanciesList({ vacancies }: VacanciesListProps) {
  const { t } = useTranslation();

  if (vacancies.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", mt: 2, textAlign: "center" }}
      >
        {t("vacancies.empty_list")}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}
    </Box>
  );
}
