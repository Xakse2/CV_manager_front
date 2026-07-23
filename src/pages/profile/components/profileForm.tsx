import { useState, type SubmitEvent } from "react";
import { Box, Button, CircularProgress, Divider, Paper } from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import type { TFunction } from "i18next";

import type { ProfileFormData } from "../profile";
import type { UserAttribute } from "../../../types/userAttribute";
import type { Attribute } from "../../../types/attribute";
import type { Project } from "../../../types/project";
import type { CVListItem } from "../../../types/cv";

import { ProfileFields } from "./profileFields";
import { ProfileHeader } from "./profileHeader";
import { TechStack } from "./techStack";
import { UserAttributes } from "./userAttributes";
import { AddUserAttributeDialog } from "./addUserAttributeDialog";
import { ProjectsSection } from "./project/projectsSection";
import { AddProjectDialog } from "./project/addProjectDialog";
import { CvsSection } from "./cv/cvsSection";

interface ProfileFormProps {
  formData: ProfileFormData;
  role: string;
  techStack: string[];

  attributes: UserAttribute[];
  libraryAttributes: Attribute[];

  projects?: Project[];
  cvs?: CVListItem[];
  onCreateCV: () => void;

  errors: Partial<Record<keyof ProfileFormData, string>>;
  isLoading: boolean;
  isEditing: boolean;
  t: TFunction;

  onChange: (field: keyof ProfileFormData, value: string) => void;

  onSubmit: (e: SubmitEvent) => void;
  onEdit: () => void;
  onCancel: () => void;
}

export function ProfileForm({
  formData,
  role,
  techStack,
  attributes,
  libraryAttributes,
  projects = [],
  cvs = [],
  onCreateCV,
  errors,
  isLoading,
  isEditing,
  t,
  onChange,
  onSubmit,
  onEdit,
  onCancel,
}: ProfileFormProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
        }}
      >
        <ProfileHeader
          firstName={formData.firstName}
          lastName={formData.lastName}
          role={role}
          email={formData.email}
        />

        <Divider sx={{ my: 3 }} />

        <TechStack techStack={techStack} t={t} />

        <Divider sx={{ my: 3 }} />

        <UserAttributes attributes={attributes} t={t} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
          >
            {t("profile.attributes.add")}
          </Button>
        </Box>

        <AddUserAttributeDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          attributes={libraryAttributes}
          userAttributes={attributes}
          t={t}
        />

        <Divider sx={{ my: 3 }} />

        <ProjectsSection
          projects={projects}
          onAdd={() => setOpenProjectDialog(true)}
        />

        <AddProjectDialog
          open={openProjectDialog}
          onClose={() => setOpenProjectDialog(false)}
          t={t}
        />

        <Divider sx={{ my: 3 }} />

        <CvsSection cvs={cvs} t={t} onCreate={onCreateCV} />

        <Divider sx={{ my: 3 }} />

        <Box component="form" onSubmit={onSubmit} noValidate>
          <ProfileFields
            formData={formData}
            errors={errors}
            isEditing={isEditing}
            isLoading={isLoading}
            t={t}
            onChange={onChange}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={onEdit}
                disabled={isLoading}
              >
                {t("profile.buttons.edit")}
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  {t("profile.buttons.cancel")}
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  startIcon={!isLoading && <SaveIcon />}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t("profile.buttons.save")
                  )}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
