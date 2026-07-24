// useProfileForm.ts
import { useState, useEffect, type SubmitEvent } from "react";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useLogoutMutation } from "../store/slice/api/authApi";
import { useUpdateProfileMutation } from "../store/slice/api/userApi";
import type { RootState } from "../store/store";

const profileSchema = z.object({
  firstName: z.string().min(1, "profile.errors.first_name_required"),
  lastName: z.string().min(1, "profile.errors.last_name_required"),
  email: z
    .string()
    .min(1, "profile.errors.email_required")
    .email("profile.errors.email_invalid"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileErrors = Partial<Record<keyof ProfileFormData, string>>;

export function useProfileForm() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [logout] = useLogoutMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });
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

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: ProfileErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ProfileFormData;
        if (field && !newErrors[field]) {
          newErrors[field] = issue.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    try {
      await updateProfile(result.data).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEdit = () => {
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  return {
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
  };
}
