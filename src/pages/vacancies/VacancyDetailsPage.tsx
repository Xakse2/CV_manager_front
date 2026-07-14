import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useGetVacancyByIdQuery } from "../../store/slice/vacancySlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function VacancyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [isLiked, setIsLiked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const {
    data: vacancy,
    isLoading,
    isError,
  } = useGetVacancyByIdQuery(id || "");

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !vacancy) {
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
    <Box
      sx={{
        p: 4,
        maxWidth: 800,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        component={Link}
        to={"/vacancies"}
        sx={{ alignSelf: "flex-start" }}
      >
        {t("vacancies.back_to_list")}
      </Button>

      <Button
        startIcon={<EditIcon />}
        variant="outlined"
        component={Link}
        to={`/vacancies/${id}/edit`}
      >
        {t("vacancies.edit_button")}
      </Button>

      <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, boxShadow: 1 }}>
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <IconButton color="error" onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {vacancy.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 0.5, fontWeight: 500 }}
            >
              {vacancy.company}
            </Typography>
          </Box>

          {vacancy.salaryFrom && vacancy.salaryTo && (
            <Typography
              variant="h5"
              component="span"
              sx={{
                fontWeight: 700,
                color: "success.main",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                lineHeight: 1,
                pt: 0.5,
              }}
            >
              {vacancy.salaryFrom} – {vacancy.salaryTo}
              <AttachMoneyIcon sx={{ fontSize: "1.5rem", ml: 0.1 }} />
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {vacancy.description && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
              {t("vacancies.description_title")}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.7, whiteSpace: "pre-line" }}
            >
              {vacancy.description}
            </Typography>
          </Box>
        )}

        {vacancy.PositionAttribute && vacancy.PositionAttribute.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
              {t("vacancies.requirements_title")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {vacancy.PositionAttribute.map((posAttr) => (
                <Chip
                  key={posAttr.attributeId}
                  label={
                    posAttr.Attribute?.name ||
                    t("vacancies.form.labels.attribute")
                  }
                  sx={{
                    borderRadius: "6px",
                    fontWeight: 500,
                    px: 1,
                    py: 2,
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                    color: "primary.main",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color={hasApplied ? "success" : "primary"}
            startIcon={hasApplied ? <CheckCircleIcon /> : <SendIcon />}
            onClick={() => setHasApplied(!hasApplied)}
            size="large"
          >
            {hasApplied ? t("vacancies.applied") : t("vacancies.apply")}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
