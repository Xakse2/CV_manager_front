import { useState, type SubmitEvent } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import type {
  SelectedAttribute,
  SelectedRequirement,
} from "../../types/attribute";
import { RequirementsSection } from "./components/requirementsSection";
import {
  useCreateVacancyMutation,
  useUpdateVacancyByIdMutation,
} from "../../store/slice/vacancySlice";
import type { VacancyFormProps } from "../../types/vacancy";

export function VacancyForm({
  availableAttributes,
  mode,
  initialData,
}: VacancyFormProps) {
  const { t } = useTranslation();

  const [createVacancy, { isLoading }] = useCreateVacancyMutation();
  const [updateVacancy] = useUpdateVacancyByIdMutation();
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [company, setCompany] = useState(initialData?.company ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [salaryFrom, setSalaryFrom] = useState(
    initialData?.salaryFrom?.toString() ?? ""
  );
  const [salaryTo, setSalaryTo] = useState(
    initialData?.salaryTo?.toString() ?? ""
  );
  const [attributes, setAttributes] = useState<SelectedAttribute[]>(
    initialData?.PositionAttribute ?? []
  );
  const [requirements, setRequirements] = useState<SelectedRequirement[]>(
    initialData?.PositionAccessRule ?? []
  );
  const handleAddRequirement = () => {
    setRequirements([
      ...requirements,
      {
        attributeId: "",
        operator: "",
        value: "",
      },
    ]);
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleRequirementChange = (
    index: number,
    key: "attributeId" | "value",
    val: any
  ) => {
    const updated = [...requirements];
    updated[index] = { ...updated[index], [key]: val };

    if (key === "attributeId") {
      updated[index].value = "";
    }
    setRequirements(updated);
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log(mode);
    const vacancyData = {
      title: title.trim(),
      company: company.trim(),
      description: description.trim(),
      salaryFrom: salaryFrom ? Number(salaryFrom) : null,
      salaryTo: salaryTo ? Number(salaryTo) : null,
      attributes,
      requirements,
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
    } catch (err) {
      console.error("Failed to save vacancy:", err);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography variant="h6">{t("vacancies.form.main_info")}</Typography>
      <TextField
        label={t("vacancies.form.title")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        size="small"
      />

      <TextField
        label={t("vacancies.form.company")}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
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
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
      <TextField
        label={t("vacancies.form.description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
        size="small"
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
        color="primary"
        size="large"
        sx={{ alignSelf: "flex-end" }}
        disabled={isLoading}
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
