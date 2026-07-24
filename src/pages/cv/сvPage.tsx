import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useGetCVByIdQuery,
  usePublishCVMutation,
  useLikeCVMutation,
} from "../../store/slice/api/cvApi";
import { CVAttributeRow } from "./components/cVAttributeRow";

export function CvPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: cv, isLoading } = useGetCVByIdQuery(id!, {
    skip: !id,
  });

  const [publishCV, { isLoading: isPublishing }] = usePublishCVMutation();
  const [likeCV, { isLoading: isLiking }] = useLikeCVMutation();

  const canPublish =
    cv?.attributes.every(
      (attribute) =>
        !attribute.required ||
        (attribute.value && attribute.value.trim() !== "")
    ) ?? false;

  const handlePublish = async () => {
    if (!cv) return;

    try {
      await publishCV(cv.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    if (!cv) return;

    try {
      await likeCV(cv.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!cv) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h6" color="text.secondary">
          {t("cv.not_found")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        px: 2,
      }}
    >
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              {cv.position}
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              {cv.candidate}
            </Typography>
          </Box>

          <Chip
            label={
              cv.isPublished ? t("cv.status.published") : t("cv.status.draft")
            }
            color={cv.isPublished ? "success" : "default"}
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("cv.likes_count", { count: cv.likes })}
          </Typography>

          <Button
            variant={cv.likedByMe ? "contained" : "outlined"}
            color="error"
            startIcon={cv.likedByMe ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={handleLike}
            disabled={isLiking}
          >
            {cv.likedByMe ? t("cv.actions.unlike") : t("cv.actions.like")}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            disabled={!canPublish || cv.isPublished || isPublishing}
            onClick={handlePublish}
            startIcon={
              isPublishing ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <PublishIcon />
              )
            }
          >
            {cv.isPublished
              ? t("cv.actions.published")
              : t("cv.actions.publish")}
          </Button>
        </Box>

        <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
          {t("cv.sections.attributes")}
        </Typography>

        {cv.attributes.map((attribute) => (
          <CVAttributeRow
            key={attribute.id}
            attribute={attribute}
            cvId={cv.id}
          />
        ))}

        <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
          {t("cv.sections.projects")}
        </Typography>

        {cv.projects.map((project) => (
          <Box
            key={project.id}
            sx={{
              mt: 2,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {project.title}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {project.description}
            </Typography>

            <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {project.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
