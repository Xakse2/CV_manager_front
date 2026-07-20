import { useState, type SubmitEvent } from "react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useRegisterMutation } from "../../store/slice/api/authApi";
import { RegisterForm } from "./components/registrationForm";

const registerSchema = z
  .object({
    firstName: z.string().nonempty("register.errors.first_name_required"),
    lastName: z.string().nonempty("register.errors.last_name_required"),
    email: z
      .string()
      .nonempty("register.errors.email_required")
      .email("register.errors.email_invalid"),
    password: z
      .string()
      .nonempty("register.errors.password_required")
      .min(6, "register.errors.password_min_length"),
    confirmPassword: z
      .string()
      .nonempty("register.errors.confirm_password_required"),
    role: z.enum(["CANDIDATE", "RECRUITER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "register.errors.passwords_dont_match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>;

export function RegistrationPage() {
  const { t } = useTranslation();

  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CANDIDATE",
  });

  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleChange = (field: keyof RegisterFormData, value: string) => {
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

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: RegisterErrors = {};

      result.error.issues.forEach((issue) => {
        const path = issue.path[0];

        if (
          typeof path === "string" &&
          !formattedErrors[path as keyof RegisterErrors]
        ) {
          formattedErrors[path as keyof RegisterErrors] = issue.message;
        }
      });

      setErrors(formattedErrors);
      return;
    }

    const { confirmPassword, ...request } = result.data;

    try {
      await register(request).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      errors={errors}
      isLoading={isLoading}
      t={t}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
