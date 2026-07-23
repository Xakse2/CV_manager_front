import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { TFunction } from "i18next";
import { CvCard } from "./cvCard";

interface CvsSectionProps {
  cvs: CV[];
  t: TFunction;
  onCreate: () => void;
}

export function CvsSection({ cvs, t, onCreate }: CvsSectionProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6">{t("profile.cvs.title")}</Typography>

        <Button variant="outlined" startIcon={<AddIcon />} onClick={onCreate}>
          {t("profile.cvs.create")}
        </Button>
      </Box>

      {cvs.length === 0 ? (
        <Typography color="text.secondary">{t("profile.cvs.empty")}</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {cvs.map((cv) => (
            <CvCard key={cv.id} cv={cv} />
          ))}
        </Box>
      )}
    </Box>
  );
}
