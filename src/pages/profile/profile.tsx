import { useEffect, useState, type SubmitEvent } from "react";
import { Box, CircularProgress } from "@mui/material";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useUpdateProfileMutation } from "../../store/slice/api/userApi";
import { useGetUserAttributesQuery } from "../../store/slice/api/userAttributeApi";
import { ProfileForm } from "./components/profileForm";

import type { RootState } from "../../store/store";
import { useGetAttributesQuery } from "../../store/slice/api/attributeApi";
import { useGetMyProjectsQuery } from "../../store/slice/api/projectApi";
import { useGetMyCVsQuery } from "../../store/slice/api/cvApi";

const profileSchema = z.object({
  firstName: z.string().nonempty("profile.errors.first_name_required"),
  lastName: z.string().nonempty("profile.errors.last_name_required"),
  email: z
    .string()
    .nonempty("profile.errors.email_required")
    .email("profile.errors.email_invalid"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

type ProfileErrors = Partial<Record<keyof ProfileFormData, string>>;

export function ProfilePage() {
  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: attributes = [], isLoading: attributesLoading } =
    useGetUserAttributesQuery();

  const { data: libraryAttributes = [] } = useGetAttributesQuery();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { data: projects = [], isLoading: projectsLoading } =
    useGetMyProjectsQuery();

  const { data: cvs = [], isLoading: cvsLoading } = useGetMyCVsQuery();

  const [errors, setErrors] = useState<ProfileErrors>({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
      });
    }
  }, [user]);

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

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: ProfileErrors = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ProfileFormData;

        if (path && !formattedErrors[path]) {
          formattedErrors[path] = issue.message;
        }
      });

      setErrors(formattedErrors);
      return;
    }

    try {
      await updateProfile(result.data).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
    });

    setErrors({});
    setIsEditing(false);
  };

  return (
    <ProfileForm
      formData={isEditing ? formData : user}
      role={user.role}
      techStack={[]}
      attributes={attributes}
      libraryAttributes={libraryAttributes}
      projects={projects}
      cvs={cvs}
      onCreateCV={() => {}}
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
    />
  );
}
