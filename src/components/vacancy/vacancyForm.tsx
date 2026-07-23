import { useState, type SubmitEvent } from "react";
import {
  Typography,
  Button,
  Paper,
  CircularProgress,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  useCreateVacancyMutation,
  useUpdateVacancyByIdMutation,
} from "../../store/slice/api/vacancyApi";

import type { VacancyFormProps } from "../../types/vacancy";

import { AttributesSection } from "./components/attributesSection";
import { RequirementsSection } from "./components/requirementsSection";
import { useVacancyForm } from "../../hooks/useVacancyForm";

export function VacancyForm({
  availableAttributes,
  mode,
  initialData,
}: VacancyFormProps) {
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [createVacancy, { isLoading: isCreating }] = useCreateVacancyMutation();
  const [updateVacancy, { isLoading: isUpdating }] =
    useUpdateVacancyByIdMutation();

  const isLoading = isCreating || isUpdating;

  const {
    title,
    setTitle,
    company,
    setCompany,
    description,
    setDescription,
    salaryFrom,
    setSalaryFrom,
    salaryTo,
    setSalaryTo,

    selectedAttributes,
    requirements,

    handleAddAttribute,
    handleAttributeChange,
    handleRemoveAttribute,

    handleAddRequirement,
    handleRequirementChange,
    handleRemoveRequirement,
  } = useVacancyForm({ initialData });

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const vacancyData = {
      title: title.trim(),
      company: company.trim(),
      description: description.trim(),

      salaryFrom: salaryFrom !== "" ? Number(salaryFrom) : null,
      salaryTo: salaryTo !== "" ? Number(salaryTo) : null,

      attributes: selectedAttributes.filter((item) => item.attributeId),

      requirements: requirements.filter(
        (item) => item.attributeId && item.value.trim()
      ),

      version: initialData?.version ?? 1,
    };

    try {
      if (mode === "create") {
        await createVacancy(vacancyData).unwrap();
      } else {
        if (!initialData) return;

        await updateVacancy({
          id: initialData.id,
          vacancy: vacancyData,
        }).unwrap();
      }
    } catch (error) {
      console.error("Failed to save vacancy:", error);
      setSubmitError(t("vacancies.errors.save_failed"));
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <Typography variant="h6">{t("vacancies.form.main_info")}</Typography>

      {submitError && (
        <Alert severity="error" onClose={() => setSubmitError(null)}>
          {submitError}
        </Alert>
      )}

      <TextField
        label={t("vacancies.form.title")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        required
        fullWidth
        size="small"
      />

      <TextField
        label={t("vacancies.form.company")}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        disabled={isLoading}
        required
        fullWidth
        size="small"
      />

      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label={t("vacancies.form.salary_from")}
            type="number"
            value={salaryFrom}
            onChange={(e) => setSalaryFrom(e.target.value)}
            disabled={isLoading}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid size={6}>
          <TextField
            label={t("vacancies.form.salary_to")}
            type="number"
            value={salaryTo}
            onChange={(e) => setSalaryTo(e.target.value)}
            disabled={isLoading}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      <TextField
        label={t("vacancies.form.description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
        multiline
        rows={4}
        fullWidth
        size="small"
      />

      <AttributesSection
        selectedAttributes={selectedAttributes}
        availableAttributes={availableAttributes}
        onAdd={handleAddAttribute}
        onRemove={handleRemoveAttribute}
        onChange={handleAttributeChange}
      />

      <RequirementsSection
        requirements={requirements}
        availableAttributes={availableAttributes}
        onAdd={handleAddRequirement}
        onRemove={handleRemoveRequirement}
        onChange={handleRequirementChange}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ alignSelf: "flex-end" }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : mode === "create" ? (
          t("vacancies.create_button")
        ) : (
          t("vacancies.update_button")
        )}
      </Button>
    </Paper>
  );
}
