import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { Project } from "../../../../types/project";
import { ProjectCard } from "./projectCard";

interface ProjectsSectionProps {
  projects?: Project[];
  onAdd: () => void;
}

export function ProjectsSection({
  projects = [],
  onAdd,
}: ProjectsSectionProps) {
  const { t } = useTranslation();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">{t("profile.projects.title")}</Typography>

        <Button variant="outlined" startIcon={<AddIcon />} onClick={onAdd}>
          {t("common.add")}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {projects.length === 0 ? (
          <Typography color="text.secondary">
            {t("profile.projects.empty")}
          </Typography>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </Box>
    </Box>
  );
}
