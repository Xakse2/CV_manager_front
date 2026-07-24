import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetUserAttributesQuery } from "../../../../store/slice/api/userAttributeApi";
import { useGetAttributesQuery } from "../../../../store/slice/api/attributeApi";
import { useGetMyProjectsQuery } from "../../../../store/slice/api/projectApi";
import { useGetMyCVsQuery } from "../../../../store/slice/api/cvApi";
import { ProfileForm } from "../profileForm";
import { UserAttributes } from "../userAttributes";
import { ProjectsSection } from "../project/projectsSection";
import { CvsSection } from "../cv/cvsSection";
import { AddUserAttributeDialog } from "../addUserAttributeDialog";
import { CreateCVDialog } from "../cv/createCVDialog";
import { AddProjectDialog } from "../project/addProjectDialog";
import { useProfileForm } from "../../../../hooks/useProfileForm";

export function CandidateProfile() {
  const { t } = useTranslation();

  const {
    user,
    formData,
    errors,
    isEditing,
    isUpdating,
    handleChange,
    handleSubmit,
    handleEdit,
    handleCancel,
    handleLogout,
  } = useProfileForm();

  const { data: attributes = [], isLoading: attributesLoading } =
    useGetUserAttributesQuery();
  const { data: libraryAttributes = [] } = useGetAttributesQuery();
  const { data: projects = [], isLoading: projectsLoading } =
    useGetMyProjectsQuery();
  const { data: cvs = [], isLoading: cvsLoading } = useGetMyCVsQuery();

  const [openAddAttribute, setOpenAddAttribute] = useState(false);
  const [openCreateCv, setOpenCreateCv] = useState(false);
  const [openAddProject, setOpenAddProject] = useState(false);

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        px: 2,
        py: 4,
      }}
    >
      <ProfileForm
        formData={isEditing ? formData : user}
        role={user.role}
        errors={errors}
        isLoading={
          isUpdating || attributesLoading || projectsLoading || cvsLoading
        }
        isEditing={isEditing}
        t={t}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onLogout={handleLogout}
      />

      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <UserAttributes
          attributes={attributes}
          t={t}
          onAdd={() => setOpenAddAttribute(true)}
        />
        <AddUserAttributeDialog
          open={openAddAttribute}
          onClose={() => setOpenAddAttribute(false)}
          attributes={libraryAttributes}
          userAttributes={attributes}
          t={t}
        />

        <ProjectsSection
          projects={projects}
          onAdd={() => setOpenAddProject(true)}
        />

        <AddProjectDialog
          open={openAddProject}
          onClose={() => setOpenAddProject(false)}
          t={t}
        />

        <CvsSection cvs={cvs} t={t} onCreate={() => setOpenCreateCv(true)} />

        <CreateCVDialog
          open={openCreateCv}
          onClose={() => setOpenCreateCv(false)}
        />
      </Box>
    </Box>
  );
}
