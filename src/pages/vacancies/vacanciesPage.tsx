import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function VacanciesPage() {
  const { t } = useTranslation();

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
      <Typography variant="body1" sx={{ color: "text.secondary", mt: 2 }}>
        {t("vacancies.empty_list")}
      </Typography>
    </Box>
  );
}
