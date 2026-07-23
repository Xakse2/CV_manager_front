import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { CVListItem } from "../../../../types/cv";

interface CvCardProps {
  cv: CVListItem;
}

export function CvCard({ cv }: CvCardProps) {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6">{cv.Position.title}</Typography>

      <Typography color="text.secondary">
        {cv.isPublished ? "Published" : "Draft"}
      </Typography>

      <Button component={Link} to={`/cv/${cv.id}`} sx={{ mt: 1 }}>
        Open
      </Button>
    </Box>
  );
}
