import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import type { VacancyResponse } from "../../../types/vacancy";
import { useTranslation } from "react-i18next";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";

interface VacancyCardProps {
  vacancy: VacancyResponse;
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const { t } = useTranslation();
  const { id, title, company, salaryFrom, salaryTo, PositionAttribute } =
    vacancy;

  return (
    <Card
      variant="outlined"
      component={Link}
      to={`/vacancies/${id}`}
      sx={{
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, lineHeight: 1.3 }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mt: 0.5,
              color: "text.secondary",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {company}
            </Typography>
            {salaryFrom && salaryTo && (
              <Typography
                variant="subtitle1"
                component="span"
                sx={{
                  fontWeight: 600,
                  color: "success.main",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  lineHeight: 1,
                  ml: "auto",
                  pt: 0.5,
                }}
              >
                {salaryFrom} – {salaryTo}
                <AttachMoneyIcon
                  sx={{
                    fontSize: "1.1rem",
                    ml: 0.1,
                    alignSelf: "center",
                  }}
                />
              </Typography>
            )}
          </Box>
        </Box>

        {PositionAttribute && PositionAttribute.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {PositionAttribute.map((posAttr) => (
              <Chip
                key={posAttr.attributeId}
                label={
                  posAttr.Attribute?.name ||
                  t("vacancies.form.labels.attribute")
                }
                size="small"
                sx={{
                  borderRadius: "6px",
                  fontWeight: 500,
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                  color: "primary.main",
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
