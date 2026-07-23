import { Box, Chip, Typography } from "@mui/material";
import type { TFunction } from "i18next";

interface TechStackProps {
  techStack?: string[];
  t: TFunction;
}

export function TechStack({ techStack = [], t }: TechStackProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {t("profile.tech_stack")}
      </Typography>

      {techStack.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {t("profile.tech_stack_empty", { defaultValue: "-" })}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 1,
          }}
        >
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              variant="outlined"
              color="primary"
              size="small"
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
