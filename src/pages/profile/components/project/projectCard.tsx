import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";

import type { Project } from "../../../../types/project";
import { AddProjectDialog } from "./addProjectDialog";
import { useDeleteProjectMutation } from "../../../../store/slice/api/projectApi";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const open = Boolean(anchorEl);

  const handleDelete = async () => {
    try {
      await deleteProject(project.id).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6">{project.title}</Typography>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setOpenEdit(true);
                setAnchorEl(null);
              }}
            >
              {t("common.edit")}
            </MenuItem>

            <MenuItem onClick={handleDelete} disabled={isDeleting}>
              {t("common.delete")}
            </MenuItem>
          </Menu>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {project.startDate ? project.startDate.slice(0, 10) : ""} -{" "}
          {project.endDate ? project.endDate.slice(0, 10) : t("common.present")}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </Box>

        {project.tags?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 2,
            }}
          >
            {project.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
        )}
      </Box>

      <AddProjectDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        project={project}
        t={t}
      />
    </>
  );
}
